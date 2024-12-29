"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { AddInsightDialog } from '../_components/AddInsightDialog'

const insights = [
  { id: 1, title: "AI adoption in healthcare accelerating", trend: "AI in Healthcare", date: "2023-06-15" },
  { id: 2, title: "Eco-friendly materials gaining traction", trend: "Sustainable Fashion", date: "2023-06-14" },
  { id: 3, title: "Voice control becoming standard in smart homes", trend: "Smart Home Devices", date: "2023-06-13" },
  { id: 4, title: "New AI regulations impacting healthcare tech", trend: "AI in Healthcare", date: "2023-06-12" },
  { id: 5, title: "Wearable tech integration in fashion on the rise", trend: "Sustainable Fashion", date: "2023-06-11" },
  { id: 6, title: "IoT security concerns shaping smart home market", trend: "Smart Home Devices", date: "2023-06-10" },
]

export default function Insights() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddInsightOpen, setIsAddInsightOpen] = useState(false)

  const filteredInsights = insights.filter(insight =>
    insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insight.trend.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddInsight = (newInsight: any) => {
    // In a real application, you would send this data to your backend
    console.log('New insight:', newInsight)
    // For now, we'll just close the dialog
    setIsAddInsightOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold neon-text">AI-Generated Insights</h1>
        <Button onClick={() => setIsAddInsightOpen(true)} className="cyberpunk-button">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Insight
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Insights</CardTitle>
          <CardDescription>Find specific insights across all your trends</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cyberpunk-input"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Insights</CardTitle>
          <CardDescription>Comprehensive list of AI-generated insights</CardDescription>
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
              {filteredInsights.map((insight) => (
                <TableRow key={insight.id}>
                  <TableCell>{insight.title}</TableCell>
                  <TableCell>{insight.trend}</TableCell>
                  <TableCell>{insight.date}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/insights/${insight.id}`}>View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddInsightDialog
        open={isAddInsightOpen}
        onOpenChange={setIsAddInsightOpen}
        onAddInsight={handleAddInsight}
      />
    </div>
  )
}
