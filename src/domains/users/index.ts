import { asToolText, type ToolContent } from '../../lib/tool'

export async function getProfile(userId: string | number): Promise<ToolContent> {
  return asToolText({ message: `getProfile(${userId}) not implemented yet` })
}

export async function updateProfile(userId: string | number, input: unknown): Promise<ToolContent> {
  return asToolText({ message: `updateProfile(${userId}) not implemented yet`, input })
}


