"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Facebook,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
  UserPlus,
  Share2,
  QrCode,
  Instagram,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QRCodeModal } from "@/components/qr-code-modal";
import { ShareDialog } from "@/components/share-dialog";

interface BusinessCardProps {
  name: string;
  role: string;
  phone: string;
  email: string;
  office: string;
  photoUrl: string;
  appUrl: string;
  company: string;
  socials: {
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
  };
}

export function BusinessCard({
  name,
  role,
  phone,
  email,
  office,
  photoUrl,
  appUrl,
  company,
  socials,
}: BusinessCardProps) {
  const [isQrModalOpen, setQrModalOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const cardDataForSharing = {
    name,
    designation: role,
    cardUrl: appUrl,
    company: company,
    socials: {
      instagram: socials.instagram,
    }
  };

  return (
    <>
      <Card className="w-full max-w-sm rounded-2xl shadow-xl overflow-hidden border-2 border-primary/10">
        <CardContent className="p-0">
          <div className="bg-gradient-to-br from-green-100 via-white to-green-50 p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <Image
                src={photoUrl}
                alt={`Photo of ${name}`}
                width={128}
                height={128}
                className="rounded-full border-4 border-white shadow-lg"
                data-ai-hint="portrait person"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
            <p className="text-base text-primary font-medium">{role}</p>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button asChild className="w-full bg-gradient-to-r from-[#4ac94a] to-[#007a3d] text-white hover:text-white hover:shadow-lg transition-shadow">
                <a href="/api/vcard">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add to Contacts
                </a>
              </Button>
              <Button
                onClick={() => setShareModalOpen(true)}
                variant="outline"
                className="w-full"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            
            <Separator />

            <div className="space-y-4 text-sm">
              <a href={`tel:${phone}`} className="flex items-center gap-4 group">
                <div className="bg-secondary p-3 rounded-full group-hover:bg-accent transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-muted-foreground">Phone</span>
                  <span className="font-semibold text-foreground group-hover:underline">{`+${phone.slice(0, 2)} ${phone.slice(2)}`}</span>
                </div>
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-4 group">
                <div className="bg-secondary p-3 rounded-full group-hover:bg-accent transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                    <span className="font-medium text-muted-foreground">Email</span>
                    <span className="font-semibold text-foreground group-hover:underline">{email}</span>
                </div>
              </a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="bg-secondary p-3 rounded-full group-hover:bg-accent transition-colors">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                    <span className="font-medium text-muted-foreground">Office</span>
                    <span className="font-semibold text-foreground group-hover:underline">{office}</span>
                </div>
              </a>
            </div>
            
            <Separator />
            
            <div className="flex justify-center items-center gap-4">
              {socials.facebook && <SocialIcon href={socials.facebook} icon={<Facebook />} name="Facebook" />}
              {socials.linkedin && <SocialIcon href={socials.linkedin} icon={<Linkedin />} name="LinkedIn" />}
              {socials.youtube && <SocialIcon href={socials.youtube} icon={<Youtube />} name="YouTube" />}
              {socials.instagram && <SocialIcon href={socials.instagram} icon={<Instagram />} name="Instagram" />}
              <Button onClick={() => setQrModalOpen(true)} variant="ghost" size="icon" className="rounded-full h-12 w-12 text-primary hover:bg-accent">
                <QrCode className="h-6 w-6" />
                <span className="sr-only">Show QR Code</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <QRCodeModal isOpen={isQrModalOpen} onOpenChange={setQrModalOpen} url={appUrl} />
      <ShareDialog isOpen={isShareModalOpen} onOpenChange={setShareModalOpen} cardData={cardDataForSharing} />
    </>
  );
}

const SocialIcon = ({ href, icon, name }: { href: string; icon: React.ReactNode; name: string }) => (
  <Button asChild variant="ghost" size="icon" className="rounded-full h-12 w-12 text-primary/80 hover:text-primary hover:bg-accent">
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit our ${name} page`}>
      {icon}
    </a>
  </Button>
);
