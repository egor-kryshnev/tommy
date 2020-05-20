export const config = {
    GET_NETWORKS_URL: "/api/caisd-rest/nr?WC=class%3D1000792%20and%20delete_flag%3D0",
    GET_SERVICES_URL_FUNCTION: (id: string) => `/api/caisd-rest/z_networks_to_service?WC=network%3D${id}%20and%20delete_flag%3D0`,
    GET_OPEN_TASKS_URL_FUNCTION: (UUID: string) => `/api/caisd-rest/cr?WC=customer%3D${UUID}%20and%20type%3D'R'%20and%20active%3D1`,
    GET_CLOSED_TASKS_URL_FUNCTION: (UUID: string) => `/api/caisd-rest/cr?WC=customer%3D${UUID}%20and%20type%3D'R'%20and%20active%3D0`,
    GET_CATEGORIES_OF_INCIDENTS_URL_FUNCTION: (id: string) => `/api/caisd-rest/pcat?WC=z_impact_service%3D${id}%20and%20delete_flag%3D0`,
    GET_CATEGORIES_OF_REQUESTS_URL_FUNCTION: (id: string) => `/api/caisd-rest/chgcat?WC=z_impact_service%3D${id}%20and%20delete_flag%3D0`,
    GET_UUID_URL_FUNCTION: (userT: string) => `/api/caisd-rest/cnt?WC=userid%3D'${userT}'`,
    GET_UPDATES: "/api/caisd-rest/cr?WC=type%3D'I'%20and%20active%3D1%20and%20impact%3D1",
    POST_NEW_REQUEST: "/api/caisd-rest/cr",
    // GET_HICHAT_IFRAME_URL: '/hichat',
    GET_HICHAT_IFRAME_URL: 'http://localhost:8050/hichat/exampleurl'
};
