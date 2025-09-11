"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";

interface ShareDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  cardData: {
    name: string;
    designation: string;
    cardUrl: string;
    company: string;
  };
}

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-full w-full"
  >
    <path d="M16.6 14.2c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.7-.8.9-.1.1-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.2.4-.4.1-.1.2-.2.3-.4.1-.2.1-.3 0-.4-.1-.1-1.3-.7-1.4-.8-.1-.1-.3-.1-.4 0l-.5.3c-.2.1-.4.3-.5.5-.1.2-.2.5-.2.8s.2.9.4 1.2c.2.2.9 1.4 2.1 2.9.2.2.4.4.6.5.2.2.4.2.6.3.2.1.4.1.6.1.2 0 .4 0 .6-.1.2-.1.4-.2.6-.4.2-.2.3-.4.4-.6.1-.2.1-.4 0-.5-.1-.1-.2-.2-.3-.3zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
  </svg>
);

const SmsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-full w-full"
  >
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
  </svg>
);

type SharePlatform = 'whatsapp' | 'sms' | 'linkedin' | null;

export function ShareDialog({ isOpen, onOpenChange, cardData }: ShareDialogProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<SharePlatform>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();

  const shareMessage = `${cardData.company} - ${cardData.designation} - ${cardData.name} - ${cardData.cardUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cardData.cardUrl)}`;

  const handleShare = () => {
    if (selectedPlatform === 'whatsapp') {
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(shareMessage)}`, '_blank');
    } else if (selectedPlatform === 'sms') {
      window.open(`sms:${phoneNumber}?body=${encodeURIComponent(shareMessage)}`, '_blank');
    }
    reset();
  };

  const reset = () => {
    onOpenChange(false);
    setSelectedPlatform(null);
    setPhoneNumber("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cardData.cardUrl);
    toast({
      title: "Link Copied!",
      description: "The business card link has been copied to your clipboard.",
    });
    onOpenChange(false);
  };

  const shareOptions = [
    { name: "WhatsApp", icon: <WhatsAppIcon />, onClick: () => setSelectedPlatform('whatsapp'), color: "text-green-500" },
    { name: "SMS", icon: <SmsIcon />, onClick: () => setSelectedPlatform('sms'), color: "text-blue-500" },
    { name: "LinkedIn", icon: <Linkedin className="h-full w-full" />, href: linkedinUrl, color: "text-sky-600" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={reset}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Share Card</DialogTitle>
          <DialogDescription>
            {selectedPlatform ? 'Enter a phone number to share with.' : 'Share this digital business card with your network.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {!selectedPlatform ? (
            <>
              <div className="grid grid-cols-3 gap-4 text-center">
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.href}
                    onClick={option.onClick}
                    target={option.href ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center space-y-2 group cursor-pointer"
                  >
                    <div className={`p-4 rounded-xl bg-secondary group-hover:bg-accent transition-colors ${option.color}`}>
                        <div className="h-6 w-6">{option.icon}</div>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {option.name}
                    </span>
                  </a>
                ))}
              </div>

              <div className="relative flex items-center pt-4">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="flex-shrink mx-4 text-xs uppercase text-muted-foreground">Or copy link</span>
                  <div className="flex-grow border-t border-border"></div>
              </div>

              <div className="flex w-full items-center space-x-2">
                <Input
                  id="copy-link"
                  value={cardData.cardUrl}
                  readOnly
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={handleCopy}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy Link</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => setSelectedPlatform(null)}>Cancel</Button>
                <Button onClick={handleShare} disabled={!phoneNumber}>Share</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
