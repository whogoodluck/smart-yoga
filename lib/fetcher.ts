const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export default async function fetcher(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`)
  }

  return response.json()
}
