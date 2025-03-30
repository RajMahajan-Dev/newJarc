"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden">
      <Button variant="outline" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-600"></div>
                <div className="absolute inset-[2px] flex items-center justify-center rounded-full bg-background text-xs font-bold">
                  JARC
                </div>
              </div>
              <span className="font-bold">Janatics Automation and Robotics Club</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Close menu">
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="container mt-8 flex flex-col gap-6">
            <Link
              href="/"
              className="text-xl font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/events"
              className="text-xl font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/team"
              className="text-xl font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Team
            </Link>
            <Link
              href="/register"
              className="text-xl font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
            <div className="mt-4">
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button size="lg" className="w-full">
                  Join Now
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

