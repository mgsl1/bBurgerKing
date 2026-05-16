import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Wait, I should implement the AI routes here
  app.post("/api/ai/recommend", async (req, res) => {
    try {
      const { mood } = req.body;
      const menuItems = [
        { id: "1", name: "Whopper", category: "burgers", price: 6.49, description: "Flame-grilled beef, tomatoes, lettuce, mayo, ketchup, pickles, onions." },
        { id: "2", name: "Chicken Fries", category: "chicken", price: 4.49, description: "Crispy chicken shaped like fries." },
        { id: "3", name: "Bacon King", category: "burgers", price: 8.49, description: "Two flame-grilled beef patties, thick-cut smoked bacon, melted American cheese." },
        { id: "4", name: "Impossible Whopper", category: "burgers", price: 6.99, description: "Plant-based patty, tomatoes, lettuce, mayo, ketchup, pickles, onions." },
        { id: "5", name: "Onion Rings", category: "sides", price: 2.99, description: "Golden, crispy onion rings." },
        { id: "6", name: "Hershey's Sundae Pie", category: "desserts", price: 2.49, description: "Chocolate crust, chocolate crme filling, Hershey's chocolate chips." }
      ];

      const prompt = `
You are the BK Menu Wizard, a fun and enthusiastic Burger King recommendation bot.
The customer said: "${mood}"

Our available menu items (JSON):
${JSON.stringify(menuItems)}

Based on their mood/craving, recommend exactly 3 menu items.
Return a JSON array with this shape:
[{ "id": "...", "name": "...", "reason": "one fun sentence why", "matchScore": 95 }]
Only return valid JSON. No markdown. No extra text.
`;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
      });

      const text = response.text || "[]";
      const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const recommendations = JSON.parse(cleanText);

      res.json({ recommendations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate recommendations." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
