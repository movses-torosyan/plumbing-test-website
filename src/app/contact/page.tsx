import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

type ContactPageProps = {
  searchParams: Promise<{ source?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  return <main><Navbar /><ContactSection showInquire={params.source === "inquire"} /><Footer /></main>;
}