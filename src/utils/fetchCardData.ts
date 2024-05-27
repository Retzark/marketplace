// utils/fetchCardsData.ts
export const fetchCardsData = async () => {
  const response = await fetch("/cards.json");
  if (!response.ok) {
    throw new Error("Failed to fetch cards data");
  }
  return await response.json();
};
