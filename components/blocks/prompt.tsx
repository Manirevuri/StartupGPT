import { Mic } from "lucide-react"

const voiceCommands = [
  "Find startups founded in 2024",
  "Show healthcare startups in pre-seed stage",
  "List YC 2024 startups in construction",
  "Search for AI startups in Europe with female founders",
  "Display fintech startups that raised Series A in the last 6 months",
  "Find sustainable energy startups in emerging markets",
  "Healthcare startup which are using AI",
  "Startups developing Wearables"
]

export function StartupGPTExamples() {
  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl shadow-lg max-w-4xl mx-auto justify-center">
      <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600">
        StartupGPT Voice Commands
      </h2>
      <p className="text-lg text-gray-700 mb-8 text-center">Try saying:</p>
      <div className="grid gap-4 md:grid-cols-2">
        {voiceCommands.map((command, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <div className="flex items-start">
              <Mic className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-1" />
              <p className="text-gray-800 font-medium">{command}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

