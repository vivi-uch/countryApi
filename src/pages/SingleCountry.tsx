import { useEffect, useState } from "react";
import { getCountryByName, type Country } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const SingleCountry = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const [country, setCountry] = useState<Country>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!countryName) return;

    getCountryByName(countryName)
      .then((data) => {
        setCountry(data[0]);
      })
      .catch(() => {
        console.log("Failed to fetch country");
      });
  }, [countryName]);

  const {
    name,
    flags: { png } = {},
    population,
    region,
    capital,
    tld,
    subregion,
    currencies,
    languages,
    borders,
  } = country || {};
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 shadow-md rounded-md bg-white dark:bg-[#1c2226] dark:text-white text-sm mb-12"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src={png}
            alt={`${name?.common} flag`}
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-8">{name?.common}</h1>

          <div className="grid sm:grid-cols-2 gap-8 text-sm">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Native Name:</span>{" "}
                {name?.nativeName[0]?.common}{" "}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{" "}
                {population?.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span> {subregion}
              </p>
              <p>
                <span className="font-semibold">Capital:</span> {capital?.[0]}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {tld?.[0]}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{" "}
                {currencies
                  ? Object.values(currencies)
                      .map((c) => c.name)
                      .join(", ")
                  : "None"}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {languages ? Object.values(languages).join(", ") : "None"}
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-semibold">Border Countries:</p>

            <div className="flex flex-wrap gap-3">
              {borders && borders.length > 0 ? (
                borders.map((border) => (
                  <button
                    key={border}
                    className="px-4 py-1 text-sm shadow rounded bg-white dark:bg-[#1c2226]"
                  >
                    {border}
                  </button>
                ))
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCountry;
