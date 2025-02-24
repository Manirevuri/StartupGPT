import type React from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Award,
  Briefcase,
  Building,
  DollarSign,
  Globe,
  Handshake,
  Mail,
  MessageSquare,
  Phone,
  Star,
  Users,
} from "lucide-react"
import { ExternalLink } from "lucide-react"

type Feature = { name: string; description: string }
type Competitor = { name: string; description: string }
type FundingRound = { amount: string; date: string; round: string }
type TeamMember = { name: string; title: string; linkedin: string }
type PressItem = { title: string; link: string; date: string }
type Award = { name: string; date: string }
type Partnership = { name: string; description: string }
type Testimonial = { name: string; title: string; quote: string }

interface StartupCardProps {
  name: string
  favicon?: string
  mission: string
  features: Feature[]
  targetMarket: string
  competitors: Competitor[]
  trustedBy: string[]
  funding?: FundingRound[]
  team?: TeamMember[]
  press?: PressItem[]
  awards?: Award[]
  partnerships?: Partnership[]
  testimonials?: Testimonial[]
  contact?: { email: string; phone: string }
  investment_opportunities?: string[]
  company_website: string
  image?: string
}

const StartupCard: React.FC<StartupCardProps> = ({
  name,
  favicon,
  mission,
  features,
  targetMarket,
  competitors,
  trustedBy,
  funding,
  team,
  press,
  awards,
  partnerships,
  testimonials,
  contact,
  investment_opportunities,
  company_website,
  image,
}) => {

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="relative">
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <img
            src={favicon || "/placeholder.svg"}
            alt={`${name} favicon`}
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <CardTitle className="text-3xl font-bold flex items-center">{name}</CardTitle>
        <CardDescription className="text-lg mt-2">{mission}</CardDescription>
      </CardHeader>
      {image && (
        <div className="px-6 pb-6">
          <img
            src={image || "/placeholder.svg"}
            alt={`${name} Twitter card`}
            width={600}
            height={320}
            className="rounded-lg w-full h-auto"
          />
        </div>
      )}
      <CardContent className="space-y-6">
        <Features features={features} />
        <TargetMarket targetMarket={targetMarket} />
        <Competitors competitors={competitors} />
        <TrustedBy trustedBy={trustedBy} />
        {funding && <Funding funding={funding} />}
        {team && <Team team={team} />}
        {press && <Press press={press} />}
        {awards && <Awards awards={awards} />}
        {partnerships && <Partnerships partnerships={partnerships} />}
        {testimonials && <Testimonials testimonials={testimonials} />}
        {(contact || investment_opportunities) && (
          <ContactAndInvestment contact={contact} investment_opportunities={investment_opportunities} />
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button variant="outline" onClick={() => window.open(company_website, "_blank")}>
          <Globe className="mr-2 h-4 w-4" /> Visit Website
        </Button>
        <Badge variant="secondary" className="text-sm">
          StartupGPT
        </Badge>
      </CardFooter>
    </Card>
  )
}

const Features: React.FC<{ features: Feature[] }> = ({ features }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">Key Features</h3>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <Star className="mr-2 h-5 w-5 text-yellow-500 flex-shrink-0 mt-1" />
          <div>
            <span className="font-medium">{feature.name}:</span> {feature.description}
          </div>
        </li>
      ))}
    </ul>
  </div>
)

const TargetMarket: React.FC<{ targetMarket: string }> = ({ targetMarket }) => (
  <div className="flex items-center">
    <Users className="mr-2 h-5 w-5 text-blue-500" />
    <div>
      <span className="font-semibold">Target Market:</span> {targetMarket}
    </div>
  </div>
)

const Competitors: React.FC<{ competitors: Competitor[] }> = ({ competitors }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">Competitors</h3>
    <ul className="space-y-2">
      {competitors.map((competitor, index) => (
        <li key={index} className="flex items-start">
          <Building className="mr-2 h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <span className="font-medium">{competitor.name}:</span> {competitor.description}
          </div>
        </li>
      ))}
    </ul>
  </div>
)

const TrustedBy: React.FC<{ trustedBy: string[] }> = ({ trustedBy }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">Trusted By</h3>
    <div className="flex flex-wrap gap-2">
      {trustedBy.map((company, index) => (
        <Badge key={index} variant="secondary">
          {company}
        </Badge>
      ))}
    </div>
  </div>
)

const Funding: React.FC<{ funding: FundingRound[] }> = ({ funding }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">Funding Rounds</h3>
    <ul className="space-y-2">
      {funding.map((round, index) => (
        <li key={index} className="flex items-center">
          <DollarSign className="mr-2 h-5 w-5 text-green-500" />
          <div>
            <span className="font-medium">{round.round}:</span> {round.amount} ({round.date})
          </div>
        </li>
      ))}
    </ul>
  </div>
)

const Team: React.FC<{ team: TeamMember[] }> = ({ team }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">Team</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {team.map((member, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Avatar>
            <AvatarFallback>
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{member.name}</div>
            <div className="text-sm text-gray-500">{member.title}</div>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
              LinkedIn
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const Press: React.FC<{ press: PressItem[] }> = ({ press }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">Press Coverage</h3>
    <ul className="space-y-2">
      {press.map((item, index) => (
        <li key={index} className="flex items-center">
          <ExternalLink className="mr-2 h-4 w-4 text-blue-500" />
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {item.title}
          </a>
          <span className="text-sm text-gray-500 ml-2">({item.date})</span>
        </li>
      ))}
    </ul>
  </div>
)

const Awards: React.FC<{ awards: Award[] }> = ({ awards }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">Awards</h3>
    <ul className="space-y-2">
      {awards.map((award, index) => (
        <li key={index} className="flex items-center">
          <Award className="mr-2 h-5 w-5 text-yellow-500" />
          <div>
            <span className="font-medium">{award.name}</span> ({award.date})
          </div>
        </li>
      ))}
    </ul>
  </div>
)

const Partnerships: React.FC<{ partnerships: Partnership[] }> = ({ partnerships }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">Partnerships</h3>
    <ul className="space-y-2">
      {partnerships.map((partnership, index) => (
        <li key={index} className="flex items-start">
          <Handshake className="mr-2 h-5 w-5 text-purple-500 flex-shrink-0 mt-1" />
          <div>
            <span className="font-medium">{partnership.name}:</span> {partnership.description}
          </div>
        </li>
      ))}
    </ul>
  </div>
)

const Testimonials: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">Testimonials</h3>
    <Accordion type="single" collapsible className="w-full">
      {testimonials.map((testimonial, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger>
            {testimonial.name} - {testimonial.title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-start">
              <MessageSquare className="mr-2 h-5 w-5 text-gray-500 flex-shrink-0 mt-1" />
              <p className="italic">{`"${testimonial.quote}"`}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
)

const ContactAndInvestment: React.FC<{
  contact?: { email: string; phone: string }
  investment_opportunities?: string[]
}> = ({ contact, investment_opportunities }) => (
  <div className="space-y-4">
    {contact && (
      <div>
        <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Mail className="mr-2 h-5 w-5 text-gray-500" />
            <a href={`mailto:${contact.email}`} className="text-blue-500">
              {contact.email}
            </a>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 h-5 w-5 text-gray-500" />
            <a href={`tel:${contact.phone}`} className="text-blue-500">
              {contact.phone}
            </a>
          </div>
        </div>
      </div>
    )}
    {investment_opportunities && (
      <div>
        <h3 className="text-xl font-semibold mb-2">Investment Opportunities</h3>
        <ul className="list-disc list-inside space-y-1">
          {investment_opportunities.map((opportunity, index) => (
            <li key={index} className="flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-green-500" />
              {opportunity}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)

export default function WebsiteInfo({data}: {data: any}) {
  return <StartupCard {...data} />
}

