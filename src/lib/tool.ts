export type ToolContent = {
  content: Array<{ type: 'text'; text: string }>
}

export function asToolText(input: unknown): ToolContent {
  const text = typeof input === 'string' ? input : JSON.stringify(input, null, 2)
  return { content: [{ type: 'text', text }] }
}

export function asToolError(message: string): ToolContent {
  return { content: [{ type: 'text', text: JSON.stringify({ error: message }) }] }
}


