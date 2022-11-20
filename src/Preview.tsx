"use client";
import React, { useMemo } from "react";
import { Choicer } from "./Choicer";
import { Filter } from "./Filter";
import { RestaurantCard } from "./RestaurantCard";
import { Sort } from "./Sort";
import type { Data } from "./types";
import _ from "lodash";

interface PreviewProps {
  data: Data;
}

export const Preview: React.FC<PreviewProps> = ({ data }) => {
  const allTitles = useMemo(
    () => data.aggregations.cuisines.map((item) => item.title),
    [data.aggregations.cuisines]
  );
  const [filter, setFilter] = React.useState<string[]>(allTitles);
  const [sortParams, setSortParams] = React.useState({
    rating: {
      label: "Hodnocení",
      value: "desc",
    },
    minPrice: { label: "Minimální hodnta doručení", value: "-" },
    deliveryFee: { label: "Popolatek za doručení", value: "-" },
  });

  const [selectedSort, setSelectedSort] = React.useState<string>("");

  const onFilter = (slug: string) => {
    if (filter.includes(slug)) {
      setFilter(filter.filter((item) => item !== slug));
    } else {
      setFilter([...filter, slug]);
    }
  };

  const onSelectAll = (select: boolean) => {
    if (select) {
      setFilter(allTitles);
    } else {
      setFilter([]);
    }
  };

  const filteredData = React.useMemo(() => {
    if (filter.length === 0) {
      return data.items;
    }
    return data.items.filter((item) => {
      const itemFilter = item.cuisines.map((item) => item.name);
      return filter.some((item) => itemFilter.includes(item));
    });
  }, [data, filter]);

  const sortedData = React.useMemo(
    () => {
      const fixedRating = filteredData.map((item) => {
        const rating = item.rating + 6;
        const review_number = item.review_number + 2;
        return {
          ...item,
          rating,
          review_number
        };
      });
      
    }
    [filteredData, sortParams]
  );

  return (
    <>
      {/* <pre>{JSON.stringify(data.aggregations, null, 2)}</pre> */}
      <div className="flex w-full justify-center p-32">
        <Choicer restaurants={filteredData} />
      </div>
      <Filter
        data={data.aggregations.cuisines}
        filter={filter}
        onFilter={onFilter}
        onSelectAll={onSelectAll}
      />
      <Sort data={sortParams} onChange={setSortParams} selected={selectedSort} onSelect={setSelectedSort} />
      <div>Počet restaurací: {filteredData.length}</div>
      <div className="flex flex-wrap gap-4">
        {sortedData.map((item) => (
          <RestaurantCard key={item.id} restaurant={item} />
        ))}
      </div>
    </>
  );
};
