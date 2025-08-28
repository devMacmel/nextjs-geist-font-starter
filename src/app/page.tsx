'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { fileToBase64, validateImageFile } from '@/lib/ticket-utils'
import TicketDisplay from '@/components/TicketDisplay'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface FormData {
  playerName: string
  image: FileList
}

interface TicketData {
  serialNumber: string
  playerName: string
  imageData: string
  eventDetails: {
    name: string
    date: string
    venue: string
    time: string
    category: string
  }
  generatedAt: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [ticketData, setTicketData] = useState<TicketData | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>()

  const watchedImage = watch('image')

  // Handle image preview
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validation = validateImageFile(file)
      if (!validation.isValid) {
        setError(validation.error || 'Invalid image file')
        setImagePreview(null)
        return
      }

      try {
        const base64 = await fileToBase64(file)
        setImagePreview(base64)
        setError(null)
      } catch (err) {
        setError('Failed to process image')
        setImagePreview(null)
      }
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const file = data.image[0]
      if (!file) {
        setError('Please select an image')
        setIsLoading(false)
        return
      }

      const validation = validateImageFile(file)
      if (!validation.isValid) {
        setError(validation.error || 'Invalid image file')
        setIsLoading(false)
        return
      }

      const imageData = await fileToBase64(file)

      const response = await fetch('/api/generate-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName: data.playerName,
          imageData,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate ticket')
      }

      const ticket = await response.json()
      setTicketData(ticket)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewTicket = () => {
    setTicketData(null)
    setImagePreview(null)
    setError(null)
    reset()
  }

  if (ticketData) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 font-['Orbitron']">
              Your Ticket is Ready!
            </h1>
            <Button
              onClick={handleNewTicket}
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black"
            >
              Generate Another Ticket
            </Button>
          </div>
          <TicketDisplay ticketData={ticketData} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 font-['Orbitron']">
            Video Game Event
          </h1>
          <h2 className="text-3xl font-semibold text-blue-400 mb-2 font-['Orbitron']">
            Ticket Generator
          </h2>
          <p className="text-gray-300 text-lg font-['Rajdhani']">
            Generate your personalized gaming event ticket with a unique serial number
          </p>
        </div>

        {/* Form Card */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white font-['Orbitron']">
              Create Your Ticket
            </CardTitle>
            <CardDescription className="text-gray-400 font-['Rajdhani']">
              Enter your player name and upload an image to generate your ticket
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Player Name Input */}
              <div className="space-y-2">
                <Label htmlFor="playerName" className="text-white font-['Rajdhani'] text-lg">
                  Player Name
                </Label>
                <Input
                  id="playerName"
                  type="text"
                  placeholder="Enter your gaming username"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  {...register('playerName', {
                    required: 'Player name is required',
                    minLength: {
                      value: 2,
                      message: 'Player name must be at least 2 characters'
                    },
                    maxLength: {
                      value: 30,
                      message: 'Player name must be less than 30 characters'
                    }
                  })}
                />
                {errors.playerName && (
                  <p className="text-red-400 text-sm">{errors.playerName.message}</p>
                )}
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-white font-['Rajdhani'] text-lg">
                  Upload Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="bg-gray-700 border-gray-600 text-white file:bg-blue-600 file:text-white file:border-0 file:rounded file:px-4 file:py-2 file:mr-4 hover:file:bg-blue-700"
                  {...register('image', {
                    required: 'Please select an image'
                  })}
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <p className="text-red-400 text-sm">{errors.image.message}</p>
                )}
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="space-y-2">
                  <Label className="text-white font-['Rajdhani'] text-lg">Preview</Label>
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Image preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-gray-600"
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-green-400 px-2 py-1 rounded text-xs font-mono">
                      Serial will appear here
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 text-lg font-['Rajdhani'] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Ticket...
                  </div>
                ) : (
                  'Generate Ticket'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-8 text-center text-gray-400 font-['Rajdhani']">
          <p className="mb-2">
            Your ticket will include a unique serial number and all event details
          </p>
          <p className="text-sm">
            Supported formats: JPEG, PNG, GIF, WebP (Max 5MB)
          </p>
        </div>
      </div>
    </div>
  )
}
