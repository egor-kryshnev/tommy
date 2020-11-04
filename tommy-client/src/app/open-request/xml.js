const { toXML } = require('jstoxml');

const userUUID = 'userUUID';
const phoneNumber = 'phoneNumber';
const priority = "505";
const urgency = "1102";
const userT = 'userT';
const networkId = 'networkId';
const serviceId = 'serviceId';
const descriptionCategory = 'descriptionCategory';
const descriptionInput = 'descriptionInput';
const location = 'location';
const computerName = 'computerName';
const voip = 'voip';
const categoryId = 'categoryId';
const file = {
  base64: 'base64',
  name: 'nameFile'
};

const getFormDataBody = (postType) => {
  return `--*****MessageBoundary*****\r
  Content-Disposition: form-data; name="${postType}"
  Content-Type: application/xml; CHARACTERSET=UTF-8
  \r
  <${postType}>
      ${convertToXml(postType === 'chg' ?
    getRequest() : getIncident())}
  </${postType}>
  \r
  --*****MessageBoundary*****\r
  Content-Disposition: form-data; name="${file.name}"; filename="${file.name}"
  Content-Type: application/octet-stream
  Content-Transfer-Encoding: base64
  \r
  ${file.base64}
  \r
  --*****MessageBoundary*****--\r
  `;
}

const convertToXml = (object) => {
  let fixedConvert = [];
  for (const [key, value] of Object.entries(object)) {
    if (typeof (value) === 'object') {
      fixedConvert = [...fixedConvert,
      {
        _name: key,
        _attrs: {
          id: value['@id']
        }
      }
      ]
    } else {
      fixedConvert = [...fixedConvert,
      {
        [key]: value
      }
      ]
    }
    // fixedConvert = [...fixedConvert,
    // {
    //   [key]: value
    // }
    // ]
  }
  return toXML(fixedConvert)
}

const getIncident = () => {
  return {
    "customer": {
      "@id": userUUID
    },
    "category": {
      "@REL_ATTR": categoryId
    },
    ...getCommonBodyProperties()
  }
}

const getRequest = () => {
  return {
    "requestor": {
      "@id": userUUID
    },
    "category": {
      "@id": categoryId
    },
    ...getCommonBodyProperties()
  }
}

const getCommonBodyProperties = () => {
  return {
    "z_cst_phone": phoneNumber,
    "priority":
    {
      "@id": "505"
    },
    "Urgency":
    {
      "@id": "1102"
    },
    "z_ipaddress": "1.1.1.1",
    "z_username": userT,
    "z_computer_name": computerName,
    "z_current_loc": location,
    "z_cst_red_phone": voip,
    "z_network":
    {
      "@id": networkId
    },
    "z_impact_service":
    {
      "@id": serviceId
    },
    "description": 'description',
    "z_source":
    {
      "@id": "400104"
    },
    "impact":
    {
      "@id": "1603"
    }
  }
}

console.log(getFormDataBody('chg'))