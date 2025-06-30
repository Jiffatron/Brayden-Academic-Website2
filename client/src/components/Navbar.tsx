import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import StockTicker from "./Stockticker";
import { navigateAndScroll } from "@/utils/navigation";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const navbarVariants = {
    visible: { y: 0 },
    hidden: { y: "-100%" },
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 100);
      setVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const scrollToSection = (id: string) => {
    navigateAndScroll(navigate, id, location.pathname);
  };



  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
      <motion.nav
        className={`glass-nav px-6 pt-2 pointer-events-auto ${scrolled ? "py-2 shadow-lg" : "py-3"}`}
        initial="visible"
        animate={visible ? "visible" : "hidden"}
        variants={navbarVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => {
              if (location.pathname !== "/") {
                navigate("/");
              } else {
                scrollToSection("hero");
              }
            }}
            className="text-2xl font-serif font-bold text-primary hover:text-primary/80 transition-colors"
          >
            BS
          </button>

          <div className="-mt-1 hidden md:flex flex-1 justify-center space-x-3">
            <StockTicker symbol="^DJI" label="Dow" />
            <StockTicker symbol="^GSPC" label="S&P" />
            <StockTicker symbol="^IXIC" label="Nasdaq" />
            <StockTicker symbol="AAPL" label="AAPL" />
            <StockTicker symbol="MSFT" label="MSFT" />
            <StockTicker symbol="AMZN" label="AMZN" />
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="nav-link">Home</button>
            <button onClick={() => navigate("/projects")} className="nav-link">Projects</button>
            <button onClick={() => scrollToSection("resume")} className="nav-link">Resume</button>
            <button onClick={() => navigate("/blog")} className="nav-link">Blog</button>
            <button onClick={() => scrollToSection("contact")} className="nav-link">Contact</button>
            <button
              onClick={toggleDarkMode}
              className="ml-4 text-primary p-2 rounded-full hover:bg-secondary transition-colors hover:rotate-90 duration-300"
              aria-label="Toggle dark mode"
            >
              <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
            </button>
          </div>

          <button
            className="md:hidden text-primary p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </motion.nav>

      <div
        className={`md:hidden glass-nav flex flex-col py-4 px-6 space-y-4 transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 mobile-menu-closed"
        }`}
      >
        <button onClick={() => { closeMobileMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="nav-link py-2">Home</button>
        <button onClick={() => { closeMobileMenu(); navigate("/projects"); }} className="nav-link py-2">Projects</button>
        <button onClick={() => { closeMobileMenu(); scrollToSection("resume"); }} className="nav-link py-2">Resume</button>
        <button onClick={() => { closeMobileMenu(); navigate("/blog"); }} className="nav-link py-2">Blog</button>
        <button onClick={() => { closeMobileMenu(); scrollToSection("contact"); }} className="nav-link py-2">Contact</button>
        <button
          onClick={() => {
            toggleDarkMode();
            closeMobileMenu();
          }}
          className="text-primary self-start p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label="Toggle dark mode"
        >
          <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
