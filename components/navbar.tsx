"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold">TrendChat</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium",
                    pathname === item.href
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="default" size="sm">
              <Link href="/sign-up">Get Started</Link>
            </Button>
            <Button variant="outline" size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
