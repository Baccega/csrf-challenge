import { Message, User } from "@csrf-challenge/common/src";

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
    sender: "Gary",
    text: visitingUrl
      ? getRandomGaryVisitingUrlPhrase()
      : getRandomGaryFallbackPhrase(),
  };
}

export function createGary(): User {
  return {
    username: "gary",
    password: "gary", //TODO
    inventory: "inv",
  };
}
