import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { UserPreferences, Message } from '../types';
import { generateResponse } from '../utils/aiUtils';

interface ChatProps {
  preferences: UserPreferences;
}

const Chat: React.FC<ChatProps> = ({ preferences }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const initialMessageSent = useRef(false);

  // Generate initial response based on user preferences
  useEffect(() => {
    // Use a ref to track if the initial message has been sent
    // This prevents duplicate messages in React's StrictMode
    if (!initialMessageSent.current && preferences.topic) {
      initialMessageSent.current = true;
      const initialPrompt = `${preferences.topic} konusu hakkında bilgi almak istiyorum. Lütfen bana açıkla.`;
      handleSendMessage(initialPrompt);
    }
  }, [preferences.topic]); // Only run when preferences.topic changes

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };
    
    // Önce mevcut mesajları güncelleyelim
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      // Tüm önceki mesajları AI'ya gönderelim
      const response = await generateResponse(content, preferences, updatedMessages);
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I couldn't generate a response. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {loading && (
          <div className="flex justify-center items-center py-6">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>
      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  );
};

export default Chat;