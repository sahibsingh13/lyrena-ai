// OpenRouter API integration for Lyrena AI
// Supports multiple state-of-the-art language models

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "YOUR_OPENROUTER_API_KEY";

// Available models through OpenRouter
export const AVAILABLE_MODELS = {
  "gpt-4": "openai/gpt-4",
  "gpt-4-turbo": "openai/gpt-4-turbo",
  "gpt-3.5-turbo": "openai/gpt-3.5-turbo",
  "claude-3-opus": "anthropic/claude-3-opus",
  "claude-3-sonnet": "anthropic/claude-3-sonnet",
  "claude-3-haiku": "anthropic/claude-3-haiku",
  "gemini-pro": "google/gemini-pro",
  "llama-2-70b": "meta-llama/llama-2-70b-chat",
  "mixtral-8x7b": "mistralai/mixtral-8x7b-instruct"
};

// Default model - using GPT-3.5 Turbo as it's cost-effective and reliable
const DEFAULT_MODEL = AVAILABLE_MODELS["gpt-3.5-turbo"];

async function runChat(prompt, model = DEFAULT_MODEL, userApiKey = null) {
  try {
    const activeApiKey = userApiKey || API_KEY;
    
    if (!activeApiKey || activeApiKey === "YOUR_OPENROUTER_API_KEY") {
      throw new Error("OpenRouter API key not configured. Please add your API key in Settings.");
    }

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${activeApiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "Lyrena AI"
      },
      body: JSON.stringify({
        model: AVAILABLE_MODELS[model] || model,
        messages: [
          {
            role: "system",
            content: "You are Lyrena AI, a helpful and knowledgeable AI assistant. Provide accurate, helpful, and engaging responses to user queries. Format your responses with clear structure using markdown when appropriate."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`OpenRouter API error: ${data.error.message}`);
    }

    if (!data.choices || data.choices.length === 0) {
      throw new Error("No response received from the model");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error in runChat:", error);
    
    // Return a user-friendly error message
    if (error.message.includes("API key not configured")) {
      return "🔑 **Configuration Required**: Please set up your OpenRouter API key to start chatting with Lyrena AI. Check the README.md for setup instructions.";
    } else if (error.message.includes("OpenRouter API error")) {
      return "⚠️ **API Error**: There was an issue connecting to the AI service. Please try again in a moment.";
    } else {
      return "❌ **Connection Error**: Unable to process your request right now. Please check your internet connection and try again.";
    }
  }
}

// Function to get available models
export function getAvailableModels() {
  return Object.keys(AVAILABLE_MODELS);
}

// Function to get model display name
export function getModelDisplayName(modelKey) {
  const displayNames = {
    "gpt-4": "GPT-4",
    "gpt-4-turbo": "GPT-4 Turbo",
    "gpt-3.5-turbo": "GPT-3.5 Turbo",
    "claude-3-opus": "Claude 3 Opus",
    "claude-3-sonnet": "Claude 3 Sonnet",
    "claude-3-haiku": "Claude 3 Haiku",
    "gemini-pro": "Gemini Pro",
    "llama-2-70b": "Llama 2 70B",
    "mixtral-8x7b": "Mixtral 8x7B"
  };
  return displayNames[modelKey] || modelKey;
}

export default runChat;