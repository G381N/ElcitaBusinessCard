"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  generateSharingLinks,
  type SharingLinksInput,
  type SharingLinksOutput,
} from "@/ai/flows/personalized-sharing-links";
import { Copy, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "./ui/skeleton";
import { Input } from "./ui/input";

interface ShareDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  cardData: SharingLinksInput;
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


export function ShareDialog({ isOpen, onOpenChange, cardData }: ShareDialogProps) {
  const [links, setLinks] = useState<SharingLinksOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      generateSharingLinks(cardData)
        .then(setLinks)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen, cardData]);

  const handleCopy = () => {
    if (links?.copyLink) {
      navigator.clipboard.writeText(links.copyLink);
      toast({
        title: "Link Copied!",
        description: "The business card link has been copied to your clipboard.",
      });
      onOpenChange(false);
    }
  };

  const shareOptions = [
    { name: "WhatsApp", icon: <WhatsAppIcon />, href: links?.whatsapp, enabled: !!links?.whatsapp, color: "text-green-500" },
    { name: "SMS", icon: <SmsIcon />, href: links?.sms, enabled: !!links?.sms, color: "text-blue-500" },
    { name: "LinkedIn", icon: <Linkedin className="h-full w-full" />, href: links?.linkedin, enabled: !!links?.linkedin, color: "text-sky-600" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Share Card</DialogTitle>
          <DialogDescription>
            Share this digital business card with your network.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <Skeleton className="h-14 w-14 rounded-xl" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))
            ) : (
              shareOptions.map((option) =>
                option.enabled ? (
                  <a
                    key={option.name}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center space-y-2 group"
                  >
                    <div className={`p-4 rounded-xl bg-secondary group-hover:bg-accent transition-colors ${option.color}`}>
                        <div className="h-6 w-6">{option.icon}</div>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {option.name}
                    </span>
                  </a>
                ) : null
              )
            )}
          </div>

          <div className="relative flex items-center pt-4">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink mx-4 text-xs uppercase text-muted-foreground">Or copy link</span>
              <div className="flex-grow border-t border-border"></div>
          </div>

          <div className="flex w-full items-center space-x-2">
            <Input
              id="copy-link"
              value={links?.copyLink || "Loading..."}
              readOnly
              className="flex-1"
            />
            <Button
              type="button"
              size="icon"
              onClick={handleCopy}
              disabled={!links?.copyLink}
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy Link</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
