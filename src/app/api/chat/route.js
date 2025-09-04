import chatData from "@/app/components/chatData";

// Optional: replace with free AI API if you want later
const FREE_AI_API = null; 

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message) throw new Error("No message provided");

    let reply = null;

    // Step 1: Keyword-based response
    const lower = message.toLowerCase();
    let bestMatch = null;
    let bestKeywordLength = 0;
    for (const item of chatData) {
      for (const kw of item.keywords) {
        if (lower.includes(kw) && kw.length > bestKeywordLength) {
          bestMatch = item;
          bestKeywordLength = kw.length;
        }
      }
    }
    if (bestMatch) reply = bestMatch.response;

    // Step 2: Optional AI API (fast free-tier)
    if (FREE_AI_API) {
      try {
        const aiPromise = fetch(FREE_AI_API.url, {
          method: "POST",
          headers: { ...FREE_AI_API.headers, "Content-Type": "application/json" },
          body: JSON.stringify({ inputs: message }),
        }).then((res) => res.json());

        // 3-second race with fallback
        const timeout = new Promise((resolve) =>
          setTimeout(() => resolve({ timeout: true }), 3000)
        );

        const result = await Promise.race([aiPromise, timeout]);

        if (!result.timeout && result[0]?.generated_text) {
          reply = result[0].generated_text.slice(0, 250);
        }
      } catch (err) {
        console.warn("AI API failed, using fallback:", err.message);
      }
    }

    // Step 3: Fallback if nothing
    if (!reply) reply = "⚠️ Sorry, Vaani is taking too long to respond. Try again!";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response(
      JSON.stringify({ reply: "⚠️ Something went wrong, try again!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
