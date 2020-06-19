import { useEffect, useState, useCallback } from "react";

import { Endpoints } from "@csrf-challenge/common";
import { ResType, ParamsType } from "@csrf-challenge/common/src/utils";
import apiCall from "./apiCall";

export function useRemoteData<K extends keyof Endpoints>(
  endpoint: K,
  params?: ParamsType<K>
) {
  const [data, setData] = useState<ResType<K> | null>(null);

  useEffect(() => {
    async function loadData() {
      const received = await apiCall(endpoint, {
        params: params || {},
        body: null,
      });
      setData(received);
    }

    loadData();
  }, [endpoint, params]);

  return data?.data;
}
