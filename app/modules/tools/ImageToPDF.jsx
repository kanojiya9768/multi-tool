"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, FilePlus, Trash } from "lucide-react";
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
import { useDropzone } from "react-dropzone"; // Import useDropzone hook from react-dropzone

export function ImagesToPDFConverter() {
  const [images, setImages] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [customMargins, setCustomMargins] = useState(10);
  const [orientation, setOrientation] = useState("portrait");

  // Use react-dropzone hook to handle image uploads
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    onDrop: (acceptedFiles) => {
      setImages((prevImages) => [...prevImages, ...acceptedFiles]); // Add accepted files to images state
    },
  });

  const compressAndResizeImage = (image, quality = 0.85) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(image);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxWidth = 1200;
        const maxHeight = 900;

        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        const compressedImage = canvas.toDataURL("image/jpeg", quality);

        resolve(compressedImage);
      };

      img.onerror = (err) => {
        reject(err);
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
          y += imgHeight + 10;
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
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 p-8 grid place-items-center">
      <main className="flex-grow container mx-auto bg-white rounded-lg mt-8 animate__animated animate__fadeIn px-4 sm:px-10 lg:px-20 space-y-4">
        <h1 className="text-2xl font-bold text-white primary-text-gradient">
          Images to PDF Converter
        </h1>

        <div className="mb-6">
          <Label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Select Images
          </Label>

          {/* Dropzone for file upload */}
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg cursor-pointer"
          >
            <input {...getInputProps()} id="images" />
            <p className="text-gray-600">Drag & Drop or Click to Select Images</p>
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
