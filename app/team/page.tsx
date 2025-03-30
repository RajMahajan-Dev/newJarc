import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Mail, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MobileMenu } from "@/components/mobile-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export default function TeamPage() {
  const coreMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Club President",
      bio: "Alex is a final year student with a passion for robotics and AI. He has led multiple award-winning projects.",
      image: "/placeholder.svg?height=400&width=300&text=Alex",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Technical Lead",
      bio: "Priya specializes in embedded systems and has interned at leading robotics companies.",
      image: "/placeholder.svg?height=400&width=300&text=Priya",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Automation Expert",
      bio: "Michael has developed several automated systems and has a background in mechanical engineering.",
      image: "/placeholder.svg?height=400&width=300&text=Michael",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Events Coordinator",
      bio: "Sarah manages all club events and workshops, ensuring they run smoothly and effectively.",
      image: "/placeholder.svg?height=400&width=300&text=Sarah",
    },
  ]

  const members = [
    {
      id: 5,
      name: "Raj Patel",
      role: "Research Head",
      bio: "Raj leads the research initiatives of the club, focusing on innovative applications of robotics.",
      image: "/placeholder.svg?height=400&width=300&text=Raj",
    },
    {
      id: 6,
      name: "Emma Davis",
      role: "Secretary",
      bio: "Emma handles administrative tasks and communication, keeping the club organized and efficient.",
      image: "/placeholder.svg?height=400&width=300&text=Emma",
    },
    {
      id: 7,
      name: "David Kim",
      role: "Treasurer",
      bio: "David manages the club's finances and budget, ensuring resources are allocated effectively.",
      image: "/placeholder.svg?height=400&width=300&text=David",
    },
    {
      id: 8,
      name: "Aisha Khan",
      role: "Outreach Coordinator",
      bio: "Aisha manages relationships with industry partners and other educational institutions.",
      image: "/placeholder.svg?height=400&width=300&text=Aisha",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-600"></div>
              <div className="absolute inset-[2px] flex items-center justify-center rounded-full bg-background text-xs font-bold">
                JARC
              </div>
            </div>
            <span className="hidden font-bold sm:inline-block">Janatics Automation and Robotics Club</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/events" className="text-sm font-medium transition-colors hover:text-primary">
              Events
            </Link>
            <Link href="/team" className="text-sm font-medium transition-colors hover:text-primary">
              Team
            </Link>
            <Link href="/register" className="text-sm font-medium transition-colors hover:text-primary">
              Register
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/register">
              <Button>Join Now</Button>
            </Link>
            <MobileMenu />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container space-y-12">
            <div className="flex flex-col items-start gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-2"
              >
                <ChevronLeft className="h-4 w-4" /> Back to Home
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Team</h1>
              <p className="text-muted-foreground max-w-[700px]">
                Meet the dedicated individuals who make JARC possible. Our team is committed to fostering innovation and
                excellence in robotics and automation.
              </p>
            </div>

            <Tabs defaultValue="core" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="core">Core Members</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
              </TabsList>

              <TabsContent value="core" className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {coreMembers.map((member) => (
                    <Card
                      key={member.id}
                      className="overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <CardHeader className="p-0">
                        <div className="relative h-64 w-full">
                          <Image
                            src={member.image || "/placeholder.svg"}
                            fill
                            alt={member.name}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="line-clamp-1">{member.name}</CardTitle>
                        <CardDescription className="text-primary font-medium mt-1">{member.role}</CardDescription>
                        <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                      </CardContent>
                      <CardFooter className="p-6 pt-0 flex gap-2">
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="members" className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {members.map((member) => (
                    <Card
                      key={member.id}
                      className="overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <CardHeader className="p-0">
                        <div className="relative h-64 w-full">
                          <Image
                            src={member.image || "/placeholder.svg"}
                            fill
                            alt={member.name}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="line-clamp-1">{member.name}</CardTitle>
                        <CardDescription className="text-primary font-medium mt-1">{member.role}</CardDescription>
                        <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                      </CardContent>
                      <CardFooter className="p-6 pt-0 flex gap-2">
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-muted/50">
          <div className="container space-y-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Team</h2>
                <p className="max-w-[600px] text-muted-foreground">
                  Interested in becoming a part of JARC? We're always looking for passionate individuals to join our
                  team.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/register">
                <Button size="lg">Apply to Join</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-600"></div>
                <div className="absolute inset-[2px] flex items-center justify-center rounded-full bg-background text-xs font-bold">
                  JARC
                </div>
              </div>
              <span className="font-bold">Janatics Automation and Robotics Club</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Innovate. Create. Automate. © {new Date().getFullYear()} JARC, RSCOE. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="#"
              className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            >
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
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            >
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
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            >
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
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            >
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
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

