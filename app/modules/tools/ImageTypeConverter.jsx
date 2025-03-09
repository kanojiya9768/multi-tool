"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileType, Download, Loader2 } from "lucide-react";

const supportedConversions = {
  png: ["jpg", "webp", "gif", "bmp", "avif"],
  jpg: ["png", "webp", "gif", "bmp", "avif"],
  webp: ["png", "jpg", "gif", "bmp", "avif"],
  gif: ["png", "jpg", "webp", "bmp", "avif"],
  bmp: ["png", "jpg", "webp", "gif", "avif"],
  avif: ["png", "jpg", "webp", "gif", "bmp"],
  svg: ["png", "jpg", "webp"],
};

// Client-side image conversion function
const convertImage = async (file, targetFormat) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      if (!e.target?.result) {
        return reject("Failed to read file.");
      }
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return reject("Canvas context not available");
        }
        ctx.drawImage(img, 0, 0);

        // For AVIF and WebP, use higher quality
        const quality = ["avif", "webp"].includes(targetFormat) ? 0.95 : 0.9;

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject("Conversion failed");
          },
          `image/${targetFormat}`,
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export default function ImageFileConverter() {
  const [file, setFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState("");
  const [converting, setConverting] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const extension = file.name.split(".").pop()?.toLowerCase() || "";

      if (Object.keys(supportedConversions).includes(extension)) {
        setFile(file);
        setTargetFormat("");
      } else {
        toast({
          variant: "destructive",
          title: "Unsupported file format",
          description: "Please upload a supported image format.",
        });
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
        ".gif",
        ".bmp",
        ".avif",
        ".svg",
      ],
    },
  });

  const handleConvert = async () => {
    if (!file || !targetFormat) return;

    setConverting(true);
    try {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const blob = await convertImage(file, targetFormat);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `converted.${targetFormat}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Conversion successful",
        description: "Your file has been converted and downloaded.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Conversion failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error converting your file. Please try again.",
      });
    } finally {
      setConverting(false);
    }
  };

  const fileExtension = file?.name.split(".").pop()?.toLowerCase();
  const availableFormats = fileExtension
    ? supportedConversions[fileExtension]
    : [];

  return (
    <div className="min-h-full pb-20 bg-gradient-to-br from-background to-background/95 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8">
            Image Converter
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            Convert your images between different formats with ease. Support for
            PNG, JPG, WebP, GIF, BMP, AVIF, and SVG.
          </p>
        </motion.div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                transition-colors duration-200
                ${
                  isDragActive ? "border-primary bg-primary/5" : "border-border"
                }
              `}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              {isDragActive ? (
                <p className="text-primary">Drop your image here</p>
              ) : (
                <p className="text-muted-foreground">
                  Drag & drop an image here, or click to select
                </p>
              )}
            </div>

            <AnimatePresence>
              {file && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 space-y-4"
                >
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <FileType className="w-8 h-8 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Select
                      onValueChange={setTargetFormat}
                      value={targetFormat}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select target format" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableFormats.map((format) => (
                          <SelectItem key={format} value={format}>
                            Convert to {format.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={handleConvert}
                      disabled={!targetFormat || converting}
                      className="min-w-[120px]"
                    >
                      {converting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Convert
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <p>Supported formats:</p>
          <p>PNG ↔ JPG ↔ WebP ↔ GIF ↔ BMP ↔ AVIF ↔ SVG</p>
        </motion.div>
      </div>
    </div>
  );
}
