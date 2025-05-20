import { deletePlant } from "@/actions/plant.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
export function DeletePlantDialog({
  plantId,
  onSuccess,
}: {
  plantId: string;
  onSuccess?: () => Promise<void>;
}) {
  const handleDelete = async () => {
    try {
      await deletePlant(plantId);
      toast.success(`Plant deleted successfully`);
      if (onSuccess) {
        await onSuccess();
      }
    } catch (error) {
      toast.error((error as unknown as { message: string }).message);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
          <Trash2 className="h-16 w-16" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center flex justify-center">
            <TriangleAlert className="h-12 w-12 text-red-500" />
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            plant.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
