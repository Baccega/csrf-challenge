import express from "express";
/* eslint-disable-next-line import/no-unresolved */
import { RequestHandler } from "express-serve-static-core";
import { Endpoints } from "@csrf-challenge/common";
import {
  ParamsType,
  ResType,
  ReqType,
} from "@csrf-challenge/common/dist/utils";

export default function safeEndpoint<K extends keyof Endpoints>(
  app: ReturnType<typeof express>,
  endpoint: K,
  ...handlers: RequestHandler<ParamsType<K>, ResType<K>, ReqType<K>>[]
) {
  if (endpoint.startsWith("GET ")) {
    app.get<ParamsType<K>, ResType<K>, ReqType<K>>(
      endpoint.substr("GET ".length),
      ...handlers
    );
  } else if (endpoint.startsWith("POST ")) {
    app.post<ParamsType<K>, ResType<K>, ReqType<K>>(
      endpoint.substr("POST ".length),
      ...handlers
    );
  } else if (endpoint.startsWith("PUT ")) {
    app.put<ParamsType<K>, ResType<K>, ReqType<K>>(
      endpoint.substr("PUT ".length),
      ...handlers
    );
  } else {
    throw new Error("Not implemented");
  }
}
