import { Injectable } from '@nestjs/common';
import { InferenceClient } from "@huggingface/inference";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
  constructor(private config: ConfigService) {}
  async sendMessage(userMessage: string){
    const messages = userMessage
    const client = new InferenceClient(this.config.get("HUGGING_FACE_API_KEY"));
    const chatCompletion = await client.chatCompletion({
        provider: "novita",
        model: "deepseek-ai/DeepSeek-V3-0324",
        messages: [
            {
                role: "user",
                content: messages,
            },
        ],
    });
    return chatCompletion.choices[0].message.content;
  }
}