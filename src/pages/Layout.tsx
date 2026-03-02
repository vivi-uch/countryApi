import { Outlet } from "react-router-dom";
import Header from "../components/Header";

type LayoutProps = {
  toggleDarkMode: () => void;
  darkMode: boolean;
};

const Layout = ({ toggleDarkMode, darkMode }: LayoutProps) => {
  return (
    <div className=" min-h-screen text-black  bg-slate-50 dark:bg-[#1a1e31] dark:text-white">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="mx-auto px-4 sm:px-12 mt-6 sm:mt-12">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
