"""
title: 基礎 Action 範例
author: YourName
version: 1.0
requirements: requests, pydantic
"""

from pydantic import BaseModel, Field
from typing import Optional
import requests


class Action:

    # 設定區（可以在 UI 修改）
    class Valves(BaseModel):
        bot_token: str = Field(
            default="", description="Telegram Bot Token (從 @BotFather 取得)"
        )
        chat_id: str = Field(
            default="", description="你的 Telegram Chat ID (可向 @userinfobot 查詢)"
        )

    def __init__(self):
        self.valves = self.Valves()

    async def action(
        self,
        body: dict,
        __user__=None,
        __event_emitter__=None,
        __event_call__=None,
    ) -> Optional[dict]:
        """將訊息發送到 Telegram"""

        # 讀取設定值
        bot_token = self.valves.bot_token
        chat_id = self.valves.chat_id

        body["messages"][-1]["content"] += f"\n\ 密碼:{bot_token}, 帳號:{chat_id}"

        return body
