import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const StartupInfo = z.object({
  companies: z.array(
    z.object({
      name: z.string(),
      location: z.string().optional(),
      founders: z.array(z.string()),
      website: z.string().optional(),
      industry: z.string(),
      funding: z.number().optional(),
    })
  ),
});

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  console.log("Query received:", query);
  const apiKey = process.env.PERPLEXITY_API_KEY;
  const base_url = process.env.PERPLEXITY_BASE_URL;
  if (!apiKey) {
    throw Error("OPENAI_API_KEY is not set");
  }
  if (!base_url) {
    throw Error("NEXT_PUBLIC_OPENAI_API_BASE_URL is not set");
  }

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: base_url,
    });
    const response = await openai.chat.completions.create({
      model: "sonar-pro",
      messages: [
        // { role: 'system', content: 'You are a financial advisor agent whose task is to search for the companies based on the given query and for every company make sure to provide the following info name, location, founders, website, industry, funding. Try to reference various sources to get all the 5 fields, Always limit the results to 5 startups only' },
        {
          role: "system",
          content: ` You are Venture Capitalist agent whose task is to search for the companies based on the given query and for every company make sure to provide the following information name, location, founders, website, industry, funding. Try to reference various sources to get all the 5 fields, Always limit the results to 5 startups only. It is very important to get all the information as the missing information may break the system`,
        },
        { role: "user", content: query },
      ],
    });
    console.log(response.choices[0].message);
    let data = await structuredData(response.choices[0].message.content);
    console.log("Structured Data:", data);
    if (typeof data === "string") {
      data = JSON.parse(data);
    } else {
      throw new Error("Invalid data format received");
    }
    return NextResponse.json({ response: data });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to get query info" },
      { status: 500 }
    );
  }
}

async function structuredData(message: string | null) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw Error("OPENAI_API_KEY is not set");
  }
  try {
    const openai = new OpenAI({
      apiKey: apiKey,
    });
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You task it to create a structured json data",
        },
        { role: "user", content: message ? message : "No message provided" },
      ],
      response_format: zodResponseFormat(StartupInfo, "event"),
    });
    console.log(response.choices[0].message);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to get query info" },
      { status: 500 }
    );
  }
}
