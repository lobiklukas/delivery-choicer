'use client';
import React, { useMemo } from 'react';
import { Choicer } from './Choicer';
import { Filter } from './Filter';
import { RestaurantCard } from './RestaurantCard';
import type { SortValue } from './Sort';
import { Sort } from './Sort';
import type { Data } from './types';
import _ from 'lodash';

interface PreviewProps {
  data: Data;
}

export const Preview: React.FC<PreviewProps> = ({ data }) => {
  const allTitles = useMemo(
    () => data.aggregations.cuisines.map((item) => item.title),
    [data.aggregations.cuisines],
  );
  const [filter, setFilter] = React.useState<string[]>(allTitles);
  const [onlyAvailable, setOnlyAvailable] = React.useState(true);
  const [sortParams, setSortParams] = React.useState<{
    [key: string]: SortValue;
  }>({
    rating: {
      label: 'Hodnocení',
      value: 'desc',
    },
    minimum_order_amount: { label: 'Minimální hodnta doručení', value: '-' },
    minimum_delivery_fee: { label: 'Popolatek za doručení', value: '-' },
  });

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
    let items = data.items;

    if (onlyAvailable) {
      items = data.items.filter((item) => item.metadata.is_delivery_available);
    }

    return items.filter((item) => {
      const itemFilter = item.cuisines.map((item) => item.name);
      return filter.some((item) => itemFilter.includes(item));
    });
  }, [data.items, filter, onlyAvailable]);

  const sortedData = React.useMemo(() => {
    const fixedRating = filteredData.map((item) => {
      const index = item.review_number + 1;
      const avg_rating = (item.rating * (index - 1) + 1) / index;
      return {
        ...item,
        rating: item.rating ? item.rating : 0,
        avg_rating,
      };
    });

    const filteredSortKeys = Object.keys(sortParams).filter(
      (key) => sortParams[key]?.value !== '-',
    );

    const filteredSortValues = Object.values(sortParams).filter(
      (item) => item?.value !== '-',
    );

    const sorted = _.orderBy(
      fixedRating,
      filteredSortKeys,
      filteredSortValues.map((item) => item.value as 'asc' | 'desc'),
    );
    return sorted;
  }, [filteredData, sortParams]);

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
        setOnlyAvailable={setOnlyAvailable}
      />
      <Sort data={sortParams} onChange={setSortParams} />
      <div>Počet restaurací: {filteredData.length}</div>
      <div className="flex flex-wrap justify-center gap-4">
        {sortedData.map((item) => (
          <RestaurantCard key={item.id} restaurant={item} />
        ))}
      </div>
    </>
  );
};
