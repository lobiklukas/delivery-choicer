"use client";
import React from "react";
import type { FoodCharacteristicElement } from "./types";

interface FilterProps {
  data: FoodCharacteristicElement[];
  filter: string[];
  onFilter: (id: string) => void;
  onSelectAll: (select: boolean) => void;
}

export const Filter: React.FC<FilterProps> = ({
  data,
  onFilter,
  onSelectAll,
  filter,
}) => {
  return (
    <>
      <h1>Filter</h1>
      <label className="label cursor-pointer justify-start">
        <input
          type="checkbox"
          defaultChecked
          onChange={(e) => onSelectAll(e.target.checked)}
          className="checkbox-success checkbox mr-2"
        />
        Zobrazit vše
      </label>
      <div className="divider"></div>
      <div className="flex flex-wrap gap-2">
        {data.map((item) => (
          <label key={item.slug} className="label cursor-pointer">
            <input
              type="checkbox"
              checked={filter.includes(item.title)}
              onChange={() => onFilter(item.title)}
              className="checkbox-success checkbox mr-2"
            />
            {item.title}
          </label>
        ))}
      </div>
      <div className="divider"></div>
    </>
  );
};
