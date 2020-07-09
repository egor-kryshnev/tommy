export const config = {
    lehava_api: {
        lehavaHostName: process.env.LEHAVA_HOST_NAME || "lehava-api-mock:8050",
        requestUrl: process.env.SUPPORTERS_REQUEST_URL || "/caisd-rest/cnt?WC=z_pri_grp%3DU'1'",
    },
    redis: {
        host: process.env.REDIS_URL || 'redis://redis:6379'
    }
}