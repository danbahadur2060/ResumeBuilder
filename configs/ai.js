import OpenAI from "openai";

const openai = new OpenAI({
    apiKey:process.env.GEMINI_API_KEY,
    baseURL:process.env.GEMINI_BASI_URL
});

