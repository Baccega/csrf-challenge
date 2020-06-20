import { Message, User } from "@csrf-challenge/common/src";
import { Item } from "@csrf-challenge/common/src/Item";
import {
  GARY_USERNAME,
  GARY_PASSWORD,
} from "@csrf-challenge/common/src/costants";

const fallbackMessagges: string[] = [
  "Yes, I think so",
  "No, I don't know",
  "Yeah! You are right",
  "That's great, I agree",
  "Are you sure about that?",
  "Shut up boomer",
  "Lmao",
  "Lol",
  "Mmmh. No homo thanks",
  "Niceeee",
  "GG",
  "Hahahaha get rekt",
  "Wanna play Fortnite?",
  "1v1 at baron?",
];
const visitingUrlMessagges: string[] = [
  "Nice link that you have here...it would be bad if someone...",
  "What is this?",
  "Oh I'll check it out...",
  "Can I open it?",
];

export function getRandomGaryFallbackPhrase(): string {
  return fallbackMessagges[
    Math.floor(Math.random() * fallbackMessagges.length)
  ];
}

export function getRandomGaryVisitingUrlPhrase(): string {
  return visitingUrlMessagges[
    Math.floor(Math.random() * visitingUrlMessagges.length)
  ];
}

export function getRandomGaryMessage(visitingUrl = false): Message {
  return {
    sender: GARY_USERNAME,
    text: visitingUrl
      ? getRandomGaryVisitingUrlPhrase()
      : getRandomGaryFallbackPhrase(),
  };
}

export function createGary(): User {
  return {
    username: GARY_USERNAME,
    password: GARY_PASSWORD, //TODO
    inventory: DEFAULT_INVENTORY,
  };
}

const DEFAULT_INVENTORY: Item[] = [
  {
    id: "0001",
    name: "Small sword",
    description: "A simple small sword",
  },
  {
    id: "0002",
    name: "Small staff",
    description: "A simple small staff",
  },
  {
    id: "0003",
    name: "Small shield",
    description: "A simple small shield",
  },
  {
    id: "0001",
    name: "Small sword",
    description: "A simple small sword",
  },
  {
    id: "0002",
    name: "Small staff",
    description: "A simple small staff",
  },
  {
    id: "0003",
    name: "Small shield",
    description: "A simple small shield",
  },
  {
    id: "0001",
    name: "Small sword",
    description: "A simple small sword",
  },
  {
    id: "0002",
    name: "Small staff",
    description: "A simple small staff",
  },
  {
    id: "0003",
    name: "Small shield",
    description: "A simple small shield",
  },
];
