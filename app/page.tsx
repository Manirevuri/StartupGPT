import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, BarChart, MessageSquare, Rocket } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Rocket className="h-6 w-6 mr-2" />
          <span className="font-bold">StartupGPT</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            How It Works
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-20 lg:py-24 xl:py-36">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI-Powered Startup Scouting for Investors
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  StartupGPT helps investors discover and analyze promising startups using advanced AI and natural
                  language processing.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form>
                  <Button size="lg" asChild>
                    <Link href="/dashboard">Get Started</Link>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 opacity-90 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Natural Language Search</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Find startups using conversational queries, just like talking to a human expert.
                </p>
              </div>
              <div className="flex flex-col items-center text-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <BarChart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Detailed Startup Insights</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Access comprehensive information and analytics on each startup at your fingertips.
                </p>
              </div>
              <div className="flex flex-col items-center text-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get AI-generated insights and recommendations tailored to your investment criteria.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 opacity-90 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Ask Your Question</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Use natural language to ask about startups in any sector, region, or with specific criteria.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Get Instant Results</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our AI quickly processes your query and returns a list of relevant startups.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Dive Deep into Details</h3>
                    <p className="text-black-800 dark:text-gray-300">
                      Access comprehensive profiles, financials, and AI-generated insights for each startup.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 shadow-lg">
                <div className="space-y-4">
                  <p className="font-medium text-lg">Example Query:</p>
                  <p className="italic bg-white dark:bg-gray-600 p-3 rounded">
                    "Show me AI startups in Europe with over $1M in funding and positive revenue growth in the last
                    year."
                  </p>
                  <p className="font-medium text-lg">StartupGPT Response:</p>
                  <p>Here are 5 startups matching your criteria:</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>AI Innovation Ltd. (London, UK)</li>
                    <li>Neural Systems GmbH (Berlin, Germany)</li>
                    <li>SmartAlgo S.A. (Paris, France)</li>
                    <li>DataMinds ApS (Copenhagen, Denmark)</li>
                    <li>AICore Technologies Oy (Helsinki, Finland)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Revolutionize Your Startup Scouting?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join forward-thinking investors who are leveraging AI to discover the next unicorn.
                </p>
              </div>
              <Button className="w-full sm:w-auto" size="lg" variant="secondary">
                Watch Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 StartupGPT. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-sm hover:underline underline-offset-4" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm hover:underline underline-offset-4" href="#">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

