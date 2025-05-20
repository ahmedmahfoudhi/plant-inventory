"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Sprout } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { PlantCategories } from "@/constants/plantCategories";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Slider } from "./ui/slider";
import { Textarea } from "./ui/textarea";
import { addPlantSchema, Plant } from "@/types";
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
