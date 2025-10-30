// src/types.ts
export interface Nursery {
  id: number;
  name: string;
  ville: string;
  lat: number;
  lng: number;
  placesDispo: number;
  image?: string;
}

export interface User {
  prenom: string;
  nom: string;
  enfants: string[];
  entreprise: {
    nom: string;
    adresse: string;
    lat: number;
    lng: number;
  };
}
