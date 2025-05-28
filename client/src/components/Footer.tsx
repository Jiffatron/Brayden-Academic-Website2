import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 50);
    } else {
      scroll();
    }
  };

  return (
    <footer className="py-8 px-6 md:px-16 lg:px-24 navy-dark-section border-t border-border">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <motion.div
          className="text-muted-foreground text-sm mb-4 md:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          &copy; {new Date().getFullYear()} Brayden Swavey. All rights reserved.
        </motion.div>

        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => scrollToSection("about")}
            className="text-muted-foreground hover:text-primary text-sm transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("research")}
            className="text-muted-foreground hover:text-primary text-sm transition-colors"
          >
            Research
          </button>
          <button
            onClick={() => scrollToSection("resume")}
            className="text-muted-foreground hover:text-primary text-sm transition-colors"
          >
            Resume
          </button>
          <button
            onClick={() => navigate("/blog")}
            className="text-muted-foreground hover:text-primary text-sm transition-colors"
          >
            Blog
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-muted-foreground hover:text-primary text-sm transition-colors"
          >
            Contact
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
