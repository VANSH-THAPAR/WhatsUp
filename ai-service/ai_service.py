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
            print("CRITICAL ERROR: GOOGLE_API_KEY missing!")

        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash", 
            temperature=0.7,
            google_api_key=api_key,
            convert_system_message_to_human=True
        )

    def generate_chat_response(self, message: str, settings: dict):
        try:
            print(f"DEBUG INPUT SETTINGS: {settings}")

            system_instruction = settings.get('systemPrompt') or settings.get('description') or "You are a helpful assistant."
            mood = settings.get('mood', 'Helpful')
            temp = float(settings.get('temperature', 0.7))

            system_message = f"""
            IMPORTANT INSTRUCTION: {system_instruction}
            
            Current Persona: {mood}
            """

            prompt = ChatPromptTemplate.from_messages([
                ("system", system_message),
                ("human", "{input}"),
            ])

            model = self.llm.bind(temperature=temp)

            chain = prompt | model | StrOutputParser()
            return chain.invoke({"input": message})

        except Exception as e:
            print(f"AI ERROR: {e}")
            return f"Error: {str(e)}"

ai_service = AIService()