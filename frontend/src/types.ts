import type { JSX } from "react";

export type TUser = {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAuthResponse = {
  accessToken: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
};

export type TRegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type TRoute = {
  path: string;
  component: JSX.Element;
};
