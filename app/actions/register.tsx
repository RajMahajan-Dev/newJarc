"use server"

import { writeFile } from "fs/promises"
import { join } from "path"
import * as XLSX from "xlsx"
import nodemailer from "nodemailer"

type MemberData = {
  name: string;
  email: string;
  phone: string;
  year: string;
  department: string;
  paymentMethod: string;
  transactionId: string;
  interest: string;
  experience: string;
  expectations: string;
  paymentProofPath?: string;
  registrationDate: string;
}

export async function registerMember(formData: FormData) {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const year = formData.get("year") as string
    const department = formData.get("department") as string
    const paymentMethod = formData.get("paymentMethod") as string
    const transactionId = formData.get("transactionId") as string
    const interest = formData.get("interest") as string
    const experience = formData.get("experience") as string
    const expectations = formData.get("expectations") as string

    // Get payment proof file if it exists
    const paymentProof = formData.get("paymentProof") as File
    let paymentProofPath = ""

    if (paymentProof && paymentProof.size > 0) {
      const buffer = Buffer.from(await paymentProof.arrayBuffer())
      const filename = `payment_proof_${Date.now()}_${paymentProof.name}`
      paymentProofPath = join(process.cwd(), "public", "uploads", filename)

      // Save the file
      await writeFile(paymentProofPath, buffer)
      paymentProofPath = `/uploads/${filename}`
    }

    // Create member data object
    const memberData = {
      name,
      email,
      phone,
      year,
      department,
      paymentMethod,
      transactionId,
      interest,
      experience,
      expectations,
      paymentProofPath,
      registrationDate: new Date().toISOString(),
    }

    // Save to Excel file
    await saveToExcel(memberData)

    // Send email notification
    await sendEmailNotification(memberData)

    return { success: true, message: "Registration successful!" }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, message: "Registration failed. Please try again." }
  }
}

async function saveToExcel(data: MemberData) {
  try {
    const filePath = join(process.cwd(), "data", "members.xlsx")
    let workbook

    try {
      // Try to read existing file
      workbook = XLSX.readFile(filePath)
    } catch (error) {
      console.error("An error occurred:", error);
      // If file doesn't exist, create a new workbook
      workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), "Members")
    }

    const worksheet = workbook.Sheets["Members"]
    const jsonData = XLSX.utils.sheet_to_json(worksheet)

    // Add new data
    jsonData.push(data)

    // Update worksheet
    const newWorksheet = XLSX.utils.json_to_sheet(jsonData)
    workbook.Sheets["Members"] = newWorksheet

    // Write to file
    XLSX.writeFile(workbook, filePath)

    return true
  } catch (error) {
    console.error("Error saving to Excel:", error)
    throw error
  }
}

async function sendEmailNotification(data: MemberData) {
  // Create a test account if needed
  // const testAccount = await nodemailer.createTestAccount()

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.example.com",
    port: Number.parseInt(process.env.EMAIL_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || "user@example.com",
      pass: process.env.EMAIL_PASS || "password",
    },
  })

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_FROM || "jarc@example.com",
    to: "rsmahajan_ar@jspmrscoe.edu.in",
    subject: "New JARC Membership Registration",
    text: `
      New member registration:
      
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      Year: ${data.year}
      Department: ${data.department}
      Payment Method: ${data.paymentMethod}
      Transaction ID: ${data.transactionId}
      
      Areas of Interest:
      ${data.interest}
      
      Prior Experience:
      ${data.experience}
      
      Expectations:
      ${data.expectations}
      
      Registration Date: ${new Date(data.registrationDate).toLocaleString()}
    `,
    html: `
      <h2>New JARC Membership Registration</h2>
      
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Year:</strong> ${data.year}</p>
      <p><strong>Department:</strong> ${data.department}</p>
      <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
      <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
      
      <h3>Areas of Interest:</h3>
      <p>${data.interest}</p>
      
      <h3>Prior Experience:</h3>
      <p>${data.experience}</p>
      
      <h3>Expectations:</h3>
      <p>${data.expectations}</p>
      
      <p><strong>Registration Date:</strong> ${new Date(data.registrationDate).toLocaleString()}</p>
      
      ${data.paymentProofPath ? `<p><a href="${data.paymentProofPath}">View Payment Proof</a></p>` : ""}
    `,
  }

  // Send email
  await transporter.sendMail(mailOptions)
}

