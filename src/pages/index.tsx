import { useQuery } from '@tanstack/react-query';
import LoaderFullPage from '../LoaderFullPage';
import { Preview } from '../Preview';
import type { DameJIdloResponse } from '../types';

const queryParams = {
  latitude: 50.13203679999999,
  longitude: 14.4720206,
  language_id: 3,
  include: 'characteristics',
  dynamic_pricing: 0,
  configuration: 'vendor-ranking-Variation-rlp-budget-sign-Control',
  country: 'cz',
  use_free_delivery_label: true,
  tag_label_metadata: false,
  ncr_screen: 'shop_list',
  ncr_place: 'list',
  vertical: 'restaurants',
  limit: 99999999,
  offset: 0,
  customer_type: 'regular',
};

const dameJidloUrl =
  'https://disco.deliveryhero.io/listing/api/v1/pandora/vendors';

export default function Home() {
  const queryString = Object.keys(queryParams)
    .map((key) => key + '=' + queryParams[key as keyof typeof queryParams])
    .join('&');
  const url = dameJidloUrl + '?' + queryString;

  const { data, isLoading } = useQuery<DameJIdloResponse>(
    ['damejidlo'],
    async () => {
      const data = await fetch(url, {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-language': 'en',
          'cache-control': 'no-cache',
          'dps-session-id':
            'eyJzZXNzaW9uX2lkIjoiMDk5NzdhYmRiOWIzZDJhN2NhOThkMzYzMWU2OTZiNTAiLCJwZXJzZXVzX2lkIjoiMTY2ODk2MDY0OS45MDg4MjkwMjA0LmZhWjFVQ2Z4T00iLCJ0aW1lc3RhbXAiOjE2Njg5NjA2Njd9',
          pragma: 'no-cache',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'user-logged-in': 'false',
          'x-disco-client-id': 'web',
          'x-fp-api-key': 'volo',
        },
        method: 'GET',
      });
      const json = await data.json();
      return json;
    },
  );

  if (isLoading) {
    return <LoaderFullPage />;
  }

  if (!data) {
    return <div>Something went wrong</div>;
  }

  return (
    <section className="container mx-auto ">
      <Preview data={data.data} />
    </section>
  );
}
