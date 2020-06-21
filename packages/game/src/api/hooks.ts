import { useEffect, useState, useCallback } from "react";

import { Endpoints } from "@csrf-challenge/common";
import { ResType, ParamsType } from "@csrf-challenge/common/dist/utils";
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

export function useRefreashableRemoteData<K extends keyof Endpoints>(
  endpoint: K,
  params?: ParamsType<K>
) {
  const [data, setData] = useState<ResType<K> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const handleReload = useCallback(() => setCounter(p => p + 1), [setCounter]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const received = await apiCall(endpoint, {
        params: params || {},
        body: null,
      });
      setData(received);
      setLoading(false);
    }

    loadData();
  }, [endpoint, params, counter]);

  return { data: data?.data, onReload: handleReload, loading };
}
