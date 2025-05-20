import { Box } from "lucide-react";
import React from "react";

function ExploreCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center flex-col p-4 gap-3 hover:shadow-md shadow-accent-foreground hover:border-t-1 border-accent-foreground rounded-xl ">
      <Box className="w-12 h-12" />
      <h2 className="text-xl text-center font-semibold capitalize">{title}</h2>
      <p className="text-sm text-center text-accent-foreground">
        {description}
      </p>
    </div>
  );
}

export default ExploreCard;
