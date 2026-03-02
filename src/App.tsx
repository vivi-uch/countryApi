import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { getCountries, type Country } from "./services/api";
import SingleCountry from "./pages/SingleCountry";
import Layout from "./pages/Layout";

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

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

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
  };

  const filteredCountries = countries.filter((country) => {
    const filteredSearch = country.name.common
      .toLowerCase()
      .includes(query.toLowerCase());
    const filteredRegion = selection
      ? country.region.toLowerCase() === selection.toLowerCase()
      : true;
    return filteredSearch && filteredRegion;
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />,
      children: [
        {
          path: "/",
          element: (
            <Home
              query={query}
              selection={selection}
              setQuery={setQuery}
              setSelection={setSelection}
              filteredCountries={filteredCountries}
              loading={loading}
              error={error}
            />
          ),
        },
        {
          path: "/name/:countryName",
          element: <SingleCountry />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
