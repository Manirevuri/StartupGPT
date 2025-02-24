import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomerData {
  id: number
  name: string
  subscription: string
}

interface CustomerDetailsProps {
  data: CustomerData | null
}

export function CustomerDetails({ data }: CustomerDetailsProps) {
  if (!data) return null

  return (
    <Card className="rounded-3xl mt-4">
      <CardHeader>
        <CardTitle className="text-center">Customer Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <p>
            <strong>ID:</strong> {data.id}
          </p>
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Subscription:</strong> {data.subscription}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

