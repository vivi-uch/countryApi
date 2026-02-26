import { useState, useEffect } from "react";
import Header from "./components/Header";
import CountrySearch from "./components/CountrySearch";
import CountryGrid from "./components/CountryGrid";

const App = () => {
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

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
  };

  return (
    <div className=" min-h-full text-black  bg-slate-50 dark:bg-[#1a1e31] dark:text-white">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="p-6  lg:p-0  mx-auto mt-2 sm:mt-12 container">
        <CountrySearch />
        <CountryGrid />
      </div>
    </div>
  );
};

export default App;
