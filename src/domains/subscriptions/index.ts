import { asToolError, asToolText, type ToolContent } from '../../lib/tool'
import { fetchJson, postJson, patchJson, deleteRequest } from '../../lib/http'
import { getServerUrl } from '../../lib/runtime'

function baseUrl(): string {
  return `${getServerUrl()}/api/v1/subscriptions`
}

// Plans CRUD
export async function listPlans(): Promise<ToolContent> {
  try {
    const data = await fetchJson(`${baseUrl()}/plans/`)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to fetch plans: ${(e as Error).message}`)
  }
}

export async function getPlanById(id: string | number): Promise<ToolContent> {
  try {
    const data = await fetchJson(`${baseUrl()}/plans/${id}/`)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to fetch plan ${id}: ${(e as Error).message}`)
  }
}

export async function createPlan(input: unknown): Promise<ToolContent> {
  try {
    const data = await postJson(`${baseUrl()}/plans/`, input)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to create plan: ${(e as Error).message}`)
  }
}

export async function updatePlan(id: string | number, input: unknown): Promise<ToolContent> {
  try {
    const data = await patchJson(`${baseUrl()}/plans/${id}/`, input)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to update plan ${id}: ${(e as Error).message}`)
  }
}

export async function deletePlan(id: string | number): Promise<ToolContent> {
  try {
    const data = await deleteRequest(`${baseUrl()}/plans/${id}/`)
    return asToolText(data || { success: true })
  } catch (e) {
    return asToolError(`Failed to delete plan ${id}: ${(e as Error).message}`)
  }
}

// User subscriptions (endpoint TBD) – keeping placeholder until confirmed
export async function getUserSubscriptions(userId: string | number): Promise<ToolContent> {
  return asToolText({ message: `getUserSubscriptions(${userId}) not implemented yet` })
}


