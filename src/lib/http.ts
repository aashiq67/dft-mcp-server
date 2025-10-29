
import { getAdminApiToken } from './runtime'

export async function fetchJson(url: string, init?: RequestInit): Promise<unknown> {
  const response = await fetch(url, init)
  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`${response.status} ${response.statusText}${body ? `: ${body.slice(0, 256)}` : ''}`)
  }
  return response.json()
}

export async function postJson(url: string, body: unknown, headers: HeadersInit = { 'Content-Type': 'application/json', 'X-Admin-Api-Token': getAdminApiToken() ?? '' }): Promise<unknown> {
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body ?? {})
  })
  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`${response.status} ${response.statusText}${text ? `: ${text.slice(0, 256)}` : ''}`)
  }
  const ct = response.headers.get('content-type') || ''
  return ct.includes('application/json') ? response.json() : response.text()
}

export async function patchJson(url: string, body: unknown, headers: HeadersInit = { 'Content-Type': 'application/json', 'X-Admin-Api-Token': getAdminApiToken() ?? '' }): Promise<unknown> {
  const response = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body ?? {})
  })
  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`${response.status} ${response.statusText}${text ? `: ${text.slice(0, 256)}` : ''}`)
  }
  const ct = response.headers.get('content-type') || ''
  return ct.includes('application/json') ? response.json() : response.text()
}

export async function deleteRequest(url: string, headers: HeadersInit = { 'X-Admin-Api-Token': getAdminApiToken() ?? '' }): Promise<unknown> {
  const response = await fetch(url, { method: 'DELETE', headers })
  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`${response.status} ${response.statusText}${text ? `: ${text.slice(0, 256)}` : ''}`)
  }
  const ct = response.headers.get('content-type') || ''
  return ct.includes('application/json') ? response.json() : response.text()
}

