import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Send, Image } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Profile, Message } from '../../types';

interface ChatInterfaceProps {
  match: Profile;
}

const ChatInterface = ({ match }: ChatInterfaceProps) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, currentUser } = useStore();
  const chatMessages = messages[match.id] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(match.id, message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <img
          src={match.photos[0]}
          alt={match.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h3 className="font-semibold">{match.name}</h3>
          <p className="text-sm text-gray-500">
            {match.lastActive
              ? `Last active ${format(match.lastActive, 'PP')}`
              : 'Online'}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg: Message) => {
          const isSender = msg.senderId === currentUser?.id;
          return (
            <div
              key={msg.id}
              className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  isSender
                    ? 'bg-coral text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{msg.content}</p>
                <span className="text-xs opacity-70">
                  {format(msg.timestamp, 'p')}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-coral transition-colors"
          >
            <Image className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-coral"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 text-coral hover:text-opacity-80 transition-colors disabled:opacity-50"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};