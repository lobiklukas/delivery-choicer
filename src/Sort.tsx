"use client";
import React from "react";
import { UilArrowUp, UilArrowDown } from "@iconscout/react-unicons";
const VALUES = ["asc", "desc"];

interface SortInputProps {
  value: string;
  onClick: (value: string) => void;
}

const SortInput: React.FC<SortInputProps> = ({ value, onClick }) => {
  const getNextValue = () => {
    const index = VALUES.indexOf(value);
    return VALUES[(index + 1) % VALUES.length] ?? "-";
  };

  return (
    <button className="btn-square btn" onClick={() => onClick(getNextValue())}>
      {value === "asc" ? <UilArrowUp /> : <UilArrowDown />}
    </button>
  );
};

type sortValue = {
  value: string;
  label: string;
};

interface SortProps {
  data: {
    rating: sortValue;
    minPrice: sortValue;
    deliveryFee: sortValue;
  };
  onChange: (select: any) => void;
  selected: string;
  onSelect: (select: string) => void;
}

export const Sort: React.FC<SortProps> = ({
  data,
  onChange,
  selected,
  onSelect,
}) => {
  console.log("🚀 ~ file: Sort.tsx ~ line 46 ~ selected", selected);
  const onClick = (value: string) => {
    onChange({
      ...data,
      [selected]: { ...data[selected as keyof typeof data], value },
    });
  };

  return (
    <>
      <h1>Sort</h1>
      <div className="flex flex-wrap gap-2">
        <select
          onChange={(e) => onSelect(e.target.value)}
          className="select-bordered select w-full max-w-xs"
        >
          <option disabled selected>
            Sort by
          </option>
          {Object.keys(data).map((key) => {
            const item = data[key as keyof typeof data];
            return (
              <option key={key} value={key}>
                {item.label}
              </option>
            );
          })}
        </select>
        {selected && (
          <SortInput
            onClick={onClick}
            value={data[selected as keyof typeof data].value}
          />
        )}
      </div>
      <div className="divider"></div>
    </>
  );
};
