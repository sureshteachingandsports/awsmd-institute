import { chatConfig, defaultResponses } from '../config/chat';

interface ChatMessage {
  text: string;
  attachments?: Array<{
    type: string;
    url: string;
    name: string;
  }>;
  history?: Array<{
    type: 'user' | 'bot';
    text: string;
  }>;
}

interface ChatError extends Error {
  code?: string;
  status?: number;
}

export class ChatService {
  static async processMessage(message: ChatMessage) {
    try {
      // Validate message
      if (!message.text && !message.attachments?.length) {
        throw Object.assign(new Error('Message cannot be empty'), { 
          code: 'empty_message',
          status: 400 
        });
      }

      if (message.text.length > chatConfig.maxMessageLength) {
        throw Object.assign(new Error('Message too long'), {
          code: 'message_too_long',
          status: 400
        });
      }

      // Process attachments if any
      if (message.attachments?.length) {
        message.attachments.forEach(attachment => {
          if (!chatConfig.allowedFileTypes.includes(attachment.type)) {
            throw Object.assign(new Error(defaultResponses.invalidFileType), {
              code: 'invalid_file_type',
              status: 400
            });
          }
        });
      }

      // Send to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.text,
          attachments: message.attachments,
          history: message.history
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw Object.assign(new Error(error.error || 'API request failed'), {
          code: 'api_error',
          status: response.status
        });
      }

      return await response.json();

    } catch (error) {
      console.error('Chat processing error:', error);
      throw error;
    }
  }
} 