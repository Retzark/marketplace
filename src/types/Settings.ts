export interface Settings {
  account: string;
  sidechain_id: string;
  sidechain_rpc: string;
  nft_symbol: string;
  packs: Pack[];
  bonuses: Bonus[];
  currencies: Currency[];
  currency: string; // Main currency symbol
  market_fee: number;
  paypal_client_id: string;
}
interface Pack {
  symbol: string;
  cards: number;
  price: number;
  image: string;
  maxOpen: number;
  quantity: number;
  remaining: number;
}
type Bonus = [number, number]; // First element is quantity threshold, second is bonus percentage'

interface Currency {
  symbol: string;
  name: string;
  precision?: number; // Optional since some currencies like "HIVE" don't specify it
  peg?: number; // Optional, only applicable for certain currencies
}
