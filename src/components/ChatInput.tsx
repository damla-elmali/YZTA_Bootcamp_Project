import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="border-t border-white/10 bg-black/80 backdrop-blur-lg py-4 px-4 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto relative"
      >
        <textarea
          ref={textareaRef}
          className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white resize-none focus:outline-none focus:border-white/40 transition-all min-h-[52px] max-h-32"
          placeholder={disabled ? "Lütfen bekleyin..." : "Bir soru sorun veya konuşmayı devam ettirin..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          rows={1}
          disabled={disabled}
        />
        <button
          type="submit"
          className={`absolute right-3 bottom-3 w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
            message.trim() && !disabled
              ? 'bg-white text-black'
              : 'bg-white/10 text-white/30'
          }`}
          disabled={!message.trim() || disabled}
        >
          <ArrowUp size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;