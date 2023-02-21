'use client';
import { useEffect, useState } from 'react';
import { Inter } from '@next/font/google';
import styles from './page.module.css';
import { Alert } from '../components/Alert';
import { Conversation, ConversationItem } from '../components/Conversation';
import { Prompt } from '../components/Prompt';

const inter = Inter({ subsets: ['latin'] });

export default function App(): React.ReactElement {
  const [isGeneratingResponse, setIsGeneratingResponse] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ConversationItem[]>([]);

  /* Set the prompt entered by the user, and an empty string response to start with */
  const pushUserPrompt = (prompt: string) => {
    const newQueryIndex = conversation.length ? conversation[conversation.length - 1].index + 1 : 0;
    const newResponseIndex = newQueryIndex + 1;

    setConversation((prev) => [
      ...prev,
      {
        index: newQueryIndex,
        type: 'user',
        text: prompt,
      },
      {
        index: newResponseIndex,
        type: 'ai',
        text: '',
      },
    ]);
    setIsGeneratingResponse(true);
  };

  const generateAIResponse = async (prompt: string) => {
    try {
      const response = await fetch('/api/submitPrompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Data is a ReadableStream
      const data = response.body;

      if (!data) {
        throw new Error('There was an error returning data stream');
      }

      const reader = data.getReader();
      const decoder = new TextDecoder('utf-8');
      const currentResponse: ConversationItem = conversation[conversation.length - 1];
      let responseText = '';
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        responseText = responseText + chunkValue;

        // Update currentResponse by adding chunkValue:
        const newConvo = conversation.map((item, i) => {
          if (i === currentResponse.index) {
            return {
              ...item,
              text: responseText,
            };
          } else {
            return item;
          }
        });

        setConversation(newConvo);
      }

      setError(null);
    } catch (e: any) {
      console.error(e);
      setError(e.message);
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  useEffect(() => {
    if (!conversation.length || !isGeneratingResponse) {
      return;
    }

    let userPrompt: string | undefined;

    // Find most recent user prompt in conversation:
    for (let i = conversation.length - 1; i >= 0; i--) {
      if (conversation[i].type === 'user') {
        userPrompt = conversation[i].text;
        break;
      }
    }

    if (userPrompt) {
      generateAIResponse(userPrompt);
    }
  }, [isGeneratingResponse]);

  return (
    <main className={`${styles.main} ${inter.className}`}>
      {error && <Alert title={error} onClose={() => setError(null)} />}
      <Conversation conversation={conversation} />
      <Prompt disabled={isGeneratingResponse} onSubmit={pushUserPrompt} />
    </main>
  );
}
