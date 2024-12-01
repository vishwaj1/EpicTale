import axios, { AxiosResponse } from "axios";

// Define interfaces for better type management
interface BaseProviderConfig {
  model: string;
  url?: string;
  apiKey: string;
  function: (prompt: string, config: BaseProviderConfig) => Promise<string[]>;
}

// Configuration includes API model, endpoint, key, and request
const config: { [key: string]: BaseProviderConfig } = {
  chatgpt: {
    model: "gpt-4",
    url: "https://api.openai.com/v1/chat/completions",
    apiKey: "",
    function: chatgptRequest,
  },

  // Add other LLM configurations here
};

// Central request function to switch between providers
const request = async (
  prompt: string,
  apiKey: string,
  provider: string
): Promise<string[]> => {
  const providerConfig = config[provider];
  if (!providerConfig) {
    throw new Error("Unsupported provider");
  }
  providerConfig.apiKey = apiKey || providerConfig.apiKey;
  return providerConfig.function(prompt, providerConfig);
};

// ChatGPT request function
async function chatgptRequest(
  prompt: string,
  config: BaseProviderConfig
): Promise<string[]> {
  const { url, apiKey, model } = config; // Destructuring for ease of use

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const data = {
    model: model,
    messages: [{ role: "user", content: prompt }], // OpenAI's new chat completion format
    temperature: 0.7,
  };

  try {
    const response: AxiosResponse = await axios.post(url!, data, { headers });
    return response.data.choices.map((choice: any) => choice.message.content); // Correct response parsing
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      console.log("Rate limit exceeded, retrying in 3 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return chatgptRequest(prompt, config); // Retry with the same config object
    } else {
      console.error("Error occurred while making request:", error);
      throw error;
    }
  }
}

export default request;
