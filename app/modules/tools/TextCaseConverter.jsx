'use client'
import React, { useState } from 'react'
import { Input } from "/components/ui/input"
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "/components/ui/select"
import { Copy, Trash } from 'lucide-react'
import { Progress } from "/components/ui/progress"

const toUpperCase = (text) => text.toUpperCase()
const toLowerCase = (text) => text.toLowerCase()
const toCamelCase = (text) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase())
const toPascalCase = (text) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
const toTitleCase = (text) => text.replace(/\b\w/g, (char) => char.toUpperCase())
const toSentenceCase = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
const toSnakeCase = (text) => text.replace(/\s+/g, '_').toLowerCase()
const toKebabCase = (text) => text.replace(/\s+/g, '-').toLowerCase()
const toTrainCase = (text) => text.replace(/\s+/g, '-').toUpperCase()
const toReverseCase = (text) => text.split('').map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join('')

export default function TextCaseConverter() {
  const [inputText, setInputText] = useState('')
  const [convertedText, setConvertedText] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [error, setError] = useState('')
  const [selectedCase, setSelectedCase] = useState('uppercase')

  const handleInputChange = (e) => {
    const text = e.target.value
    if (text.length <= 10000) {
      setInputText(text)
      setCharCount(text.length)
      setError('')
    } else {
      setError('Character limit exceeded (10,000 characters max).')
    }
  }

  const handleConvert = () => {
    switch (selectedCase) {
      case 'uppercase':
        setConvertedText(toUpperCase(inputText))
        break
      case 'lowercase':
        setConvertedText(toLowerCase(inputText))
        break
      case 'camelCase':
        setConvertedText(toCamelCase(inputText))
        break
      case 'pascalCase':
        setConvertedText(toPascalCase(inputText))
        break
      case 'titleCase':
        setConvertedText(toTitleCase(inputText))
        break
      case 'sentenceCase':
        setConvertedText(toSentenceCase(inputText))
        break
      case 'snakeCase':
        setConvertedText(toSnakeCase(inputText))
        break
      case 'kebabCase':
        setConvertedText(toKebabCase(inputText))
        break
      case 'trainCase':
        setConvertedText(toTrainCase(inputText))
        break
      case 'reverseCase':
        setConvertedText(toReverseCase(inputText))
        break
      default:
        setConvertedText(inputText)
    }
  }

  const handleCopyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(convertedText)
        .then(() => alert('Text copied to clipboard!'))
        .catch(err => console.error('Failed to copy text: ', err))
    }
  }

  const handleClear = () => {
    setInputText('')
    setConvertedText('')
    setCharCount(0)
    setError('')
    setSelectedCase('uppercase')
  }

  return (
    <div className="min-h-full pb-20 bg-gradient-to-br from-background to-background/95 p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold primary-text-gradient">Text Case Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter your text here"
              className="w-full"
              maxLength={10000}
            />
            <p className="text-sm text-gray-500 mt-1">Character Count: {charCount} / 10,000</p>
            <Progress value={(charCount / 10000) * 100} className="mt-1" />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <div className="flex justify-between items-center mb-4">
            <Select value={selectedCase} onValueChange={setSelectedCase}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select case" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uppercase">Uppercase</SelectItem>
                <SelectItem value="lowercase">Lowercase</SelectItem>
                <SelectItem value="camelCase">camelCase</SelectItem>
                <SelectItem value="pascalCase">PascalCase</SelectItem>
                <SelectItem value="titleCase">Title Case</SelectItem>
                <SelectItem value="sentenceCase">Sentence Case</SelectItem>
                <SelectItem value="snakeCase">Snake Case</SelectItem>
                <SelectItem value="kebabCase">Kebab Case</SelectItem>
                <SelectItem value="trainCase">Train Case</SelectItem>
                <SelectItem value="reverseCase">Reverse Case</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleConvert} className="ml-4 primary-gradient">
              Convert
            </Button>
          </div>
          <div className="bg-gray-100 p-4 rounded mb-4 max-h-64 overflow-y-auto">
            <p className="text-lg font-semibold">Converted Text:</p>
            <p className="text-gray-800 whitespace-pre-wrap">{convertedText}</p>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleCopyToClipboard} className="mr-2">
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button variant="destructive" onClick={handleClear}>
              <Trash className="mr-2 h-4 w-4" /> Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}