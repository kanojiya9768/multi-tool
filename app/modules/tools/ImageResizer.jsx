"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Check, X } from "lucide-react"

export default function ImageResizer() {
  const [imageSrc, setImageSrc] = useState(null)
  const [originalWidth, setOriginalWidth] = useState(0)
  const [originalHeight, setOriginalHeight] = useState(0)
  const [width, setWidth] = useState('200')
  const [height, setHeight] = useState('200')
  const [lockAspectRatio, setLockAspectRatio] = useState(true)
  const [error, setError] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const validTypes = ['image/jpeg', 'image/png', 'image/gif']
    const maxSize = 10 * 1024 * 1000 // 10MB

    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a JPEG, PNG, or GIF image.')
      return
    }

    if (file.size > maxSize) {
      setError('File size exceeds the limit of 10MB.')
      return
    }

    setError(null)

    const reader = new FileReader()
    reader.onloadend = () => {
      setImageSrc(reader.result)
      const img = new Image()
      img.src = reader.result
      img.onload = () => {
        setOriginalWidth(img.width)
        setOriginalHeight(img.height)
        setWidth(img.width.toString())
        setHeight(img.height.toString())
      }
    }
    reader.readAsDataURL(file)
  }

  const handleWidthChange = (event) => {
    const newWidth = event.target.value
    setWidth(newWidth)
    if (lockAspectRatio && !isNaN(newWidth) && newWidth > 0) {
      const newHeight = Math.round((newWidth / originalWidth) * originalHeight)
      setHeight(newHeight.toString())
    }
  }

  const handleHeightChange = (event) => {
    const newHeight = event.target.value
    setHeight(newHeight)
    if (lockAspectRatio && !isNaN(newHeight) && newHeight > 0) {
      const newWidth = Math.round((newHeight / originalHeight) * originalWidth)
      setWidth(newWidth.toString())
    }
  }

  const handleDownload = () => {
    if (!imageSrc) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.src = imageSrc
    img.onload = () => {
      canvas.width = Number(width)
      canvas.height = Number(height)
      ctx.drawImage(img, 0, 0, Number(width), Number(height))

      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = 'resized-image.png'
      link.click()
    } 
  }

  const handleReset = () => {
    if (imageSrc) {
      setWidth(originalWidth.toString())
      setHeight(originalHeight.toString())
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 p-8 grid place-items-center">
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
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        {imageSrc && (
          <div className="mb-4 relative">
            <Label className="block text-sm font-medium text-gray-700">Image Preview</Label>
            <div className="relative max-w-full max-h-full">
              <img
                src={imageSrc}
                alt="Preview"
                className="mt-2 w-full h-auto rounded"
                style={{ width: `${originalWidth}px`, height: `${originalHeight}px` }}
              />
            </div>
          </div>
        )}

        <div className="mb-4 flex items-center">
          <Label htmlFor="lock-aspect-ratio" className="block text-sm font-medium text-gray-700 primary-text-gradient mr-2">
            Lock Aspect Ratio
          </Label>
          <Button
            variant={lockAspectRatio ? 'default' : 'outline'}
            size="icon"
            onClick={() => setLockAspectRatio(!lockAspectRatio)}
          >
            {lockAspectRatio ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        <div className="mb-4">
          <Label htmlFor="width" className="block text-sm font-medium text-gray-700">
            Width
          </Label>
          <Input
            id="width"
            type="text"
            value={width}
            onChange={handleWidthChange}
            className="mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="height" className="block text-sm font-medium text-gray-700">
            Height
          </Label>
          <Input
            id="height"
            type="text"
            value={height}
            onChange={handleHeightChange}
            className="mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <Button onClick={handleDownload} className="w-full mb-2 primary-gradient">
            <Upload className="mr-2" />
            Download Resized Image
          </Button>
          <Button onClick={handleReset} className="w-full bg-red-500">
            Reset to Original Size
          </Button>
        </div>
      </div>
    </div>
  )
}