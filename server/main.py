from fastapi import FastAPI
from pydantic import BaseModel
from services import ask_llm

app = FastAPI(title="Ollama Q&A API")

class PromptRequest(BaseModel):
    prompt: str

class PromptResponse(BaseModel):
    answer: str

@app.post("/ask", response_model=PromptResponse)
def ask_endpoint(request: PromptRequest):
    answer = ask_llm(request.prompt)
    return PromptResponse(answer=answer)