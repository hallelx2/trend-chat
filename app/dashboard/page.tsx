"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

const recentTrends = [
  { id: 1, name: "AI in Healthcare", field: "Healthcare", product: "AI Diagnostic Tool" },
  { id: 2, name: "Sustainable Fashion", field: "Fashion", product: "Eco-friendly Clothing Line" },
  { id: 3, name: "Smart Home Devices", field: "Technology", product: "IoT Home Assistant" },
]

const recentInsights = [
  { id: 1, title: "AI adoption in healthcare accelerating", trend: "AI in Healthcare", date: "2023-06-15" },
  { id: 2, title: "Eco-friendly materials gaining traction", trend: "Sustainable Fashion", date: "2023-06-14" },
  { id: 3, title: "Voice control becoming standard in smart homes", trend: "Smart Home Devices", date: "2023-06-13" },
  { id: 4, title: "New AI regulations impacting healthcare tech", trend: "AI in Healthcare", date: "2023-06-12" },
]

export default function Dashboard() {
  const [trendQuery, setTrendQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        // Redirect to login if the user is not authenticated
        router.push('/sign-in')
      } else {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleTrendQuery = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Querying trend:', trendQuery)
  }

  if (loading) {
    return <div>Loading...</div> // You can show a loading spinner here
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold neon-text">Dashboard Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentTrends.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insights Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentInsights.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trend Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Trends</CardTitle>
          <CardDescription>Your most recently created trends</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Field</TableHead>
                <TableHead>Product/Idea</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTrends.map((trend) => (
                <TableRow key={trend.id}>
                  <TableCell>{trend.name}</TableCell>
                  <TableCell>{trend.field}</TableCell>
                  <TableCell>{trend.product}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/trends/${trend.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Button asChild>
              <Link href="/dashboard/trends">Manage All Trends</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Insights</CardTitle>
          <CardDescription>Latest AI-generated insights from your trends</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Related Trend</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInsights.map((insight) => (
                <TableRow key={insight.id}>
                  <TableCell>{insight.title}</TableCell>
                  <TableCell>{insight.trend}</TableCell>
                  <TableCell>{insight.date}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/insights/${insight.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Button asChild>
              <Link href="/dashboard/insights">View All Insights</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Trend Analysis</CardTitle>
          <CardDescription>Analyze a specific trend</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTrendQuery} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              placeholder="Enter a trend to analyze"
              value={trendQuery}
              onChange={(e) => setTrendQuery(e.target.value)}
              className="cyberpunk-input flex-grow"
            />
            <Button type="submit" className="cyberpunk-button">Analyze</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
