import { getPlants } from "@/actions/plant.actions";
import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { PlantResponse } from "@/types";
import { SignUp } from "@stackframe/stack";

async function PlantsPage() {
  const user = await stackServerApp.getUser();
  const plants = (await getPlants()).plants;

  if (!user) {
    return <SignUp />;
  }
  // const app = stackServerApp.urls;
  return <InventoryTable plants={plants as PlantResponse[]} />;
}

export default PlantsPage;
