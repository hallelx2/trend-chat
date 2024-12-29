"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface RelatedData {
  category: string
  adoption: number
}

interface Insight {
  id: number
  title: string
  trend: string
  date: string
  summary: string
  keyPoints: string[]
  impactScore: number
  confidenceLevel: number
  relatedData: RelatedData[]
}

interface InsightDetailClientProps {
  initialInsight: Insight
}

export function InsightDetailClient({ initialInsight }: InsightDetailClientProps) {
  const [insight] = useState<Insight>(initialInsight)

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold neon-text">{insight.title}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Insight Overview</CardTitle>
          <CardDescription>Generated on {insight.date}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge className="mb-2">{insight.trend}</Badge>
          <p className="text-lg">{insight.summary}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Points</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {insight.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Impact Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{insight.impactScore}/100</div>
            <p className="text-sm text-muted-foreground">Estimated impact on the industry</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confidence Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{insight.confidenceLevel}%</div>
            <p className="text-sm text-muted-foreground">AI's confidence in this insight</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Related Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insight.relatedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="adoption"
                  fill="#8884d8"
                  name="Adoption Rate (%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
