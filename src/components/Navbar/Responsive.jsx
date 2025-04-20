import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const NavbarMenu = [
  { id: 1, title: "Home", link: "#home" },
  { id: 2, title: "Product", link: "/product" },
  { id: 3, title: "Contact", link: "/contact" },
  { id: 4, title: "About", link: "/about" },
];

const Responsive = ({ open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

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

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.2 }}
          className="top-16 left-0 w-full z-20 fixed"
        >
          <div className="text-xl font-semibold uppercase bg-primary text-white py-10 m-6 rounded-3xl">
            <ul className="flex flex-col items-center gap-7">
              {NavbarMenu.map((menu) => (
                <li key={menu.id}>
                  <button
                    onClick={() => handleNavigation(menu)}
                    className="py-2 px-4 hover:text-gray-300 text-2xl"
                  >
                    {menu.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Responsive;