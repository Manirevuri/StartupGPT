import PDLJS from 'peopledatalabs';
import { NextRequest, NextResponse } from "next/server";

// Create a client, specifying your API key
const PDLClient = new PDLJS({ apiKey: process.env.PEOPLE_DATA_API_KEY ? process.env.PEOPLE_DATA_API_KEY : '' });

export async function POST(req: NextRequest) {
    const { company_website } = await req.json();
    console.log('Query received:', company_website);

    const sqlQuery = "SELECT * FROM company WHERE (website = '" + String(company_website) + "')";
    console.log('SQL Query:', sqlQuery);
    const params = {
        dataset: "all",
        searchQuery: sqlQuery,
        size: 10,
        pretty: true
    }

    try {
        const response = await PDLClient.company.search.sql(params);
        return NextResponse.json({ response:  response?.data });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to get query info' }, { status: 500 });
    }
}