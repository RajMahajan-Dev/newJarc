import Link from "next/link"
import Image from "next/image"
import { Calendar, ChevronLeft, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MobileMenu } from "@/components/mobile-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export default function EventsPage() {
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
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center">
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-2"
                >
                  <ChevronLeft className="h-4 w-4" /> Back to Home
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Events</h1>
                <p className="text-muted-foreground">Discover our past, present, and future events.</p>
              </div>
              <Link href="/register">
                <Button>Register for an Event</Button>
              </Link>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card
                      key={i}
                      className="overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <CardHeader className="p-0">
                        <div className="relative h-48 w-full">
                          <Image
                            src={`/placeholder.svg?height=200&width=400&text=Event ${i}`}
                            fill
                            alt={`Event ${i}`}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                          <Badge className="absolute right-2 top-2" variant="secondary">
                            Upcoming
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="line-clamp-1">Upcoming Event {i}</CardTitle>
                        <CardDescription className="line-clamp-2 mt-2">
                          Description for upcoming event {i}. Join us for an exciting event focused on robotics and
                          automation.
                        </CardDescription>
                        <div className="mt-4 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>April {i + 10}, 2025</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>10:00 AM - 4:00 PM</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>RSCOE Campus</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Link href="/register" className="w-full">
                          <Button className="w-full">Register Now</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="current" className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2].map((i) => (
                    <Card
                      key={i}
                      className="overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <CardHeader className="p-0">
                        <div className="relative h-48 w-full">
                          <Image
                            src={`/placeholder.svg?height=200&width=400&text=Current Event ${i}`}
                            fill
                            alt={`Current Event ${i}`}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                          <Badge className="absolute right-2 top-2" variant="default">
                            Ongoing
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="line-clamp-1">Current Event {i}</CardTitle>
                        <CardDescription className="line-clamp-2 mt-2">
                          Description for current event {i}. This event is happening right now!
                        </CardDescription>
                        <div className="mt-4 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>March 26-30, 2025</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>All Day</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>RSCOE Innovation Hub</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Link href="/register" className="w-full">
                          <Button className="w-full">Join Now</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="past" className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Card
                      key={i}
                      className="overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <CardHeader className="p-0">
                        <div className="relative h-48 w-full">
                          <Image
                            src={`/placeholder.svg?height=200&width=400&text=Past Event ${i}`}
                            fill
                            alt={`Past Event ${i}`}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                          <Badge className="absolute right-2 top-2" variant="outline">
                            Completed
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="line-clamp-1">Past Event {i}</CardTitle>
                        <CardDescription className="line-clamp-2 mt-2">
                          Description for past event {i}. This was a successful event that took place recently.
                        </CardDescription>
                        <div className="mt-4 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>February {i + 5}, 2025</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>9:00 AM - 5:00 PM</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>RSCOE Auditorium</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button className="w-full" variant="outline">
                          View Gallery
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
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

