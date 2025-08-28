'use client'

import { getRandomPosition } from '@/lib/ticket-utils'
import { useEffect, useState } from 'react'

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

interface TicketDisplayProps {
  ticketData: TicketData
}

export default function TicketDisplay({ ticketData }: TicketDisplayProps) {
  const [serialPosition, setSerialPosition] = useState({ top: '10%', left: '10%' })

  useEffect(() => {
    // Set random position for serial number on component mount
    setSerialPosition(getRandomPosition())
  }, [])

  const handleDownload = () => {
    // Create a canvas to generate downloadable image
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) return

    canvas.width = 800
    canvas.height = 400

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#1a1a2e')
    gradient.addColorStop(0.5, '#16213e')
    gradient.addColorStop(1, '#0f3460')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add border
    ctx.strokeStyle = '#00ff88'
    ctx.lineWidth = 4
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

    // Add text content
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 24px Arial'
    ctx.fillText(ticketData.eventDetails.name, 50, 60)
    
    ctx.font = '18px Arial'
    ctx.fillText(`Player: ${ticketData.playerName}`, 50, 100)
    ctx.fillText(`Date: ${ticketData.eventDetails.date}`, 50, 130)
    ctx.fillText(`Venue: ${ticketData.eventDetails.venue}`, 50, 160)
    ctx.fillText(`Time: ${ticketData.eventDetails.time}`, 50, 190)
    
    // Add serial number
    ctx.fillStyle = '#00ff88'
    ctx.font = 'bold 16px monospace'
    ctx.fillText(`Serial: ${ticketData.serialNumber}`, 50, 350)

    // Download the canvas as image
    const link = document.createElement('a')
    link.download = `ticket-${ticketData.serialNumber}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-center">
          <h2 className="text-2xl font-bold text-white font-['Orbitron']">
            {ticketData.eventDetails.name}
          </h2>
        </div>

        {/* Main Ticket Content */}
        <div className="relative p-8">
          {/* User's uploaded image as background/template */}
          <div className="relative mb-6">
            <img 
              src={ticketData.imageData} 
              alt="Ticket template with player image"
              className="w-full h-64 object-cover rounded-lg border-2 border-gray-600"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "https://placehold.co/800x300?text=Gaming+Event+Ticket+Template"
              }}
            />
            
            {/* Serial number overlay at random position */}
            <div 
              className="absolute bg-black bg-opacity-80 text-green-400 px-3 py-1 rounded font-mono text-sm font-bold border border-green-400"
              style={{ 
                top: serialPosition.top, 
                left: serialPosition.left,
                transform: 'translate(-50%, -50%)'
              }}
            >
              #{ticketData.serialNumber}
            </div>
          </div>

          {/* Ticket Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                <span className="text-gray-400 font-['Rajdhani']">Player Name:</span>
                <span className="font-semibold text-blue-400">{ticketData.playerName}</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                <span className="text-gray-400 font-['Rajdhani']">Event Date:</span>
                <span className="font-semibold">{ticketData.eventDetails.date}</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                <span className="text-gray-400 font-['Rajdhani']">Time:</span>
                <span className="font-semibold">{ticketData.eventDetails.time}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                <span className="text-gray-400 font-['Rajdhani']">Venue:</span>
                <span className="font-semibold">{ticketData.eventDetails.venue}</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                <span className="text-gray-400 font-['Rajdhani']">Category:</span>
                <span className="font-semibold text-purple-400">{ticketData.eventDetails.category}</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                <span className="text-gray-400 font-['Rajdhani']">Serial Number:</span>
                <span className="font-mono text-green-400 font-bold">{ticketData.serialNumber}</span>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleDownload}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Download Ticket
            </button>
          </div>
        </div>

        {/* Ticket Footer */}
        <div className="bg-gray-800 p-3 text-center text-gray-400 text-sm">
          Generated on {new Date(ticketData.generatedAt).toLocaleString()}
        </div>
      </div>
    </div>
  )
}
