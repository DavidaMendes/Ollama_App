import os
from langchain_ollama.llms import OllamaLLM

BASE_URL = os.environ.get("OLLAMA_HOST", "http://ollama.eastus.cloudapp.azure.com:11434")
MODEL = os.environ.get("OLLAMA_MODEL", "phi3:mini")

llm = OllamaLLM(model=MODEL, base_url=BASE_URL)

def ask_llm(prompt: str) -> str:
    return llm.invoke(prompt)


