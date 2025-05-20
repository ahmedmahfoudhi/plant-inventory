import { getPlantById } from "@/actions/plant.actions";
import placeholderImage from "../../../../public/images/placeholderImg.png";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getUTImageUrl } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plant = await getPlantById(id);
  return {
    title: plant ? plant.name : "Plant Details",
    description: plant ? plant.description : "Plant details page.",
  };
}

async function PlantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plant = await getPlantById(id);
  if (!plant) {
    redirect("/plants");
  }
  return (
    <div className="flex gap-15 bg-accent rounded-lg p-5">
      <div className="h-[350px] w-[350px] overflow-hidden rounded-lg">
        <Image
          src={plant.image ? getUTImageUrl(plant.image) : placeholderImage}
          alt="plant-image"
          className="rounded-lg object-cover"
          height={350}
          width={350}
        />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold capitalize">{plant.name}</h1>
        <p className="font-semibold text-xl">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(plant.price)}
        </p>
        <Badge>{plant.category.toUpperCase()}</Badge>
        <p className="text-lg">
          Stock: <b>{plant.stock}</b>
        </p>
        <p className="text-lg font-white">{plant.description}</p>
      </div>
    </div>
  );
}

export default PlantPage;
