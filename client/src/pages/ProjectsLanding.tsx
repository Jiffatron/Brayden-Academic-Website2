import { projects } from "@/lib/data";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectsLanding = () => {
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

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

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="py-20 px-6 max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-serif font-bold mb-2">All Projects</h1>

        <Link
          to="/"
          className="inline-block mb-10 text-primary text-md border border-transparent hover:border-primary px-4 py-2 rounded transition"
        >
          ← Back to Home
        </Link>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-card rounded-lg overflow-hidden shadow-md project-card cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onClick={() => handleProjectClick(project.id)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary rounded-full text-xs text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-primary flex items-center text-sm hover:text-primary/80 transition-colors">
                  <span>View Details</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.main>
    </>
  );
};

export default ProjectsLanding;
