import { Outlet } from "react-router-dom";
import Header from "../components/Header";

type LayoutProps = {
  toggleDarkMode: () => void;
  darkMode: boolean;
};

const Layout = ({toggleDarkMode, darkMode}: LayoutProps) => {
return (
    <div className=" min-h-screen text-black  bg-slate-50 dark:bg-[#1a1e31] dark:text-white">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <div className="p-6  lg:p-0  mx-auto mt-2 sm:mt-12 container">
            <Outlet/>
        </div>
    </div>
);
};

export default Layout;