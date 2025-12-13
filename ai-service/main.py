from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, ConfigDict
from fastapi.middleware.cors import CORSMiddleware
from ai_service import ai_service

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatSettings(BaseModel):
    # This configuration allows extra fields (like 'maxTokens', 'model') to be passed without error
    model_config = ConfigDict(extra='ignore')

    mood: str = "professional"
    systemPrompt: str = "You are a helpful AI."
    temperature: float = 0.7
    # Add other fields if you need them specifically, otherwise 'extra=ignore' handles them

class ChatRequest(BaseModel):
    message: str
    settings: ChatSettings 

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        # Pass all settings (including extras) to the service
        settings_dict = request.settings.model_dump()
        response_text = ai_service.generate_chat_response(request.message, settings_dict)
        return {"response": response_text}
    except Exception as e:
        print(f"ENDPOINT ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)