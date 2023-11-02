import { CardPreview } from "@/@types/Card";

export const numbersStats = (figther: CardPreview) => {
  const { combat, durability, intelligence, power, speed, strength } =
    figther.powerstats;

  return combat + durability + intelligence + power + speed + strength;
};
