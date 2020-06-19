import { User } from "@csrf-challenge/common/src";
import generateFlag from "./flag";
import dataRef from "./data";

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
