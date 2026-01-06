import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import type { FC } from "react";

type TProps = {
  errorMessage?: string;
};

export const AlertMessage: FC<TProps> = ({ errorMessage }) => {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{errorMessage || "An error occurred"}</AlertDescription>
    </Alert>
  );
};
