"use client";
import { useState } from "react";
import useSWR from "swr";

import { useFight } from "@/context/fightContext";
import { CardPreview } from "@/@types/Card";

import { AiOutlineSearch, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiSolidUserCircle, BiPlanet } from "react-icons/bi";

import { Card } from "@/components/Card";
import { Modal } from "@/components/Modal";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const { cards, modal, setModal, setCards } = useFight();

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, error }: { data: CardPreview[]; error: any } = useSWR(
    "http://homologacao3.azapfy.com.br/api/ps/metahumans",
    fetcher,
    { refreshInterval: 60 * 60 * 24 } // 24 hours
  );

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="min-w-[40px] min-h-[40px] animate-spin" />
      </div>
    );

  const handleOutsideClick = () => {
    setModal(false);
    setCards([]);
  };

  return (
    <main className="w-full h-full flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 2xl:p-8 md:p-4 p-1">
      <div className="w-full h-full flex flex-col items-center justify-start gap-1 md:gap-3 lg:gap-4 p-2 lg:p-4 col-span-1">
        <div className="flex flex-col items-center gap-1">
          <BiSolidUserCircle className="min-w-[40px] min-h-[40px]" />
          <h2 className="text-lg">Gabriel</h2>
        </div>

        <div className="relative w-full my-2.5 md:my-8">
          <AiOutlineSearch className="min-w-[20px] min-h-[20px] absolute left-2.5 top-2.5 text-gray-300" />
          <input
            className="w-full h-10 px-8 outline-none rounded-3xl border border-purple-600 bg-transparent"
            type="text"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
        </div>
        <button className="hidden md:flex items-center justify-center gap-2.5 bg-blue-700 w-2/3 p-2 rounded-md hover:duration-200 hover:brightness-90">
          <BiPlanet className="min-w-[20px] min-h-[20px]" />
          Cartas
        </button>
      </div>

      <section className="relative w-full min-h-[85vh] flex flex-wrap items-center justify-center my-2.5 md:my-0 gap-3 md:gap-5 lg:gap-8 xl:gap-10 md:col-span-2 lg:col-span-3 xl:col-span-4">
        {data
          .filter((item) => {
            if (search === "") {
              return item;
            } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
              return item;
            }
          })
          .map((dt) => {
            return <Card key={dt.id} data={dt} />;
          })}

        <div
          id="overlay"
          onClick={handleOutsideClick}
          className="fixed w-full h-full top-0 left-0 bottom-0 right-0 bg-gray-400 bg-opacity-40"
          style={{ display: modal ? "block" : "none" }}
        />

        {modal && (
          <main
            id="container"
            className="fixed z-20 px-2 md:px-5 py-6 md:py-20 rounded w-3/4 sm:max-w-2xl sm:h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-gray-100 shadow-2xl max-[345px]:py-2"
          >
            <section className="relative flex flex-col md:flex-row items-center justify-between">
              <Modal key={cards[0].id} card={cards} />
            </section>
          </main>
        )}
      </section>
    </main>
  );
}
