"use server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deletePlantImage(fileKey: string) {
  await utapi.deleteFiles(fileKey);
}

export async function getImageUrl(fileKey: string) {
    return `${process.env['UT_APP_ID']}.ufs.sh/f/${fileKey}`
}