import axios from "axios";

export const truncStr = (string: string, limit: number) => {
  return string.length > limit
    ? string
        .trim()
        .substring(0, limit - 3)
        .trim() + "..."
    : string;
};

const resources: { [key: string]: any } = {};

const makeRequestCreator = () => {
  let cancel: any;

  return async (query: string) => {
    if (cancel) {
      cancel.cancel();
    }
    cancel = axios.CancelToken.source();
    try {
      if (resources[query]) {
        return resources[query];
      }
      const res = await axios(query, { cancelToken: cancel.token });
      const result = res.data.items;
      resources[query] = result;
      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error("リクエストがキャンセルされました", error.message);
      } else {
        console.error("エラーが発生しました ");
      }
    }
  };
};

export const search = makeRequestCreator();
