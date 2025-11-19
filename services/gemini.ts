import { GoogleGenAI, Type } from "@google/genai";
import { ArticleCategory, BlogPost } from "../types";

// NOTE: In a real app, we would not instantiate this on every call if possible, but for this demo it's fine.
// We must ensure process.env.API_KEY is available.

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateInitialPosts = async (): Promise<BlogPost[]> => {
  if (!process.env.API_KEY) {
    return getMockPosts();
  }

  const ai = getAI();
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 6 engaging blog post summaries for "Boardgame Babylon", a site about board games, reviews, and gamification.
      
      Requirements:
      1. Mix of categories: Reviews of modern classics, Industry News, and Gamification in business/education.
      2. Make them sound like they were migrated from a high-quality Medium publication (professional, insightful).
      3. One post MUST be about the "Return of the Boardgame Babylon Podcast".
      4. Provide realistic dates (some recent, some "archived" from 2023/2024).
      
      Return strictly JSON conforming to the schema.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              date: { type: Type.STRING },
              category: { type: Type.STRING }, // We will map string to enum later
              tags: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["id", "title", "excerpt", "date", "category", "tags"]
          }
        }
      }
    });

    if (response.text) {
      const rawPosts = JSON.parse(response.text);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return rawPosts.map((p: any, index: number) => ({
        ...p,
        id: `post-${index}-${Date.now()}`,
        imageUrl: `https://picsum.photos/800/600?random=${index}`,
        author: "Babylon Team",
        isMigrated: index > 1, // Simulate some being migrated
        seoScore: Math.floor(Math.random() * (100 - 85) + 85) // Random high SEO score
      }));
    }
    return getMockPosts();
  } catch (error) {
    console.error("Gemini API error, falling back to mock:", error);
    return getMockPosts();
  }
};

export const generateFullArticle = async (title: string, category: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return `## ${title}\n\n*(Gemini API Key missing - displaying placeholder content)*\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
  }

  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Write a full, detailed, and SEO-optimized blog post for the title: "${title}" in the category "${category}".
      
      Tone: Professional, enthusiastic, and authoritative. Like a top-tier board game journalist or gamification expert.
      Structure:
      - Engaging Introduction
      - Key Takeaways (Bullet points)
      - In-depth Analysis/Review
      - Conclusion
      - Call to Action (Listen to the podcast).
      
      Format: Markdown.`,
    });
    return response.text || "Content generation failed.";
  } catch (error) {
    console.error("Error generating article:", error);
    return "Error generating content. Please try again later.";
  }
};

// Fallback data
const getMockPosts = (): BlogPost[] => [
  {
    id: '1',
    title: "The Podcast Returns! Boardgame Babylon 2.0",
    excerpt: "After a hiatus, we are back with better audio, bigger guests, and more hot takes on the industry.",
    author: "Editor in Chief",
    date: "2024-05-20",
    category: ArticleCategory.PODCAST,
    imageUrl: "https://picsum.photos/800/600?random=1",
    tags: ["Announcement", "Podcast"],
    isMigrated: false,
    seoScore: 98
  },
  {
    id: '2',
    title: "Gamification in 2025: Beyond Leaderboards",
    excerpt: "Why points and badges are no longer enough to engage the modern workforce.",
    author: "Gamification Expert",
    date: "2024-04-15",
    category: ArticleCategory.GAMIFICATION,
    imageUrl: "https://picsum.photos/800/600?random=2",
    tags: ["Business", "Psychology"],
    isMigrated: true,
    seoScore: 92
  },
  {
    id: '3',
    title: "Review: The Castles of Burgundy (Special Edition)",
    excerpt: "Is the deluxe upgrade worth the hefty price tag? We dive deep into the components and gameplay.",
    author: "Review Team",
    date: "2024-03-10",
    category: ArticleCategory.REVIEW,
    imageUrl: "https://picsum.photos/800/600?random=3",
    tags: ["Eurogame", "Review"],
    isMigrated: true,
    seoScore: 89
  }
];