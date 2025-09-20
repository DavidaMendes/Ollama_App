import os
from langchain_ollama.llms import OllamaLLM

BASE_URL = os.environ.get("OLLAMA_HOST", "http://ollama.eastus.cloudapp.azure.com:11434")
MODEL = os.environ.get("OLLAMA_MODEL", "phi3:mini")

llm = OllamaLLM(model=MODEL, base_url=BASE_URL)

def main():
    print(f"LangChain -> Ollama @ {BASE_URL} model={MODEL}")
    while True:
        prompt = input("\nVocê: ")
        if prompt.strip().lower() in ("exit","sair","quit","q"):
            break
        resp = llm.invoke(prompt)
        
        print("\nIA:", resp)

if __name__ == "__main__":
    main()
