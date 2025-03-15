// import { OpenAI } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";

export const analyze = async (prompt) => {
    const model = new ChatOpenAI({ 
        temperature: 0, 
        modelName: "gpt-3.5-turbo",
        apiKey: process.env.OPENAI_API_KEY,
    })
    const result = await model.invoke(prompt)
    console.log(result.content)
}