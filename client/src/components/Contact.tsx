import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: false,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: !formData.message.trim(),
    };
    
    setErrors(newErrors);
    
    // If no errors, submit form
    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      // Form submission logic would go here
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-6 md:px-16 lg:px-24 navy-dark-section"
    >
      <motion.div
        className="w-full max-w-7xl mx-auto"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-serif font-bold mb-6 relative inline-block"
          variants={itemVariants}
        >
          Contact
          <span className="absolute -bottom-2 left-0 w-1/2 h-px bg-primary"></span>
        </motion.h2>
        
        <motion.p
          className="text-muted-foreground text-lg mb-12 max-w-2xl"
          variants={itemVariants}
        >
          Feel free to reach out if you'd like to discuss research opportunities,
          collaborate on projects, or simply connect about finance and economics.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-card border ${
                    errors.name ? "border-destructive" : "border-border"
                  } rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">
                    Please enter your name
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-card border ${
                    errors.email ? "border-destructive" : "border-border"
                  } rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">
                    Please enter a valid email address
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-card border ${
                    errors.message ? "border-destructive" : "border-border"
                  } rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                  placeholder="Your message here..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive">
                    Please enter a message
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/80 transition-colors duration-300 w-full md:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            className="flex flex-col justify-between"
            variants={itemVariants}
          >
            <div>
              <h3 className="text-xl font-medium mb-4">Get In Touch</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="text-primary mr-4 mt-1">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a
                      href="mailto:brayden.judge@email.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      brayden.judge@email.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-primary mr-4 mt-1">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-muted-foreground">Lubbock, Texas</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-medium mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-xl transition-colors"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-xl transition-colors"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-xl transition-colors"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>

            <div className="mt-12 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1579389083395-4507e98b5e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Minimalist office setting"
                className="rounded shadow-md w-full h-48 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
