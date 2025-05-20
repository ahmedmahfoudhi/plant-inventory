"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";

import { useEffect, useState, useTransition } from "react";

import Combobox from "./ui/combobox";
import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { AddPlantDialog } from "./AddPlantDialog";
import { PlantResponse } from "@/types";
import EditPlantDialog from "./EditPlantDialog";
import { DeletePlantDialog } from "./DeletePlantDialog";
import useDebounce from "@/hooks/useDebounce";
import { getPlants } from "@/actions/plant.actions";
import { PlantCategories } from "@/constants/plantCategories";

interface InventoryTableProps {
  plants: PlantResponse[];
}

function InventoryTable({ plants }: InventoryTableProps) {
  const [currentPlants, setCurrentPlants] = useState(plants);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isPendingSearch, startSearchPlants] = useTransition();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    startSearchPlants(async () => {
      const plants = (await getPlants(searchTerm, selectedCategory)).plants;
      setCurrentPlants(plants);
    });
  }, [debouncedSearchTerm, selectedCategory]);

  const router = useRouter();
  return (
    <>
      <div className="w-full">
        <div className="flex gap-2 items-center mb-4 justify-between">
          <div className="flex gap-2 items-center">
            <div className="relative w-full max-w--sm">
              <Input
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 transform -translate-y-1/2 " />
            </div>
            <Combobox
              value={selectedCategory}
              setValue={setSelectedCategory}
              dropdownMenu={[
                ...PlantCategories,
                { value: "all", label: "All" },
              ]}
            />
          </div>
          <AddPlantDialog />
        </div>
      </div>
      <Table>
        <TableCaption>A list of your plants.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="max-md:hidden">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isPendingSearch ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}>
                <div className="flex justify-center">
                  <Loader2 className="animate-spin text-center" />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {currentPlants.map((plant) => (
              <TableRow
                key={plant.id}
                onClick={() => router.push(`/plants/${plant.id}`)}
                className="cursor-pointer"
              >
                <TableCell className="max-md:hidden">{plant.id}</TableCell>
                <TableCell>{plant.name}</TableCell>
                <TableCell>{plant.category}</TableCell>
                <TableCell>{plant.price}</TableCell>
                <TableCell>{plant.stock}</TableCell>
                <TableCell
                  onClick={(e) => e.stopPropagation()}
                  className="flex gap-2 justify-center"
                >
                  <EditPlantDialog plant={plant} />
                  <DeletePlantDialog plantId={plant.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </>
  );
}

export default InventoryTable;
