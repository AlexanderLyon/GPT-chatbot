'use client';
import { useState } from 'react';
import { Form, TextInput, TextInputSkeleton, Button } from '@carbon/react';
import styles from './prompt.module.css';

interface PromptProps {
  loading?: boolean;
  disabled?: boolean;
  onSubmit: (prompt: string) => void;
}

export const Prompt: React.FC<PromptProps> = ({ loading, disabled, onSubmit }) => {
  const [enteredPrompt, setEnteredPrompt] = useState<string>('');

  const handleSubmitPrompt = (e: Event): void => {
    e.preventDefault();

    if (enteredPrompt.length) {
      onSubmit(enteredPrompt);
      setEnteredPrompt('');
    }
  };

  return (
    <Form className={styles.prompt} onSubmit={handleSubmitPrompt}>
      {loading ? (
        <TextInputSkeleton hideLabel />
      ) : (
        <TextInput
          value={enteredPrompt}
          onChange={(e: any) => {
            setEnteredPrompt(e.target.value);
          }}
          className={styles.promptInput}
          id="prompt-input"
          placeholder="Enter any question"
          labelText="Enter any question"
          disabled={disabled}
          hideLabel
          size="lg"
          autoComplete="off"
        />
      )}
      <Button
        type="submit"
        kind="tertiary"
        className={styles.submitBtn}
        size="lg"
        disabled={loading}
      >
        Submit
      </Button>
    </Form>
  );
};
