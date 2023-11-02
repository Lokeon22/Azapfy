import { numbersStats } from "@/utils/numberStats";
import { CardPreview } from "@/@types/Card";

import Image from "next/image";

export function Modal({ card }: { card: CardPreview[] }) {
  const n1 = numbersStats(card[0]);
  const n2 = numbersStats(card[1]);

  let winner = n1 > n2 ? card[0].name : card[1].name;

  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <div>
          <Image
            width={125}
            height={125}
            src={`${
              process.env.NEXT_PUBLIC_IMAGE_URL
            }/gh/akabab/superhero-api@0.3.0/api/images/md/${card[0].images.sm.slice(
              69
            )}`}
            alt={card[0].name}
            priority={true}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvmhRPQAGTwJs6OQmwAAAAABJRU5ErkJggg=="
          />
          <h2 className="mt-2 font-medium text-center md:text-start">
            {card[0].name}
          </h2>
        </div>
        <ul>
          <li>{card[0].powerstats.intelligence}</li>
          <li>{card[0].powerstats.strength}</li>
          <li>{card[0].powerstats.speed}</li>
          <li>{card[0].powerstats.durability}</li>
          <li>{card[0].powerstats.power}</li>
          <li>{card[0].powerstats.combat}</li>
        </ul>
      </div>

      <div className="flex flex-col justify-start items-center gap-2 md:gap-5 my-4 md:my-0  max-[345px]:my-1">
        <h2 className="text-lg font-semibold">
          <span className="text-green-500">Winner</span> {winner}
        </h2>

        <ul className="flex flex-col items-center text-sm md:text-base max-[345px]:hidden">
          <li>Intelligence</li>
          <li>Strength</li>
          <li>speed</li>
          <li>durability</li>
          <li>power</li>
          <li>combat</li>
        </ul>
      </div>

      <div className="flex flex-row-reverse items-center gap-3">
        <div>
          <Image
            width={125}
            height={125}
            src={`${
              process.env.NEXT_PUBLIC_IMAGE_URL
            }/gh/akabab/superhero-api@0.3.0/api/images/md/${card[1].images.sm.slice(
              69
            )}`}
            alt={card[1].name}
            priority={true}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvmhRPQAGTwJs6OQmwAAAAABJRU5ErkJggg=="
          />
          <h2 className="mt-2 font-medium text-end md:text-start">
            {card[1].name}
          </h2>
        </div>
        <ul>
          <li>{card[1].powerstats.intelligence}</li>
          <li>{card[1].powerstats.strength}</li>
          <li>{card[1].powerstats.speed}</li>
          <li>{card[1].powerstats.durability}</li>
          <li>{card[1].powerstats.power}</li>
          <li>{card[1].powerstats.combat}</li>
        </ul>
      </div>
    </>
  );
}
