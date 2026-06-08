const { OpenAI } = require('openai');

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY belum disetel');
  }
  return new OpenAI({ apiKey });
}

module.exports = { getOpenAIClient };
