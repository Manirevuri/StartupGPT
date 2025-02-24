import { Loader2 } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface LoadingCardProps {
  message?: string
}

export default function LoadingCard({ message = "Loading..." }: LoadingCardProps) {
  return (
    <Card className="w-full max-w-md overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 mx-auto">
      <CardHeader className="pb-4">
        <div className="h-6 w-3/4 animate-pulse rounded-full bg-purple-200 dark:bg-purple-700" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-4 w-full animate-pulse rounded-full bg-blue-200 dark:bg-blue-700" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-blue-200 dark:bg-blue-700" />
        <div className="h-4 w-4/6 animate-pulse rounded-full bg-blue-200 dark:bg-blue-700" />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{message}</p>
        <Loader2 className="h-5 w-5 animate-spin text-purple-500 dark:text-purple-400" />
      </CardFooter>
    </Card>
  )
}

