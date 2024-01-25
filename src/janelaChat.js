import React, { useRef, useEffect } from 'react';

function Jchat({ messages, userInput, setUserInput, sendMessage, botTyping, isChatLocked }) {
  const messagesEndRef = useRef(null);

  // Função para rolar para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Use o useEffect para rolar cada vez que as mensagens mudam
  useEffect(scrollToBottom, [messages]);

  return (
    <div>
      <div className="chat-window p-3">
        {messages.map((message, index) => (
          <div key={index} className={`card mb-2 message ${message.sender === 'bot' ? 'bg-light' : 'bg-primary text-white'}`}>
            <div className="card-body">
              {message.text}
            </div>
          </div>
        ))}

        {/* Adicionar indicador de "Digitando..." aqui */}
        {botTyping && <div className="typing-indicator text-muted">Digitando...</div>}
        
        <div ref={messagesEndRef} /> {/* Elemento no final do chat */}
      </div>
      <div className="input-group mb-3 custom-button">
        <input
            type="text"
            className="form-control"
            placeholder="Digite sua mensagem..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            disabled={isChatLocked} // Desabilita o input quando o chat está bloqueado
        />
        <button className="btn btn-success btn-custom" type="button" onClick={sendMessage}
        disabled={isChatLocked} /* Desabilita o botão quando o chat está bloqueado */>
            Enviar
        </button>
        </div>
    </div>
  );
}

export default Jchat;
