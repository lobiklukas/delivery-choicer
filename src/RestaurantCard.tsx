"use client";
import Image from "next/image";
import React from "react";
import type { Restaurant } from "./types";
import {
  UilTruck,
  UilUsdCircle,
  UilCrockery,
  UilAt,
  UilCar,
  UilStar,
  UilTaxi,
} from "@iconscout/react-unicons";
import clsx from "clsx";

interface RestaurantCardProps {
  restaurant: Restaurant;
}
export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
}) => {
  const { is_delivery_available = true } = restaurant.metadata;
  return (
    <>
      <div className="card w-auto max-w-[300px] bg-base-200 shadow-xl">
        <figure>
          <Image
            src={restaurant.hero_image}
            alt="hero"
            width={300}
            height={200}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            <span
              className={clsx(
                is_delivery_available ? "bg-success" : "bg-error",
                "h-3 w-3 rounded-full"
              )}
            />
            {restaurant.name}
          </h2>
          <p className="flex gap-2">
            <UilStar />
            {restaurant.rating} / {restaurant.review_number}
          </p>
          <p className="flex gap-2">
            <UilAt />
            {restaurant.address}
          </p>
          <p className="flex gap-2">
            <UilCrockery />
            {restaurant.characteristics.primary_cuisine.name}
          </p>
          <p className="flex gap-2">
            <UilCar />
            {restaurant.delivery_provider == "platform_delivery"
              ? "DámeJídlo"
              : "Third Party"}
          </p>
          <p className="flex gap-2">
            <UilUsdCircle />
            min. {restaurant.minimum_order_amount},-
          </p>
          <p className="flex gap-x-2">
            <UilTaxi />{" "}
            {restaurant.original_delivery_fee ??
              restaurant.minimum_delivery_fee}
            ,-
          </p>
          <p className="flex gap-x-2">
            <UilTruck /> {restaurant.minimum_delivery_time} minut
          </p>
          {restaurant.metadata.close_reasons.length > 1 && (
            <p>
              Close reasons:{" "}
              {restaurant.metadata.close_reasons.map((s) => (
                <p key={s}>{s}</p>
              ))}
            </p>
          )}
          {restaurant.description && <p>Popisek: {restaurant.description}</p>}
          <div className="card-actions justify-center">
            <a href={restaurant.redirection_url} className="btn-primary btn">
              Open
            </a>
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(restaurant, null, 2)}</pre> */}
    </>
  );
};
