"""
title: 基礎 Action 範例
author: YourName
version: 1.0
requirements: pydantic
"""

from pydantic import BaseModel


class Action:

    # 設定區（可以在 UI 修改）
    class Valves(BaseModel):
        nickname: str = "xxxxx"

    def __init__(self):
        self.valves = self.Valves()

    async def action(self, body: dict):

        # 讀取設定值
        name = self.valves.nickname

        message = body["messages"][-1]["content"]

        body["messages"][-1]["content"] += f"(您好 {name})"

        return body
