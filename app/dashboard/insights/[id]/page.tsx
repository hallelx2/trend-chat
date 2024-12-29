import { InsightDetailClient } from "../../_components/InsightDetailClient"

const mockInsights = {
  '1': {
    id: 1,
    title: "AI adoption in healthcare accelerating",
    trend: "AI in Healthcare",
    date: "2023-06-15",
    summary: "The adoption of AI in healthcare is showing a significant acceleration, with more hospitals and clinics integrating AI-powered diagnostic tools.",
    keyPoints: [
      "50% increase in AI-based diagnostic tool usage in hospitals",
      "Improved accuracy in early disease detection",
      "Reduced workload for healthcare professionals",
      "Challenges in data privacy and ethical AI use"
    ],
    impactScore: 85,
    confidenceLevel: 92,
    relatedData: [
      { category: 'Hospitals', adoption: 65 },
      { category: 'Clinics', adoption: 45 },
      { category: 'Research Centers', adoption: 80 },
      { category: 'Pharmacies', adoption: 30 },
    ]
  },
}

export async function generateStaticParams() {
  return Object.keys(mockInsights).map((id) => ({
    id: id,
  }))
}

export default function InsightPage({ params }: { params: { id: string } }) {
  const insight = mockInsights[params.id as keyof typeof mockInsights]

  if (!insight) {
    return <div>Insight not found</div>
  }

  return <InsightDetailClient initialInsight={insight} />
}

// /app/dashboard/insights/[id]/InsightDetailClient.tsx
