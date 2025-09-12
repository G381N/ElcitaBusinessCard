"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
import { LanguageSwitcher } from "@/components/language-switcher";

interface BusinessCardProps {
  name: string;
  role: string;
  phone: string;
  email: string;
  office: string;
  officeMapLink: string;
  photoUrl: string;
  logoUrl?: string;
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
  officeMapLink,
  photoUrl,
  logoUrl,
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
      <Card className="w-full max-w-md mx-auto rounded-3xl shadow-lg overflow-hidden border-border bg-card/80 backdrop-blur-sm relative">
        <CardContent className="p-0">
          {/* Language switcher - positioned better for all screen sizes */}
          <div className="absolute top-2 right-2 md:top-3 md:right-3 z-20">
            <LanguageSwitcher />
          </div>
          
          <div className="pt-6 px-6 pb-6 md:pt-8 md:px-8 md:pb-8 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <Image
                src={logoUrl || photoUrl}
                alt={`Photo of ${name}`}
                width={144}
                height={144}
                className="rounded-full border-4 border-white shadow-lg dark:border-slate-800 w-32 h-32 md:w-36 md:h-36 object-cover"
                data-ai-hint="portrait person"
              />
               <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setQrModalOpen(true)}
                className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-white dark:bg-slate-800 rounded-full p-2 cursor-pointer shadow-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <QrCode className="h-3 w-3 md:h-4 md:w-4 text-primary" />
              </motion.div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{name}</h1>
            <p className="text-base md:text-lg text-primary font-medium" data-translate-key="role">{role}</p>
          </div>

          <div className="px-6 pb-6 md:px-8 md:pb-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                <Button asChild size="lg" className="w-full rounded-xl h-12 text-sm md:text-base">
                  <a href="/api/vcard">
                    <UserPlus className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    <span data-translate-key="addToContacts">Add to Contacts</span>
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                <Button
                  onClick={() => setShareModalOpen(true)}
                  variant="outline"
                  size="lg"
                  className="w-full rounded-xl h-12 text-sm md:text-base"
                >
                  <Share2 className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  <span data-translate-key="shareCard">Share Card</span>
                </Button>
              </motion.div>
            </div>
            
            <Separator />

            <div className="space-y-4 text-sm">
              <ContactRow href={`tel:${phone}`} icon={<Phone />} label="Phone" value={`+${phone.slice(0, 2)} ${phone.slice(2)}`} translateKey="phone" />
              <ContactRow href={`mailto:${email}`} icon={<Mail />} label="Email" value={email} translateKey="email" />
              <ContactRow href={officeMapLink} icon={<MapPin />} label="Office" value={office} isLink={true} translateKey="office" />
            </div>
            
            <Separator />
            
            <div className="flex justify-center items-center gap-1 md:gap-2 flex-wrap">
              {socials.facebook && <SocialIcon href={socials.facebook} icon={<Facebook className="h-4 w-4 md:h-5 md:w-5"/>} name="Facebook" />}
              {socials.linkedin && <SocialIcon href={socials.linkedin} icon={<Linkedin className="h-4 w-4 md:h-5 md:w-5"/>} name="LinkedIn" />}
              {socials.youtube && <SocialIcon href={socials.youtube} icon={<Youtube className="h-4 w-4 md:h-5 md:w-5"/>} name="YouTube" />}
              {socials.instagram && <SocialIcon href={socials.instagram} icon={<Instagram className="h-4 w-4 md:h-5 md:w-5"/>} name="Instagram" />}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <QRCodeModal isOpen={isQrModalOpen} onOpenChange={setQrModalOpen} url={appUrl} />
      <ShareDialog isOpen={isShareModalOpen} onOpenChange={setShareModalOpen} cardData={cardDataForSharing} />
    </>
  );
}

const ContactRow = ({ href, icon, label, value, isLink = false, translateKey }: { href: string; icon: React.ReactNode; label: string; value: string; isLink?: boolean; translateKey?: string }) => (
    <motion.a 
        href={href} 
        target={isLink ? "_blank" : "_self"} 
        rel={isLink ? "noopener noreferrer" : ""} 
        className="flex items-center gap-3 md:gap-4 group rounded-lg p-2 -m-2 hover:bg-accent/50 transition-colors duration-200"
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="bg-secondary p-2 md:p-3 rounded-full group-hover:bg-accent transition-colors duration-200 flex-shrink-0">
        <div className="h-4 w-4 md:h-5 md:w-5 text-primary">{icon}</div>
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="font-medium text-muted-foreground text-xs md:text-sm" data-translate-key={translateKey || ''}>{label}</span>
        <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 truncate text-sm md:text-base">{value}</span>
      </div>
    </motion.a>
  );


  const SocialIcon = ({ href, icon, name }: { href: string; icon: React.ReactNode; name: string }) => (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="transition-transform">
      <Button asChild variant="ghost" size="icon" className="rounded-full h-10 w-10 md:h-12 md:w-12 text-muted-foreground hover:text-primary hover:bg-accent transition-all duration-200">
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit our ${name} page`}>
          {icon}
        </a>
      </Button>
    </motion.div>
  );
