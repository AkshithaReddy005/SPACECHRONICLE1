import { motion } from "framer-motion";
import { Rocket, Twitter, Facebook, Youtube, Instagram } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation();

  const quickLinks = [
    { href: "#timeline", label: "Timeline" },
    { href: "#missions", label: "Missions" },
    { href: "#achievements", label: "Achievements" },
    { href: "#leaders", label: "Leaders" },
  ];

  const resources = [
    { href: "#", label: "Official ISRO" },
    { href: "#", label: "Mission Data" },
    { href: "#", label: "Research Papers" },
    { href: "#", label: "Educational Content" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer ref={ref} className="bg-cosmic-navy border-t border-stellar-blue/20 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Rocket className="text-isro-gold text-2xl" />
              <span className="font-inter font-bold text-xl">ISRO Journey</span>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Celebrating India's remarkable journey in space exploration, from humble beginnings to global leadership in space technology.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-stellar-blue transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="text-xl h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-inter font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="font-inter font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border-t border-stellar-blue/20 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 ISRO Journey. Educational tribute to India's space program.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Sources: ISRO Official, NASA, Scientific Publications
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
