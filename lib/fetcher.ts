export default async function fetcher(endpoint: string, options?: RequestInit) {
  const isServer = typeof window === 'undefined'
  const baseURL = isServer
    ? ''
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  const response = await fetch(`${baseURL}${endpoint}`, {
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
