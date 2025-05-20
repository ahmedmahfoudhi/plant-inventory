import { getPlants } from "@/actions/plant.actions";
import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { PlantResponse } from "@/types";
import { SignUp } from "@stackframe/stack";

async function PlantsPage() {
  const user = await stackServerApp.getUser();
  if (!user) {
    return (
      <div className="flex justify-center h-full w-full items-center">
        <SignUp />
      </div>
    );
  }
  const plants = (await getPlants()).plants;

  return <InventoryTable plants={plants as PlantResponse[]} />;
}

export default PlantsPage;
