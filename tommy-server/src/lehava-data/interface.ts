export interface Service {
  serviceName: string;
  serviceId: string;
  categories: string[];
}

export interface Network {
  networkName: string;
  networkId: string;
  services: Service[];
}

export interface CategoryOfRequests {
  collection_chgcat: {
    chgcat: {
      "@id": string;
      "@COMMON_NAME": string;
    }[];
  };
}

export interface CategoryOfIncidents {
  collection_pcat: {
    pcat: {
      "@id": string;
      "@COMMON_NAME": string;
    }[];
  };
}
