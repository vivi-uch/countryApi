import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

export type Country = {
  cca3: string;
  name: {
    common: string;
    nativeName: {
      [key: string]: {
        common: string;
      };
    };
  };
  flags: {
    png: string;
  };
  population: number;
  region: string;
  capital?: string[];
  tld?: string[];
  subregion?: string;
  currencies?: {
    [key: string]: {
      name: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
};

export const getCountries = async (): Promise<Country[]> => {
  // const params = url.searchParams;
  const response = await api.get<Country[]>(
    "/all?fields=name,capital,region,population,flags,cca3",
  );

  return response.data;
};

export const getCountryByName = async(name: string): Promise<Country[]> => {
  const response = await api.get<Country[]>(
    `/name/${name}?fields=name,capital,region,population,flags,cca3,tld,subregion,currencies,languages,borders`
  );
  
  return response.data;
}