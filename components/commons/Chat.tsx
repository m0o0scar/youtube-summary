import cls from 'classnames';
import { FC, useRef, useState } from 'react';

import { Markdown } from './Markdown';
import { useChatContent } from './useChatContent';

export interface ChatProps {
  placeholder?: string;
  chatHook?: ReturnType<typeof useChatContent>;
}

export const Chat: FC<ChatProps> = ({ placeholder, chatHook }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [draft, setDraft] = useState('');

  const messages =
    chatHook?.messages
      .filter(({ role }) => role !== 'system')
      .map(({ role, content, ...rest }) => ({
        sender: role === 'user' ? '🙂' : '🤖',
        role,
        content,
        ...rest,
      })) || [];

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const content = draft.trim();
    if (e.key === 'Enter' && content) {
      chatHook?.sendMessage(content);
      setDraft('');
      inputRef.current!.blur();
    }
  };

  const onSummarizeAsRecipe = () => {
    chatHook?.sendMessage(
      `Please summarize this video as recipe, listing ingredients and instructions in concise bullet points.`,
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <h3>Chat</h3>
        <div className="flex-1" />

        {/* summarize as recipe button */}
        <button className="btn btn-circle btn-sm z-10" onClick={onSummarizeAsRecipe}>
          🍱
        </button>

        {/* copy button */}
        <button
          className="btn btn-circle btn-sm z-10"
          disabled={chatHook?.pending || !messages.length}
          onClick={chatHook?.copyMessages}
        >
          📋
        </button>

        {/* clear button */}
        <button
          className="btn btn-circle btn-sm z-10"
          disabled={chatHook?.pending || !messages.length}
          onClick={chatHook?.clear}
        >
          🗑️
        </button>
      </div>

      {/* message list */}
      <div className="flex flex-col gap-2 text-sm">
        {messages.map(({ id, role, sender, content }) => (
          <div
            key={id}
            className={cls(
              'flex gap-1 rounded-lg py-1 px-2 whitespace-pre-line',
              role === 'user' ? 'bg-transparent' : 'bg-slate-100 dark:bg-slate-700',
            )}
          >
            <div>{sender}</div>:{' '}
            <div className="pr-2">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        ))}
      </div>

      {/* message input */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder={chatHook?.pending ? 'Thinking ...' : placeholder}
          disabled={chatHook?.pending}
          className="input input-bordered flex-1"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};
