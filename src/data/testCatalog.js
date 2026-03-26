const testCatalog = {
  upload: [
    "Validar envio de arquivo válido",
    "Validar envio de arquivo inválido",
    "Validar formato não suportado",
    "Validar tamanho máximo do arquivo",
    "Validar múltiplos uploads"
  ],
  api: [
    "Validar status code da API",
    "Validar payload de request",
    "Validar payload de response",
    "Validar timeout",
    "Validar tratamento de erro da integração"
  ],
  chatbot: [
    "Validar fluxo feliz da conversa",
    "Validar mensagem de erro",
    "Validar repetição indevida de resposta",
    "Validar fallback conversacional",
    "Validar encerramento correto do fluxo"
  ],
  protocol: [
    "Validar geração de protocolo",
    "Validar persistência do número de protocolo",
    "Validar mensagem final ao usuário",
    "Validar comportamento em falha de geração de protocolo"
  ],
  regression: [
    "Executar regressão do fluxo impactado",
    "Executar regressão do fluxo anterior relacionado"
  ]
};

module.exports = { testCatalog };