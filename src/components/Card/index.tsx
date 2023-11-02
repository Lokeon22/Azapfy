"use client";
import Image from "next/image";

import { useFight } from "@/context/fightContext";
import { numbersStats } from "@/utils/numberStats";
import { CardProps } from "@/@types/Card";

export function Card({ data }: CardProps) {
  const { handleWinner } = useFight();

  const force = numbersStats(data);

  return (
    <div
      onClick={() => handleWinner({ data })}
      className="max-w-xs border-2 rounded-xl px-3 lg:px-6 flex flex-col items-center cursor-pointer"
    >
      <Image
        className="rounded shadow-hero_lg shadow-green-300/80 hover:shadow-green-300/95 hover:duration-200 transition-opacity opacity-0 duration-[2s]"
        width={150}
        height={150}
        src={`${
          process.env.NEXT_PUBLIC_IMAGE_URL
        }/gh/akabab/superhero-api@0.3.0/api/images/md/${data.images.sm.slice(
          69
        )}`}
        alt={data.name}
        priority={true}
        onLoadingComplete={(image) => image.classList.remove("opacity-0")}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvmhRPQAGTwJs6OQmwAAAAABJRU5ErkJggg=="
      />

      <label className="my-2 lg:my-2.5 text-center">
        <h2 className="uppercase font-medium text-sm">{data.name}</h2>
        <span className="font-medium">{force}</span>
      </label>
    </div>
  );
}
