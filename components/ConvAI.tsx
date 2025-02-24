"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Conversation } from "@11labs/client";
import { cn } from "@/lib/utils";
import { CustomerDetails } from "./customer-details";
import CompanyBlock from "./blocks/companies-card";
import WebsiteInfo from "./blocks/website-info";
import { StartupGPTExamples } from "./blocks/prompt";
import  CompanyDetails  from "./blocks/company-info";
import LoadingCard from "./blocks/loading-card";
import ActiveDetails from "./blocks/active";
import { get } from "http";
import { send } from "process";

async function requestMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch {
    console.error("Microphone permission denied");
    return false;
  }
}

async function getSignedUrl(): Promise<string> {
  const response = await fetch("/api/signed-url");
  if (!response.ok) {
    throw Error("Failed to get signed url");
  }
  const data = await response.json();
  return data.signedUrl;
}

type DataType = "idle" | "queryInfo" | "websiteInfo" | "companyInfo" | "emailAck" | "loading"; 

interface CustomerData {
  id: number;
  name: string;
  subscription: string;
}

export function ConvAI() {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [activeType, setActiveType] = useState<DataType>("idle");
  const [activeData, setActiveData] = useState<any>(null);

  const clientTools = {
    getQueryResults: async ({query} : { query: string }) => {
      const payload = {
        query: query
      }
      setActiveType("loading");
      setActiveData("Getting query results using Perplexity AI & OpenAI...");
      const res = await fetch("/api/get-query-info", {
        method: "POST",
        body: JSON.stringify(payload),
    }).then((res) => res.json());
      setActiveType("queryInfo");
      setActiveData(res.response.companies);
      return JSON.stringify(res);
    },

    getCompanyInfo: async ({company_website} : { company_website: string }) => {
      setActiveType("loading");
      setActiveData("Getting company info using People Data Labs...");
      const res = await fetch("/api/get-company-info", {
        method: "POST",
        body: JSON.stringify({ company_website }),
    }).then((res) => res.json());
      console.log("Company info:", res);
      setActiveType("companyInfo");
      setActiveData(res.response);
      return JSON.stringify(res);
    },
    getWebsiteInfo: async ({company_website} : { company_website: string }) => {
      setActiveType("loading");
      setActiveData("Getting website info using Firecrawl...");
      const res = await fetch("/api/get-website-info", {
        method: "POST",
        body: JSON.stringify({ company_website }),
    }).then((res) => res.json());
      setActiveType("websiteInfo");
      setActiveData(res.response);
      return JSON.stringify(res);
    },
    sendEmail: async () => {
      setActiveType("loading");
      setActiveData("Sending email using resend...");
      const res = await fetch("/api/send-email", {
        method: "POST",
    }).then((res) => res.json());
      setActiveType("loading");
      setActiveData("Email sent successfully!");
      return JSON.stringify(res);
    }
  }

  async function startConversation() {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      alert("No permission");
      return;
    }
    const signedUrl = await getSignedUrl();
    const conversation = await Conversation.startSession({
      clientTools: clientTools,
      signedUrl: signedUrl,
      onConnect: () => {
        setIsConnected(true);
        setIsSpeaking(true);
      },
      onDisconnect: () => {
        setIsConnected(false);
        setIsSpeaking(false);
        setCustomerData(null); // Reset customer data when disconnected
      },
      onError: error => {
        console.log(error);
        alert("An error occurred during the conversation");
      },
      onModeChange: ({ mode }) => {
        setIsSpeaking(mode === "speaking");
      },
    });
    setConversation(conversation);
  }

  async function endConversation() {
    if (!conversation) {
      return;
    }
    await conversation.endSession();
    setConversation(null);
    setCustomerData(null); // Reset customer data when ending conversation
    setActiveType("idle");
    setActiveData(null);
  }

  return (
    <div className="flex items-start justify-center w-full gap-x-4 p-4">
      <Card className="w-80 h-[600px] p-4 rounded-3xl flex-shrink-0">
        <CardContent>
          <CardHeader>
            <CardTitle className="text-center">
              {isConnected
                ? isSpeaking
                  ? `StartupGPT is speaking`
                  : "StartupGPT is listening"
                : "Find you next Unicorn 🦄"}
            </CardTitle>
          </CardHeader>
          <div className="flex flex-col gap-y-4 text-center">
            <div
              className={cn(
                "orb my-16 mx-auto",
                isSpeaking ? "animate-orb" : conversation && "animate-orb-slow",
                isConnected ? "orb-active" : "orb-inactive"
              )}
            ></div>

            <Button
              variant="outline"
              className="rounded-full"
              size="lg"
              disabled={conversation !== null && isConnected}
              onClick={startConversation}
            >
              Start scouting
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              size="lg"
              disabled={conversation === null && !isConnected}
              onClick={endConversation}
            >
              End
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="w-3/4 h-[600px]">
        <div className="h-full overflow-y-auto no-scrollbar">
          <ActiveDetails type={activeType} data={activeData} />
        </div>
      </div>
    </div>
  );
}
