import { asToolError, asToolText, type ToolContent } from '../../lib/tool'
import { fetchJson, postJson, patchJson, deleteRequest } from '../../lib/http'
import { getServerUrl } from '../../lib/runtime'

function baseUrl(): string {
  return `${getServerUrl()}/api/v1/dopamart`
}

export async function listProducts(): Promise<ToolContent> {
  try {
    const data = await fetchJson(`${baseUrl()}/products/`)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to fetch products: ${(e as Error).message}`)
  }
}

export async function getProductById(id: string | number): Promise<ToolContent> {
  try {
    const data = await fetchJson(`${baseUrl()}/products/${id}/`)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to fetch product ${id}: ${(e as Error).message}`)
  }
}

export async function createProduct(input: unknown): Promise<ToolContent> {
  try {
    const data = await postJson(`${baseUrl()}/products/`, input)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to create product: ${(e as Error).message}`)
  }
}

export async function updateProduct(id: string | number, input: unknown): Promise<ToolContent> {
  try {
    const data = await patchJson(`${baseUrl()}/products/${id}/`, input)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to update product ${id}: ${(e as Error).message}`)
  }
}

export async function deleteProduct(id: string | number): Promise<ToolContent> {
  try {
    const data = await deleteRequest(`${baseUrl()}/products/${id}/`)
    return asToolText(data || { success: true })
  } catch (e) {
    return asToolError(`Failed to delete product ${id}: ${(e as Error).message}`)
  }
}


