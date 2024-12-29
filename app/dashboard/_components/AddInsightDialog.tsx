"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface AddInsightDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddInsight: (insight: any) => void
}

export function AddInsightDialog({ open, onOpenChange, onAddInsight }: AddInsightDialogProps) {
  const [title, setTitle] = useState('')
  const [trend, setTrend] = useState('')
  const [summary, setSummary] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newInsight = {
      title,
      trend,
      summary,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    }
    onAddInsight(newInsight)
    setTitle('')
    setTrend('')
    setSummary('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Insight</DialogTitle>
          <DialogDescription>
            Enter the details of your new insight. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trend" className="text-right">
                Trend
              </Label>
              <Input
                id="trend"
                value={trend}
                onChange={(e) => setTrend(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="summary" className="text-right">
                Summary
              </Label>
              <Textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Insight</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

