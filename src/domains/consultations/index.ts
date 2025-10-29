import { asToolError, asToolText, type ToolContent } from '../../lib/tool'
import { fetchJson, postJson, patchJson, deleteRequest } from '../../lib/http'
import { getServerUrl } from '../../lib/runtime'

function baseUrl(): string {
  return `${getServerUrl()}/api/v1/consultations`
}


// Doctors
export async function getDoctors(): Promise<ToolContent> {
  try {
    const data = await fetchJson(`${baseUrl()}/doctors/`)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to fetch doctors: ${(e as Error).message}`)
  }
}

export async function getDoctorById(id: string | number): Promise<ToolContent> {
  try {
    const data = await fetchJson(`${baseUrl()}/doctors/${id}/`)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to fetch doctor ${id}: ${(e as Error).message}`)
  }
}

export async function createDoctor(input: unknown): Promise<ToolContent> {
  try {
    const data = await postJson(`${baseUrl()}/doctors/`, input)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to create doctor: ${(e as Error).message}`)
  }
}

export async function updateDoctor(id: string | number, input: unknown): Promise<ToolContent> {
  try {
    const data = await patchJson(`${baseUrl()}/doctors/${id}/`, input)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to update doctor ${id}: ${(e as Error).message}`)
  }
}

export async function deleteDoctor(id: string | number): Promise<ToolContent> {
  try {
    const data = await deleteRequest(`${baseUrl()}/doctors/${id}/`)
    return asToolText(data || { success: true })
  } catch (e) {
    return asToolError(`Failed to delete doctor ${id}: ${(e as Error).message}`)
  }
}


// Specializations
export async function getSpecializations(): Promise<ToolContent> {
  try {
    const data = await fetchJson(`${baseUrl()}/specializations/`)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to fetch specializations: ${(e as Error).message}`)
  }
}

export async function getSpecializationById(id: string | number): Promise<ToolContent> {
  try {
    const data = await fetchJson(`${baseUrl()}/specializations/${id}/`)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to fetch specialization ${id}: ${(e as Error).message}`)
  }
}

export async function createSpecialization(input: unknown): Promise<ToolContent> {
  try {
    const data = await postJson(`${baseUrl()}/specializations/`, input)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to create specialization: ${(e as Error).message}`)
  }
}

export async function updateSpecialization(id: string | number, input: unknown): Promise<ToolContent> {
  try {
    const data = await patchJson(`${baseUrl()}/specializations/${id}/`, input)
    return asToolText(data)
  } catch (e) {
    return asToolError(`Failed to update specialization ${id}: ${(e as Error).message}`)
  }
}

export async function deleteSpecialization(id: string | number): Promise<ToolContent> {
  try {
    const data = await deleteRequest(`${baseUrl()}/specializations/${id}/`)
    return asToolText(data || { success: true })
  } catch (e) {
    return asToolError(`Failed to delete specialization ${id}: ${(e as Error).message}`)
  }
}

