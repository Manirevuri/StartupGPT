import CompanyBlock from "./companies-card";
import WebsiteInfo from "./website-info";
import CompanyDetails from "./company-info";
import LoadingCard from "./loading-card";
import { StartupGPTExamples } from "./prompt";

interface ActiveDetailsProps {
    type: "idle" | "queryInfo" | "websiteInfo" | "companyInfo" | "emailAck" | "loading" | null;
    data: any;
  }
export default function ActiveDetails({ type, data }: ActiveDetailsProps) {
    if (!data) {
        return <StartupGPTExamples />;
    }
    switch (type) {
        case 'loading':
            return <LoadingCard message={data}/>;
        case 'idle':
            return <StartupGPTExamples />;
        case 'queryInfo':
            return <CompanyBlock data={data} />;
        case 'websiteInfo':
            return <WebsiteInfo data={data} />;
        case 'companyInfo':
            return <CompanyDetails data={data} />;
        case 'emailAck':
            return <LoadingCard message="Email Sent Successfully"/>;
        default:
          return null;
      }
}