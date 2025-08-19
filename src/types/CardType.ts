export type CardType = {
  CardNum: string;
  CardSet: string;
  Rarity: string;
  CardType: string;
  Name: string;
  Img: string;
  Images?: string[];

  Cost: number | null; // <-- erlaubt auch null
  BlockNumber: number;
  Power: number | null; // falls auch Power mal fehlt
  Counter: number | null; // <-- erlaubt auch null
  Life: string | number;
  Attribute: string;
  Types: string;
  Effects: string;
  CardEffects: string[];
};
