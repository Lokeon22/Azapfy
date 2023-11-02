import { Powerstats } from "./Hero";

export interface CardProps {
  data: {
    id: number;
    images: {
      lg: string;
      md: string;
      sm: string;
      xs: string;
    };
    name: string;
    powerstats: Powerstats;
  };
}

export interface CardPreview {
  id: number;
  images: {
    lg: string;
    md: string;
    sm: string;
    xs: string;
  };
  name: string;
  powerstats: Powerstats;
}
