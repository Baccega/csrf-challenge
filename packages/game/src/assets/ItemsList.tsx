import React from "react";
import { GiBroadsword, GiCheckedShield, GiWizardStaff } from "react-icons/gi";
import Item from "@csrf-challenge/common/src/Item";

export const ItemsList: Item[] = [
  {
    id: "0001",
    name: "Small sword",
    description: "A simple small sword",
    icon: <GiBroadsword />,
  },
  {
    id: "0002",
    name: "Small staff",
    description: "A simple small staff",
    icon: <GiWizardStaff />,
  },
  {
    id: "0003",
    name: "Small shield",
    description: "A simple small shield",
    icon: <GiCheckedShield />,
  },
];