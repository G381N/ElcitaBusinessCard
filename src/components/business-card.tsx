"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(mouseY, [-150, 150], [-10, 10]);
  const rotateY = useTransform(mouseX, [-200, 200], [10, -10]);


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
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        <Card 
            className="w-full max-w-md mx-auto rounded-3xl shadow-lg overflow-hidden border-border bg-card/80 backdrop-blur-sm"
            style={{
                transform: "translateZ(8px)",
            }}
        >
          <CardContent className="p-0">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Image
                  src={photoUrl}
                  alt={`Photo of ${name}`}
                  width={144}
                  height={144}
                  className="rounded-full border-4 border-white shadow-lg dark:border-slate-800"
                  data-ai-hint="portrait person"
                />
                 <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQrModalOpen(true)}
                  className="absolute bottom-0 right-0 bg-white dark:bg-slate-800 rounded-full p-2 cursor-pointer shadow-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  title="Show QR Code"
                >
                  <QrCode className="h-6 w-6 text-primary" />
                </motion.div>
              </div>
              <h1 className="text-3xl font-bold text-foreground">{name}</h1>
              <p className="text-lg text-primary font-medium">{role}</p>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                  <Button asChild size="lg" className="w-full rounded-xl">
                    <a href="/api/vcard">
                      <UserPlus className="mr-2 h-5 w-5" />
                      Add to Contacts
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                  <Button
                    onClick={() => setShareModalOpen(true)}
                    variant="outline"
                    size="lg"
                    className="w-full rounded-xl"
                  >
                    <Share2 className="mr-2 h-5 w-5" />
                    Share Card
                  </Button>
                </motion.div>
              </div>
              
              <Separator />

              <div className="space-y-4 text-sm">
                <ContactRow href={`tel:${phone}`} icon={<Phone />} label="Phone" value={`+${phone.slice(0, 2)} ${phone.slice(2)}`} />
                <ContactRow href={`mailto:${email}`} icon={<Mail />} label="Email" value={email} />
                <ContactRow href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office)}`} icon={<MapPin />} label="Office" value={office} isLink={true} />
              </div>
              
              <Separator />
              
              <div className="flex justify-center items-center gap-2">
                {socials.facebook && <SocialIcon href={socials.facebook} icon={<Facebook className="h-5 w-5"/>} name="Facebook" />}
                {socials.linkedin && <SocialIcon href={socials.linkedin} icon={<Linkedin className="h-5 w-5"/>} name="LinkedIn" />}
                {socials.youtube && <SocialIcon href={socials.youtube} icon={<Youtube className="h-5 w-5"/>} name="YouTube" />}
                {socials.instagram && <SocialIcon href={socials.instagram} icon={<Instagram className="h-5 w-5"/>} name="Instagram" />}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <QRCodeModal isOpen={isQrModalOpen} onOpenChange={setQrModalOpen} url={appUrl} />
      <ShareDialog isOpen={isShareModalOpen} onOpenChange={setShareModalOpen} cardData={cardDataForSharing} />
    </>
  );
}

const ContactRow = ({ href, icon, label, value, isLink = false }: { href: string; icon: React.ReactNode; label: string; value: string; isLink?: boolean }) => (
    <motion.a 
        href={href} 
        target={isLink ? "_blank" : "_self"} 
        rel={isLink ? "noopener noreferrer" : ""} 
        className="flex items-center gap-4 group"
        whileHover={{ x: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="bg-secondary p-3 rounded-full group-hover:bg-accent transition-colors">
        <div className="h-5 w-5 text-primary">{icon}</div>
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground group-hover:underline">{value}</span>
      </div>
    </motion.a>
  );


  const SocialIcon = ({ href, icon, name }: { href: string; icon: React.ReactNode; name: string }) => (
    <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
      <Button asChild variant="ghost" size="icon" className="rounded-full h-12 w-12 text-muted-foreground hover:text-primary hover:bg-accent">
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit our ${name} page`}>
          {icon}
        </a>
      </Button>
    </motion.div>
  );
