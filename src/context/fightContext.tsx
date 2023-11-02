"use client";
import { useContext, createContext, useState } from "react";

import { CardPreview } from "@/@types/Card";
import { CardProps } from "@/@types/Card";

interface FightContextProps {
  handleWinner: (data: CardProps) => void;
  cards: CardPreview[];
  setCards: React.Dispatch<React.SetStateAction<CardPreview[]>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FightContext = createContext({} as FightContextProps);

export const FightProvider = ({ children }: { children: React.ReactNode }) => {
  const [cards, setCards] = useState<CardPreview[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  const handleWinner = ({ data }: CardProps) => {
    if (cards.length < 2) {
      setCards((prevState) => [...prevState, data]);
    }

    if (cards.length === 1) {
      setModal(!modal);
    }
  };

  return (
    <FightContext.Provider
      value={{ handleWinner, cards, setCards, modal, setModal }}
    >
      {children}
    </FightContext.Provider>
  );
};

export const useFight = () => useContext(FightContext);
