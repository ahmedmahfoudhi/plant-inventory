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
import { Button } from "./ui/button";

import Combobox from "./ui/combobox";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { AddPlantDialog } from "./AddPlantDialog";
import { Plant, PlantResponse } from "@/types";
import EditPlantDialog from "./EditPlantDialog";
import { DeletePlantDialog } from "./DeletePlantDialog";
import useDebounce from "@/hooks/useDebounce";
import { getPlants } from "@/actions/plant.actions";
import { PlantCategories } from "@/constants/plantCategories";
const plants = [
  {
    id: 1,
    name: "Croton",
    category: "Indoor",
    price: "$250.00",
    stock: 40,
  },
  {
    id: 2,
    name: "Snake Plant",
    category: "Indoor",
    price: "$150.00",
    stock: 20,
  },
  {
    id: 3,
    name: "Aloe Vera",
    category: "Indoor",
    price: "$100.00",
    stock: 30,
  },
  {
    id: 4,
    name: "Fiddle Leaf Fig",
    category: "Indoor",
    price: "$300.00",
    stock: 10,
  },
  {
    id: 5,
    name: "Spider Plant",
    category: "Indoor",
    price: "$80.00",
    stock: 25,
  },
  {
    id: 6,
    name: "Peace Lily",
    category: "Indoor",
    price: "$120.00",
    stock: 15,
  },
  {
    id: 7,
    name: "Pothos",
    category: "Indoor",
    price: "$90.00",
    stock: 35,
  },
];

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
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPlants.map((plant) => (
            <TableRow
              key={plant.id}
              onClick={() => router.push(`/plants/${plant.id}`)}
              className="cursor-pointer"
            >
              <TableCell>{plant.id}</TableCell>
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
      </Table>
    </>
  );
}

export default InventoryTable;
