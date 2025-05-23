import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: false,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name.trim(),
      email:
        !formData.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: !formData.message.trim(),
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      if (!formRef.current) return;

      emailjs
        .sendForm(
          "service_4m6ndbl",
          "template_re2yyvs",
          formRef.current,
          "mLeVzTuoMYG62e1zO"
        )
        .then(() => {
          toast({
            title: "Message sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
            duration: 5000,
          });

          setFormData({
            name: "",
            email: "",
            message: "",
          });
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Failed to send. Please try again later.",
            duration: 5000,
          });
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

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
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
                  } rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">Please enter your name</p>
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
                  } rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
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
                  } rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                  placeholder="Your message here..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive">Please enter a message</p>
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
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
