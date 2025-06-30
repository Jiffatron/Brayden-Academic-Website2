import { useState } from "react";
import { motion } from "framer-motion";
import ImageModal from "./ImageModal";

interface ExpandableImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ExpandableImage = ({ src, alt, className = "" }: ExpandableImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        className={`relative rounded-lg overflow-hidden shadow-md cursor-pointer group ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }} // Much slower, more luxurious feel
        onClick={handleImageClick}
      >
        {/* Hover overlay with expand icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-700 z-10 flex items-center justify-center">
          <motion.div
            className="opacity-0 group-hover:opacity-100 bg-white/90 dark:bg-black/90 rounded-full p-3 shadow-lg"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }} // Even slower, more luxurious
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-800 dark:text-gray-200"
            >
              <polyline points="15,3 21,3 21,9" />
              <polyline points="9,21 3,21 3,15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </motion.div>
        </div>



        {/* Image */}
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </motion.div>

      {/* Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={src}
        imageAlt={alt}
      />
    </>
  );
};

export default ExpandableImage;
