'use client';
import { useEffect, useRef } from 'react';
import { LoadingIndicator } from '../LoadingIndicator';
import styles from './conversation.module.css';
import { Tile } from '@carbon/react';

export interface ConversationItem {
  index: number;
  type: 'user' | 'ai';
  text: string;
}

interface ConversationProps {
  conversation: ConversationItem[];
}

export const Conversation: React.FC<ConversationProps> = ({ conversation }) => {
  const conversationRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    // Scroll to the bottom of the conversation
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [conversation]);

  return (
    <div className={styles.conversation} ref={conversationRef}>
      <>
        {conversation.map((phrase, i) => (
          <Tile
            key={i}
            className={phrase.type === 'user' ? styles.request : styles.response}
            light={true}
          >
            {phrase.text || <LoadingIndicator />}
          </Tile>
        ))}
      </>
    </div>
  );
};
