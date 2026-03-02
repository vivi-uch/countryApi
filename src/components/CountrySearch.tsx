import searhLogo from "../assets/icon-search.svg";

type searchQuery = {
  query: string;
  selection: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelection: React.Dispatch<React.SetStateAction<string>>;
};

const CountrySearch = ({
  query,
  selection,
  setQuery,
  setSelection,
}: searchQuery) => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setCountries()
    console.log(`Searching for: ${query}, Region: ${selection}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-4 "
    >
      <div className="flex items-start sm:items-center border border-[#d6d6d6] dark:bg-[#1c2226] bg-slate-100 rounded-md sm:rounded-2xl w-full md:w-87.5 px-3 py-2">
        <button className="mr-2 outline-none" type="button">
          <img src={searhLogo} alt="searchLogo" className="w-4 h-4 mr-2" />
        </button>
        <input
          type="text"
          className="bg-transparent w-full text-black dark:text-white  placeholder-neutral-500 focus:outline-none"
          placeholder="Search for a country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter"}
          name="query"
        />
      </div>

      <select
        name="region"
        value={selection}
        onChange={(e) => setSelection(e.target.value)}
        className="p-2 border border-gray-300 rounded-md dark:bg-[#1c2226] bg-slate-100 dark:text-white w-40 md:w-50"
      >
        <option value="">Filter by Region</option>
        <option value="africa">Africa</option>
        <option value="americas">Americas</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </form>
  );
};

export default CountrySearch;
