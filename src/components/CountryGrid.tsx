import { useState } from "react";
import type { Country } from "../services/api";
import { Link } from "react-router-dom";

type CountryGridProps = {
  countries: Country[];
  loading: boolean;
  error: string | null;
};

const CountryGrid = ({ countries, loading, error }: CountryGridProps) => {
  const [currPage, setcurrPage] = useState(1);
  const itemsPerPage = 8;

  const start = (currPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const filteredcountries = [...countries]
    .sort((a, b) => a.name.common.localeCompare(b.name.common))
    .slice(start, end);

  const handleprev = () => {
    setcurrPage(currPage - 1);
  };

  const handleNext = () => {
    setcurrPage(currPage + 1);
  };

  // const handleSelection = (code: string) => {
  //   console.log(`Selected country: ${code}`);
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 mt-12">
        {filteredcountries.map((country) => {
          const {
            cca3,
            name: { common },
            flags: { png },
            population,
            region,
            capital,
          } = country;

          return (
            <Link
              key={cca3}
              to={`/name/${common}`}
              className="rounded-sm shadow-2xl cursor-pointer"
            >
              <div className="h-40 sm:w-full sm:h-48 overflow-hidden rounded-t-sm">
                <img
                  className="w-full h-full object-cover"
                  src={png}
                  alt={`${common} flag`}
                />
              </div>

              <div className="p-4 sm:p-6 dark:bg-[#1c2226] bg-slate-100">
                <h2 className="font-bold text-xl mb-2 sm:mb-5">{common}</h2>

                <div className="flex flex-col sm:gap-2 text-[#969595]">
                  <p>
                    <span className="font-bold">Population: </span>
                    {population.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-bold">Region: </span>
                    {region}
                  </p>
                  <p>
                    <span className="font-bold">Capital: </span>
                    {capital?.[0] ?? "Unknown Capital"}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex items-end justify-end gap-2 mt-6">
        <button
          disabled={currPage === 1}
          onClick={handleprev}
          className="p-3 dark:bg-[#1c2226] bg-slate-100 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <button
          disabled={end >= countries.length}
          onClick={handleNext}
          className="p-3 dark:bg-[#1c2226] bg-slate-100 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CountryGrid;
