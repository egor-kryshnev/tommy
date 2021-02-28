import axios from "axios";
import { config } from "../config";
import { AccessTokenProvider } from "../access-token/access-token-service";

export interface CategoryOfIncidents {
  collection_pcat: {
    pcat: {
      "@id": string;
      "@COMMON_NAME": string;
    }[];
  };
}

export interface CommonCategoryProperties {
  "@id": string;
  "@COMMON_NAME": string;
  "@REL_ATTR": string;
}

export interface CategoryOfRequests {
  collection_chgcat: {
    chgcat: {
      "@id": string;
      "@COMMON_NAME": string;
    }[];
  };
}

export interface Category {
  id: string;
  rel_attr: string;
  name: string;
  isIncident: boolean;
}

interface ExceptionOfIncidents {
  collection_z_pcat_to_network: {
    z_pcat_to_network: Exception[];
  };
}

interface ExceptionOfRequests {
  collection_z_chgcat_to_network: {
    z_chgcat_to_network: Exception[];
  };
}

interface Exception {
  "@id": string;
  "@COMMON_NAME": string;
  category: {
    "@id": string;
    "@COMMON_NAME": string;
  };
}

export class CategoryService {
  categories: any;
  selectedCategory: Array<string> | undefined;
  categoryList: Array<Category> = [];
  categoriesToDisplay: Array<string> | undefined;

  getCategoriesRequestHeaders = async () => {
    return {
      "Content-type": "application/json",
      Accept: "application/json",
      "X-AccessKey": await AccessTokenProvider.getAccessToken(),
    };
  };

  getExceptionsHeaders = async () => {
    return {
      "Content-type": "application/json",
      "X-Obj-Attrs": "category",
      Accept: "application/json",
      "X-AccessKey": await AccessTokenProvider.getAccessToken(),
    };
  };

  async getExceptionsOfIncidents(networkId: string) {
    return await axios.get(
      config.client.requests.GET_CATEGORIES_EXCEPTIONS_OF_INCIDENTS(networkId),
      { headers: await this.getExceptionsHeaders(), withCredentials: true }
    );
  }

  async getCategoriesOfIncidents(serviceId: string) {
    return await axios.get(
      config.client.requests.GET_CATEGORIES_OF_INCIDENTS_URL_FUNCTION(
        serviceId
      ),
      {
        headers: await this.getCategoriesRequestHeaders(),
        withCredentials: true,
      }
    );
  }

  async getExceptionsOfRequests(networkId: string) {
    return await axios.get(
      config.client.requests.GET_CATEGORIES_EXCEPTIONS_OF_REQUESTS(networkId),
      { headers: await this.getExceptionsHeaders(), withCredentials: true }
    );
  }

  async getCategoriesOfRequests(serviceId: string) {
    return await axios.get(
      config.client.requests.GET_CATEGORIES_OF_REQUESTS_URL_FUNCTION(serviceId),
      {
        headers: await this.getCategoriesRequestHeaders(),
        withCredentials: true,
      }
    );
  }

  async setCategories(id: string, networkId: string) {
    this.categoryList = [];
    const mapCategory = (
      el: CommonCategoryProperties,
      isIncident: boolean
    ): Category => ({
      id: el["@id"],
      rel_attr: el["@REL_ATTR"] || "1",
      name: el["@COMMON_NAME"],
      isIncident,
    });
    const mapIncident = (el: CommonCategoryProperties) => mapCategory(el, true);
    const mapRequest = (el: CommonCategoryProperties) => mapCategory(el, false);
    const appendCategoryList = (arr: Array<Category>) =>
      (this.categoryList = this.categoryList.concat(arr));
    const toArray = (arrOrElem: any) =>
      Array.isArray(arrOrElem) ? arrOrElem : [arrOrElem];
    const appendIncidents = (data: CategoryOfIncidents) =>
      data.collection_pcat.pcat
        ? appendCategoryList(
            toArray(data.collection_pcat.pcat).map(mapIncident)
          )
        : [];

    const appendRequests = (data: CategoryOfRequests) =>
      data.collection_chgcat.chgcat
        ? appendCategoryList(
            toArray(data.collection_chgcat.chgcat).map(mapRequest)
          )
        : [];

    const handleDataSubscribe = (
      data: CategoryOfIncidents | CategoryOfRequests | any
    ) =>
      "collection_pcat" in data ? appendIncidents(data) : appendRequests(data);

    let categoriesOfIncidents = await this.getCategoriesOfIncidents(id);
    let categoriesOfRequests = await this.getCategoriesOfRequests(id);

    handleDataSubscribe(categoriesOfIncidents.data);
    handleDataSubscribe(categoriesOfRequests.data);
    console.log(categoriesOfIncidents.data);
    console.log(categoriesOfRequests.data);

    // await Promise.all([
    //   new Promise((resolve, reject) =>
    //     this.getCategoriesOfIncidents(id).subscribe(
    //       handleDataSubscribe,
    //       (err: Error) => reject(err),
    //       () => resolve()
    //     )
    //   ),
    //   new Promise((resolve, reject) =>
    //     this.getCategoriesOfRequests(id).subscribe(
    //       handleDataSubscribe,
    //       (err: Error) => reject(err),
    //       () => resolve()
    //     )
    //   ),
    // ]);

    const exceptionToCategoryId = (exception: Exception) =>
      exception.category["@id"];

    const removeFromCategoryList = (exceptionsArray: Array<string>) =>
      (this.categoryList = this.categoryList.filter(
        (category: Category) =>
          !exceptionsArray.some(
            (exceptionId: string) => exceptionId === category.id
          )
      ));

    const removeIncidents = (data: ExceptionOfIncidents) =>
      data.collection_z_pcat_to_network &&
      data.collection_z_pcat_to_network.z_pcat_to_network
        ? removeFromCategoryList(
            toArray(data.collection_z_pcat_to_network.z_pcat_to_network).map(
              exceptionToCategoryId
            )
          )
        : null;

    const removeRequests = (data: ExceptionOfRequests) =>
      data.collection_z_chgcat_to_network &&
      data.collection_z_chgcat_to_network.z_chgcat_to_network
        ? removeFromCategoryList(
            toArray(
              data.collection_z_chgcat_to_network.z_chgcat_to_network
            ).map(exceptionToCategoryId)
          )
        : null;

    const handleExceptionSubscribe = (
      data: ExceptionOfIncidents | ExceptionOfRequests
    ) =>
      "collection_z_pcat_to_network" in data
        ? removeIncidents(data)
        : removeRequests(data);

    // await Promise.all([
    //   new Promise((resolve, reject) =>
    //     this.getExceptionsOfIncidents(networkId).subscribe(
    //       handleExceptionSubscribe,
    //       (err: Error) => reject(err),
    //       () => resolve()
    //     )
    //   ),
    //   new Promise((resolve, reject) =>
    //     this.getExceptionsOfRequests(networkId).subscribe(
    //       handleExceptionSubscribe,
    //       (err: Error) => reject(err),
    //       () => resolve()
    //     )
    //   ),
    // ]);

    let exceptionsOfIncidents = await this.getExceptionsOfIncidents(networkId);
    let exceptionsOfCategories = await this.getExceptionsOfRequests(networkId);
    handleExceptionSubscribe(exceptionsOfIncidents.data);
    handleExceptionSubscribe(exceptionsOfCategories.data);

    console.log(exceptionsOfIncidents.data);
    console.log(exceptionsOfCategories.data);

    this.buildData(
      this.categoryList.map((category: Category) => category.name.split("."))
    );
    this.categoriesToDisplay = this.getCategoriesToDisplay();
    return this.categoriesToDisplay;
  }

  buildData(categoryList: any) {
    this.selectedCategory = [];
    this.categories = this.generateObject(categoryList);
  }

  getCategoriesToDisplay() {
    return Object.keys(this.categories);
  }

  private buildNewProperty(obj: any, array: any) {
    let currObject = obj;
    for (let i = 1; i < array.length; i++) {
      if (!currObject[array[i]]) {
        currObject[array[i]] = {};
      }

      currObject = currObject[array[i]];
    }
  }

  private generateObject(arrays: any) {
    const obj = {};
    arrays.forEach((array: any) => {
      this.buildNewProperty(obj, array);
    });

    return obj;
  }
}
