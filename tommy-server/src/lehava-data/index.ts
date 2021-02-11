import { Network, Service } from "./interface";
import { config } from "../config";
import axios from "axios";
import { AccessTokenProvider } from "../access-token/access-token-service";
import express from "express";

const getNetworksHeaders = async () => {
  return {
    "Content-type": "application/json",
    Accept: "application/json",
    "X-AccessKey": await AccessTokenProvider.getAccessToken(),
  };
};

const getServicesHeaders = async () => {
  return {
    "Content-type": "application/json",
    Accept: "application/json",
    "X-AccessKey": await AccessTokenProvider.getAccessToken(),
    "X-Obj-Attrs": "service",
  };
};

const getNetworks = async (): Promise<Network[]> => {
  const networksResponse = await axios.get(
    config.client.requests.GET_NETWORKS_URL,
    { headers: await getNetworksHeaders(), withCredentials: true }
  );
  const networksRaw = networksResponse.data.collection_nr.nr;
  const networks: Network[] = await networksRaw.map((networkObject: any) => {
    return {
      networkId: networkObject["@id"],
      networkName: networkObject["@COMMON_NAME"],
      services: [],
    };
  });

  return networks;
};

const getNetworkServices = async (networkId: string): Promise<Service[]> => {
  const res = await axios.get(
    config.client.requests.GET_SERVICES_URL_FUNCTION(networkId),
    { headers: await getServicesHeaders(), withCredentials: true }
  );

  let servicesResponse =
    res.data.collection_z_networks_to_service.z_networks_to_service;

  const services: Service[] = servicesResponse.map((element: any) => {
    const serviceObject = element.service;
    return {
      serviceId: serviceObject["@id"],
      serviceName: serviceObject["@COMMON_NAME"],
    };
  });
  return services;
};

const getServiceCategories = async (networkId: string): Promise<Service[]> => {
    const res = await axios.get(
      config.client.requests.GET_SERVICES_URL_FUNCTION(networkId),
      { headers: await getServicesHeaders(), withCredentials: true }
    );
  
    let servicesResponse =
      res.data.collection_z_networks_to_service.z_networks_to_service;
  
    const services: Service[] = servicesResponse.map((element: any) => {
      const serviceObject = element.service;
      return {
        serviceId: serviceObject["@id"],
        serviceName: serviceObject["@COMMON_NAME"],
      };
    });
    return services;
  };

const getAllData = async () => {
  const allNetworks = await getNetworks();

  const allData = allNetworks.map(async (networkObj: Network) => {
    const services = await getNetworkServices(networkObj.networkId);

    return {
      ...networkObj,
      services,
    };
  });
  return Promise.all(allData).then((results) => results);
};

export default getAllData;
