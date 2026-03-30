import type { ElementType, FC } from "react";

type TProps = {
  title: string;
  description: string;
  Icon?: ElementType;
};

export const EmptyState: FC<TProps> = ({ title, description, Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl border-muted">
      {Icon && <Icon className="h-12 w-12 text-muted-foreground mb-4" />}
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
