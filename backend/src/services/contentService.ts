import * as cheerio from "cheerio";
import axios from "axios";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Helper: Check if URL is root path
const validateLandingPageURL = (urlString: string): boolean => {
  const url = new URL(urlString);
  const segments = url.pathname.split("/").filter(Boolean);
  return segments.length < 1;
};

// Extract meaningful visible content
const extractRelevantContent = ($: cheerio.CheerioAPI): string => {
  const title = $("title").text();
  const meta = $('meta[name="description"]').attr("content") || "";
  const headline = $("h1").first().text();
  const ctas = $(
    "a:contains('Sign up'), a:contains('Get started'), a:contains('Try now')"
  )
    .map((_, el) => $(el).text().trim())
    .get();

  const visibleText = $("body").text().replace(/\s+/g, " ").trim();
  const aboveFold = $("body")
    .find("*")
    .slice(0, 15)
    .text()
    .replace(/\s+/g, " ")
    .trim();

  const trustSignals = $(
    "img[alt*='logo'], img[alt*='client'], div:contains('Trusted'), div:contains('As seen on')"
  )
    .map((_, el) => $(el).text().trim() || $(el).attr("alt"))
    .get()
    .filter(Boolean)
    .slice(0, 5);

  const hasForm = $(
    "form, input[type='email'], input[type='text'], input[type='submit']"
  ).length > 0;

  const heroImage = $("img").first().attr("src") || "None found";

  return `
Page Title: ${title}
Meta Description: ${meta}
Main Headline: ${headline}
Calls to Action: ${ctas.join(", ")}
Above-the-Fold Snapshot: ${aboveFold}
Trust Signals: ${trustSignals.join(", ")}
Lead Form Present: ${hasForm ? "Yes" : "No"}
Hero Image: ${heroImage}
Visible Text (trimmed): ${visibleText.slice(0, 2000)}
  `;
};

// Fetch & clean HTML
export const fetchContentFromURL = async (url: string): Promise<string> => {
  if (!url) throw new Error("URL is required");
  if (!validateLandingPageURL(url)) throw new Error("Invalid landing page URL");

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const html = response.data.toString("utf-8");
    const $ = cheerio.load(html);
    $("script, style, noscript, iframe, object").remove();
    $("*")
      .contents()
      .each(function () {
        if (this.type === "comment") $(this).remove();
      });

    const extracted = extractRelevantContent($);
    console.log("Extracted Content:", extracted);
    return extracted;
  } catch (error) {
    console.error("Error fetching content from URL:", error);
    throw new Error("Failed to fetch content from URL");
  }
};

// Analyze with Groq
export const givePageFeedback = async (content: string): Promise<string> => {
  if (!content) throw new Error("Content is required");

  const prompt = `
You are a senior UX and web conversion expert. Your task is to analyze a landing page and return a tightly structured checklist with no filler or summary.

Your response MUST be split into **three separate sections**, with very specific formatting.

---
SECTION 1: Strengths (3–5 lines)
Each line must begin with ✅

✅ Example strength 1  
✅ Example strength 2

---
SECTION 2: Problems (3–5 lines)
Each line must begin with ❌

❌ Example issue 1  
❌ Example issue 2

---
SECTION 3: Actionable Recommendations (3–5 lines)
Each line must begin with a bullet point (•)  
DO NOT use ✅, ❌, or any emojis in this section

• Example recommendation 1  
• Example recommendation 2

---
Do NOT include:
- Any section headers
- Any introductions (like “Here’s what I found”)
- Any conclusions or summaries
- Any markdown or formatting beyond the bullets above

Respond ONLY with the checklist items as shown above.
If no recommendation is found, write:
• No recommendations available
`;

  try {
    const response = await groq.chat.completions.create({
      model: "mistral-saba-24b",
      messages: [
        { role: "system", content: prompt },
        {
          role: "user",
          content: `Landing Page Summary:\n${content}`,
        },
      ],
    });

    return response.choices[0].message?.content || "";
  } catch (error) {
    console.error("Error giving feedback:", error);
    throw new Error("Failed to give feedback");
  }
};
