// Optional: let the QA Agent answer with Claude.
// QualityView is a static site, so there is no server to hold a secret. The visitor pastes their
// own Anthropic API key; it is kept in sessionStorage for this tab only and sent straight to
// api.anthropic.com. It is never part of the code, the build or the repository.

const KEY_STORAGE = 'qualityview.anthropicKey';
export const CLAUDE_MODEL = 'claude-haiku-4-5';

export function getApiKey() {
  try {
    return sessionStorage.getItem(KEY_STORAGE) || '';
  } catch {
    return '';
  }
}

export function setApiKey(key) {
  try {
    if (key) sessionStorage.setItem(KEY_STORAGE, key.trim());
    else sessionStorage.removeItem(KEY_STORAGE);
  } catch {
    /* storage unavailable: the key simply isn't remembered */
  }
}

const SYSTEM = (context) => `You are the QualityView QA Agent, a senior QA consultant embedded in a release-quality dashboard.
Answer questions about the release below: readiness, defects, requirements, test runs, people and QA practice.
Rules:
- Use only the data below for facts about this release. If something isn't in it, say so.
- Be concise: at most about 120 words. Use **bold** for key figures and "• " bullets for lists.
- Refer to items by id (DEF-…, REQ-…, TC-…).
- General QA questions (techniques, best practice) may be answered from your own knowledge.

RELEASE DATA
${context}`;

/** Ask Claude. `history` is [{ role: 'user' | 'assistant', content }]. Throws on failure. */
export async function askClaude({ apiKey, question, history, context, signal }) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    signal,
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 600,
      system: SYSTEM(context),
      messages: [...history.slice(-6), { role: 'user', content: question }],
    }),
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    const msg = detail?.error?.message || `HTTP ${res.status}`;
    const err = new Error(res.status === 401 ? 'That API key was rejected.' : msg);
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  return data.content?.filter((c) => c.type === 'text').map((c) => c.text).join('\n').trim() || '…';
}
