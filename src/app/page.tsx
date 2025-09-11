import { BusinessCard } from "@/components/business-card";

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
    company: process.env.NEXT_PUBLIC_COMPANY_NAME || "Your Company",
    socials: {
      facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
      linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
      youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE,
    },
  };

  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-muted/50 p-4 font-body">
      <BusinessCard {...cardData} />
    </main>
  );
}
