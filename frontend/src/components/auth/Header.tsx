import type { FC } from "react";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";

type TProps = {
  title: string;
  description: string;
};

export const AuthHeader: FC<TProps> = ({ title, description }) => {
  return (
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
      <CardDescription className="text-center">{description}</CardDescription>
    </CardHeader>
  );
};
