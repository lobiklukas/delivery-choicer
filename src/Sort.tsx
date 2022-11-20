"use client";
import React from "react";
import { UilArrowUp, UilArrowDown, UilTimes } from "@iconscout/react-unicons";
const VALUES = ["asc", "desc", "-"];

interface SortInputProps {
  value: string;
  onClick: (value: string) => void;
}

const SortInput: React.FC<SortInputProps> = ({ value, onClick }) => {
  const getContent = () => {
    if (value === "asc") {
      return <UilArrowUp />;
    } else if (value === "desc") {
      return <UilArrowDown />;
    }
    return <UilTimes />;
  };

  const getNextValue = () => {
    const index = VALUES.indexOf(value);
    return VALUES[(index + 1) % VALUES.length] ?? "-";
  };

  return (
    <button className="btn-square btn" onClick={() => onClick(getNextValue())}>
      {getContent()}
    </button>
  );
};

type SortType = "desc" | "asc" | "-";

export type SortValue = {
  value: SortType;
  label: string;
};

interface SortProps {
  data: {
    [key: string]: SortValue;
  };
  onChange: (select: any) => void;
}

export const Sort: React.FC<SortProps> = ({ data, onChange }) => {
  const onClick = (key: string, value: string) => {
    onChange({ ...data, [key]: { ...data[key as keyof typeof data], value } });
  };

  return (
    <>
      <h1>Sort</h1>
      <div className="flex flex-wrap gap-2">
        {Object.keys(data).map((key) => {
          const item = data[key as keyof typeof data];
          return (
            <div key={key} className="flex items-center align-middle">
              <span className="mr-2">{item?.label}</span>
              <SortInput
                value={item?.value ?? "-"}
                onClick={(value) => onClick(key, value)}
              />
            </div>
          );
        })}
      </div>
      <div className="divider"></div>
    </>
  );
};
