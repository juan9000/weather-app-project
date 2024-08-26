import type { SearchQuery } from "~/types/api/api.interface";

export default function useApi()  {
  const config = useRuntimeConfig();

  return {
    getSearch: async (query: SearchQuery): Promise<any> => {
      const { data: response } = await useFetch(`${config.public.baseUrl}/current.json`,
        {
          query: {
            key: config.public.apiKey,
            ...query,
          },
        },
      );
      return response;
    }
  }
}
