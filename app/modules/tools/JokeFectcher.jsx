"use client"
import React, { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Laugh, Copy, Sun, Moon } from "lucide-react"

export const JokeFetcher = ()=> {
  const [joke, setJoke] = useState(null)
  const [jokeHistory, setJokeHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [copyText, setCopyText] = useState('Copy')

  const fetchJoke = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Failed to fetch joke')
      }
      const data = await response.json()
      if (!data || !data.joke) {
        throw new Error('Joke data is missing')
      }
      setJoke(data.joke)
      setJokeHistory(prevHistory => [data.joke, ...prevHistory])
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (joke) {
      navigator.clipboard.writeText(joke)
      setCopyText('Copied!')
      setTimeout(() => {
        setCopyText('Copy')
      }, 3000)
    }
  }

  const shareOnTwitter = () => {
    if (joke) {
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(joke)}`
      window.open(tweetUrl, '_blank')
    }
  }

  const shareOnFacebook = () => {
    if (joke) {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(joke)}`
      window.open(facebookUrl, '_blank')
    }
  }

  const shareOnWhatsApp = () => {
    if (joke) {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(joke)}`
      window.open(whatsappUrl, '_blank')
    }
  }

  const shareOnInstagram = () => {
    if (joke) {
      const instagramUrl = `https://www.instagram.com/create/story/?text=${encodeURIComponent(joke)}`
      window.open(instagramUrl, '_blank')
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode)
  }

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Card className="w-full max-w-3xl p-6">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold primary-text-gradient">Random Joke Fetcher</CardTitle>
          <Button variant="ghost" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            {loading ? (
              <p className="text-lg text-gray-500">Loading...</p>
            ) : (
              <>
                {joke && (
                  <div className="flex items-center space-x-2 primary-text-gradient">
                    <Laugh className="h-6 w-6 text-gray-500" />
                    <p className="text-lg font-medium">{joke}</p>
                  </div>
                )}
                {error && (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}
              </>
            )}
            <div className="block space-y-4 space-x-2">
              <div className='flex items-center gap-4 '>
              <Button onClick={fetchJoke} className="w-full primary-gradient">
                {loading ? 'Fetching...' : 'Get a New Joke'}
              </Button>
              <Button onClick={copyToClipboard} variant="outline" disabled={!joke}>
                <Copy className="h-4 w-4 mr-2" />
                {copyText}
              </Button>
              </div>
              <div className='flex gap-3 items-center flex-wrap'>
              <Button onClick={shareOnTwitter} variant="outline" disabled={!joke}>
              Twitter
              </Button>
              <Button onClick={shareOnFacebook} variant="outline" disabled={!joke}>
              Facebook
              </Button>
              <Button onClick={shareOnWhatsApp} variant="outline" disabled={!joke}>
              WhatsApp
              </Button>
              <Button onClick={shareOnInstagram} variant="outline" disabled={!joke}>
              Instagram
              </Button>
              </div>
            </div>
          </div>
          {jokeHistory.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Joke History</h3>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {jokeHistory.map((j, index) => (
                  <li key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                    {j}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}