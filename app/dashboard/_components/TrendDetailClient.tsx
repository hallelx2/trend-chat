// TrendDetailClient.tsx
"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

const mockChartData = [
  { date: '2023-01', popularity: 30, sentiment: 0.6 },
  { date: '2023-02', popularity: 40, sentiment: 0.65 },
  { date: '2023-03', popularity: 45, sentiment: 0.7 },
  { date: '2023-04', popularity: 60, sentiment: 0.75 },
  { date: '2023-05', popularity: 75, sentiment: 0.8 },
  { date: '2023-06', popularity: 90, sentiment: 0.85 },
]

interface Trend {
  id: number
  name: string
  field: string
  product: string
}

interface TrendDetailClientProps {
  initialTrend: Trend
}

export function TrendDetailClient({ initialTrend }: TrendDetailClientProps) {
  const [trend] = useState<Trend>(initialTrend)

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold neon-text">{trend.name}</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Trend Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p><strong>Field:</strong> {trend.field}</p>
              <p><strong>Product/Idea:</strong> {trend.product}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>The trend has shown consistent growth over the past 6 months.</li>
              <li>Sentiment towards this trend has been increasingly positive.</li>
              <li>Major influencers in the {trend.field} field are discussing this trend more frequently.</li>
              <li>There's potential for market expansion in the coming quarters.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Popularity Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="popularity"
                    stroke="#8884d8"
                    name="Popularity"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={[0, 1]}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="sentiment"
                    fill="#82ca9d"
                    name="Sentiment"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
