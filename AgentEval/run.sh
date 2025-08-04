#!/bin/bash
set -e

# 第1个参数：模型名（默认 gpt-4o）
MODEL_NAME=${1:-"gpt-4o"}
        # "google/gemini-2.0-flash-001",
        # "deepseek/deepseek-chat-v3-0324:free",
        # "meta-llama/llama-3.3-70b-instruct",
        # "anthropic/claude-3.7-sonnet",
# 第2个参数：历史文件目录（默认当前目录）
BASE_HISTORY_DIR=${2:-"./"}


echo "Running with model: $MODEL_NAME"
echo "History will be saved in: ${BASE_HISTORY_DIR}history_${MODEL_NAME}/"

python run_browser_use.py --model "$MODEL_NAME" --history_dir "$BASE_HISTORY_DIR"
