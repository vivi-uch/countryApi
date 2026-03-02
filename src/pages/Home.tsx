import CountryGrid from "../components/CountryGrid";
import CountrySearch from "../components/CountrySearch";
import type { Country } from "../services/api";

type HomeProps = {
  query: string;
  selection: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelection: React.Dispatch<React.SetStateAction<string>>;
  filteredCountries: Country[];
  loading: boolean;
  error: string | null;
};

const Home = ({
  query,
  selection,
  setQuery,
  setSelection,
  filteredCountries,
  loading,
  error,
}: HomeProps) => {
  return (
    <div>
      <CountrySearch
        query={query}
        selection={selection}
        setQuery={setQuery}
        setSelection={setSelection}
      />
      <CountryGrid
        countries={filteredCountries}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Home;
