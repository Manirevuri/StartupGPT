import FirecrawlApp from '@mendable/firecrawl-js';
import { NextRequest, NextResponse } from "next/server";
import { features } from 'process';
import { custom, z } from "zod";

const schema = z.object({
    name: z.string(),
    mission : z.string(),
    image: z.string().optional(),
    favicon: z.string().optional(),
    features: z.array(z.object(
        { name: z.string(), description: z.string() }
    )).length(4),
    targetMarket: z.string(),
    competitors: z.array(z.object(
        { name: z.string(), description: z.string() }
    )),
    trustedBy: z.array(z.string()),
    funding: z.array(z.object(
        { amount: z.string(), date: z.string(), round: z.string() }
    )).optional(),
    founders: z.array(z.object(
        { name: z.string(), title: z.string(), linkedin: z.string() }
    )).optional(),
    press: z.array(z.object(
        { title: z.string(), link: z.string(), date: z.string() }
    )).optional(),
    awards: z.array(z.object(
        { name: z.string(), date: z.string() }
    )).optional(),
    partnerships: z.array(z.object(
        { name: z.string(), description: z.string() }
    )).optional(),
    testimonials: z.array(z.object(
        { name: z.string(), title: z.string(), quote: z.string() }
    )).optional(),
    contact: z.object(
        { email: z.string(), phone: z.string() }
    ).optional(),
    investment_opportunities: z.array(z.string()).optional(),
    company_website: z.string(),
});

const app = new FirecrawlApp({apiKey: process.env.FIRECRAWL_API_KEY ? process.env.FIRECRAWL_API_KEY : ''});

export async function POST(req: NextRequest) {
    const { company_website } = await req.json();
    console.log('Query received:', company_website);

    const scrapeResult = await app.scrapeUrl(
        company_website, 
        { formats: ['json'],
        //     jsonOptions: {
        //         prompt: "Extract the company mission from the page and any other key information that will be helpful for venture capitalists to make investment decisions."
        //   },
        jsonOptions: { schema: schema }
        },
    );

    console.log('Crawl Response:', scrapeResult);
    
    if (!scrapeResult.success) {
        return NextResponse.json({ error: `Failed to crawl: ${scrapeResult.error}` }, { status: 500 });
      }
    
    if (!scrapeResult.json?.name || !scrapeResult.json?.mission || !scrapeResult.json?.features || 
        !scrapeResult.json?.targetMarket || !scrapeResult.json?.competitors || !scrapeResult.json?.trustedBy ||
        !scrapeResult.json?.company_website) {
        return NextResponse.json({ error: 'Missing required fields in scraped data' }, { status: 400 });
    }

    let result = scrapeResult.json;
    result = {
        ...result,
        image: scrapeResult.metadata?.ogImage,
        favicon: scrapeResult.metadata?.favicon,
    }
    
    return NextResponse.json({ response:  result});
}