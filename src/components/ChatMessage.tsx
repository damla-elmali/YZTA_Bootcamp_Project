import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={`mb-6 max-w-4xl mx-auto flex ${ 
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
        <div
          className={`flex-1 p-3 sm:p-4 rounded-2xl ${ 
            isUser
              ? 'bg-white/10 text-white ml-8 sm:ml-12' 
              : 'bg-white/5 text-white border border-white/10 mr-8 sm:mr-12' 
          } max-w-[85%] sm:max-w-[75%]`}
        >
          <div className="prose prose-sm sm:prose-base prose-invert max-w-none 
            prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-ol:my-2 
            prose-blockquote:my-2 prose-pre:my-3 prose-table:my-3">
            {isUser ? (
              <p className="whitespace-pre-wrap">{message.content}</p>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;