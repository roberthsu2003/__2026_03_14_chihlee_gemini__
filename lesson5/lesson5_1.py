"""
title: 基礎 Action 範例
author: YourName
version: 1.0
"""
from typing import Optional, Callable, Any

class Action:
    def __init__(self):
        pass

    async def action(
        self,
        body: dict,
        __user__: Optional[dict] = None,
        __event_emitter__: Optional[Callable[..., Any]] = None,
    ) -> Optional[dict]:
        
        # 取得所有對話
        messages = body.get("messages", [])
        if not messages:
            return body

        # 取得最後點擊欲處理的那則訊息
        last_message = messages[-1]
        message_content = last_message.get("content", "")
        message_len = len(message_content)

        # ⚠️ 由於目前前端接收 Action 的 SSE 串流時易發生 JSON 解析錯誤
        # 最穩定相容的做法是直接將結果附加在對話內容中並回傳 body
        last_message["content"] += f"\n\n*(系統分析：這則訊息的長度是 {message_len} 個字)*"

        # 回傳變更後的 body 讓前端更新畫面
        return body