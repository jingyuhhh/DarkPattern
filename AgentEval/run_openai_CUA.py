from openai import OpenAI
from dotenv import load_dotenv

import os

from lmnr import Laminar

load_dotenv()


Laminar.initialize(
    project_api_key=os.getenv("LMNR_API_KEY")
)  # you can also pass project api key here


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

response = client.responses.create(
    model="computer-use-preview",
    tools=[
        {
            "type": "computer_use_preview",
            "display_width": 1024,
            "display_height": 768,
            "environment": "browser",  # other possible values: "mac", "windows", "ubuntu"
        }
    ],
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "Check the latest OpenAI news on bing.com.",
                }
                # Optional: include a screenshot of the initial state of the environment
                # {
                #     type: "input_image",
                #     image_url: f"data:image/png;base64,{screenshot_base64}"
                # }
            ],
        }
    ],
    reasoning={
        "summary": "concise",
    },
    truncation="auto",
)

print(response.output)
