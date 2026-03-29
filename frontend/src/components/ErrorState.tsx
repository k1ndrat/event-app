import type { FC } from "react";
import type { AxiosError } from "axios";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TBackendErrorResponse } from "@/types";

type TProps = {
  error: AxiosError<TBackendErrorResponse> | null;
  reset?: () => void;
};

export const ErrorState: FC<TProps> = ({ error, reset }) => {
  const errorMessage = Array.isArray(error?.response?.data?.message)
    ? error?.response?.data?.message[0]
    : error?.response?.data?.message || "An unexpected error occurred";

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
