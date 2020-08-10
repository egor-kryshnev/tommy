process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 as any;
import { SupportersList } from "./supporters-list/supporters-list";

export const config = {
  server: {
    port: process.env.PORT || 80,
  },
  auth: {
    callbackURL: process.env.AUTH_CALLBACK_URL || "/auth/callback",
    shragaURL: process.env.SHRAGA_URL || "http://13.79.7.3",
    useEnrichId: true,
    secret: "ApPr0vaL_5ySt3m",
    daysExpires: 3,
  },
  client: {
    url: process.env.CLIENT_URL || "http://localhost:4200",
    requests: {
      GET_NETWORKS_URL:
        "/api/caisd-rest/nr?WC=class%3D1000792%20and%20delete_flag%3D0",
      GET_SERVICES_URL_FUNCTION: (id: string) =>
        `/api/caisd-rest/z_networks_to_service?WC=network%3D${id}%20and%20delete_flag%3D0`,
      GET_OPEN_TASKS_URL_FUNCTION: (UUID: string) =>
        `/api/caisd-rest/cr?WC=customer%3D${UUID}%20and%20type%3D'R'%20and%20active%3D1&SORT=open_date DESC`,
      GET_CLOSED_TASKS_URL_FUNCTION: (UUID: string) =>
        `/api/caisd-rest/cr?WC=customer%3D${UUID}%20and%20type%3D'R'%20and%20active%3D0&SORT=open_date DESC`,
      GET_CATEGORIES_OF_INCIDENTS_URL_FUNCTION: (id: string) =>
        `/api/caisd-rest/pcat?WC=z_impact_service%3D${id}%20and%20delete_flag%3D0`,
      GET_CATEGORIES_OF_REQUESTS_URL_FUNCTION: (id: string) =>
        `/api/caisd-rest/chgcat?WC=z_impact_service%3D${id}%20and%20delete_flag%3D0`,
      GET_UUID_URL_FUNCTION: (userT: string) =>
        `/api/caisd-rest/cnt?WC=userid%3D'${userT}'`,
      GET_TRANSVERSE_URL_FUNCTION: (categoryId: string) =>
        `/api/caisd-rest/cr?WC=category%3D'pcat:${categoryId}'%20and%20active%3D1%20and%20impact%3D1`,
      GET_UPDATES:
        "/api/caisd-rest/cr?WC=type%3D'I'%20and%20active%3D1%20and%20impact%3D1&SORT=open_date DESC",
      POST_NEW_REQUEST: "/api/caisd-rest/cr",
      GET_HICHAT_IFRAME_URL: "/hichat",
    },
  },
  serviceName: "tommy-server",
  redis: {
    host: process.env.REDIS_URL || "redis://localhost:6379",
  },
  lehava_api: {
    host: process.env.LEHAVA_API_HOST || "localhost",
    port: process.env.LEHAVA_API_PORT || "8050",
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || "amqp://localhost:5672",
    access_token_return_queue: "access_token_return",
    access_token_rpc_queue: "access_token_rpc",
    logger_queue_name: "log_queue",
    msg_timeout: parseInt(process.env.RABBITMQ_TIMEOUT || "1000"),
  },

  chat: {
    chatUrl: process.env.CHAT_URL || "",
    hiChatUrl: process.env.HI_CHAT_URL || "http://lehava-api-mock:8050/api/v1",
    chatGroupUrl:
      process.env.CHAT_GROUP_URL || "http://lehava-api-mock:8050/group",
    chatLoginUrl: process.env.CHAT_LOGIN_URL || "login",
    chatMessageUrl: process.env.CHAT_MESSAGE_URL || "chat",
    loginUser: process.env.LOGIN_USER || "tommy",
    loginPass: process.env.LOGIN_PASS || "Aa123456",
    getSupportUsers: async () => {
      try {
        return (
          (await SupportersList.getSupportersList()) ||
          process.env.SUPPORT_USERS?.split(",") ||
          []
        );
      } catch (e) {
        return process.env.SUPPORT_USERS?.split(",") || [];
      }
    },
    hiChatGroupTitle: (userT: string) => `Tom Support ${userT}`,
    hiChatTaskMessageStructure: (
      taskId: string,
      taskDate: string,
      taskLink: string
    ) =>
      `היי, אשמח לעזרה בפנייה מספר: ${taskId}, שנפתחה ב ${taskDate}. ${
        taskLink ? `לינק בלהבה: ${taskLink}` : "לא קיים לינק בלהבה"
      }`,
  },
};
