import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled more than 100px
      if (currentScrollY > 100) {
        setScrolled(true);

        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      } else {
        setScrolled(false);
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navbarVariants = {
    visible: { y: 0 },
    hidden: { y: "-100%" },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
    >
      <motion.nav
        className={`glass-nav px-6 ${scrolled ? "py-2 shadow-lg" : "py-4"}`}
        initial="visible"
        animate={visible ? "visible" : "hidden"}
        variants={navbarVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center">
          <a href="#hero" className="text-2xl font-serif font-bold text-primary hover:text-primary/80 transition-colors">
            BJ
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#research" className="nav-link">
              Research
            </a>
            <a href="#resume" className="nav-link">
              Resume
            </a>
            <a href="#blog" className="nav-link">
              Blog
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
            <button
              onClick={toggleDarkMode}
              className="ml-4 text-primary p-2 rounded-full hover:bg-secondary transition-colors hover:rotate-90 duration-300"
              aria-label="Toggle dark mode"
            >
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
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
        <a href="#about" className="nav-link py-2" onClick={closeMobileMenu}>
          About
        </a>
        <a href="#research" className="nav-link py-2" onClick={closeMobileMenu}>
          Research
        </a>
        <a href="#resume" className="nav-link py-2" onClick={closeMobileMenu}>
          Resume
        </a>
        <a href="#blog" className="nav-link py-2" onClick={closeMobileMenu}>
          Blog
        </a>
        <a href="#contact" className="nav-link py-2" onClick={closeMobileMenu}>
          Contact
        </a>
        <button
          onClick={() => {
            toggleDarkMode();
            closeMobileMenu();
          }}
          className="text-primary self-start p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label="Toggle dark mode"
        >
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
