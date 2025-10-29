import { asToolError, asToolText, type ToolContent } from '../../lib/tool'
import { fetchJson, postJson, patchJson, deleteRequest } from '../../lib/http'
import { getServerUrl } from '../../lib/runtime'

function baseUrl(): string {
  return `${getServerUrl()}/api/v1/mindfulness`
}

// Categories
export async function listCategories(): Promise<ToolContent> {
  try {
    const data = await fetchJson(`${baseUrl()}/categories/`)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to fetch categories: ${(e as Error).message}`)
  }
}

export async function getCategoryById(id: string | number): Promise<ToolContent> {
  try {
    const data = await fetchJson(`${baseUrl()}/categories/${id}/`)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to fetch category ${id}: ${(e as Error).message}`)
  }
}

export async function createCategory(input: unknown): Promise<ToolContent> {
  try {
    const data = await postJson(`${baseUrl()}/categories/`, input)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to create category: ${(e as Error).message}`)
  }
}

export async function updateCategory(id: string | number, input: unknown): Promise<ToolContent> {
  try {
    const data = await patchJson(`${baseUrl()}/categories/${id}/`, input)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to update category ${id}: ${(e as Error).message}`)
  }
}

export async function deleteCategory(id: string | number): Promise<ToolContent> {
  try {
    const data = await deleteRequest(`${baseUrl()}/categories/${id}/`)
    return asToolText(data || { success: true })
  } catch (e) {
    return asToolError(`Failed to delete category ${id}: ${(e as Error).message}`)
  }
}

// Tracks
export async function listTracks(): Promise<ToolContent> {
  try {
    const data = await fetchJson(`${baseUrl()}/tracks/`)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to fetch tracks: ${(e as Error).message}`)
  }
}

export async function getTrackById(id: string | number): Promise<ToolContent> {
  try {
    const data = await fetchJson(`${baseUrl()}/tracks/${id}/`)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to fetch track ${id}: ${(e as Error).message}`)
  }
}

export async function createTrack(input: unknown): Promise<ToolContent> {
  try {
    const data = await postJson(`${baseUrl()}/tracks/`, input)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to create track: ${(e as Error).message}`)
  }
}

export async function updateTrack(id: string | number, input: unknown): Promise<ToolContent> {
  try {
    const data = await patchJson(`${baseUrl()}/tracks/${id}/`, input)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to update track ${id}: ${(e as Error).message}`)
  }
}

export async function deleteTrack(id: string | number): Promise<ToolContent> {
  try {
    const data = await deleteRequest(`${baseUrl()}/tracks/${id}/`)
    return asToolText(data || { success: true })
  } catch (e) {
    return asToolError(`Failed to delete track ${id}: ${(e as Error).message}`)
  }
}


