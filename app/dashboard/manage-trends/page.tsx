"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from 'lucide-react'

interface Trend {
  id: number;
  name: string;
  field: string;
  product: string;
}

export default function ManageTrends() {
  const [trends, setTrends] = useState<Trend[]>([
    { id: 1, name: "AI in Healthcare", field: "Healthcare", product: "AI Diagnostic Tool" },
    { id: 2, name: "Sustainable Fashion", field: "Fashion", product: "Eco-friendly Clothing Line" },
  ])
  const [newTrend, setNewTrend] = useState({ name: '', field: '', product: '' })

  const handleAddTrend = (e: React.FormEvent) => {
    e.preventDefault()
    setTrends([...trends, { id: Date.now(), ...newTrend }])
    setNewTrend({ name: '', field: '', product: '' })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold neon-text">Manage Trends</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Trend</CardTitle>
          <CardDescription>Create a new trend to analyze</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTrend} className="space-y-4">
            <Input
              placeholder="Trend Name"
              value={newTrend.name}
              onChange={(e) => setNewTrend({ ...newTrend, name: e.target.value })}
              className="cyberpunk-input"
            />
            <Input
              placeholder="Field of Interest"
              value={newTrend.field}
              onChange={(e) => setNewTrend({ ...newTrend, field: e.target.value })}
              className="cyberpunk-input"
            />
            <Input
              placeholder="Product or Idea"
              value={newTrend.product}
              onChange={(e) => setNewTrend({ ...newTrend, product: e.target.value })}
              className="cyberpunk-input"
            />
            <Button type="submit" className="cyberpunk-button w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Trend
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Trends</CardTitle>
          <CardDescription>List of all your created trends</CardDescription>
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
              {trends.map((trend) => (
                <TableRow key={trend.id}>
                  <TableCell>{trend.name}</TableCell>
                  <TableCell>{trend.field}</TableCell>
                  <TableCell>{trend.product}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">View</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

