import React from "react";
import {
  GiFlyingFlag,
  GiBroadsword,
  GiCheckedShield,
  GiWizardStaff,
} from "react-icons/gi";
import { GoEyeClosed } from "react-icons/go";

export default function getItemIcon(id: string): JSX.Element {
  switch (id) {
    case "0000":
      return <GiFlyingFlag />;
    case "0001":
      return <GiBroadsword />;
    case "0002":
      return <GiWizardStaff />;
    case "0003":
      return <GiCheckedShield />;
    default:
      return <GoEyeClosed />;
  }
}
