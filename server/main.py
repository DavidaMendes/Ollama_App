from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services import ask_llm

app = FastAPI(title="Ollama Q&A API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

class PromptResponse(BaseModel):
    answer: str

@app.post("/ask", response_model=PromptResponse)
def ask_endpoint(request: PromptRequest):
    answer = ask_llm(request.prompt)
    return PromptResponse(answer=answer)