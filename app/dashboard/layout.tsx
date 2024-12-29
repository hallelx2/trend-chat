"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from './_components/Sidebar'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { supabase } from '@/lib/supabaseClient' // Make sure to import supabase from your configuration

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/sign-in') // Redirect to login if not authenticated
      }
    }

    checkAuth()
  }, [router])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-background border-b border-primary/20 p-4 flex justify-between items-center lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold neon-text">TrendChat</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
