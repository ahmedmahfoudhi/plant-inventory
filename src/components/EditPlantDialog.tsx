import React, { useState } from "react";
import { PlantInformationDialog } from "./PlantInformationDialog";
import { Plant, PlantResponse } from "@/types";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { updatePlant } from "@/actions/plant.actions";
import { toast } from "sonner";
import { deletePlantImage } from "@/actions/file.actions";
function EditPlantDialog({ plant }: { plant: PlantResponse }) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const handleSubmit = async (data: Plant) => {
    const oldImageKey = plant.image || "";
    try {
      const result = await updatePlant(plant.id, data);
      console.log(result);
      toast.success("Plant updated successfully");
      if (data.image !== oldImageKey && oldImageKey) {
        deletePlantImage(oldImageKey);
      }
      return true;
    } catch (error) {
      toast.error(
        (error as unknown as { message: string }).message ||
          "Failed to update plant."
      );
      return false;
    }
  };
  return (
    <>
      <Button
        variant="secondary"
        className="cursor-pointer"
        onClick={() => setDialogOpen(true)}
      >
        <Edit className="h-16 w-16" /> Edit
      </Button>
      <PlantInformationDialog
        onSubmit={handleSubmit}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        plant={plant as Plant}
      />
    </>
  );
}

export default EditPlantDialog;
