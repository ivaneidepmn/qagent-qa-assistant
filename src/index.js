const prompt = require("prompt-sync")({ sigint: true });
const { createActor } = require("xstate");
const { qaAssistantMachine } = require("./machine/qaAssistantMachine");
const { generateRecommendations } = require("./rules/recommendationEngine");

function askYesNo(question) {
  const answer = prompt(`${question} (s/n): `).trim().toLowerCase();
  return answer === "s";
}

function getChangeTypeLabel(changeType) {
  const labels = {
    "bugfix": "Correção de bug",
    "improvement": "Melhoria",
    "new-flow": "Novo fluxo"
  };

  return labels[changeType] || changeType;
}

console.log("=====================================");
console.log(" QAgent QA Assistant - MVP");
console.log("=====================================");

const actor = createActor(qaAssistantMachine);
actor.start();

actor.send({ type: "START" });

const taskDescription = prompt("Descreva a tarefa: ");

actor.send({
  type: "SUBMIT_TASK",
  taskDescription
});

console.log("\nTipos de mudança:");
console.log("1 - bugfix");
console.log("2 - improvement");
console.log("3 - new-flow");

const changeTypeOption = prompt("Escolha o tipo de mudança: ").trim();

let changeType = "improvement";
if (changeTypeOption === "1") changeType = "bugfix";
if (changeTypeOption === "3") changeType = "new-flow";

actor.send({
  type: "SET_CHANGE_TYPE",
  changeType
});

const hasUpload = askYesNo("Existe upload de arquivo/imagem?");
const hasApiIntegration = askYesNo("Existe integração com API?");
const hasProtocolGeneration = askYesNo("Existe geração de protocolo?");
const isChatbotFlow = askYesNo("É fluxo conversacional/chatbot?");

actor.send({
  type: "SET_FLAGS",
  hasUpload,
  hasApiIntegration,
  hasProtocolGeneration,
  isChatbotFlow
});

const snapshot = actor.getSnapshot();
const result = generateRecommendations(snapshot.context);

console.log("\n=====================================");
console.log(" RESUMO DA ANÁLISE QA");
console.log("=====================================");
console.log(`Tarefa: ${snapshot.context.taskDescription}`);
console.log(`Tipo de mudança: ${getChangeTypeLabel(snapshot.context.changeType)}`);
console.log(`Risco: ${result.riskLevel}`);

console.log("\nTestes recomendados:");
result.recommendations.forEach((item, index) => {
  console.log(`${index + 1}. ${item}`);
});

console.log("\nEvidências sugeridas:");
result.evidences.forEach((item, index) => {
  console.log(`${index + 1}. ${item}`);
});