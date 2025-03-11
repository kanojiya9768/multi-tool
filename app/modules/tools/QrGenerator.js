"use client";
import { useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [size, setSize] = useState(256);
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

  const generateQRCode = async () => {
    if (!text) {
      alert("Please enter some text to generate a QR code.");
      return;
    }
    try {
      const url = await QRCode.toDataURL(text, {
        width: size,
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) {
      alert("Please generate a QR code first.");
      return;
    }
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 p-8 grid place-items-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="primary-text-gradient">
            QR Code Generator
          </CardTitle>
          <CardDescription>
            Generate QR codes with custom size and colors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="text" className="block mb-2">
              Enter Text
            </Label>
            <Input
              id="text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="size" className="block mb-2">
              QR Code Size (px)
            </Label>
            <Input
              id="size"
              type="number"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="foregroundColor" className="block mb-2">
              Foreground Color
            </Label>
            <Input
              id="foregroundColor"
              type="color"
              value={foregroundColor}
              onChange={(e) => setForegroundColor(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="backgroundColor" className="block mb-2">
              Background Color
            </Label>
            <Input
              id="backgroundColor"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            onClick={generateQRCode}
            className="w-full mb-4 primary-gradient"
          >
            Generate QR Code
          </Button>
          {qrCodeUrl && (
            <div className="mb-4">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
          {qrCodeUrl && (
            <Button onClick={downloadQRCode} className="w-full mb-4">
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
