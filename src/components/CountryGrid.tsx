import { useEffect, useState } from "react";
import { getCountries, type Country } from "../services/api";

const CountryGrid = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCountries()
      .then((data) => {
        setCountries(data);
      })
      .catch(() => {
        setError("Failed to fetch countries");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSelection = (code: string) => {
    console.log(`Selected country: ${code}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 my-12">
      {countries.map((country) => {
        const {
          cca3,
          name: { common },
          flags: { png },
          population,
          region,
          capital,
        } = country;

        return (
          <div
            key={cca3}
            onClick={() => handleSelection(cca3)}
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
              <h2 className="font-bold text-xl mb-2 sm:mb-5">
                {common}
              </h2>

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
          </div>
        );
      })}
    </div>
  );
};

export default CountryGrid;