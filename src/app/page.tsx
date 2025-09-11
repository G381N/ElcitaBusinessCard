import { BusinessCard } from "@/components/business-card";
import { Building } from "lucide-react";
import { AnimatedBackground } from "@/components/animated-background";

export default function Home() {
  // All personal data is dynamically sourced from environment variables.
  // Create a .env.local file in the root of your project to customize these values.
  const cardData = {
    name: process.env.NEXT_PUBLIC_PERSON_NAME || "Your Name",
    role: process.env.NEXT_PUBLIC_PERSON_ROLE || "Your Role",
    phone: process.env.NEXT_PUBLIC_PERSON_PHONE || "1234567890",
    email: process.env.NEXT_PUBLIC_PERSON_EMAIL || "your.email@example.com",
    office: process.env.NEXT_PUBLIC_PERSON_OFFICE || "Your Office Address",
    photoUrl: process.env.NEXT_PUBLIC_PERSON_PHOTO_URL || "https://picsum.photos/seed/placeholder/400/400",
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:9002",
    company: process.env.NEXT_PUBLIC_COMPANY_NAME || "ELCITA Ltd",
    socials: {
      facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
      linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
      youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE,
      instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
    },
  };

  return (
    <main className="relative flex min-h-dvh w-full flex-col items-center justify-center bg-background p-4 font-body overflow-hidden" style={{ perspective: "1000px" }}>
      <AnimatedBackground />
      <div className="z-10 w-full max-w-md mx-auto mb-8">
        <div className="flex items-center justify-center gap-3">
            <Building className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">{cardData.company}</h1>
        </div>
      </div>
      <div className="z-10 w-full">
        <BusinessCard {...cardData} />
      </div>
    </main>
  );
}
