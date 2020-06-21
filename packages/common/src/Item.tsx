export interface Item {
  id: string;
  name: string;
  description: string;
  icon?: any;
}

export interface SendItem {
  to: string;
  position: number;
  encodedToken: string;
}

// No time for this
// export interface InventoryItem extends Item {
//   quantity: number;
// }
