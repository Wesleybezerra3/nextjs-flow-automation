import { faWhatsapp, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGear, faBolt, faClock, faQuestion, faRobot, faX, faEnvelope, faDatabase, faToolbox } from "@fortawesome/free-solid-svg-icons";


// Mapping of node types and their actions
export const nodeTypes = {
  whatsapp: {
    type: "app",
    label: "WhatsApp",
    color: "#20c707",
    icon: faWhatsapp,
    actions: [
      { id: "sendMessage", label: "Send Message" },
      { id: "receiveMessage", label: "Receive Message" },
    ],
  },
  virtualssistant: {
    type: "app",
    label: "Virtual Assistant",
    color: "#10a37f",
    icon: faRobot,
    actions: [
      { id: "startAssistant", label: "Start Assistant" },
      { id: "stopAssistant", label: "Stop Assistant" },
    ],
  },
  gmail: {
    type: "app",
    label: "Gmail",
    color: "#D44638",
    icon: faEnvelope,
    actions: [
      { id: "sendEmail", label: "Send Email" },
      { id: "readEmail", label: "Read Email" },
    ],
  },
  facebook: {
    type: "app",
    label: "Facebook",
    color: "#1877F2",
    icon: faFacebook,
    actions: [
      { id: "postUpdate", label: "Post Update" },
      { id: "readComments", label: "Read Comments" },
    ],
  },
  init: {
    type: "action",
    label: "Init",
    color: "#FF9914",
    icon: faBolt,
    actions: [
      { id: "init", label: "Start Flow" },
    ],
  },
  end: {
    type: "action",
    label: "End",
    color: "#CC2936",
    icon: faX,
    actions: [
      { id: "end", label: "End Flow" },
    ],
  },
  action: {
    type: "action",
    label: "Action",
    color: "#08BDBD",
    icon: faGear,
    actions: [
      { id: "executeAction", label: "Execute Action" },
      { id: "cancelAction", label: "Cancel Action" },
    ],
  },
  delay: {
    type: "internal",
    label: "Delay",
    color: "#636363",
    icon: faClock,
    actions: [
      { id: "setDelay", label: "Set Delay" },
      { id: "clearDelay", label: "Clear Delay" },
    ],
  },
  condition: {
    type: "action",
    label: "Condition",
    color: "#F0A202",
    icon: faQuestion,
    actions: [
      { id: "ifCondition", label: "If Condition" },
      { id: "elseCondition", label: "Else Condition" },
    ],
  },
  webhook: {
    type: "action",
    label: "Webhook",
    color: "#401F3E",
    icon: faGear,
    actions: [
      { id: "configureWebhook", label: "Configure Webhook" },
      { id: "testWebhook", label: "Test Webhook" },
    ],
  },
  mysql: {
    type: "memory",
    label: "MySQL",
    color: "#00758F",
    icon: faDatabase,
    actions: [
      { id: "connectMySQL", label: "Connect to MySQL" },
      { id: "queryMySQL", label: "Run MySQL Query" },
    ],
  },
  redis: {
    type: "memory",
    label: "Redis",
    color: "#D82C20",
    icon: faDatabase,
    actions: [
      { id: "connectRedis", label: "Connect to Redis" },
      { id: "cacheData", label: "Cache Data" },
    ],
  },
  oracle: {
    type: "memory",
    label: "Oracle",
    color: "#F80000",
    icon: faDatabase,
    actions: [
      { id: "connectOracle", label: "Connect to Oracle" },
      { id: "queryOracle", label: "Run Oracle Query" },
    ],
  },
    tools: {
    type: "utility",
    label: "Tools",
    color: "#4CAF50",
    icon: faToolbox,
    actions: [
      { id: "runTool", label: "Run Tool" },
      { id: "configureTool", label: "Configure Tool" },
    ],
  },
};