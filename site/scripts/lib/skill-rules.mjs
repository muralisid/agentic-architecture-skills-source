/**
 * The Agent Skills rules a published bundle must satisfy.
 *
 * Kept separate from the build so the same checks run in the build, in
 * `npm run validate`, and in CI against the exported tree. Every rule here
 * comes from the specification or from this repository's own style rules, and
 * each returns a sentence a person can act on rather than a code.
 *
 * The spec allows exactly six frontmatter fields. Any other field is a hard
 * error on upload to claude.ai and through the Skills API, so a field that
 * works locally can still break every other install path: the allowlist is
 * therefore enforced here rather than trusted.
 */

const ALLOWED_FRONTMATTER = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools']);

const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RESERVED_IN_NAME = ['anthropic', 'claude'];

const MAX_NAME = 64;
const MAX_DESCRIPTION = 1024;
const MAX_COMPATIBILITY = 500;
const MAX_BODY_LINES = 500;

/**
 * @param {object} skill { name, frontmatter, body, files: [{path, contents}] }
 * @returns {string[]} problems, empty when the skill is publishable
 */
export function validateSkill(skill) {
  const problems = [];
  const say = (message) => problems.push(`${skill.name}: ${message}`);
  const { frontmatter = {}, body = '', files = [] } = skill;

  for (const key of Object.keys(frontmatter)) {
    if (!ALLOWED_FRONTMATTER.has(key)) {
      say(`frontmatter field "${key}" is not in the specification, and it fails upload to claude.ai and the Skills API. Allowed: ${[...ALLOWED_FRONTMATTER].join(', ')}`);
    }
  }

  const name = frontmatter.name;
  if (!name) say('frontmatter has no name');
  else {
    if (name !== skill.name) say(`frontmatter name "${name}" must equal the folder name "${skill.name}"`);
    if (name.length > MAX_NAME) say(`name is ${name.length} characters; the limit is ${MAX_NAME}`);
    if (!NAME_PATTERN.test(name)) say(`name "${name}" must be lowercase letters, digits and single hyphens`);
    for (const reserved of RESERVED_IN_NAME) {
      if (name.includes(reserved)) say(`name may not contain the reserved word "${reserved}"`);
    }
  }

  const description = typeof frontmatter.description === 'string' ? frontmatter.description.trim() : '';
  if (!description) say('frontmatter has no description, which is the only text most agents ever read');
  else {
    if (description.length > MAX_DESCRIPTION) {
      say(`description is ${description.length} characters; the limit is ${MAX_DESCRIPTION}`);
    }
    if (description.length < 80) {
      say('description is too short to trigger reliably: say what the skill does and when to use it');
    }
    if (!/\buse\b/i.test(description)) {
      say('description does not say when to use the skill; add a "Use when ..." clause');
    }
  }

  if (frontmatter.compatibility && String(frontmatter.compatibility).length > MAX_COMPATIBILITY) {
    say(`compatibility is longer than ${MAX_COMPATIBILITY} characters`);
  }

  if (frontmatter.metadata !== undefined) {
    if (typeof frontmatter.metadata !== 'object' || Array.isArray(frontmatter.metadata)) {
      say('metadata must be a map of string keys to string values');
    } else {
      for (const [key, value] of Object.entries(frontmatter.metadata)) {
        if (typeof value !== 'string') say(`metadata.${key} must be a string; got ${typeof value}`);
      }
    }
  }

  const lines = body.split('\n').length;
  if (lines > MAX_BODY_LINES) {
    say(`the body is ${lines} lines; keep it under ${MAX_BODY_LINES} and move detail into references/`);
  }

  // The repository's own style rule, applied to everything it publishes.
  const emDashIn = files.filter((file) => typeof file.contents === 'string' && file.contents.includes('—'));
  for (const file of emDashIn) say(`${file.path} contains an em dash`);

  // References are read one level deep; nesting them hides them from the model.
  for (const file of files) {
    const depth = file.path.split('/').length;
    if (depth > 2) say(`${file.path} is nested more than one level below the skill root`);
    if (file.path.startsWith('references/') && !/\.(md|txt|csv|json)$/.test(file.path)) {
      say(`${file.path} is not a readable reference format`);
    }
  }

  // Every bundled reference should be reachable from the body, or nothing will open it.
  const bodyText = body;
  for (const file of files) {
    if (!file.path.startsWith('references/')) continue;
    const base = file.path.slice('references/'.length);
    const mentioned = bodyText.includes(file.path) || bodyText.includes(base);
    if (!mentioned && !/`references\/`|references\/ *\*/.test(bodyText)) {
      say(`${file.path} is bundled but never mentioned in SKILL.md, so nothing will read it`);
    }
  }

  const hasSkillMd = files.some((file) => file.path === 'SKILL.md');
  if (!hasSkillMd) say('the bundle has no SKILL.md at its root');

  return problems;
}

export { ALLOWED_FRONTMATTER, MAX_BODY_LINES, MAX_DESCRIPTION };
