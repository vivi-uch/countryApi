import axios from "axios";

export type Country = {
  cca3: string;
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  population: number;
  region: string;
  capital?: string[];
};

export const getCountries = async (): Promise<Country[]> => {
  // const params = url.searchParams;
  const response = await axios.get<Country[]>(
    "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3",
  );

  return response.data;
};
