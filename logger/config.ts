export const config = {
  rabbitmq: {
    url: process.env.RABBITMQ_URL || "amqp://rabbitmq:5672",
    queue_name: "log_queue",
  },
  urls: [
    {
      GET_NETWORKS_URL:
        "/caisd-rest/nr?WC=class%3D1000792%20and%20delete_flag%3D0&start=1&size=1000&SORT=z_requests_network_count DESC",
    },
    {
      GET_SERVICES_URL_FUNCTION: `/caisd-rest/z_networks_to_service?WC=network%3D`,
    },
    { GET_OPEN_TASKS_URL_FUNCTION: `/caisd-rest/in?WC=customer%3D` },
    {
      GET_OPEN_REQUESTS_TASKS_URL_FUNCTION: `/caisd-rest/chg?WC=requestor%3D`,
    },
    { GET_CLOSED_TASKS_URL_FUNCTION: `/caisd-rest/in?WC=customer%3D` },
    {
      GET_CLOSED_REQUESTS_TASKS_URL_FUNCTION: `/caisd-rest/chg?WC=requestor%3D`,
    },
    {
      GET_CATEGORIES_OF_INCIDENTS_URL_FUNCTION: `/caisd-rest/pcat?WC=z_impact_service%3D`,
    },
    {
      GET_CATEGORIES_OF_REQUESTS_URL_FUNCTION: `/caisd-rest/chgcat?WC=z_impact_service%3D`,
    },
    { GET_UUID_URL_FUNCTION: `/caisd-rest/cnt?WC=userid%3D'` },
    { GET_TRANSVERSE_URL_FUNCTION: `/caisd-rest/in?WC=category%3D'pcat:` },
    {
      GET_UPDATES:
        "/caisd-rest/in?WC=type%3D'I'%20and%20active%3D1%20and%20impact%3D1&SORT=open_date DESC",
    },
    { POST_NEW_INCIDENT: "/caisd-rest/in" },
    { POST_NEW_REQUEST: "/caisd-rest/chg" },
    { GET_HICHAT_IFRAME_URL: "/hichat" },
    { POST_SEND_HICHAT_MSG: "/hichat/sendmsg" },
  ],
};
