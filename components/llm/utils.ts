export function formatTokens(tokens: number) {
  if (tokens < 1024) {
    return tokens.toString();
  }
  if (tokens < 1024 * 1024) {
    return `${Math.floor(tokens / 1024)}k`;
  }
  return `${Math.floor(tokens / (1024 * 1024))}m`;
}
