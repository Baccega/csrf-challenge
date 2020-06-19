// No need to be on the backend

export interface Friend {
  name: string;
  online: boolean;
}

export const FriendsList: Friend[] = [
  { name: "Gary", online: true },
  { name: "Dude", online: false },
  { name: "Other dude", online: false },
  { name: "Sad", online: false },
];
