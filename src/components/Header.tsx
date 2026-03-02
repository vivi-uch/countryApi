const Header = ({
  toggleDarkMode,
  darkMode,
}: {
  toggleDarkMode: () => void;
  darkMode: boolean;
}) => {
  return (
    <div className="py-4 px-4 md:px-12 flex justify-between items-center border-b border-gray-300 bg-slate-100 dark:bg-[#1c2226]">
      <h1 className="text-[13.5px] sm:text-xl font-bold">
        Where in the world?
      </h1>
      <button
        className="text-[13px] sm:text-md flex items-center gap-1 sm:gap-2 text-black dark:text-white p-0 sm:px-4 sm:py-2 rounded-md"
        onClick={toggleDarkMode}
        title={darkMode ? "Light mode" : "Dark mode"}
      >
        {darkMode ? "☀️Light Mode " : " 🌙 Dark Mode"}
      </button>
    </div>
  );
};

export default Header;
