"use client";
import Image from "next/image";
import React from "react";
import { RestaurantCard } from "./RestaurantCard";
import type { Restaurant } from "./types";

interface ChoicerProps {
  restaurants: Restaurant[];
}

export const Choicer: React.FC<ChoicerProps> = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] =
    React.useState<Restaurant | null>(null);

  const chooseRandomRestaurant = () => {
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    setSelectedRestaurant(restaurants[randomIndex] ?? null);
  };

  return (
    <div className="flex flex-col">
      <button className="btn-primary btn" onClick={chooseRandomRestaurant}>
        <span>Choose for me</span>
      </button>
      {selectedRestaurant && (
        <div className="mt-20">
          <RestaurantCard restaurant={selectedRestaurant} />
        </div>
      )}
    </div>
  );
};
