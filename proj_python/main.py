import google.generativeai as genai
from config import settings

genai.configure(api_key=settings.gemini_api_key)
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Put this in old medieval style: I hope you're in good health and doing very well.")
print(response.text)