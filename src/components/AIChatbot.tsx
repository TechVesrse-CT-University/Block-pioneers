import React, { useEffect } from 'react';

const AiChatbot: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.defer = true;
    script.async = true;
    script.setAttribute('chatbotId', '7lG0ZukR6QeAje9gw-JWE');
    script.setAttribute('domain', 'www.chatbase.co');

    const chatbotConfig = document.createElement('script');
    chatbotConfig.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "7lG0ZukR6QeAje9gw-JWE",
        domain: "www.chatbase.co"
      };
    `;

    document.body.appendChild(chatbotConfig);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(chatbotConfig);
      document.body.removeChild(script);
    };
  }, []);

  const copyChatbotOutput = () => {
    const chatbotOutput = document.querySelector('.chatbase-output');
    if (chatbotOutput) {
      const textToCopy = chatbotOutput.textContent || '';
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Chatbot output copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      alert('No chatbot output found to copy.');
    }
  };

  const copyOnlyCode = () => {
    // Select all code blocks inside the chatbot output
    const codeBlocks = document.querySelectorAll('.chatbase-output pre, .chatbase-output code');
    if (codeBlocks.length > 0) {
      let allCode = '';
      codeBlocks.forEach(code => {
        allCode += code.textContent + '\n';
      });

      navigator.clipboard.writeText(allCode.trim()).then(() => {
        alert('Code block(s) copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy code: ', err);
      });
    } else {
      alert('No code block found to copy.');
    }
  };

  return (
    <div>
      <button onClick={copyChatbotOutput}>Copy Chatbot Output</button>
      <button onClick={copyOnlyCode}>Copy Code Only</button>
    </div>
  );
};

export default AiChatbot;

