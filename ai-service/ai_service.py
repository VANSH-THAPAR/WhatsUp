import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

class AIService:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            print("CRITICAL: GOOGLE_API_KEY is missing.")

        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash", 
            temperature=0.7,
            google_api_key=api_key
        )

    def generate_chat_response(self, message: str, settings: dict):
        try:
            # 1. Extract inputs
            mood = settings.get('mood', 'Helpful')
            system_instruction = settings.get('systemPrompt', "You are a helpful assistant.")
            temp = float(settings.get('temperature', 0.7))
            
            # 2. RAG Logic (Simple Document Injection)
            # If the user enabled docs, we inject the text directly into the system prompt.
            context_block = ""
            if settings.get('enableDocs'):
                doc_content = settings.get('documentContent', "")
                if doc_content:
                    context_block = f"\n\n=== DOCUMENT CONTEXT ===\n{doc_content}\n\nINSTRUCTION: Answer the user's question using the context above."

            # 3. Create the Template
            # We use a clean template structure that LangChain optimizes for Gemini
            prompt = ChatPromptTemplate.from_messages([
                ("system", "You are an AI with the following persona: {mood}.\nCore Instruction: {system_instruction}\n{context_block}"),
                ("human", "{input}"),
            ])

            # 4. Bind Temperature & Run
            chain = prompt | self.llm.bind(temperature=temp) | StrOutputParser()

            return chain.invoke({
                "mood": mood,
                "system_instruction": system_instruction,
                "context_block": context_block,
                "input": message
            })

        except Exception as e:
            print(f"AI ERROR: {e}")
            return f"I encountered an error: {str(e)}"

ai_service = AIService()