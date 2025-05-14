import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

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

  // Scroll-aware navbar show/hide
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

  // Scroll to section after navigating to homepage
  const scrollToSection = (id: string) => {
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 50); // wait for homepage to mount
    } else {
      scroll();
    }
  };

  const navbarVariants = {
    visible: { y: 0 },
    hidden: { y: "-100%" },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <motion.nav
        className={`glass-nav px-6 ${scrolled ? "py-2 shadow-lg" : "py-4"}`}
        initial="visible"
        animate={visible ? "visible" : "hidden"}
        variants={navbarVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-2xl font-serif font-bold text-primary hover:text-primary/80 transition-colors"
          >
            BJ
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => scrollToSection("about")} className="nav-link">About</button>
            <button onClick={() => scrollToSection("research")} className="nav-link">Research</button>
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

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-primary p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden glass-nav flex flex-col py-4 px-6 space-y-4 transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button onClick={() => { closeMobileMenu(); scrollToSection("about"); }} className="nav-link py-2">About</button>
        <button onClick={() => { closeMobileMenu(); scrollToSection("research"); }} className="nav-link py-2">Research</button>
        <button onClick={() => { closeMobileMenu(); scrollToSection("resume"); }} className="nav-link py-2">Resume</button>
        <button onClick={() => { closeMobileMenu(); scrollToSection("blog"); }} className="nav-link py-2">Blog</button>
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
