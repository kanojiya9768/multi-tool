"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Eye, FilePlus, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import jsPDF from "jspdf";

export function ImagesToPDFConverter() {
  const [images, setImages] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [customMargins, setCustomMargins] = useState(10);
  const [orientation, setOrientation] = useState("portrait");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const constraints = { video: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing camera: ", err));
  }, []);

  const handleImageSelection = (event) => {
    const files = event.target.files;
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "captured-image.png", {
              type: "image/png",
            });
            setImages((prevImages) => [...prevImages, file]);
          }
        });
      }
    }
  };

  const compressAndResizeImage = (image, quality = 0.85) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(image);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxWidth = 1200; // Max width for resizing (adjust as necessary for quality)
        const maxHeight = 900; // Max height for resizing (adjust as necessary for quality)

        let width = img.width;
        let height = img.height;

        // Resize image only if larger than the maxWidth or maxHeight
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        // Use JPEG for better file size optimization
        const compressedImage = canvas.toDataURL("image/jpeg", quality);

        resolve(compressedImage); // Return the compressed image as a base64 string
      };

      img.onerror = (err) => {
        reject(err); // In case the image loading fails
      };
    });
  };

  const convertToPDF = async () => {
    setIsGeneratingPDF(true);
    const pdf = new jsPDF({ orientation });
    let y = customMargins;

    for (const image of images) {
      const imgData = await compressAndResizeImage(image);

      const img = new Image();
      img.src = imgData;

      await new Promise((resolve) => {
        img.onload = () => {
          const imgWidth = pdf.internal.pageSize.getWidth() - customMargins * 2;
          const imgHeight = (imgWidth * img.height) / img.width;

          if (y + imgHeight > pdf.internal.pageSize.getHeight()) {
            pdf.addPage();
            y = customMargins;
          }

          pdf.addImage(imgData, "JPEG", customMargins, y, imgWidth, imgHeight);
          y += imgHeight + 10; // Adding space between images
          resolve();
        };
      });
    }

    const pdfBlob = new Blob([pdf.output("blob")], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);

    const element = document.createElement("a");
    element.href = pdfUrl;
    element.download = "images.pdf";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "PDF Created",
      description: "Your PDF has been created and downloaded.",
    });

    setIsGeneratingPDF(false);
  };

  const removeImage = (index) => {
    setImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);
      return newImages;
    });
  };

  return (
    <div className="pb-20 container mx-auto px-4 sm:px-10 lg:px-28">
      <h1 className="text-2xl font-bold text-white primary-text-gradient">
        Images to PDF Converter
      </h1>
      <main className="flex-grow container mx-auto bg-white rounded-lg mt-8 animate__animated animate__fadeIn">
        <div className="mb-6">
          <Label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Select Images
          </Label>
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            className="mt-1"
            onChange={handleImageSelection}
          />
        </div>

        <div className="mb-6 sm:hidden">
          <Label className="block text-sm font-medium text-gray-700">
            Capture Live Photo
          </Label>
          <div className="mt-1 flex flex-col gap-5 items-center space-x-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full rounded-lg shadow-md"
            />
            <canvas ref={canvasRef} className="hidden" />
            <Button onClick={capturePhoto} variant="outline" className="mt-4">
              <Camera className="mr-2 h-4 w-4" /> Capture
            </Button>
          </div>
        </div>

        {images?.length > 0 && (
          <div className="mb-6">
            <Label className="block text-sm font-medium text-gray-700">
              Selected Images
            </Label>
            <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Selected ${index}`}
                    className="w-full h-48 object-contain rounded"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-5">
          <Button
            onClick={convertToPDF}
            disabled={images.length === 0 || isGeneratingPDF}
            className="w-full bg-primary text-white primary-gradient hover:bg-primary-dark transition duration-300"
          >
            <FilePlus className="mr-2 h-4 w-4" /> Convert to PDF
          </Button>

          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogTrigger asChild>
              <Button
                disabled={pdfUrl === null}
                className="w-full primary-gradient text-white hover:bg-gray-600 transition duration-300"
              >
                <Eye className="mr-2 h-4 w-4" /> Preview PDF
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>PDF Preview</DialogTitle>
                <DialogDescription>
                  Preview the generated PDF.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                {pdfUrl ? (
                  <iframe src={pdfUrl} className="w-full h-96 border-0" />
                ) : (
                  <div className="text-center text-gray-500">
                    No PDF to preview.
                  </div>
                )}
              </div>
              <DialogFooter className="mt-4">
                <Button
                  onClick={() => setShowPreview(false)}
                  className="bg-red-500 text-white"
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
