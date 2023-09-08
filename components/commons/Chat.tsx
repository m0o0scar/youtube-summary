import cls from 'classnames';
import { FC, useState } from 'react';

import { useChatContent } from './useChatContent';

export interface ChatProps {
  placeholder?: string;
  chatHook?: ReturnType<typeof useChatContent>;
}

export const Chat: FC<ChatProps> = ({ placeholder, chatHook }) => {
  const [draft, setDraft] = useState('');

  const messages =
    chatHook?.messages
      .filter(({ role }) => role !== 'system')
      .reverse()
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
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* message input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={chatHook?.pending ? 'Thinking ...' : placeholder}
          disabled={chatHook?.pending}
          className="input input-bordered flex-1"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>

      {/* message list */}
      <div className="flex flex-col gap-2 text-sm">
        {messages.map(({ id, role, sender, content }) => (
          <div
            key={id}
            className={cls(
              'flex gap-1 rounded-lg p-1 whitespace-pre-line',
              role === 'user' ? 'bg-transparent' : 'bg-slate-100 dark:bg-slate-700',
            )}
          >
            <div>{sender}</div>: <div>{content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
