const autoResponses = {
  'problema de conexão|internet|rede': {
    resposta: 'Parece que você está tendo problemas de conexão. Você poderia verificar se o cabo de rede está bem conectado?',
    followUp: 'Isso resolveu seu problema? [SIM/NÃO]'
  },
  'lento|devagar|travando': {
    resposta: 'Seu computador está lento? Tente reiniciar o sistema para ver se isso resolve o problema.',
    followUp: 'Isso resolveu seu problema? [SIM/NÃO]'
  },
  'senha|senha esquecida|redefinir senha': {
    resposta: 'Se você esqueceu sua senha, posso ajudá-lo a redefini-la. Você pode seguir os passos para redefinição de senha.',
    followUp: 'Isso resolveu seu problema? [SIM/NÃO]'
  },
  'impressora|imprimir|problema de impressão': {
    resposta: 'Problemas com a impressora, certo? Certifique-se de que a impressora está ligada e conectada à mesma rede que o seu computador.',
    followUp: 'Isso resolveu seu problema? [SIM/NÃO]'
  },
  'vírus|malware|antivírus': {
    resposta: 'Se você suspeita de um vírus, é importante realizar uma verificação completa com um software antivírus. Você tem um instalado?',
    followUp: 'Isso resolveu seu problema? [SIM/NÃO]'
  },
  'atualização|update|sistema desatualizado': {
    resposta: 'Parece que seu sistema pode estar desatualizado. Verifique se há atualizações disponíveis e instale-as.',
    followUp: 'Isso resolveu seu problema? [SIM/NÃO]'
  },
  'barulho|ruído estranho|computador fazendo barulho': {
    resposta: 'Se o seu computador está fazendo um ruído estranho, pode ser um problema com o cooler ou o disco rígido. Recomendo que você verifique estes componentes.',
    followUp: 'Isso resolveu seu problema? [SIM/NÃO]'
  },
  'tela azul|BSOD|erro de tela azul': {
    resposta: 'Uma tela azul geralmente indica um erro grave. Anote o código de erro, se houver, e reinicie o computador.',
    followUp: 'Isso resolveu seu problema? [SIM/NÃO]'
  },
  'não liga|computador morto|pc não inicia': {
    resposta: 'Se o computador não liga, verifique a conexão de energia e se todos os cabos estão corretamente conectados.',
    followUp: 'Isso resolveu seu problema? [SIM/NÃO]'
  },
  'wifi|problemas wifi|não conecta wifi': {
    resposta: 'Se você está com problemas para se conectar ao WiFi, tente reiniciar o roteador e verificar as configurações de rede do seu dispositivo.',
    followUp: 'Isso resolveu seu problema? [SIM/NÃO]'
  }
};

export default autoResponses;
