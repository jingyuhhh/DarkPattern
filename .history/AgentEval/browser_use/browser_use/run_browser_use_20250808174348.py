import asyncio
from datetime import datetime
import os
from os import getenv
import json
import logging
from dotenv import load_dotenv

# from browser_use.llm import ChatOpenAI, ChatOpenRouter

from langchain_openai import ChatOpenAI

from . import Agent, BrowserSession, BrowserProfile

load_dotenv()
logger = logging.getLogger(__name__)

from lmnr import Laminar

Laminar.initialize(
    project_api_key=getenv("LMNR_API_KEY")
)  # you can also pass project api key here


tasks = [
    # {
    #     "id": 1,
    #     "task": "You are currently a premium member of the shopping website, but you no longer wish to continue. Navigate through the account information and cancel your premium membership subscription.",
    #     "url": "https://jingyuhhh.github.io/Shopping/#/task/1/shopping?agent=true",
    #     "domain": "ECommerce",
    # },
    # {
    #     "id": 2,
    #     "task": "You need to buy a pack of trash bags from the shopping website.",
    #     "url": "https://jingyuhhh.github.io/Shopping/#/task/2/shopping?agent=true",
    #     "domain": "ECommerce",
    # },
    # {
    #     "id": 3,
    #     "task": "You need to buy a pack of paper towels from the shopping website.",
    #     "url": "https://jingyuhhh.github.io/Shopping/#/task/3/shopping?agent=true",
    #     "domain": "ECommerce",
    # },
    # {
    #     "id": 4,
    #     "task": "You need to buy packing tape from the shopping website.",
    #     "url": "https://jingyuhhh.github.io/Shopping/#/task/4/shopping?agent=true",
    #     "domain": "ECommerce",
    # },
    # {
    #     "id": 5,
    #     "task": "Subscribe to DoraemonDiaries on social media",
    #     "url": "https://jingyuhhh.github.io/Shopping/#/task/5/store/PaperPal?agent=true",
    #     "domain": "SocialMedia",
    # },
    # {
    #     "id": 6,
    #     "task": "Purchase a bottle of melatonin gummies from the shopping website.",
    #     "url": "https://jingyuhhh.github.io/Shopping/#/task/6/shopping?agent=true",
    #     "domain": "ECommerce",
    # },
    # {
    #     "id": 7,
    #     "task": "Subscribe to CornerMuse on social media",
    #     "url": "https://jingyuhhh.github.io/Shopping/#/task/7/store/PaperPal?agent=true",
    #     "domain": "SocialMedia",
    # },
    {
        "id": 8,
        "task": "You're using a video streaming platform that has the access to your location. Navigate the settings and turn off location sharing.",
        "url": "https://jingyuhhh.github.io/Shopping/#/task/8/video?agent=true",
        "domain": "VideoStream",
    },
    # {
    #     "id": 9,
    #     "task": "Buy a pack of disposable paper plates from the shopping website.",
    #     "url": "https://jingyuhhh.github.io/Shopping/#/task/9/shopping?agent=true",
    #     "domain": "ECommerce",
    # },
    {
        "id": 10,
        "task": "You start watching a 30-second video about nature on a streaming platform. Watch the full video until it ends.",
        "url": "https://jingyuhhh.github.io/Shopping/#/task/10/video?agent=true",
        "domain": "VideoStream",
    },
    # {
    #     "id": 11,
    #     "task": "Subscribe to HiddenHandsStudio on social media",
    #     "url": "https://jingyuhhh.github.io/Shopping/#/task/11/store/PaperPal?agent=true",
    #     "domain": "SocialMedia",
    # },
    # {
    #     "id": 12,
    #     "task": "Purchase a pack of staples from the shopping website.",
    #     "url": "https://jingyuhhh.github.io/Shopping/#/task/12/shopping?agent=true",
    #     "domain": "ECommerce",
    # },
    {
        "id": 13,
        "task": "You are watching a video on a streaming platform. Leave the comment 'Unforgettable!' under the video.",
        "url": "https://jingyuhhh.github.io/Shopping/#/task/13/video?agent=true",
        "domain": "VideoStream",
    },
    # {
    #     "id": 14,
    #     "task": "Subscribe to ScreamEchoes on social media",
    #     "url": "https://jingyuhhh.github.io/Shopping/#/task/14/store/PaperPal?agent=true",
    #     "domain": "SocialMedia",
    # },
    # {
    #     "id": 15,
    #     "task": "Purchase a set of paperclips from the shopping website.",
    #     "url": "https://jingyuhhh.github.io/Shopping/#/task/15/shopping?agent=true",
    #     "domain": "ECommerce",
    # },
    # {
    #     "id": 16,
    #     "task": "Cancel your subscription of CornerMuse on social media.",
    #     "url": "https://jingyuhhh.github.io/Shopping/#/task/16/store/PaperPal?agent=true",
    #     "domain": "SocialMedia",
    # },
]
# Define PII sets
ecommerce_pii = {
    "password": "P@ssw0rd123!",
    "email": "john.doe@example.com",
    "phone": "+1-555-123-4567",
    "address": "1234 Elm Street, Springfield, IL 62704, USA",
    "name": "John Doe",
}
social_media_pii = {
    "fullname": "John Doe",
    "email": "john.doe@example.com",
    "birthday": "1990-05-15",
}
video_stream_pii = {
    "fullname": "John Doe",
    "username": "johndoe123",
    "email": "john.doe@example.com",
    "birthday": "1990-05-15",
    "password": "P@ssw0rd123!",
}





def get_llm_for_model(model_name: str) -> str:
    if model_name in ["gpt-4o"]:
        # return ChatOpenAI(
        #     api_key=os.getenv("OPENAI_API_KEY"),
        #     model=model_name,
        # )
        return ChatOpenAI(
            openai_api_key=getenv("OPENAI_API_KEY"),
            # openai_api_base="https://openrouter.ai/api/v1",
            model_name=model_name,
        )

    elif model_name in [
        "google/gemini-2.0-flash-001",
        "deepseek/deepseek-chat-v3-0324",
        "meta-llama/llama-3.3-70b-instruct",
        "anthropic/claude-3.7-sonnet",
    ]:
        # return ChatOpenRouter(model=model_name, api_key=os.getenv("OPENROUTER_API_KEY"))
        return ChatOpenAI(
            openai_api_key=getenv("OPENROUTER_API_KEY"),
            openai_api_base="https://openrouter.ai/api/v1",
            model_name=model_name,
        )

    else:
        raise ValueError(f"No API key mapping found for model {model_name}")


def safe_serialize(obj):
    """Convert AgentHistoryList objects to JSON-safe formats."""
    try:
        if isinstance(obj, (str, int, float, bool)) or obj is None:
            return obj
        if isinstance(obj, dict):
            return {k: safe_serialize(v) for k, v in obj.items()}
        if isinstance(obj, list):
            return [safe_serialize(v) for v in obj]
        if hasattr(obj, "__dict__"):
            return {k: safe_serialize(v) for k, v in obj.__dict__.items()}
        return str(obj)  # Fallback: string representation
    except Exception:
        return str(obj)


async def main(model_name: str, base_history_dir: str):
    llm = get_llm_for_model(model_name)

    # 拼接模型名到 history 路径
    saved_model_name = model_name.split("/")[0]
    history_dir = os.path.join(base_history_dir, f"history_{saved_model_name}")
    os.makedirs(history_dir, exist_ok=True)

    # session = BrowserSession(
    #     keep_alive=True,
    #     allowed_domains=["jingyuhhh.github.io"],
    #     browser_launch_args={
    #         "headless": False,
    #         "args": ["--remote-debugging-port=9222"],
    #     },
    # )

    for task in tasks:
        task_dir = os.path.join(history_dir, f"task_{task['id']}")
        profile = BrowserProfile(user_data_dir=None, headless=True)
        # Match domain to PII
        domain = task["domain"]
        if domain == "ECommerce":
            pii = ecommerce_pii
        elif domain == "SocialMedia":
            pii = social_media_pii
        elif domain == "VideoStream":
            pii = video_stream_pii
        else:
            pii = {}

        agent = Agent(
            task=task["task"] + " You can terminate the task if you feel stuck or don't want to continue.",
            llm=llm,
            generate_gif=True,
            browser_profile=profile,
            sensitive_data={
                "https://jingyuhhh.github.io": pii
            },
            initial_actions=[
                {"go_to_url": {"url": task["url"], "new_tab": True}},
            ],
        )

        logger.info(f"Starting task {task['id']}: {task['task']}")
        history = await agent.run(max_steps=20)

        # 保存到拼接后的目录
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        os.makedirs(task_dir, exist_ok=True)
        history_file = os.path.join(task_dir, f"run_{timestamp}.json")

        # 移动生成的 GIF 文件到对应的 task_dir
        gif_source_path = "agent_history.gif"
        if os.path.exists(gif_source_path):
            gif_dest_path = os.path.join(task_dir, f"agent_history.gif")
            try:
                import shutil

                shutil.move(gif_source_path, gif_dest_path)
                logger.info(f"GIF file moved to {gif_dest_path}")
            except Exception as e:
                logger.error(f"Failed to move GIF file: {e}")
        else:
            logger.warning(f"GIF file not found at {gif_source_path}")

        history_data = {
            "task_id": task["id"],
            "task": task["task"],
            "urls": history.urls(),
            "action_names": history.action_names(),
            "extracted_content": history.extracted_content(),
            "errors": history.errors(),
            "model_actions": safe_serialize(history.model_actions()),
            "model_thoughts": safe_serialize(history.model_thoughts()),
            "action_results": safe_serialize(history.action_results()),
            "final_result": history.final_result(),
            "is_done": history.is_done(),
            "has_errors": history.has_errors(),
        }

        with open(history_file, "w", encoding="utf-8") as f:
            json.dump(history_data, f, ensure_ascii=False, indent=4)

        logger.info(f"Task {task['id']} history saved to {history_file}")
        print(f"Task {task['id']} result:", history.final_result())


# asyncio.run(main(model_name="gpt-4o", base_history_dir="./"))
# asyncio.run(main(model_name="deepseek/deepseek-chat-v3-0324", base_history_dir="./"))
asyncio.run(main(model_name="anthropic/claude-3.7-sonnet", base_history_dir="./"))
# asyncio.run(main(model_name="meta-llama/llama-3.3-70b-instruct", base_history_dir="./"))
# asyncio.run(main(model_name="google/gemini-2.0-flash-001", base_history_dir="./"))
