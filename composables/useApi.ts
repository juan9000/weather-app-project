import type { PartialLocation, SearchQuery } from "~/types/api/api.interface";

export default function useApi()  {
  const config = useRuntimeConfig();

  return {
    getSearchList: async (query: SearchQuery): Promise<any> => {
      const data = await $fetch(`${config.public.baseUrl}/search.json`,
        {
          key: `locations-${query.q}`,
          query: {
            key: config.public.apiKey,
            ...query,
          },
        },
      );
      return data;
    }
  }
}
