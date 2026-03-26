const { createMachine, assign } = require("xstate");

const qaAssistantMachine = createMachine({
  id: "qaAssistant",
  initial: "idle",
  context: {
    taskDescription: "",
    changeType: "",
    hasUpload: false,
    hasApiIntegration: false,
    hasProtocolGeneration: false,
    isChatbotFlow: false
  },
  states: {
    idle: {
      on: {
        START: {
          target: "collectingTask"
        }
      }
    },

    collectingTask: {
      on: {
        SUBMIT_TASK: {
          target: "collectingChangeType",
          actions: assign({
            taskDescription: ({ event }) => event.taskDescription
          })
        }
      }
    },

    collectingChangeType: {
      on: {
        SET_CHANGE_TYPE: {
          target: "collectingFlags",
          actions: assign({
            changeType: ({ event }) => event.changeType
          })
        }
      }
    },

    collectingFlags: {
      on: {
        SET_FLAGS: {
          target: "readyToRecommend",
          actions: assign({
            hasUpload: ({ event }) => event.hasUpload,
            hasApiIntegration: ({ event }) => event.hasApiIntegration,
            hasProtocolGeneration: ({ event }) => event.hasProtocolGeneration,
            isChatbotFlow: ({ event }) => event.isChatbotFlow
          })
        }
      }
    },

    readyToRecommend: {
      type: "final"
    }
  }
});

module.exports = { qaAssistantMachine };