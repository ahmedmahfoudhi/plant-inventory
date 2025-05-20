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
import { Check, ChevronsUpDown, Loader2, Sprout } from "lucide-react";
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
import UploadImage from "./UploadImage";
import { deletePlantImage } from "@/actions/file.actions";

export interface PlantInformationDialogProps {
  onSubmit: (plant: Plant) => Promise<boolean>;
  plant?: Plant;
  setDialogOpen: (v: boolean) => void;
  dialogOpen: boolean;
}

export function PlantInformationDialog({
  onSubmit,
  plant,
  setDialogOpen,
  dialogOpen,
}: PlantInformationDialogProps) {
  console.log(plant);
  const form = useForm<Plant>({
    resolver: zodResolver(addPlantSchema),
    defaultValues: {
      name: plant?.name || "",
      stock: plant?.stock || 1,
      price: plant?.price || 1,
      description: plant?.description || "",
      category: plant?.category,
      image: plant?.image || "",
    },
  });

  const [submissionLoading, setSubmissionLoading] = useState<boolean>(false);

  const [popOverOpen, setPopOverOpen] = useState<boolean>(false);

  const { handleSubmit, control, reset } = form;

  const handleSubmitProcess = async (data: Plant) => {
    console.log("submitted");
    setSubmissionLoading(true);
    const isUpdateSuccess = await onSubmit(data);
    setSubmissionLoading(false);
    if (isUpdateSuccess) {
      setDialogOpen(false);
    }
  };

  const handleCancel = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const formImage = form.getValues("image");
    if (plant?.image !== formImage && formImage) {
      await deletePlantImage(formImage);
    }
    reset();
    setDialogOpen(false);
  };

  return (
    <AlertDialog open={dialogOpen}>
      <AlertDialogContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(handleSubmitProcess)}
            className="space-y-8"
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Add a Plant</AlertDialogTitle>
              <AlertDialogDescription>
                Fill in the below form to add a new plant to your inventory.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Plant Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Popover open={popOverOpen} onOpenChange={setPopOverOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? PlantCategories.find(
                                (category) => category.value === field.value
                              )?.label
                            : "Select a category"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search a category..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No plant category found.</CommandEmpty>
                          <CommandGroup>
                            {PlantCategories.map((category) => (
                              <CommandItem
                                value={category.label}
                                key={category.value}
                                onSelect={() => {
                                  form.setValue("category", category.value);
                                  setPopOverOpen(false);
                                }}
                              >
                                {category.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    category.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="stock"
              render={() => (
                <FormItem>
                  <FormLabel>
                    Stock: <b>{form.getValues("stock")}</b>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      step={1}
                      max={200}
                      min={1}
                      onValueCommit={(v) => {
                        form.setValue("stock", v[0]);
                      }}
                      className="mt-2"
                      defaultValue={[plant?.stock || 1]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Plant price" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your plant..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <UploadImage
              image={form.getValues("image")}
              onChange={(key) => form.setValue("image", key)}
              endpoint="imageUploader"
            />

            <AlertDialogFooter>
              <Button
                variant="outline"
                onClick={(e) => handleCancel(e)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={submissionLoading}
              >
                {submissionLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
