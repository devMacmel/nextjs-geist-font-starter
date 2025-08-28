/**
 * Generate a unique serial number for the ticket
 * Format: VGE-{timestamp}-{random}
 */
export function generateSerialNumber(): string {
  const timestamp = Date.now().toString()
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0')
  return `VGE-${timestamp}-${random}`
}

/**
 * Convert file to base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)'
    }
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Image size must be less than 5MB'
    }
  }

  return { isValid: true }
}

/**
 * Format date for display
 */
export function formatEventDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Get random position for serial number overlay
 */
export function getRandomPosition(): { top: string; left: string } {
  const positions = [
    { top: '10%', left: '10%' },
    { top: '10%', left: '80%' },
    { top: '80%', left: '10%' },
    { top: '80%', left: '80%' },
    { top: '50%', left: '5%' },
    { top: '50%', left: '85%' },
  ]
  
  return positions[Math.floor(Math.random() * positions.length)]
}
