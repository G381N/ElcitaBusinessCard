import { BusinessCard } from "@/components/business-card";
import { Building } from "lucide-react";
import { AnimatedBackground } from "@/components/animated-background";
import { LanguageSwitcher } from "@/components/language-switcher";
import Image from "next/image";

export default function Home() {
  // All personal data is dynamically sourced from environment variables.
  // Create a .env.local file in the root of your project to customize these values.
  const cardData = {
    name: process.env.NEXT_PUBLIC_PERSON_NAME || "Your Name",
    role: process.env.NEXT_PUBLIC_PERSON_ROLE || "Your Role",
    phone: process.env.NEXT_PUBLIC_PERSON_PHONE || "1234567890",
    email: process.env.NEXT_PUBLIC_PERSON_EMAIL || "your.email@example.com",
    office: process.env.NEXT_PUBLIC_PERSON_OFFICE || "Your Office Address",
    officeMapLink: process.env.NEXT_PUBLIC_PERSON_OFFICE_MAP_LINK || "https://maps.app.goo.gl/dDtT2t1qJqzbT3a38",
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
    <main className="relative flex min-h-dvh w-full flex-col items-start justify-start md:items-center md:justify-center bg-background p-3 md:p-4 font-body overflow-hidden pt-8 md:pt-4">
      <AnimatedBackground />
      <div className="z-10 w-full max-w-md mx-auto mb-4 md:mb-6 mt-2 md:mt-0">
        <div className="flex items-center justify-center gap-3 md:gap-4 pt-2 md:pt-0">
            <div className="flex-shrink-0 relative h-16 w-16 md:h-24 md:w-24">
              <Image
                id="company-logo-en"
                src="/Elcita_logo.png"
                alt="Elcita Logo"
                width={64}
                height={64}
                className="h-12 w-12 md:h-16 md:w-16 object-contain absolute inset-2 md:inset-4"
              />
              <Image
                id="company-logo-kn"
                src="/ELCITA-Kannada logo.png"
                alt="Elcita Logo Kannada"
                width={120}
                height={120}
                className="h-16 w-16 md:h-24 md:w-24 object-contain absolute inset-0 hidden"
              />
            </div>
            <div className="text-left">
              <p id="company-name-kn" className="font-bold text-foreground text-xs md:text-sm leading-tight"></p>
              <p id="company-name-en" className="font-bold text-foreground text-xs md:text-sm leading-tight"></p>
            </div>
        </div>
      </div>
      <div className="z-10 w-full">
        <BusinessCard {...cardData} />
      </div>
    </main>
  );
}
