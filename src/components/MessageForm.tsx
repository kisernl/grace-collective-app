import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Send } from 'lucide-react';

interface MessageFormProps {
  receiverId: string;
  receiverName: string;
  onMessageSent?: () => void;
}

const MessageForm = ({ receiverId, receiverName, onMessageSent }: MessageFormProps) => {
  const [messageContent, setMessageContent] = useState('');
  const [sending, setSending] = useState(false);
  const { user } = useAuth();
  const { addMessage } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !messageContent.trim()) return;
    
    setSending(true);
    
    // Add the message to the data context
    addMessage({
      senderId: user.id,
      senderName: user.name,
      receiverId,
      content: messageContent.trim()
    });
    
    // Reset the form
    setMessageContent('');
    setSending(false);
    
    // Call the callback function if provided
    if (onMessageSent) {
      onMessageSent();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
        Send a message to {receiverName}
      </label>
      <textarea
        id="message"
        rows={4}
        className="input"
        placeholder="Type your message here..."
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={sending || !messageContent.trim()}
        className={`btn-primary flex items-center justify-center w-full ${
          sending || !messageContent.trim() ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {sending ? 'Sending...' : (
          <>
            <Send size={16} className="mr-2" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default MessageForm;
