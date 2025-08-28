import { NextRequest, NextResponse } from 'next/server'
import { generateSerialNumber } from '@/lib/ticket-utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { playerName, imageData } = body

    // Validate required fields
    if (!playerName || !imageData) {
      return NextResponse.json(
        { error: 'Player name and image are required' },
        { status: 400 }
      )
    }

    // Validate player name
    if (typeof playerName !== 'string' || playerName.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide a valid player name' },
        { status: 400 }
      )
    }

    // Validate image data
    if (typeof imageData !== 'string' || !imageData.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'Please provide a valid image' },
        { status: 400 }
      )
    }

    // Generate unique serial number
    const serialNumber = generateSerialNumber()

    // Event details (can be made configurable later)
    const eventDetails = {
      name: 'Video Game Championship 2024',
      date: '2024-12-25',
      venue: 'Gaming Arena Center',
      time: '7:00 PM - 11:00 PM',
      category: 'VIP Access'
    }

    // Return ticket data
    const ticketData = {
      serialNumber,
      playerName: playerName.trim(),
      imageData,
      eventDetails,
      generatedAt: new Date().toISOString()
    }

    return NextResponse.json(ticketData, { status: 200 })

  } catch (error) {
    console.error('Error generating ticket:', error)
    return NextResponse.json(
      { error: 'Failed to generate ticket. Please try again.' },
      { status: 500 }
    )
  }
}
