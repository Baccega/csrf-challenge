// No need to be on the backend

import { GARY_USERNAME } from "@csrf-challenge/common/dist/costants";

export interface Friend {
  name: string;
  online: boolean;
}

export const FriendsList: Friend[] = [
  { name: GARY_USERNAME, online: true },
  { name: "Mark", online: false },
  { name: "John", online: false },
  { name: "Jack", online: false },
];
