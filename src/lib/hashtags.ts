const TAG_RE = /#([a-z0-9_]{1,32})/gi;

export function parseHashtags(caption: string): string[] {
  const found = new Set<string>();
  for (const match of caption.matchAll(TAG_RE)) {
    found.add(match[1].toLowerCase());
    if (found.size >= 8) break;
  }
  return [...found];
}
