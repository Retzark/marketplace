interface Grouping {
  edition: string; // Edition of the card, e.g., "First", "Second"
  type: string; // Type of the card, e.g., "Monster", "Spell"
  foil: string; // Foil type, could be "0" for Regular, "1" for Gold, etc.
}

export interface Card {
  _id: string; // Unique identifier for the card
  name: string; // Name of the card
  type: string;
  description: string; // Description of the card
  count: number; // A numeric value, possibly representing inventory count or similar
  hp: number; // HP attribute
  atk: number; // ATK attribute
  spd: number; // SPD attribute
  egy: number; // EGY attribute
  rarity: string; // RARITY attribute
  grouping: Grouping; // Nested object containing grouping information
  edition: string; // Edition of the card, e.g., "First", "Second"
  foil: string; // Foil type, could be "0" for Regular, "1" for Gold, etc.
}
