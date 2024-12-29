import { TrendDetailClient } from '../../_components/TrendDetailClient'

const mockTrendData = {
  '1': { id: 1, name: "AI in Healthcare", field: "Healthcare", product: "AI Diagnostic Tool" },
  '2': { id: 2, name: "Sustainable Fashion", field: "Fashion", product: "Eco-friendly Clothing Line" },
  '3': { id: 3, name: "Smart Home Devices", field: "Technology", product: "IoT Home Assistant" },
}

export async function generateStaticParams() {
  return Object.keys(mockTrendData).map((id) => ({
    id: id,
  }))
}

export default function TrendDetailPage({ params }: { params: { id: string } }) {
  const trend = mockTrendData[params.id as keyof typeof mockTrendData]

  if (!trend) {
    return <div>Trend not found</div>
  }

  return <TrendDetailClient initialTrend={trend} />
}
