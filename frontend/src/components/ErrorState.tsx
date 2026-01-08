import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/utils";
import type { TBackendErrorResponse } from "@/types";
import type { AxiosError } from "axios";
import { AlertCircle, RefreshCw } from "lucide-react";
import type { FC } from "react";

type TProps = {
  error: AxiosError<TBackendErrorResponse> | null;
  reset?: () => void;
};

export const ErrorState: FC<TProps> = ({ error, reset }) => {
  const errorMessage = getErrorMessage(error);

  const statusCode = error?.response?.status;

  return (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl border-muted">
      <AlertCircle className="h-12 w-12 text-rose-600 mb-4" />
      <h3 className="text-lg font-medium">
        {statusCode ? `Error ${statusCode}` : "Connection Error"}
      </h3>
      <p className="text-muted-foreground">{errorMessage}</p>
      {reset && (
        <Button
          variant="outline"
          onClick={reset}
          className="mt-4 gap-2 border-destructive/50 hover:bg-destructive/10"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
};
