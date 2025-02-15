const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.get("/", (req, res) => {
  generateContent();
  res.send("Hello From The Server");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const prompt = "Explain how AI works";

async function generateContent() {
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result;
}
