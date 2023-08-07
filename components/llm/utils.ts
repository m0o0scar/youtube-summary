export function formatTokens(tokens: number) {
  if (tokens < 1024) {
    return tokens.toString();
  }
  return `${Math.ceil(tokens / 1024)}k`;
}
