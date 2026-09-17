/** Editorial cleanup shared by the generated reference and authored reader pages. */
export function readerContent(text) {
  return text
    .replace(/\[([^\]]+)\]\(https:\/\/github\.com\/muralisid\/(?:agentic-architecture-skills-source|multicard-bench|agent-memory-research)[^)]*\)/g, 'author-reported research')
    .replace(/\[([^\]]+)\]\([^)]*(?:knowledge|inputs)\/[^)]*\)/g, 'practitioner perspective')
    .replace(/`(?:research|synthesis|techniques|frameworks|knowledge|inputs)\/[^`]+\.md`/g, 'supporting analysis')
    .replace(/`(?:knowledge|inputs)\/`/g, 'practitioner interviews')
    .replace(/\bresearch\/R\d{2}(?:-[a-z0-9-]+)?\/?(?:findings\.md|sources\.md)?/g, 'related research')
    .replace(/The research behind this page/g, 'Explore this topic')
    .replace(/\brungs\b/gi, 'methods')
    .replace(/\brung\b/gi, 'method')
    .replace(/Deck A/g, 'Agent design')
    .replace(/Deck B/g, 'Model adaptation');
}
