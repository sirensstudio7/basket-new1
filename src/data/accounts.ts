export type AccountType = "player" | "coach";

export interface DummyAccount {
  email: string;
  password: string;
  name: string;
  type: AccountType;
}

/** Profile data for account-based profiles (own profile view) */
export interface AccountProfile {
  id: string;
  name: string;
  position: string;
  shortPosition: string;
  location: string;
  imageId: number;
  bio: string;
  height: string;
  weight: string;
  age: number;
  jersey: string;
  team: string;
  experience: string;
  games: number;
  ppg: number;
  apg: number;
  rpg: number;
  spg: number;
  bpg: number;
  fg: string;
  threePt: string;
  ft: string;
}

/** Dummy accounts for demo - player and coach */
export const dummyAccounts: DummyAccount[] = [
  {
    email: "player@hoops.id",
    password: "player123",
    name: "Josh",
    type: "player",
  },
  {
    email: "coach@hoops.id",
    password: "coach123",
    name: "Coach Budi",
    type: "coach",
  },
];

/** Profile data for Josh (player account) - distinct from Ahmad Rizky */
export const accountProfiles: Record<string, AccountProfile> = {
  "player@hoops.id": {
    id: "josh",
    name: "Josh",
    position: "Point Guard",
    shortPosition: "PG",
    location: "Bandung, Indonesia",
    imageId: 25,
    bio: "Quick, crafty guard with strong ball-handling skills. Developing into a reliable playmaker. Competing in the West Java League.",
    height: "5'11\"",
    weight: "172 lbs",
    age: 22,
    jersey: "3",
    team: "Bandung Rising",
    experience: "3 seasons",
    games: 28,
    ppg: 14.2,
    apg: 5.8,
    rpg: 4.1,
    spg: 1.2,
    bpg: 0.1,
    fg: "43.5%",
    threePt: "35.2%",
    ft: "81.4%",
  },
  "coach@hoops.id": {
    id: "coach-budi",
    name: "Coach Budi",
    position: "Head Coach",
    shortPosition: "HC",
    location: "Jakarta, Indonesia",
    imageId: 33,
    bio: "Experienced coach focused on player development. Former national team assistant. Leading Jakarta Youth Academy.",
    height: "—",
    weight: "—",
    age: 45,
    jersey: "—",
    team: "Jakarta Youth Academy",
    experience: "15 years",
    games: 0,
    ppg: 0,
    apg: 0,
    rpg: 0,
    spg: 0,
    bpg: 0,
    fg: "—",
    threePt: "—",
    ft: "—",
  },
};

export function getAccountProfile(email: string): AccountProfile | null {
  return accountProfiles[email] ?? null;
}

const AUTH_KEY = "hoops_auth";

export function login(email: string, password: string): DummyAccount | null {
  const account = dummyAccounts.find(
    (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
  );
  if (account) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email: account.email, type: account.type, name: account.name }));
    return account;
  }
  return null;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function getCurrentUser(): { email: string; type: AccountType; name: string } | null {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}
