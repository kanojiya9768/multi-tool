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
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Upload,
  Download,
  Loader2,
  RotateCw,
  Sun,
  Maximize2,
} from "lucide-react";

const supportedConversions = {
  png: ["jpg", "webp", "gif", "bmp", "avif"],
  jpg: ["png", "webp", "gif", "bmp", "avif"],
  webp: ["png", "jpg", "gif", "bmp", "avif"],
  gif: ["png", "jpg", "webp", "bmp", "avif"],
  bmp: ["png", "jpg", "webp", "gif", "avif"],
  avif: ["png", "jpg", "webp", "gif", "bmp"],
  svg: ["png", "jpg", "webp"],
};

// Client-side image conversion function with adjustments
const convertImage = async (file, targetFormat, adjustments) => {
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
        canvas.width = img.width * (adjustments.scale / 100);
        canvas.height = img.height * (adjustments.scale / 100);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return reject("Canvas context not available");
        }

        // Apply rotation
        if (adjustments.rotation !== 0) {
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((adjustments.rotation * Math.PI) / 180);
          ctx.translate(-canvas.width / 2, -canvas.height / 2);
        }

        // Draw image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Apply brightness/contrast
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          // Brightness
          data[i] = Math.min(255, data[i] * (1 + adjustments.brightness / 100)); // red
          data[i + 1] = Math.min(
            255,
            data[i + 1] * (1 + adjustments.brightness / 100)
          ); // green
          data[i + 2] = Math.min(
            255,
            data[i + 2] * (1 + adjustments.brightness / 100)
          ); // blue

          // Contrast
          const factor =
            (259 * (adjustments.contrast + 255)) /
            (255 * (259 - adjustments.contrast));
          data[i] = factor * (data[i] - 128) + 128; // red
          data[i + 1] = factor * (data[i + 1] - 128) + 128; // green
          data[i + 2] = factor * (data[i + 2] - 128) + 128; // blue
        }

        ctx.putImageData(imageData, 0, 0);

        // For AVIF and WebP, use higher quality
        const quality = ["avif", "webp"].includes(targetFormat)
          ? 0.95
          : adjustments.quality / 100;

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

export default function AdvancedImageFileConverter() {
  const [files, setFiles] = useState([]);
  const [targetFormat, setTargetFormat] = useState("");
  const [converting, setConverting] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [preview, setPreview] = useState("");

  // Image adjustment states
  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    contrast: 0,
    rotation: 0,
    scale: 100,
    quality: 90,
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const validFiles = acceptedFiles.filter((file) => {
        const extension = file.name.split(".").pop()?.toLowerCase() || "";
        return Object.keys(supportedConversions).includes(extension);
      });

      if (validFiles.length > 0) {
        setFiles(validFiles);
        setTargetFormat("");
        // Show preview of first file
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(validFiles[0]);
      } else {
        toast({
          variant: "destructive",
          title: "Unsupported file format",
          description: "Please upload supported image formats.",
        });
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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
    maxFiles: 1,
    multiple: false,
  });

  const handleConvert = async (type) => {
    if (files.length === 0 || !targetFormat) return;

    setConverting(true);
    setCurrentFileIndex(0);

    try {
      for (let i = 0; i < files.length; i++) {
        setCurrentFileIndex(i);
        const file = files[i];
        const blob = await convertImage(file, targetFormat, adjustments);

        if (type == "preview") {
          // Create download link
          const url = window.URL.createObjectURL(blob);
          setPreview(url);
        } else {
          // Create download link
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `converted_${i + 1}.${targetFormat}`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      }

      toast({
        title: `${type == "preview" ? "Preview" : "Conversion"} successful`,
        description: `Converted ${files.length} file${
          files.length > 1 ? "s" : ""
        }.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Conversion failed",
        description:
          error instanceof Error
            ? error.message
            : `There was an error ${
                type == "preview" ? "previewing" : "converting"
              } your files.`,
      });
    } finally {
      setConverting(false);
      setCurrentFileIndex(0);
    }
  };

  const fileExtension = files[0]?.name.split(".").pop()?.toLowerCase();
  const availableFormats = fileExtension
    ? supportedConversions[fileExtension]
    : [];

  const progress =
    files.length > 0 ? ((currentFileIndex + 1) / files.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8">
            Advanced Image Converter
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            Convert and enhance your images with advanced controls. Support for
            PNG, JPG, WebP, GIF, BMP, AVIF, and SVG.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                  transition-colors duration-200
                  ${
                    isDragActive
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }
                `}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                {isDragActive ? (
                  <p className="text-primary">Drop your images here</p>
                ) : (
                  <p className="text-muted-foreground">
                    Drag & drop images here, or click to select
                  </p>
                )}
              </div>

              {files.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Selected Files:</h3>
                  {files.map((file, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                  ))}
                </div>
              )}

              {preview && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Preview:</h3>
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full rounded-lg"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-medium mb-2">Target Format</h3>
                <Select onValueChange={setTargetFormat} value={targetFormat}>
                  <SelectTrigger>
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
              </div>

              <div>
                <h3 className="font-medium mb-2">Image Adjustments</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm flex items-center gap-2">
                      <Sun className="w-4 h-4" /> Brightness
                    </label>
                    <Slider
                      value={[adjustments.brightness]}
                      onValueChange={([value]) =>
                        setAdjustments((prev) => ({
                          ...prev,
                          brightness: value,
                        }))
                      }
                      min={-100}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm">Contrast</label>
                    <Slider
                      value={[adjustments.contrast]}
                      onValueChange={([value]) =>
                        setAdjustments((prev) => ({ ...prev, contrast: value }))
                      }
                      min={-100}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm flex items-center gap-2">
                      <RotateCw className="w-4 h-4" /> Rotation (degrees)
                    </label>
                    <Slider
                      value={[adjustments.rotation]}
                      onValueChange={([value]) =>
                        setAdjustments((prev) => ({ ...prev, rotation: value }))
                      }
                      min={0}
                      max={360}
                      step={90}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm flex items-center gap-2">
                      <Maximize2 className="w-4 h-4" /> Scale (%)
                    </label>
                    <Slider
                      value={[adjustments.scale]}
                      onValueChange={([value]) =>
                        setAdjustments((prev) => ({ ...prev, scale: value }))
                      }
                      min={10}
                      max={200}
                      step={10}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm">Quality (%)</label>
                    <Slider
                      value={[adjustments.quality]}
                      onValueChange={([value]) =>
                        setAdjustments((prev) => ({ ...prev, quality: value }))
                      }
                      min={10}
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleConvert("preview")}
                disabled={!targetFormat || converting || files.length === 0}
                className="w-full"
              >
                {converting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Previewing ({currentFileIndex + 1}/{files.length})
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Preview{" "}
                    {files.length > 1 ? `${files.length} Files` : "File"}
                  </>
                )}
              </Button>

              <Button
                onClick={handleConvert}
                disabled={!targetFormat || converting || files.length === 0}
                className="w-full"
              >
                {converting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Converting ({currentFileIndex + 1}/{files.length})
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Convert{" "}
                    {files.length > 1 ? `${files.length} Files` : "File"}
                  </>
                )}
              </Button>

              {converting && (
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

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
