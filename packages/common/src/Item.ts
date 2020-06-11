export default interface Item {
  id: String;
  name: String;
  description: String;
  icon: JSX.Element;
}

export interface InventoryItem extends Item {
  quantity: Number;
}
