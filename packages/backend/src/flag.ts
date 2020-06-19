import { Item } from "@csrf-challenge/common/src";

export default function generateFlag(): Item {
  return {
    id: "0000",
    name: "Flag",
    description: `The flag is: ${process.env.FLAG}`,
  };
}
