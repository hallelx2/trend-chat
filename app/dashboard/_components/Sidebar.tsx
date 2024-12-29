"use client";

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation' // Import useRouter
import { BarChart2, TrendingUp, Lightbulb, MessageCircle, Settings, LogOut, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth" // Import signOut from your auth file

const sidebarItems = [
  { name: 'Overview', href: '/dashboard', icon: BarChart2 },
  { name: 'Trends', href: '/dashboard/trends', icon: TrendingUp },
  { name: 'Insights', href: '/dashboard/insights', icon: Lightbulb },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageCircle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter

  const handleSignOut = async () => {
    try {
      await signOut(); // Call signOut function
      router.push("/"); // Redirect to the homepage after signing out
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-background/80 backdrop-blur-sm transition-opacity lg:hidden ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card text-card-foreground border-r border-primary/20 transition-transform duration-300 ease-in-out transform lg:translate-x-0 lg:static lg:inset-auto ${open ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="ml-2 text-xl font-bold">TrendChat</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm ${pathname === item.href
                ? 'bg-primary/20 text-primary'
                : 'text-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              onClick={() => setOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-6">
          <button
            className="flex items-center text-sm text-foreground hover:text-primary"
            onClick={handleSignOut} // Add onClick to trigger sign-out
          >
            <LogOut className="w-5 h-5 mr-3" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
