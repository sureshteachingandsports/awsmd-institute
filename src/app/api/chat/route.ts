import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { headers } from 'next/headers';

// Rate limiting configuration
const RATE_LIMIT = 10; // messages per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds

// In-memory store for rate limiting (Note: Use Redis in production)
const messageCount = new Map<string, { count: number; timestamp: number }>();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are an AI assistant for iTech Institute, a technology education platform. 

Key information:
- We offer courses in Full Stack Development, AI/ML, Cybersecurity, and Cloud Computing
- Our courses are fully online with live mentoring
- Tuition ranges from $5,000 to $15,000 depending on the program
- We offer flexible payment plans and scholarships
- Programs typically take 6-12 months to complete

Please be:
1. Helpful and concise
2. Professional but friendly
3. Accurate about our course offerings
4. Clear about pricing and duration
5. Encouraging but honest

If you're unsure about specific details, say so rather than making assumptions.`;

export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    const now = Date.now();
    const userMessages = messageCount.get(ip) || { count: 0, timestamp: now };
    
    if (now - userMessages.timestamp > RATE_LIMIT_WINDOW) {
      // Reset if window has passed
      userMessages.count = 1;
      userMessages.timestamp = now;
    } else if (userMessages.count >= RATE_LIMIT) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    } else {
      userMessages.count++;
    }
    messageCount.set(ip, userMessages);

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const { message, history } = await request.json();

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    const chatHistory = Array.isArray(history) ? history.slice(-5) : [];
    
    let completion;
    try {
      completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          ...chatHistory.map((msg: any) => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.text
          })),
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
        presence_penalty: 0.6,
        frequency_penalty: 0.5
      });
    } catch (apiError: any) {
      console.error('OpenAI API error:', apiError);
      if (apiError.status === 429) {
        return NextResponse.json(
          { error: 'OpenAI rate limit reached. Please try again later.' },
          { status: 429 }
        );
      }
      throw apiError; // Let the outer catch block handle other errors
    }

    const response = completion.choices[0]?.message?.content || 'I apologize, but I could not process your request.';

    return NextResponse.json({
      text: response,
      richContent: processResponse(response)
    });

  } catch (error: any) {
    console.error('Chat API error:', error);
    
    // Handle different types of errors
    if (error.code === 'rate_limit_exceeded') {
      return NextResponse.json(
        { error: 'Service is currently busy. Please try again later.' },
        { status: 429 }
      );
    }
    
    if (error.code === 'context_length_exceeded') {
      return NextResponse.json(
        { error: 'Message is too long. Please try a shorter message.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

function processResponse(response: string) {
  // Check for code blocks
  if (response.includes('```')) {
    const codeMatch = response.match(/```(?:\w+)?\n([\s\S]*?)```/);
    if (codeMatch) {
      return {
        type: 'code',
        content: codeMatch[1].trim()
      };
    }
  }

  // Check for course information
  if (response.toLowerCase().includes('course:')) {
    const courseMatch = response.match(/course:\s*(.*?)(?:\n|$)/i);
    if (courseMatch) {
      return {
        type: 'courseInfo',
        content: {
          title: courseMatch[1],
          description: response.replace(courseMatch[0], '').trim()
        }
      };
    }
  }

  return null;
} 