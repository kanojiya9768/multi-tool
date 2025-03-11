"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import jsQR from "jsqr";

export default function QRReaderComponent() {
  const [imageSrc, setImageSrc] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      setImageSrc(result);
      setQrCodeData(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const scanQRCode = () => {
    if (!imageSrc) return;

    setIsScanning(true);
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setQrCodeData(code.data);
      } else {
        setError("No QR code found in the image.");
      }
      setIsScanning(false);
    };
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      setImageSrc(result);
      setQrCodeData(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 p-8 grid place-items-center">
      <Card className="w-full max-w-2xl mx-auto mt-8 p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold primary-text-gradient ">QR Code Reader</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-4">
            <Label htmlFor="image-upload">Upload an image</Label>
            <motion.div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-4 flex items-center justify-center ${
                isDragActive ? "bg-blue-50" : "bg-gray-50"
              }`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <input
                {...getInputProps()}
                id="image-upload"
                className="hidden"
              />
              {isDragActive ? (
                <p className="text-blue-500">Drop the image here...</p>
              ) : (
                <p className="text-gray-500">
                  Drag & drop an image here, or{" "}
                  <Button variant="link" className="p-0 text-blue-500">
                    choose a file
                  </Button>
                </p>
              )}
            </motion.div>
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>
          {imageSrc && (
            <div className="flex flex-col items-center space-y-4">
              <motion.img
                src={imageSrc}
                alt="Uploaded"
                className="max-w-full h-auto rounded-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              />
              <Button
                onClick={scanQRCode}
                variant="secondary"
                disabled={isScanning}
              >
                <Upload className="mr-2 h-4 w-4" /> Scan QR Code
              </Button>
              {isScanning && (
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-gray-500">Scanning...</p>
                </motion.div>
              )}
            </div>
          )}
          {qrCodeData && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="text-lg font-bold">QR Code Data</CardTitle>
              <p className="text-muted-foreground mt-2">{qrCodeData}</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
