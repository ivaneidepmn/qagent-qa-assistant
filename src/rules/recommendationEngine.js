const { testCatalog } = require("../data/testCatalog");

function calculateRisk(context) {
  let score = 0;

  if (context.hasUpload) score += 2;
  if (context.hasApiIntegration) score += 2;
  if (context.hasProtocolGeneration) score += 3;
  if (context.isChatbotFlow) score += 2;
  if (context.changeType === "bugfix") score += 1;
  if (context.changeType === "new-flow") score += 2;

  if (score >= 7) return "alto";
  if (score >= 4) return "médio";
  return "baixo";
}

function generateRecommendations(context) {
  const recommendations = [];
  const evidences = [];

  if (context.hasUpload) {
    recommendations.push(...testCatalog.upload);
    evidences.push("Prints do envio de arquivo");
    evidences.push("Resultado visual após upload");
  }

  if (context.hasApiIntegration) {
    recommendations.push(...testCatalog.api);
    evidences.push("Logs da API");
    evidences.push("Payload de request/response");
  }

  if (context.isChatbotFlow) {
    recommendations.push(...testCatalog.chatbot);
    evidences.push("Transcrição da conversa");
    evidences.push("Prints do fluxo conversacional");
  }

  if (context.hasProtocolGeneration) {
    recommendations.push(...testCatalog.protocol);
    evidences.push("Número de protocolo gerado");
    evidences.push("Mensagem final apresentada ao usuário");
  }

  recommendations.push(...testCatalog.regression);

  return {
    riskLevel: calculateRisk(context),
    recommendations: [...new Set(recommendations)],
    evidences: [...new Set(evidences)]
  };
}

module.exports = { generateRecommendations };