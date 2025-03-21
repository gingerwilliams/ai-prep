// import { OpenAI } from "@langchain/openai";
import z from "zod";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { Document } from 'langchain/document';
import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z.string().describe("The mood of the person who wrote the journal entry."),
        subject: z.string().describe("The subject of the journal entry. Six words max"),
        summary: z.string().describe("Short summary of the entire entry."),
        positive: z.boolean().describe("is the journal entry positive? (i.e. does it contain positive emotions, or negative emotions?)."),
        color: z.string().describe("a hexidecimal code that represents the mood of the entry. Example #0101fe for blue representing happiness."),
    })
)

const getPrompt = async (content) => {
    const format_instructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
        template:
          'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: { format_instructions },
    })

    const input = await prompt.format({
        entry: content,
    })
    
    console.log("propmt input:", input)
    return input
}

export const analyze = async (content) => {
    const model = new ChatOpenAI({ 
        temperature: 0, 
        modelName: "gpt-3.5-turbo",
        apiKey: process.env.OPENAI_API_KEY,
    })
    const input = await getPrompt(content)
    const result = await model.invoke(input)

    try {
        return parser.parse(result.content as string)
    } catch (err) {
        console.log(err)
    }
}

export const qa = async (question, entries) => {
    // Turn entries/content into a langchain document
    const docs = entries.map(entry => {
        return new Document({
            pageContent: entry.content,
            // then add metadata to it for sourcing results
            metadata: {
                id: entry.id,
                createdAt: entry.createdAt
            }
        })
    })

    const model = new ChatOpenAI({
        temperature: 0,
        modelName: "gpt-3.5-turbo",
        apiKey: process.env.OPENAI_API_KEY,
    })

    // chain multiple llm calls together
    const chain = loadQARefineChain(model)

    // create embedding/group of vectors (numbers)
    const embeddings = new OpenAIEmbeddings()

    // create a vector store to store those embeddings/vectores in memory
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings)

    // create a similary pairing of entries and question
    const relevantDocs = await store.similaritySearch(question)

    // return result
    const res = await chain.invoke({
        input_documents: relevantDocs,
        question,
    })
    
    return res.output_text
}