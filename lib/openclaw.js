const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const execFileAsync = promisify(execFile);

const OPENCLAW_CLI = process.env.OPENCLAW_CLI_PATH || 'npx';
const OPENCLAW_PROFILE = process.env.OPENCLAW_PROFILE;
const OPENCLAW_THINKING = process.env.OPENCLAW_THINKING || 'high';

function safeJsonParse(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const firstBrace = trimmed.indexOf('{');
    const lastBrace = trimmed.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace) {
      try {
        return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
      } catch {
        return null;
      }
    }
    const firstBracket = trimmed.indexOf('[');
    const lastBracket = trimmed.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1 && firstBracket < lastBracket) {
      try {
        return JSON.parse(trimmed.slice(firstBracket, lastBracket + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

async function getOpenClawResponse(message) {
  const args = ['--no-install', 'openclaw', 'agent', '--local', '--message', message, '--json', '--thinking', OPENCLAW_THINKING];
  if (OPENCLAW_PROFILE) {
    args.push('--profile', OPENCLAW_PROFILE);
  }

  const { stdout } = await execFileAsync(OPENCLAW_CLI, args, {
    timeout: 180000,
    maxBuffer: 20 * 1024 * 1024,
    env: { ...process.env },
  });

  const parsed = safeJsonParse(stdout);
  if (!parsed) {
    throw new Error('OpenClaw tidak mengembalikan JSON yang valid. Output: ' + stdout);
  }

  if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
    return parsed;
  }

  throw new Error('OpenClaw mengembalikan format yang tidak dikenali.');
}

module.exports = { getOpenClawResponse };
