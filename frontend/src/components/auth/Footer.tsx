import { Link } from "react-router-dom";
import { CardFooter } from "../ui/card";
import type { FC } from "react";

type TProps = {
  title: string;
  link: string;
  linkLabel: string;
};

export const AuthFooter: FC<TProps> = ({ title, link, linkLabel }) => {
  return (
    <CardFooter className="flex justify-center">
      <p className="text-sm text-muted-foreground">
        {title}{" "}
        <Link to={link} className="text-primary hover:underline font-medium">
          {linkLabel}
        </Link>
      </p>
    </CardFooter>
  );
};
