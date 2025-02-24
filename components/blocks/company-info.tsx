import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CompanyData {
  name: string
  display_name: string
  size: string
  employee_count: number
  id: string
  founded: number
  industry: string | null
  naics: string | null
  sic: string | null
  location: {
    name: string
    locality: string
    region: string
    metro: string
    country: string
    continent: string
    street_address: string | null
    address_line_2: string | null
    postal_code: string | null
    geo: string
  }
  linkedin_id: string
  linkedin_url: string
  linkedin_slug: string
  facebook_url: string | null
  twitter_url: string | null
  profiles: string[]
  website: string
  ticker: string | null
  mic_exchange: string | null
  type: string
  summary: string
  tags: string[]
  headline: string
  alternative_names: string[]
  alternative_domains: string[]
  affiliated_profiles: string[]
  total_funding_raised: number
  latest_funding_stage: string
  last_funding_date: string
  number_funding_rounds: number
  funding_stages: string[]
  employee_count_by_country: { [key: string]: number }
  dataset_version: string
}

interface CompanyDetailsProps {
  data: CompanyData[] | null
}

export default function CompanyDetails({ data }: CompanyDetailsProps) {
  if (!data || data.length === 0) return null

  const company = data[0]

  const renderField = (label: string, value: any) => {
    if (value === null || value === undefined || (Array.isArray(value) && value.length === 0)) return null
    return (
      <div className="mb-2">
        <span className="font-semibold">{label}:</span>{" "}
        {Array.isArray(value) ? value.join(", ") : typeof value === "object" ? JSON.stringify(value) : String(value)}
      </div>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{company.display_name}</CardTitle>
        <p className="text-sm text-muted-foreground">{company.headline}</p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[60vh]">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
              {renderField("Founded", company.founded)}
              {renderField("Size", company.size)}
              {renderField("Employee Count", company.employee_count)}
              {renderField("Type", company.type)}
              {renderField("Industry", company.industry)}
            </div>

            {company.location && (
              <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            {company.location.name && renderField("Address", company.location.name)}
            {company.location.geo && renderField("Geo", company.location.geo)}
          </div>
              </>
            )}

            {(company.website || company.linkedin_url || company.facebook_url || company.twitter_url) && (
              <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">Online Presence</h3>
            {company.website && renderField("Website", company.website)}
            {company.linkedin_url && renderField("LinkedIn", company.linkedin_url)}
            {company.facebook_url && renderField("Facebook", company.facebook_url)}
            {company.twitter_url && renderField("Twitter", company.twitter_url)}
          </div>
              </>
            )}

            {(company.total_funding_raised || company.latest_funding_stage) && (
              <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">Funding Information</h3>
            {company.total_funding_raised > 0 && renderField("Total Funding Raised", `$${company.total_funding_raised.toLocaleString()}`)}
            {company.latest_funding_stage && renderField("Latest Funding Stage", company.latest_funding_stage)}
            {company.last_funding_date && renderField("Last Funding Date", company.last_funding_date)}
            {company.number_funding_rounds > 0 && renderField("Number of Funding Rounds", company.number_funding_rounds)}
            {company.funding_stages?.length > 0 && renderField("Funding Stages", company.funding_stages)}
          </div>
              </>
            )}

            {company.employee_count_by_country && Object.keys(company.employee_count_by_country).length > 0 && (
              <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">Employee Distribution</h3>
            {Object.entries(company.employee_count_by_country).map(([country, count]) => (
              <div key={country}>
                {country}: {count}
              </div>
            ))}
          </div>
              </>
            )}

            {company.tags?.length > 0 && (
              <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {company.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
            {tag}
                </Badge>
              ))}
            </div>
          </div>
              </>
            )}

            {company.summary && (
              <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p>{company.summary}</p>
          </div>
              </>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

