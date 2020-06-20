import React from "react";
import {
  GiFlyingFlag,
  GiBroadsword,
  GiCheckedShield,
  GiWizardStaff,
  GiStoneSpear,
  GiBroadDagger,
  GiLeatherArmor,
  GiLegArmor,
  GiVisoredHelm,
} from "react-icons/gi";
import { GoEyeClosed } from "react-icons/go";

export default function getItemIcon(id: string): JSX.Element {
  switch (id) {
    case "0000":
      return <GiFlyingFlag />;
    case "0001":
      return <GiBroadsword />;
    case "0002":
      return <GiStoneSpear />;
    case "0003":
      return <GiCheckedShield />;
    case "0004":
      return <GiBroadDagger />;
    case "0005":
      return <GiLeatherArmor />;
    case "0006":
      return <GiVisoredHelm />;
    case "0007":
      return <GiLegArmor />;
    case "0008":
      return <GiWizardStaff />;
    default:
      return <GoEyeClosed />;
  }
}
