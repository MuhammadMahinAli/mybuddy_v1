import { useState, useEffect } from "react";
import Canvas from "./Canvas";

const Agent = () => {
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState("new");
  const [chatHistory, setChatHistory] = useState([]);
  const [chats, setChats] = useState([]);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);


  // Demo prompts and responses
  const demoPrompts = [
    {
      prompt: "Create a post",
      response: "I can help you create a research post. Here's what I need:\n\n1. Research Title\n2. Brief Description\n3. Required Skills\n4. Timeline\n5. Team Size\n\nPlease provide these details and I'll help you format a compelling research post."
    },
    {
      prompt: "Posts I have created",
      response: "Here are your recent research posts:\n\n1. 'AI in Healthcare' - Posted 2 days ago\n   Status: Active, 5 applicants\n\n2. 'Machine Learning for Climate Data' - Posted 1 week ago\n   Status: Closed, Team formed\n\n3. 'Blockchain in Supply Chain' - Posted 2 weeks ago\n   Status: Active, 3 applicants"
    },
    {
      prompt: "Meetings I have created",
      response: "Your scheduled meetings:\n\n1. Project Kickoff - AI Healthcare\n   Date: Tomorrow, 10:00 AM\n   Attendees: 4 confirmed\n\n2. ML Model Review\n   Date: Next Monday, 2:00 PM\n   Attendees: 3 confirmed\n\n3. Research Progress Update\n   Date: Next Wednesday, 11:00 AM\n   Attendees: 5 confirmed"
    }
  ];

  // Effect to load correct chat history when switching chats
  useEffect(() => {
    if (activeChat === "new") {
      setChatHistory([]);
    } else {
      const currentChat = chats.find(chat => chat.id === activeChat);
      if (currentChat) {
        setChatHistory(currentChat.messages);
      }
    }
  }, [activeChat]);

  const handleNewChat = () => {
    // Save current chat before creating new one
    if (chatHistory.length > 0) {
      const currentChatExists = chats.some(chat => chat.id === activeChat);
      
      if (!currentChatExists && activeChat !== "new") {
        setChats(prevChats => [
          ...prevChats,
          {
            id: activeChat,
            messages: chatHistory,
            title: chatHistory[0]?.content.slice(0, 30) + "..." || "New Chat"
          }
        ]);
      } else if (currentChatExists) {
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === activeChat 
              ? { ...chat, messages: chatHistory }
              : chat
          )
        );
      }
    }

    setActiveChat("new");
    setChatHistory([]);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { type: "user", content: message };
      
      // Generate new chat ID only once
      const newChatId = activeChat === "new" ? `chat-${Date.now()}` : activeChat;
      
      if (activeChat === "new") {
        setActiveChat(newChatId);
      }

      const updatedHistory = [...chatHistory, newMessage];
      setChatHistory(updatedHistory);

      // Update chats state without creating duplicate entries
      setChats(prevChats => {
        const existingChatIndex = prevChats.findIndex(chat => chat.id === newChatId);
        
        if (existingChatIndex === -1) {
          // Create new chat entry
          return [
            {
              id: newChatId,
              messages: updatedHistory,
              title: message.slice(0, 30) + "..."
            },
            ...prevChats,
          ];
        }

        // Update existing chat
        return prevChats.map(chat =>
          chat.id === newChatId
            ? { ...chat, messages: updatedHistory }
            : chat
        );
      });

      setMessage("");

      // Simulate agent response
      setTimeout(() => {
        const agentResponse = { 
          type: "agent", 
          content: "This is a simulated response. Connect to your API for real responses." 
        };
        setChatHistory(prev => [...prev, agentResponse]);
        
        // Update chats with agent response
        setChats(prevChats =>
          prevChats.map(chat =>
            chat.id === newChatId
              ? { ...chat, messages: [...updatedHistory, agentResponse] }
              : chat
          )
        );
      }, 1000);
    }
  };

  const handleChatSelect = (chatId) => {
    if (chatHistory.length > 0 && activeChat !== chatId) {
      setChats(prevChats => {
        if (activeChat === "new") {
          return [
            ...prevChats,
            {
              id: `chat-${Date.now()}`,
              messages: chatHistory,
              title: chatHistory[0]?.content.slice(0, 30) + "..."
            }
          ];
        }
        return prevChats.map(chat =>
          chat.id === activeChat
            ? { ...chat, messages: chatHistory }
            : chat
        );
      });
    }

    setActiveChat(chatId);
    const selectedChat = chats.find(chat => chat.id === chatId);
    setChatHistory(selectedChat ? selectedChat.messages : []);
  };

  const handlePromptClick = (prompt) => {
    const userMessage = { type: "user", content: prompt.prompt };
    const agentMessage = { type: "agent", content: prompt.response };
    
    // Generate new chat ID only once
    const newChatId = activeChat === "new" ? `chat-${Date.now()}` : activeChat;
    
    if (activeChat === "new") {
      setActiveChat(newChatId);
    }

    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);

    setTimeout(() => {
      const finalHistory = [...updatedHistory, agentMessage];
      setChatHistory(finalHistory);
      
      // Update chats state without creating duplicate entries
      setChats(prevChats => {
        const existingChatIndex = prevChats.findIndex(chat => chat.id === newChatId);
        
        if (existingChatIndex === -1) {
          // Create new chat entry
          return [
            {
              id: newChatId,
              messages: finalHistory,
              title: prompt.prompt
            },
            ...prevChats,
          ];
        }

        // Update existing chat
        return prevChats.map(chat =>
          chat.id === newChatId
            ? { ...chat, messages: finalHistory }
            : chat
        );
      });
    }, 500);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        {/* New Chat Button */}
        <button
          onClick={handleNewChat}
          className="w-full mb-4 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Chat
        </button>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => handleChatSelect(chat.id)}
              className={`w-full px-4 py-2 rounded-lg text-left truncate hover:bg-gray-700 transition-colors ${
                activeChat === chat.id ? 'bg-gray-700' : ''
              }`}
            >
              {chat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-gray-50">
        <div className="h-full bg-white shadow-lg flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Research Buddy Agent
            </h2>
          </div>

          {/* Demo Prompts */}
          <div className="p-4 border-b flex flex-wrap gap-2">
            {demoPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                {prompt.prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-lg ${
                    chat.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="whitespace-pre-line">{chat.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send
              </button>
            </div>
          </div>
 {/* Sticky Canvas Button */}
 <button
        onClick={() => setIsCanvasOpen(true)}
        className="fixed bottom-32 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-10 group"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
          />
        </svg>
        <span className="absolute right-full mr-2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Open Canvas
        </span>
      </button>

      {/* Canvas Modal */}
      <Canvas 
        isOpen={isCanvasOpen} 
        onClose={() => setIsCanvasOpen(false)} 
      />
    
          
        </div>
      </div>
    </div>
  );
};

export default Agent;
