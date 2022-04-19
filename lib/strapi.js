// サービス情報取得処理
export const fetchService = async () => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}services`;
  const response = await fetch(url);
  const responseJson = await response.json();
  const responseData =
    responseJson?.map((resp, idx) => {
      return {
        params: {
          ...resp,
          id: resp.Name,
          service: resp.Name,
        },
      };
    }) || [];
  return responseData;
};

// 全てのページ情報取得処理
export const fetchAllPage = async () => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}pages`;
  const response = await fetch(url);
  const responseJson = await response.json();
  console.log("responseJson=" + responseJson);
  const responseData =
    responseJson?.map((resp, idx) => {
      return {
        params: {
          ...resp,
          page: resp.slug.replace("/", ""),
          service: resp.service.Name,
        },
      };
    }) || [];
  return responseData;
};

// ページ詳細情報取得
export const fetchPageDetail = async (serviceName, pageName) => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}pages?service.Name=${serviceName}&slug=/${pageName}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
};

// ページ情報取得処理(TOPページ用)
export const fetchPage = async (serviceName) => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}pages?service.Name=${serviceName}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
};

// お知らせ情報取得処理(TOPページ用)
export const fetchInformation = async (serviceName) => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}informations?service.Name=${serviceName}`;
  console.log(url);
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
};
