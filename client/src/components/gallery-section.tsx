import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { galleryData } from "@/lib/data";

export default function GallerySection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 bg-space-blue">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-inter font-bold text-4xl md:text-5xl mb-6">
            <span className="bg-gradient-to-r from-stellar-blue to-galaxy-purple bg-clip-text text-transparent">
              Through the Lens
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Witness the journey through spectacular imagery from ISRO's missions and facilities
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.map((image, index) => (
            <GalleryItem
              key={index}
              image={image}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Gallery Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Button className="gradient-blue-purple px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300">
            <Images className="mr-2 h-4 w-4" />
            View Full Gallery
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function GalleryItem({
  image,
  index,
  isVisible,
}: {
  image: any;
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group cursor-pointer overflow-hidden rounded-xl border border-stellar-blue/20 hover:border-stellar-blue transition-all duration-300"
    >
      <motion.img
        whileHover={{ scale: 1.1 }}
        src={image.src}
        alt={image.alt}
        className="w-full h-64 object-cover transition-transform duration-500"
      />
    </motion.div>
  );
}
