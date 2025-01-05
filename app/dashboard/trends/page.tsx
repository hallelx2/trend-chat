"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Trend {
  id: number;
  name: string;
  field: string;
  product: string;
  data: { name: string; value: number; growth: number }[];
}

const initialTrends: Trend[] = [
  {
    id: 1,
    name: "AI in Healthcare",
    field: "Healthcare",
    product: "AI Diagnostic Tool",
    data: [
      { name: 'Jan', value: 400, growth: 20 },
      { name: 'Feb', value: 300, growth: -25 },
      { name: 'Mar', value: 600, growth: 100 },
      { name: 'Apr', value: 800, growth: 33 },
      { name: 'May', value: 500, growth: -37 },
      { name: 'Jun', value: 700, growth: 40 },
    ]
  },
  {
    id: 2,
    name: "Sustainable Fashion",
    field: "Fashion",
    product: "Eco-friendly Clothing Line",
    data: [
      { name: 'Jan', value: 300, growth: 10 },
      { name: 'Feb', value: 400, growth: 33 },
      { name: 'Mar', value: 500, growth: 25 },
      { name: 'Apr', value: 600, growth: 20 },
      { name: 'May', value: 750, growth: 25 },
      { name: 'Jun', value: 900, growth: 20 },
    ]
  },
]

export default function Trends() {
  const [trends, setTrends] = useState<Trend[]>(initialTrends)
  const [trendQuery, setTrendQuery] = useState("")
  const [isAddTrendOpen, setIsAddTrendOpen] = useState(false)
  const [newTrend, setNewTrend] = useState({ name: '', field: '', product: '' })
  const [editingTrend, setEditingTrend] = useState<Trend | null>(null)

  const handleTrendQuery = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Querying trend:', trendQuery)
  }

  const handleAddTrend = (e: React.FormEvent) => {
    e.preventDefault()
    const trend: Trend = {
      id: Date.now(),
      ...newTrend,
      data: [
        { name: 'Jan', value: Math.floor(Math.random() * 500), growth: Math.floor(Math.random() * 50) - 25 },
        { name: 'Feb', value: Math.floor(Math.random() * 500), growth: Math.floor(Math.random() * 50) - 25 },
        { name: 'Mar', value: Math.floor(Math.random() * 500), growth: Math.floor(Math.random() * 50) - 25 },
      ]
    }
    setTrends([...trends, trend])
    setNewTrend({ name: '', field: '', product: '' })
    setIsAddTrendOpen(false)
  }

  const handleEditTrend = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTrend) {
      setTrends(trends.map(t => t.id === editingTrend.id ? editingTrend : t))
      setEditingTrend(null)
    }
  }

  const handleDeleteTrend = (id: number) => {
    setTrends(trends.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold neon-text">Trends Analysis</h1>
        <Button onClick={() => setIsAddTrendOpen(true)} className="cyberpunk-button">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Trend
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trend Search</CardTitle>
          <CardDescription>Analyze specific trends</CardDescription>
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

      <Card>
        <CardHeader>
          <CardTitle>Your Trends</CardTitle>
          <CardDescription>Manage and analyze your created trends</CardDescription>
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
                    <Button variant="outline" size="sm" className="mr-2" asChild>
                      <Link href={`/dashboard/trends/${trend.id}`}>View</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => setEditingTrend(trend)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteTrend(trend.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {trends.map((trend) => (
        <Card key={trend.id}>
          <CardHeader>
            <CardTitle>{trend.name} Growth Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="growth" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog open={isAddTrendOpen} onOpenChange={setIsAddTrendOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Trend</DialogTitle>
            <DialogDescription>Enter the details of the new trend you want to track.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddTrend}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={newTrend.name}
                  onChange={(e) => setNewTrend({ ...newTrend, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="field" className="text-right">Field</Label>
                <Input
                  id="field"
                  value={newTrend.field}
                  onChange={(e) => setNewTrend({ ...newTrend, field: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product" className="text-right">Product/Idea</Label>
                <Input
                  id="product"
                  value={newTrend.product}
                  onChange={(e) => setNewTrend({ ...newTrend, product: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Trend</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingTrend} onOpenChange={() => setEditingTrend(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Trend</DialogTitle>
            <DialogDescription>Modify the details of the selected trend.</DialogDescription>
          </DialogHeader>
          {editingTrend && (
            <form onSubmit={handleEditTrend}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">Name</Label>
                  <Input
                    id="edit-name"
                    value={editingTrend.name}
                    onChange={(e) => setEditingTrend({ ...editingTrend, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-field" className="text-right">Field</Label>
                  <Input
                    id="edit-field"
                    value={editingTrend.field}
                    onChange={(e) => setEditingTrend({ ...editingTrend, field: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-product" className="text-right">Product/Idea</Label>
                  <Input
                    id="edit-product"
                    value={editingTrend.product}
                    onChange={(e) => setEditingTrend({ ...editingTrend, product: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
