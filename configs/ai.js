import OpenAI from "openai";

// Prefer standard envs, but support legacy names to avoid misconfig 500s
const apiKey =
  process.env.OPENAI_API_KEY ||
  process.env.AI_API_KEY ||
  process.env.GEMINI_API_KEY ||
  "";

const baseURL =
  process.env.OPENAI_BASE_URL ||
  process.env.AI_BASE_URL ||
  process.env.GEMINI_BASE_URL ||
  process.env.GEMINI_BASI_URL || // legacy typo support
  undefined;

let ai;
if (!apiKey) {
  // Fallback mock so API routes can respond gracefully in dev without keys
  ai = {
    chat: {
      completions: {
        create: async ({ messages }) => {
          const lastUser = [...(messages || [])]
            .reverse()
            .find((m) => m.role === "user");
          const content = (lastUser?.content || "").toString().trim();
          return {
            choices: [
              {
                message: { content },
              },
            ],
          };
        },
      },
    },
  };
} else {
  ai = new OpenAI({ apiKey, baseURL });
}

export default ai;

