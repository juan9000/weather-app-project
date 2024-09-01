import type { SearchQuery } from "~/types/api/api.interface";

export default function useApi()  {
  const config = useRuntimeConfig();

  return {
    getSearchList: async (query: SearchQuery): Promise<any> => {
      const { data: response } = await useFetch(`${config.public.baseUrl}/search.json`,
        {
          key: `locations-${query.q}`,
          query: {
            key: config.public.apiKey,
            ...query,
          },
          server: false,
        },
      );
      return response.value;
    }
  }
}
