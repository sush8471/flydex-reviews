export const API_URL = "https://tedic.app.n8n.cloud/webhook/flydex-reviews";

export interface ReviewRequest {
  review_text: string;
  tone: "professional" | "friendly" | "apologetic";
  business_name?: string;
}

export interface ReviewResponse {
  reply: string;
  sentiment: "positive" | "negative" | "neutral";
  tone_used: string;
  word_count: number;
  status: "success" | "error";
  error?: string;
}

export async function generateReply(data: ReviewRequest): Promise<ReviewResponse> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const responseData = await response.json();

    // Handle n8n structure: [{ "output": "..." }] or { "output": "..." }
    let reply = "";
    let sentiment: "positive" | "negative" | "neutral" = "neutral";
    let tone_used = data.tone;

    if (Array.isArray(responseData) && responseData.length > 0) {
      const firstItem = responseData[0];
      reply = firstItem.output || firstItem.reply || "";
      sentiment = firstItem.sentiment || "neutral";
      tone_used = firstItem.tone_used || data.tone;
    } else {
      reply = responseData.output || responseData.reply || "";
      sentiment = responseData.sentiment || "neutral";
      tone_used = responseData.tone_used || data.tone;
    }

    return {
      reply: reply,
      sentiment: sentiment,
      tone_used: tone_used,
      word_count: reply.split(/\s+/).filter(Boolean).length,
      status: "success",
    };
  } catch (error) {
    console.error("Error generating reply:", error);
    return {
      reply: "",
      sentiment: "neutral",
      tone_used: data.tone,
      word_count: 0,
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
