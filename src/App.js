import React, { useState, useEffect, useRef } from 'react';
import './App.scss';
import autoResponses from './autoRespostas'; // Importa o arquivo com as respostas automáticas
import Jchat from './janelaChat'; // Importa o componente da janela do chat

function App() {
  // Estados do chatbot
  const [messages, setMessages] = useState([]); // Armazena todas as mensagens do chat
  const [userInput, setUserInput] = useState(''); // Controla a entrada do usuário
  const [botTyping, setBotTyping] = useState(false); // Indica se o bot está "digitando"
  const [isChatLocked, setIsChatLocked] = useState(false); // Bloqueia o chat durante o processamento
  const [userName, setUserName] = useState(''); // Armazena o nome do usuário
  const [awaitingName, setAwaitingName] = useState(false); // Verifica se o bot está aguardando o nome do usuário
  const [chatStarted, setChatStarted] = useState(false); // Controla se o chat começou
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false); // Aguarda confirmação do usuário após uma resposta

  const BOT_RESPONSE_DELAY = 2000; // Delay para a resposta do bot
  const CHAT_RESET_TIMEOUT = 15000; // Tempo para reiniciar o chat automaticamente
  const resetTimer = useRef(null); // Ref para armazenar o temporizador de reset

  // Função para resetar o chat
  const resetChat = () => {
    setMessages([]);
    setUserInput('');
    setBotTyping(false);
    setIsChatLocked(false);
    setUserName('');
    setAwaitingName(false);
    setChatStarted(false);
    setAwaitingConfirmation(false);
  };

  useEffect(() => {
    // Limpa o temporizador quando há uma nova entrada do usuário
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, [userInput]); // Dependência no userInput

  const sendMessage = async () => {
    if (!userInput.trim() || isChatLocked) return;

    setMessages(prev => [...prev, { text: userInput, sender: 'user' }]);
    setUserInput('');
    setIsChatLocked(true);
    setBotTyping(true);

    setTimeout(() => {
      let botResponse;

      // Lógica para saudação inicial e captura do nome do usuário
      if (!userName && !awaitingName && userInput.trim().toLowerCase() === 'oi') {
        botResponse = 'Olá! Qual é o seu nome?';
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        setAwaitingName(true);
      } else if (awaitingName) {
        setUserName(userInput);
        botResponse = `Prazer em conhecer você, ${userInput}! Como posso ajudar?`;
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        setAwaitingName(false);
        setChatStarted(true);
      } else if (chatStarted) {  // Lógica para processar a resposta do usuário e possivelmente resetar o chat
        if (awaitingConfirmation) {
          botResponse = userInput.trim().toLowerCase() === 'sim' 
            ? 'Ótimo! Fico feliz em ter ajudado.' 
            : 'Lamento que você ainda esteja enfrentando problemas. Talvez seja melhor entrar em contato com nosso suporte técnico.';
          setAwaitingConfirmation(false);
          setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);

          // Reiniciar o chat se não houver mais entrada do usuário
          if (resetTimer.current) {
            clearTimeout(resetTimer.current);
          }
          resetTimer.current = setTimeout(() => {
            resetChat();
            setMessages(prev => [...prev, { text: 'Chat reiniciado. Por favor, diga "oi" para começarmos.', sender: 'bot' }]);
          }, CHAT_RESET_TIMEOUT);

        } else {
          const userMessageLower = userInput.toLowerCase();
          const matchedKey = Object.keys(autoResponses).find(key => key.split('|').some(kw => userMessageLower.includes(kw.trim())));
          
          if (matchedKey) {
            const responseObj = autoResponses[matchedKey];
            botResponse = responseObj.resposta;
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);

            if (responseObj.followUp) {
              setMessages(prev => [...prev, { text: responseObj.followUp, sender: 'bot' }]);
              setAwaitingConfirmation(true);
            }
          } else {
            botResponse = 'Desculpe, não entendi. Pode reformular? Informe o assunto.';
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
          }
        }
      } else { // Mensagem padrão se o chat ainda não começou
        botResponse = 'Por favor, diga "oi" para começarmos.';
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      }

      setBotTyping(false);
      setIsChatLocked(false);
    }, BOT_RESPONSE_DELAY);
  };

  // Renderização do componente App e seus filhos

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <img src="./robo.png" alt="Ícone do ChatBot" className="chatbot-icon" />
          ChatBot
        </h1>
        <h1>Suporte TI</h1>
        <Jchat
          messages={messages}
          userInput={userInput}
          setUserInput={setUserInput}
          sendMessage={sendMessage}
          botTyping={botTyping}
        />
      </header>
    </div>
  );
}

export default App;
