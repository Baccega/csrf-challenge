import { User, Item } from "@csrf-challenge/common/src";
import generateFlag from "./flag";
import dataRef from "./data";
import { itemsList } from "../assets/itemsList";

// Ugly
export function removeItem(position: number, user: User): void {
  user.inventory = user.inventory.filter((i, index) => index !== position);
}

export function addFlag(to: string): void {
  const userIndex = dataRef.users.findIndex(u => u.username === to);
  dataRef.users[userIndex].inventory = [
    ...dataRef.users[userIndex].inventory,
    generateFlag(),
  ];
}

export function generateRandomItem(): Item {
  return itemsList[Math.floor(Math.random() * itemsList.length)];
}
