"use client"
import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { Upload, Loader2 } from "lucide-react"

export default function ImageCompressor() {
  const [imageSrc, setImageSrc] = useState(null)
  const [compressedImageSrc, setCompressedImageSrc] = useState(null)
  const [compressionQuality, setCompressionQuality] = useState(0.8)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [originalFileSize, setOriginalFileSize] = useState(0)
  const [compressedFileSize, setCompressedFileSize] = useState(0)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const validTypes = ['image/jpeg', 'image/png', 'image/gif']
    const maxSize = 200 * 1024 * 1024 // 200MB

    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a JPEG, PNG, or GIF image.')
      return
    }

    if (file.size > maxSize) {
      setError('File size exceeds the limit of 200MB.')
      return
    }

    setError(null)
    setOriginalFileSize(file.size / (1024 * 1024)) // Convert to MB

    const reader = new FileReader()
    reader.onloadend = () => {
      setImageSrc(reader.result)
      setUploadProgress(100) // Set progress to 100% when upload is complete
    }
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 100
        setUploadProgress(progress)
      }
    }
    reader.onerror = () => {
      setError('Error reading the file.')
    }
    reader.readAsDataURL(file)
  }

  const handleCompressionQualityChange = (event) => {
    const newQuality = parseFloat(event.target.value)
    if (!isNaN(newQuality) && newQuality >= 0 && newQuality <= 1) {
      setCompressionQuality(newQuality)
    }
  }

  const handleCompress = () => {
    if (!imageSrc) return

    setIsLoading(true)
    setError(null)

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.src = imageSrc
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          setCompressedImageSrc(url)
          setCompressedFileSize(blob.size / (1024 * 1024)) // Convert to MB
          setIsLoading(false)
        }
      }, 'image/jpeg', compressionQuality)
    }
    img.onerror = () => {
      setError('Error loading the image.')
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!compressedImageSrc) return

    const link = document.createElement('a')
    link.href = compressedImageSrc
    link.download = 'compressed-image.jpg'
    link.click()
  }

  const handleReset = () => {
    setImageSrc(null)
    setCompressedImageSrc(null)
    setCompressionQuality(0.8)
    setError(null)
    setIsLoading(false)
    setOriginalFileSize(0)
    setCompressedFileSize(0)
    setUploadProgress(0)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="max-w-md w-full">
        <div className="mb-4">
          <Label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 primary-text-gradient">
            Upload Image
          </Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v28a4 4 0 004 4h16a4 4 0 004-4V12a4 4 0 00-4-4zm-8 28a4 4 0 100-8 4 4 0 000 8zm8-12v8H12v-8h16zm-4-8a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="image-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span className='primary-text-gradient'>Upload a file</span>
                  <input
                    id="image-upload"
                    type="file"
                    className="sr-only"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 200MB</p>
            </div>
          </div>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                Uploading: {uploadProgress.toFixed(2)}%
              </div>
            </div>
          )}
        </div>

        {imageSrc && (
          <div className="mb-4 relative">
            <Label className="block text-sm font-medium text-gray-700">Image Preview</Label>
            <div className="relative max-w-full max-h-full">
              <img
                src={imageSrc}
                alt="Preview"
                className="mt-2 w-full h-auto rounded"
              />
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Original Size: {originalFileSize.toFixed(2)} MB
            </div>
          </div>
        )}

        {compressedImageSrc && (
          <div className="mb-4 relative">
            <Label className="block text-sm font-medium text-gray-700">Compressed Image Preview</Label>
            <div className="relative max-w-full max-h-full">
              <img
                src={compressedImageSrc}
                alt="Compressed Preview"
                className="mt-2 w-full h-auto rounded"
              />
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Compressed Size: {compressedFileSize.toFixed(2)} MB
            </div>
          </div>
        )}

        <div className="mb-4">
          <Label htmlFor="compression-quality" className="block text-sm font-medium text-gray-700">
            Compression Quality
          </Label>
          <Input
            id="compression-quality"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={compressionQuality}
            onChange={handleCompressionQualityChange}
            className="mt-1 block w-full"
          />
          <div className="mt-1 text-sm text-gray-500 primary-text-gradient">
            Quality: {Math.round(compressionQuality * 100)}%
          </div>
        </div>

        <div className="mb-4">
          <Button onClick={handleCompress} className="w-full mb-2 primary-gradient" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : (
              'Compress Image'
            )}
          </Button>
          <Button onClick={handleDownload} className="w-full mb-2 primary-gradient"  disabled={!compressedImageSrc || isLoading}>
            <Upload className="mr-2" />
            Download Compressed Image
          </Button>
          <Button onClick={handleReset} className="w-full primary-gradient" disabled={isLoading}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}