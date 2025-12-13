from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, ConfigDict
from fastapi.middleware.cors import CORSMiddleware
from ai_service import ai_service

app = FastAPI()

# Allowed Origins (Local + Production)
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:8000",
    "https://whatsup-vansh.netlify.app",
    "https://whatsup-xuw3.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatSettings(BaseModel):
    model_config = ConfigDict(extra='ignore') # Ignore extra fields from frontend

    mood: str = "professional"
    systemPrompt: str = "You are a helpful AI."
    temperature: float = 0.7
    
    # RAG Features
    enableDocs: bool = False
    documentContent: str = ""

class ChatRequest(BaseModel):
    message: str
    settings: ChatSettings 

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        response_text = ai_service.generate_chat_response(
            request.message, 
            request.settings.model_dump()
        )
        return {"response": response_text}
    except Exception as e:
        print(f"ENDPOINT ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)