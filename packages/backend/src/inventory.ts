import { User } from "@csrf-challenge/common/src";
import generateFlag from "./flag";
import dataRef from "./data";

// Ugly
export function removeItem(position: number, username: string): void {
  const userIndex = dataRef.users.findIndex(u => u.username === username);
  dataRef.users[userIndex].inventory = dataRef.users[
    userIndex
  ].inventory.filter((i, index) => index !== position);
}

export function addFlag(to: string): void {
  const userIndex = dataRef.users.findIndex(u => u.username === to);
  dataRef.users[userIndex].inventory = [
    ...dataRef.users[userIndex].inventory,
    generateFlag(),
  ];
}
