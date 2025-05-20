"use server";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "./user.actions";
import { Plant } from "@/types";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ALL_CATEGORIES } from "@/constants/plantCategories";


export async function getPlants(searchTerm?: string, category?: string | null) {
    const userId = await getCurrentUserId();
    if (!userId) throw Error(`No user is logged in currently.`);
    try {
        const whereClause: Prisma.PlantWhereInput = {
            userId
        }
        if (searchTerm) {
            whereClause.name = {
                contains: searchTerm,
                mode: "insensitive"
            }
        }
        if (category && category !== ALL_CATEGORIES) {
            whereClause.category = {
                contains: category,
                mode: "insensitive"
            }
        }
        const plants = await prisma.plant.findMany({
            where: whereClause
        });
        
        return { success: true, plants };
        
    } catch (error) {
        console.error(error);
        throw Error("Failed to fetch plants");
    }
}


export async function getPlantById(id: string) {
    const plant = await prisma.plant.findUnique({ where: { id: id } });
    return plant;
}


export async function addPlant(plant: Plant) {
    const userId = await getCurrentUserId();
    if (!userId) throw Error(`No user is logged in currently.`);
    try {
        const result = await prisma.plant.create({ data: { ...plant, userId } });
        return result;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function deletePlant(id: string) {
    const userId = await getCurrentUserId();
    if (!userId) {
        throw Error(`No user is logged in currently.`);
    }
    const plant = await getPlantById(id);
    if (!plant) {
        throw Error(`Plant with id ${id} does not exist`);
    }
    if (plant.userId !== userId) {
        throw Error(`User does not have permission to delete the plant`);
    }
    try {
        const result = await prisma.plant.delete({ where: { id } });
        revalidatePath("/plants");
        return { success: true, message: `Plant ${result.name} was deleted successfully.` };
    } catch (error) {
        console.log(error);
        return { success: false, message: `Error occurect when deleting the plant` };
    }
}


export async function updatePlant(id: string, plant: Plant) {
    try {
        const result = await prisma.plant.update({ data: plant, where: { id } });
        console.log(result, " in updatePlant server action");
        revalidatePath("/plants")
        return result;
    } catch (error) {
        console.log(error);
        throw Error("Failed to update plant");
    }
}