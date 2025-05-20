"use client";

import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";

import { useState } from "react";

import { Plant } from "@/types";
import { addPlant } from "@/actions/plant.actions";
import { toast } from "sonner";
import { PlantInformationDialog } from "./PlantInformationDialog";

export function AddPlantDialog() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const onSubmit = async (data: Plant) => {
    try {
      const response = await addPlant(data);
      if (!response) {
        throw Error("Error when creating the plant");
      } else {
        toast.success(`Plant ${response.name} created successfully.`);
        setDialogOpen(false);
        return true;
      }
    } catch (error) {
      toast.error(
        (error as unknown as { message: string }).message ||
          "Error occured when creating the plant."
      );
      return false;
    }
  };

  return (
    <>
      <Button className="cursor-pointer" onClick={() => setDialogOpen(true)}>
        <Sprout className="h-4 w-4" /> Add Plant
      </Button>
      <PlantInformationDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        onSubmit={onSubmit}
      />
    </>
  );
}
