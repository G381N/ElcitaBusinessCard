"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface QRCodeModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  url: string;
}

export function QRCodeModal({ isOpen, onOpenChange, url }: QRCodeModalProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  useEffect(() => {
    if (isOpen && url) {
      QRCode.toDataURL(url, {
        errorCorrectionLevel: "H",
        margin: 2,
        width: 300,
        color: {
          dark: "#007a3d",
          light: "#FFFFFF",
        }
      })
        .then(setQrCodeDataUrl)
        .catch(console.error);
    }
  }, [isOpen, url]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle>Scan to Share</DialogTitle>
          <DialogDescription>
            Point your camera at this QR code to open the digital business card.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center p-4 bg-white rounded-md">
          {qrCodeDataUrl ? (
            <Image
              src={qrCodeDataUrl}
              alt="QR Code for business card"
              width={250}
              height={250}
              className="rounded-lg"
            />
          ) : (
            <Skeleton className="w-[250px] h-[250px] rounded-lg" />
          )}
        </div>
        <DialogFooter>
          <Button asChild className="w-full bg-gradient-to-r from-[#4ac94a] to-[#007a3d] text-white hover:text-white">
            <a href={qrCodeDataUrl} download="elcita-card-qr.png">
              <Download className="mr-2 h-4 w-4" />
              Download QR
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
