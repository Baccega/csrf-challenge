// No need to be on the backend

import { GARY_USERNAME } from "@csrf-challenge/common/src/costants";

export interface Friend {
  name: string;
  online: boolean;
}

export const FriendsList: Friend[] = [
  { name: GARY_USERNAME, online: true },
  { name: "Dude", online: false },
  { name: "Other dude", online: false },
  { name: "Sad", online: false },
];
