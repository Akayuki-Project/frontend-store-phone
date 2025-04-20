import React from "react";
import { BiSearch } from "react-icons/bi";
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from "./Responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NavbarMenu = [
  { id: 1, title: "Home", link: "#home" },
  { id: 2, title: "Product", link: "/product" },
  { id: 3, title: "Contact", link: "/contact" },
  { id: 4, title: "About", link: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (menu) => {
    if (menu.link.startsWith("#")) {
      const sectionId = menu.link.substring(1);
      if (location.pathname === "/") {
        setTimeout(() => {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        navigate("/", { replace: true });
        const checkSection = setInterval(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            clearInterval(checkSection);
          }
        }, 100);
      }
    } else {
      navigate(menu.link);
    }
    setOpen(false);
  };

  React.useEffect(() => {
    if (location.pathname !== "/product") {
      setSearchTerm("");
    }
  }, [location.pathname]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/product?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <nav className="bg-primary p-4 fixed top-0 left-0 w-full z-50 text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="container mx-auto flex items-center justify-between gap-4"
        >
          {/* Kiri: Logo */}
          <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer" onClick={() => Navigate("/")}>
            <h1 className="text-white text-xl font-bold">
              <span className="lowercase font-semibold italic">store</span>
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text ml-1 italic">
                PHONE
              </span>
            </h1>
          </div>

          {/* Tengah: Menu */}
          <ul className="hidden md:flex items-center gap-6">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <button
                  onClick={() => handleNavigation(menu)}
                  className="py-1 px-3 hover:text-white hover:shadow-[0_3px_0_-1px_#fff] font-semibold"
                >
                  {menu.title}
                </button>
              </li>
            ))}
          </ul>

          {/* Kanan: Search bar dan Icon user */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-[400px]">
              <input
                type="text"
                placeholder="Cari new Phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full p-2 pl-4 pr-10 rounded-full bg-white text-primary placeholder-gray-500 outline-none"
              />
              <BiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary text-xl" />
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden ml-3" onClick={() => setOpen(!open)}>
            <MdMenu className="text-4xl text-white" />
          </div>
        </motion.div>
      </nav>

      <ResponsiveMenu open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
