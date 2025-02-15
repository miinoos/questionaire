const express = require("express");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.get("/questionaire/dev/api", async (req, res) => {
  const response = await getQuestionaire();
  //   const data = JSON.parse(response);
  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const prompt = `Generate 10 questions based on topic : “Physics”. Give me in a array of JSONs format like the example : 
[
	{
		question : ‘Question1’,
		options : [‘Option 1’ , ‘Option 2’ , ‘Option 3’, ‘Option 4’],
		answer : ‘Option 3’
	},
	{
		question : ‘Question2’,
		options : [‘Option 1’ , ‘Option 2’ , ‘Option 3’, ‘Option 4’],
		answer : ‘Option 1’
	}
]
Make the questions very simple so that it only tests the IQ of the user and no complicated calculations needs to be done. Randomise the order everytime and search for new questions if possible.`;

async function getQuestionaire() {
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text;
}
