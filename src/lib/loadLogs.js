// Build-time loader for Logs entries. Each entry is a markdown file in
// src/content/logs/ with `title`, `date`, and `tags` frontmatter between
// `---` markers, followed by plain paragraphs separated by blank lines.
// Files prefixed with `_` (like _template.md) are skipped.

const modules = import.meta.glob('/src/content/logs/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

function parseEntry(raw) {
  const match = raw.match(FRONTMATTER_RE)
  if (!match) return null

  const fields = {}
  for (const line of match[1].split(/\r?\n/)) {
    const sep = line.indexOf(':')
    if (sep === -1) continue
    fields[line.slice(0, sep).trim()] = line.slice(sep + 1).trim()
  }
  if (!fields.title || !fields.date) return null

  const paragraphs = raw
    .slice(match[0].length)
    .split(/\r?\n\s*\r?\n/)
    .map(p => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean)

  return {
    title: fields.title,
    date: fields.date,
    tags: fields.tags ? fields.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    paragraphs,
  }
}

export function loadLogs() {
  return Object.entries(modules)
    .filter(([path]) => !path.split('/').pop().startsWith('_'))
    .map(([, raw]) => parseEntry(raw))
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date))
}
