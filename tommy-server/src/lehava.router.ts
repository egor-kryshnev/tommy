import { Router, Request, Response } from "express";
import { AuthorizationMiddleware } from "./authorization/middleware";
import { AccessTokenProvider } from "./access-token/access-token-service";
import axios, { Method } from "axios";
import { IpMiddleware } from "./utils/middlewares/ip-middleware";
import { config } from "./config";
import { logger } from "./utils/logger-client";

const LehavaRouter: Router = Router();

LehavaRouter.post("*", AuthorizationMiddleware.postAuthorization, IpMiddleware);

LehavaRouter.post("/file/*", async (req: Request, res: Response) => {
  const url = `http://${config.lehava_api.host}:${
    config.lehava_api.port
  }${getRequestWithFileUrl(req.url, req.body.file)}`;
  try {
    const apiHeaders = { ...req.headers };
    apiHeaders["X-AccessKey"] = await AccessTokenProvider.getAccessToken();
    apiHeaders["content-type"] =
      "multipart/form-data; BOUNDARY=*****MessageBoundary*****";

    logger({
      message: `Proxying to ${url}`,
      info: {
        method: req.method as Method,
        url,
        params: req.params,
        headers: apiHeaders,
        data: getFormDataBody(
          req.body.postType,
          req.body[req.body.postType],
          req.body.file
        ),
      },
    });

    const apiRes = await axios({
      method: req.method as Method,
      url,
      params: req.params,
      headers: apiHeaders,
      data: getFormDataBody(
        req.body.postType,
        req.body[req.body.postType],
        req.body.file
      ),
    });

    res.status(apiRes.status).send(apiRes.data);
  } catch (e) {
    logger(e);
    res.send(e.message);
  }
});

LehavaRouter.all("*", async (req: Request, res: Response) => {
  const url = `http://${config.lehava_api.host}:${config.lehava_api.port}${req.url}`;
  try {
    const apiHeaders = { ...req.headers };
    apiHeaders["X-AccessKey"] = await AccessTokenProvider.getAccessToken();
    logger({
      message: `Proxying to ${url}`,
      info: {
        method: req.method as Method,
        url,
        params: req.params,
        headers: apiHeaders,
        data: req.body,
      },
    });

    const apiRes = await axios({
      method: req.method as Method,
      url,
      params: req.params,
      headers: apiHeaders,
      data: req.body,
    });

    res.status(apiRes.status).send(apiRes.data);
  } catch (e) {
    logger(e);
    res.send(e.message);
  }
});

const getRequestWithFileUrl = (
  reqUrl: string,
  fileObject: {
    name: string;
    type: string;
    base64: string;
  }
): string => {
  return `${reqUrl.split("/file")[1]}?repositoryId=1002&serverName=${
    config.lehava_api.host
  }&mimeType=${fileObject.type}&description=${fileObject.name}`;
};

const getFormDataBody = (
  postType: string,
  postObject: any,
  file: {
    name: string;
    type: string;
    base64: string;
  }
): string => {
  return `--*****MessageBoundary*****\r
  Content-Disposition: form-data; name="${postType}"
  Content-Type: application/xml; CHARACTERSET=UTF-8
  \r
  <${postType}>
      ${
        postType === "chg"
          ? `<requestor id="${postObject.requestor["@id"]}"/>
        <category id="${postObject.category["@id"]}"/>`
          : `<customer id="${postObject.customer["@id"]}"/>
        <category REL_ATTR="${postObject.category["@REL_ATTR"]}"/>`
      }
        <z_cst_phone>${postObject.z_cst_phone}</z_cst_phone>
        <priority id="${postObject.priority["@id"]}"/>
        <Urgency id="${postObject.Urgency["@id"]}"/>
        <z_ipaddress>${postObject.z_ipaddress}</z_ipaddress>
        <z_username>${postObject.z_username}</z_username>
        <z_computer_name>${postObject.z_computer_name}</z_computer_name>
        <z_current_loc>${postObject.z_current_loc}</z_current_loc>
        <z_cst_red_phone>${postObject.z_cst_red_phone}</z_cst_red_phone>
        <z_network id="${postObject.z_network["@id"]}"/>
        <z_impact_service id="${postObject.z_impact_service["@id"]}"/>
        <description>${postObject.description}</description>
        <z_source id="${postObject.z_source["@id"]}"/>
        <impact id="${postObject.impact["@id"]}"/>
  </${postType}>
  \r
  --*****MessageBoundary*****\r
  Content-Disposition: form-data; name="${file.name}"; filename="${file.name}"
  Content-Type: application/octet-stream
  Content-Transfer-Encoding: base64
  \r
  ${file.base64}
  \r
  --*****MessageBoundary*****--\r`;
};

export { LehavaRouter };
