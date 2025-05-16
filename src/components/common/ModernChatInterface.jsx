// ModernChatInterface.jsx - Better looking chat implementation
import React from "react";
import Input from "../../components/common/Input";

const ModernChatInterface = ({
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  isLive = true,
}) => {
  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="bg-white py-3 px-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">
            {isLive ? "Live Chat" : "Workshop Comments"}
          </h3>
          {isLive && (
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
              Live
            </span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.user === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md ${
                  msg.user === "You"
                    ? "bg-blue-600 text-white rounded-tl-2xl rounded-tr-sm rounded-bl-2xl"
                    : "bg-white border border-gray-200 rounded-tr-2xl rounded-tl-sm rounded-br-2xl"
                } px-4 py-2 shadow-sm`}
              >
                <div className="flex items-center space-x-1 mb-1">
                  {msg.user !== "You" && (
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xs">
                      {msg.user.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <p
                    className={`text-xs ${
                      msg.user === "You" ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {msg.user} • {msg.timestamp}
                  </p>
                </div>
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-sm">
              {isLive
                ? "Chat is quiet now. Start the conversation!"
                : "No comments yet for this workshop"}
            </p>
          </div>
        )}
      </div>

      {/* Input area */}
      {isLive && (
        <div className="bg-white p-3 border-t border-gray-200">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full pr-12 rounded-full focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-1 
      ${
        newMessage.trim()
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-200 text-gray-400"
      }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernChatInterface;
