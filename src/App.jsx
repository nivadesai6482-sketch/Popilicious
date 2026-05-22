import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Phone, 
  MessageCircle, 
  MapPin, 
  ChefHat, 
  Clock, 
  Star, 
  Cake, 
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  Award,
  Sparkles,
  CheckCircle2,
  Leaf,
  Crown
} from 'lucide-react';

const Instagram = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// --- ANIMATION VARIANTS ---

const premiumTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-100px" },
  transition: premiumTransition
};

const fadeInUpStagger = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-50px" },
  transition: premiumTransition
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15
    }
  },
  viewport: { once: false, margin: "-50px" }
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: false, margin: "-100px" },
  transition: premiumTransition
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: false, margin: "-100px" },
  transition: premiumTransition
};

const scaleUp = {
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: false, margin: "-100px" },
  transition: premiumTransition
};

// --- CONFIGURATION ---
const WHATSAPP_NUMBER = "919925109075"; // Replace with her actual WhatsApp number (including country code)
const INSTAGRAM_USERNAME = "popilicious_cake"; // Replace with her actual Instagram username

const getWhatsAppLink = (message = "") => {
  if (message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}`;
};

const getInstagramDM = () => {
  return `https://ig.me/m/${INSTAGRAM_USERNAME}`;
};

const getInstagramProfile = () => {
  return `https://instagram.com/${INSTAGRAM_USERNAME}`;
};

// --- DATA ---


const CAKE_CATEGORIES = [
  { id: 'birthday', title: 'Birthday Cakes', image: '/birthday_cake.png', description: 'Make your special day sweeter with our custom creations.' },
  { id: 'wedding', title: 'Wedding Cakes', image: '/wedding_cake.png', description: 'Elegant, multi-tier masterpieces for your forever.' },
  { id: 'bento', title: 'Bento Cakes', image: '/bento_cake.png', description: 'Mini treats, maximum joy for small celebrations.' },
  { id: 'cupcakes', title: 'Cupcakes', image: '/cupcakes.png', description: 'Bite-sized joy in every swirl of frosting.' },
  { id: 'brownies', title: 'Brownies', image: '/brownies.png', description: 'Rich, fudgy, and decadent Belgian chocolate.' },
  { id: 'dessert-boxes', title: 'Dessert Boxes', image: '/dessert_box.png', description: 'The perfect choice for gifting and sharing.' },
];

const GALLERY_IMAGES = [
  '/media2.jpg',
  '/media3.jpg',
  '/wedding_cake_gallery.png',
  '/biscoff_cake.png',
  '/pistachio_cake.png',
  '/rustic_cake.png',
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', text: 'The most delicious eggless cake I have ever had! The mango tiramisu was out of this world.', rating: 5 },
  { name: 'Anjali Desai', text: 'Popilicious never fails to amaze. The custom design for my daughter\'s birthday was perfect.', rating: 5 },
  { name: 'Rahul Mehta', text: 'Found my go-to baker in Surat. The quality of ingredients really stands out.', rating: 5 },
];

const FAQS = [
  { q: 'How to place an order?', a: 'You can place an order by clicking the WhatsApp button or DMing us on Instagram.' },
  { q: 'How many days prior should I book?', a: 'For custom cakes, we recommend booking at least 3-5 days in advance.' },
  { q: 'Do you customize cakes?', a: 'Yes! We specialize in handcrafted, customized designs tailored to your theme.' },
  { q: 'Is delivery available?', a: 'We offer delivery within Surat city. Contact us for specific area availability.' },
];

// --- COMPONENTS ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-md' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.12, rotate: [0, -6, 6, -4, 4, 0] }}
          transition={{ type: "spring", stiffness: 500, damping: 10 }}
          className="text-2xl font-heading font-bold text-gradient cursor-pointer select-none"
        >
          Popilicious
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'About', 'Cakes', 'Gallery', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="relative text-sm font-semibold hover:text-primary transition-colors py-2 group">
              <motion.span 
                className="inline-block"
                whileHover={{ y: -3, scale: 1.08, rotate: 1 }}
                whileTap={{ scale: 0.9, rotate: -2 }}
                transition={{ type: "spring", stiffness: 500, damping: 12 }}
              >
                {item}
              </motion.span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <motion.a 
            href={getWhatsAppLink("Hi! I would like to place an order.")}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, rotate: 1 }}
            whileTap={{ scale: 0.92, rotate: -1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="btn-primary"
          >
            Order Now
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <motion.button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="p-2 cursor-pointer text-text-main"
            whileTap={{ scale: 0.8, rotate: 90 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: { opacity: 0, height: 0 },
              animate: { 
                opacity: 1, 
                height: 'auto',
                transition: { 
                  height: { type: "spring", stiffness: 280, damping: 22 },
                  staggerChildren: 0.08,
                  delayChildren: 0.05
                } 
              },
              exit: { 
                opacity: 0, 
                height: 0,
                transition: { 
                  height: { type: "spring", stiffness: 300, damping: 25 },
                  staggerChildren: 0.05,
                  staggerDirection: -1
                } 
              }
            }}
            className="md:hidden absolute top-full left-0 w-full bg-card-bg shadow-xl overflow-hidden glass"
          >
            <div className="p-8 flex flex-col gap-6 items-center">
              {['Home', 'About', 'Cakes', 'Gallery', 'Contact'].map((item) => (
                <motion.div
                  key={item}
                  variants={{
                    initial: { opacity: 0, y: 15 },
                    animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 15 } },
                    exit: { opacity: 0, y: 10, transition: { duration: 0.15 } }
                  }}
                  className="w-full text-center"
                >
                  <a href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold py-4 border-b border-border-subtle w-full text-center overflow-hidden block">
                    <motion.span 
                      className="inline-block"
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 450, damping: 12 }}
                    >
                      {item}
                    </motion.span>
                  </a>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  initial: { opacity: 0, y: 15 },
                  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 15 } },
                  exit: { opacity: 0, y: 10, transition: { duration: 0.15 } }
                }}
                className="w-full"
              >
                <motion.a 
                  href={getWhatsAppLink("Hi! I would like to place an order.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, rotate: 0.5 }}
                  whileTap={{ scale: 0.92, rotate: -0.5 }}
                  transition={{ type: "spring", stiffness: 450, damping: 12 }}
                  className="btn-primary w-full mt-4"
                >
                  Order Now
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const scrollSpringConfig = { stiffness: 80, damping: 25, mass: 0.5, restDelta: 0.001 };
  
  const y1 = useSpring(useTransform(scrollY, [0, 500], [0, 200]), scrollSpringConfig);
  const y2 = useSpring(useTransform(scrollY, [0, 500], [0, -150]), scrollSpringConfig);
  const heroOpacity = useSpring(useTransform(scrollY, [0, 400], [1, 0]), scrollSpringConfig);
  const heroScale = useSpring(useTransform(scrollY, [0, 400], [1, 0.95]), scrollSpringConfig);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-bg-light" />
      </motion.div>

      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale }} 
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-3xl text-primary-dark block mb-4"
        >
          Freshly Baked Every Day
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold mb-6 text-gradient leading-tight"
        >
          Handcrafted Cakes <br /> Made With Love
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-2xl text-text-muted mb-10 max-w-2xl mx-auto"
        >
          Custom Cakes • Dessert Tables • Celebration Specials
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <motion.a 
            href="#cakes"
            whileHover={{ scale: 1.08, rotate: 1.5 }}
            whileTap={{ scale: 0.92, rotate: -1.5 }}
            transition={{ type: "spring", stiffness: 500, damping: 12 }}
            className="btn-primary text-lg px-10"
          >
            Explore Cakes
          </motion.a>
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.08, rotate: -1.5 }}
            whileTap={{ scale: 0.92, rotate: 1.5 }}
            transition={{ type: "spring", stiffness: 500, damping: 12 }}
            className="btn-outline text-lg px-10"
          >
            Contact Baker
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-dark animate-bounce"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <motion.section 
      id="about" 
      className="bg-card-bg py-24 transition-colors duration-500"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: false, margin: "-150px" }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <motion.div 
          variants={slideInLeft}
          className="relative"
        >
          <img 
            src="/rustic_cake.png" 
            className="rounded-3xl shadow-2xl z-10 relative w-full h-[500px] object-cover"
            alt="Artisanal Cake"
          />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, ...premiumTransition }}
            viewport={{ once: false, margin: "-50px" }}
            className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/20 rounded-3xl -z-10" 
          />
        </motion.div>

        <motion.div 
          variants={slideInRight}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Sweet Story</h2>
          <p className="text-xl text-text-muted mb-6 font-serif italic">
            "Baking isn't just about recipes; it's about sharing a piece of your heart."
          </p>
          <p className="text-lg text-text-muted mb-10 leading-relaxed">
            Welcome to Popilicious Cake! Founded by Sweety Shah, our journey started with a simple passion for creating eggless delights that look as good as they taste. Every cake we bake is a labor of love, using only the finest ingredients to ensure your celebrations are truly memorable.
          </p>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-3 gap-8"
          >
            {[
              { label: 'Happy Customers', value: '500+' },
              { label: 'Custom Orders', value: '1.2k' },
              { label: 'Freshly Baked', value: '100%' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUpStagger} className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-wider text-text-muted font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const SignatureCakes = () => {
  return (
    <motion.section 
      id="cakes" 
      className="bg-secondary/30 py-24"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: false, margin: "-150px" }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Signature Creations</h2>
          <p className="text-text-muted text-lg">Explore our most-loved categories of treats.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="flex overflow-x-auto pb-10 gap-8 no-scrollbar snap-x items-stretch"
        >
          {CAKE_CATEGORIES.map((cake, i) => (
            <motion.div 
              key={cake.id}
              variants={fadeInUpStagger}
              whileHover={{ y: -10, scale: 1.03, rotate: 0.3 }}
              transition={{ type: "spring", stiffness: 450, damping: 15 }}
              className="w-[250px] md:w-[290px] cake-card snap-center flex-shrink-0"
            >
              <div className="image-container">
                <img src={cake.image} alt={cake.title} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-2">{cake.title}</h3>
                <p className="text-text-muted text-sm mb-4 flex-grow">{cake.description}</p>
                <motion.button 
                  whileHover={{ scale: 1.1, x: 8 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 500, damping: 12 }}
                  className="text-primary font-bold flex items-center gap-2 text-left cursor-pointer"
                >
                  View More <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }}><Sparkles size={18} /></motion.span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <motion.section 
      id="gallery" 
      className="py-24"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: false, margin: "-150px" }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Instagram Vibes</h2>
          <p className="text-text-muted text-lg">Follow us @popilicious_cake for daily updates.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              variants={fadeInUpStagger}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 450, damping: 15 }}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-2xl group shadow-lg"
              onClick={() => setSelectedImg(img)}
            >
              <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Gallery ${i}`} />
              <div className="absolute inset-0 bg-primary/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  variants={{
                    hover: { scale: 1.3, rotate: 0, y: 0 },
                  }}
                  initial={{ scale: 0, rotate: -30, y: 15 }}
                  transition={{ type: "spring", stiffness: 500, damping: 12 }}
                >
                  <Instagram className="text-white" size={40} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setSelectedImg(null)}
          >
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={selectedImg} 
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
            />
            <button className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 rounded-full" onClick={() => setSelectedImg(null)}>
              <X size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

const WhyChooseUs = () => {
  const features = [
    { icon: <Award size={32} />, title: 'Premium Ingredients', desc: 'We use only high-quality butter, Belgian chocolate, and fresh fruits.' },
    { icon: <ChefHat size={32} />, title: 'Handmade with Love', desc: 'Every decoration is carefully crafted by hand to ensure perfection.' },
    { icon: <Clock size={32} />, title: 'Freshly Baked', desc: 'No preservatives. Our cakes are baked to order for peak freshness.' },
    { icon: <Heart size={32} />, title: '100% Eggless', desc: 'Specializing in eggless treats that melt in your mouth every time.' },
  ];

  return (
    <motion.section 
      className="bg-primary/10 py-24"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: false, margin: "-150px" }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={staggerContainer}
          className="grid md:grid-cols-4 gap-8"
        >
          {features.map((f, i) => (
            <motion.div 
              key={i}
              variants={fadeInUpStagger}
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 450, damping: 15 }}
              className="feature-card"
            >
              <motion.div 
                variants={{
                  hover: { scale: 1.15, rotate: [0, -10, 10, -5, 5, 0] }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-8 text-primary"
              >
                {f.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-text-muted leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// --- INTERACTIVE FEATURES & BUILDER ---

const ClickParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const colors = ['#FFD1DC', '#FFB6C1', '#FDF5E6', '#D4AF37', '#5D4037', '#8D6E63'];
      const types = ['star', 'sprinkle'];
      const count = 6;
      
      const newParticles = Array.from({ length: count }).map((_, i) => {
        const angle = (i * (360 / count)) + Math.random() * 25;
        const velocity = Math.random() * 50 + 25;
        const size = Math.random() * 8 + 6;
        const type = types[Math.floor(Math.random() * types.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 0.3 + 0.4;
        
        return {
          id: `${Date.now()}-${i}-${Math.random()}`,
          x: e.clientX,
          y: e.clientY,
          tx: Math.cos(angle * Math.PI / 180) * velocity,
          ty: Math.sin(angle * Math.PI / 180) * velocity,
          size,
          color,
          type,
          duration
        };
      });

      setParticles((prev) => [...prev, ...newParticles].slice(-30));
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Filter out expired particles
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setParticles(prev => prev.filter(p => {
        const timeCreated = parseInt(p.id.split('-')[0]);
        return now - timeCreated < p.duration * 1000;
      }));
    }, 150);
    return () => clearInterval(interval);
  }, [particles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              x: p.x - p.size / 2, 
              y: p.y - p.size / 2, 
              scale: 0.1, 
              opacity: 1,
              rotate: 0 
            }}
            animate={{ 
              x: p.x - p.size / 2 + p.tx, 
              y: p.y - p.size / 2 + p.ty, 
              scale: [0.1, 1.2, 0.7], 
              opacity: [1, 1, 0],
              rotate: Math.random() > 0.5 ? 180 : -180
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, ease: [0.1, 0.8, 0.25, 1] }}
            style={{ 
              position: 'fixed', 
              width: p.size, 
              height: p.size,
              color: p.color,
              zIndex: 9999
            }}
          >
            {p.type === 'star' && (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-xs">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            )}
            {p.type === 'sprinkle' && (
              <div 
                className="w-full h-[60%] rounded-full shadow-xs" 
                style={{ backgroundColor: p.color, transform: 'rotate(45deg)' }} 
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const FloatingSprinkles = () => {
  const [particles, setParticles] = useState([]);
  const { scrollY } = useScroll();
  const scrollSpringConfig = { stiffness: 80, damping: 25, mass: 0.5, restDelta: 0.001 };
  const yVal = useSpring(useTransform(scrollY, [0, 1000], [0, -200]), scrollSpringConfig);

  useEffect(() => {
    const colors = ['#FFD1DC', '#FFB6C1', '#FDF5E6', '#D4AF37', '#5D4037', '#8D6E63'];
    const generated = Array.from({ length: 25 }).map((_, i) => {
      const size = Math.random() * 6 + 4;
      const aspectRatio = Math.random() * 0.8 + 1.2;
      return {
        id: i,
        startX: Math.random() * 100,
        size,
        height: size * aspectRatio,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 15,
        duration: Math.random() * 12 + 10,
        sway: Math.random() * 60 - 30,
        rotationOffset: Math.random() * 360,
      };
    });
    setParticles(generated);
  }, []);

  return (
    <motion.div 
      style={{ y: yVal }}
      className="absolute inset-x-0 -top-20 -bottom-[300px] overflow-hidden pointer-events-none z-0"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none opacity-30 rounded-xs"
          style={{
            left: `${p.startX}%`,
            top: `-10%`,
            width: `${p.size}px`,
            height: `${p.height}px`,
            backgroundColor: p.color,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, p.sway, -p.sway, p.sway, 0],
            rotateX: [p.rotationOffset, p.rotationOffset + 360, p.rotationOffset + 720],
            rotateY: [p.rotationOffset, p.rotationOffset + 720, p.rotationOffset + 1440],
            rotate: [p.rotationOffset, p.rotationOffset + 180, p.rotationOffset + 360],
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            },
            x: {
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            },
            rotateX: {
              duration: p.duration * 0.8,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            },
            rotateY: {
              duration: p.duration * 0.6,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            },
            rotate: {
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            },
          }}
        />
      ))}
    </motion.div>
  );
};

const FrostingDripDivider = ({ flip = false, bgLight = false }) => {
  return (
    <div className={`w-full flex items-center justify-center py-8 overflow-hidden ${bgLight ? 'bg-bg-light' : 'bg-transparent'} ${flip ? 'scale-y-[-1]' : ''}`}>
      <div className="w-full max-w-7xl px-6 flex items-center gap-4">
        <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="flex items-center gap-1.5 text-primary/60">
          <span className="text-[8px] animate-pulse">✦</span>
          <span className="text-[12px] font-serif italic tracking-widest font-light">P</span>
          <span className="text-[8px] animate-pulse">✦</span>
        </div>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </div>
  );
};

const ScrollParallaxDecorations = () => {
  const { scrollYProgress } = useScroll();
  const decorSpringConfig = { stiffness: 60, damping: 25, mass: 0.7, restDelta: 0.001 };

  // Define translation values for different speeds and directions
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -180]), decorSpringConfig);
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]), decorSpringConfig);
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -220]), decorSpringConfig);
  const y4 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), decorSpringConfig);
  const y5 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -140]), decorSpringConfig);
  
  // Rotate slowly as well
  const rotate1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 45]), decorSpringConfig);
  const rotate2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), decorSpringConfig);
  const rotate3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 90]), decorSpringConfig);
  const rotate4 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -45]), decorSpringConfig);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden hidden lg:block">
      {/* Decorative Item 1 */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute left-6 top-[15%] text-primary/30"
      >
        <Cake size={48} className="animate-float-1" />
      </motion.div>

      {/* Decorative Item 2 */}
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute right-8 top-[30%] text-primary-dark/25"
      >
        <Heart size={40} fill="currentColor" className="animate-float-2" />
      </motion.div>

      {/* Decorative Item 3 */}
      <motion.div 
        style={{ y: y3, rotate: rotate3 }}
        className="absolute left-10 top-[55%] text-accent/25"
      >
        <Sparkles size={36} className="animate-float-3" />
      </motion.div>

      {/* Decorative Item 4 */}
      <motion.div 
        style={{ y: y4, rotate: rotate4 }}
        className="absolute right-6 top-[75%] text-primary/35"
      >
        <ChefHat size={44} className="animate-float-1" />
      </motion.div>

      {/* Decorative Item 5 */}
      <motion.div 
        style={{ y: y5 }}
        className="absolute left-8 top-[85%] text-primary-dark/20"
      >
        <Heart size={32} className="animate-float-2" />
      </motion.div>
    </div>
  );
};

const PAIRING_RECIPES = {
  Elegant: {
    chocolate: {
      name: "Chocolate Truffle Elegance",
      description: "Delicate chocolate sponge infused with espresso, layered with dark chocolate ganache and adorned with edible gold flakes.",
      image: "/chocolate_cake.png",
      sweetness: 65, richness: 90, fruitiness: 10, match: 95
    },
    'red-velvet': {
      name: "Crimson Velvet Orchid",
      description: "Stunning red velvet layers paired with light white chocolate cream cheese and decorated with dried organic rose petals.",
      image: "/red_velvet_cake.png",
      sweetness: 70, richness: 80, fruitiness: 20, match: 98
    },
    vanilla: {
      name: "Vanilla Bean Lace Cake",
      description: "Madagascar vanilla bean sponge with Swiss meringue buttercream, garnished with sugar lace and edible white pearls.",
      image: "/wedding_cake.png",
      sweetness: 60, richness: 65, fruitiness: 15, match: 92
    },
    mango: {
      name: "Royale Mango Tiramisu Cake",
      description: "Elegant vanilla sponge soaked in light mango nectar, layered with whipped mascarpone cream and fresh Alphonso mango slices.",
      image: "/mango_cake.png",
      sweetness: 70, richness: 70, fruitiness: 90, match: 96
    },
    strawberry: {
      name: "Rose & Strawberry Chiffon",
      description: "Light-as-air strawberry chiffon sponge filled with wild strawberry compote and frosted with organic rosewater cream.",
      image: "/strawberry_cake.png",
      sweetness: 65, richness: 60, fruitiness: 85, match: 94
    },
    pistachio: {
      name: "Pistachio Rosewater Regal",
      description: "Finely ground pistachio sponge layered with a subtle cardamom-rosewater cream, garnished with crushed nuts and silver vark.",
      image: "/pistachio_cake.png",
      sweetness: 55, richness: 70, fruitiness: 30, match: 97
    },
    biscoff: {
      name: "Biscoff Espresso Praline",
      description: "Vanilla-biscoff layers soaked in rich espresso, filled with butterscotch praline cream and styled with cookie crumbs.",
      image: "/biscoff_cake.png",
      sweetness: 72, richness: 78, fruitiness: 5, match: 95
    }
  },
  Decadent: {
    chocolate: {
      name: "Belgian Chocolate Avalanche",
      description: "The ultimate indulgence. Ultra-rich chocolate sponge layered with hot-fudge filling and topped with roasted hazelnut ganache.",
      image: "/brownies.png",
      sweetness: 85, richness: 98, fruitiness: 5, match: 99
    },
    'red-velvet': {
      name: "Double Cream Cheese Royale",
      description: "Deep cocoa red velvet sponge loaded with vanilla bean cream cheese frosting and rich white chocolate drizzle.",
      image: "/red_velvet_cake.png",
      sweetness: 80, richness: 85, fruitiness: 10, match: 93
    },
    vanilla: {
      name: "Salted Caramel Dream",
      description: "Buttery vanilla sponge layered with handmade sea-salted caramel sauce, toasted pecans, and burnt-butter frosting.",
      image: "/salted_caramel_cake.png",
      sweetness: 85, richness: 88, fruitiness: 10, match: 91
    },
    mango: {
      name: "Mango & White Chocolate Velvet",
      description: "Soft mango sponge paired with luxurious white chocolate ganache, mango curd, and caramelized white chocolate chunks.",
      image: "/mango_cake.png",
      sweetness: 80, richness: 80, fruitiness: 75, match: 89
    },
    strawberry: {
      name: "Strawberries & Dark Ganache Fudge",
      description: "Strawberry sponge loaded with layers of premium Belgian dark chocolate fudge and fresh macerated strawberries.",
      image: "/chocolate_cake.png",
      sweetness: 75, richness: 88, fruitiness: 70, match: 92
    },
    pistachio: {
      name: "Pistachio White Truffle Fudge",
      description: "Moist pistachio cake layered with rich white chocolate truffle frosting, pistachio butter, and candied pistachio chunks.",
      image: "/pistachio_cake.png",
      sweetness: 82, richness: 92, fruitiness: 15, match: 96
    },
    biscoff: {
      name: "Lotus Cookie Butter Extreme",
      description: "Spiced Biscoff sponge completely drenched in warm cookie butter paste, dark fudge chocolate ganache, and Biscoff biscuits.",
      image: "/biscoff_cake.png",
      sweetness: 92, richness: 95, fruitiness: 0, match: 98
    }
  },
  Fruity: {
    chocolate: {
      name: "Black Forest Symphony",
      description: "Rich chocolate sponge layered with tart cherry compote, fresh vanilla cream, and dark chocolate shavings.",
      image: "/chocolate_cake.png",
      sweetness: 70, richness: 75, fruitiness: 65, match: 88
    },
    'red-velvet': {
      name: "Crimson Raspberry Velvet",
      description: "Light cocoa red velvet layers paired with a vibrant raspberry coulis and fresh raspberry cream cheese frosting.",
      image: "/red_velvet_cake.png",
      sweetness: 75, richness: 75, fruitiness: 60, match: 90
    },
    vanilla: {
      name: "Summer Berry Chantilly",
      description: "Vanilla sponge with layers of whipped white chocolate Chantilly cream and fresh mixed berries (strawberries, blueberries, blackberries).",
      image: "/cupcakes.png",
      sweetness: 60, richness: 50, fruitiness: 90, match: 97
    },
    mango: {
      name: "Surat Mango Paradise",
      description: "Our bestseller. Moist mango sponge layered with thick fresh mango cream and loaded with chopped local Alphonso mangoes.",
      image: "/mango_cake.png",
      sweetness: 65, richness: 45, fruitiness: 99, match: 99
    },
    strawberry: {
      name: "Strawberry Fields Forever",
      description: "Fresh strawberry sponge layered with strawberry compote, organic strawberry buttercream, and topped with chocolate-dipped strawberries.",
      image: "/strawberry_cake.png",
      sweetness: 65, richness: 50, fruitiness: 95, match: 98
    },
    pistachio: {
      name: "Pistachio Citrus Raspberry",
      description: "Vibrant pistachio cake infused with orange blossom syrup, paired with fresh raspberries and lime zest frosting.",
      image: "/pistachio_cake.png",
      sweetness: 58, richness: 65, fruitiness: 80, match: 94
    },
    biscoff: {
      name: "Lemon Cookie Butter Zest",
      description: "Caramel Biscoff cake layered with a tart, refreshing lemon curd and light dairy cream cheese frosting.",
      image: "/cupcakes_alt.png",
      sweetness: 70, richness: 68, fruitiness: 50, match: 91
    }
  },
  Whimsical: {
    chocolate: {
      name: "Bouncy Pinata Surprise",
      description: "Fun chocolate sponge filled with chocolate gems, marshmallows, and colorful sprinkles inside, topped with cake pops.",
      image: "/birthday_cake.png",
      sweetness: 85, richness: 80, fruitiness: 10, match: 95
    },
    'red-velvet': {
      name: "Confetti Red Velvet",
      description: "Red velvet sponge baked with fun rainbow sprinkles, filled with cotton candy cream and topped with colorful macarons.",
      image: "/bento_cake_alt.png",
      sweetness: 80, richness: 75, fruitiness: 25, match: 91
    },
    vanilla: {
      name: "Unicorn Birthday Carnival",
      description: "Bright vanilla sponge layered with bubblegum buttercream, colorful sprinkles, and topped with handmade edible sugar unicorns.",
      image: "/birthday_cake_alt.png",
      sweetness: 90, richness: 60, fruitiness: 30, match: 96
    },
    mango: {
      name: "Mango Pop Candy Sparkler",
      description: "Mango sponge paired with strawberry popping candy buttercream and tropical fruit gummies for an explosion of fun.",
      image: "/cupcakes.png",
      sweetness: 85, richness: 50, fruitiness: 85, match: 94
    },
    strawberry: {
      name: "Pink Cotton Candy Swirl",
      description: "Pink strawberry sponge frosted with fluffy cotton candy buttercream, surrounded by mini meringues and edible sparkles.",
      image: "/bento_cake.png",
      sweetness: 90, richness: 55, fruitiness: 80, match: 97
    },
    pistachio: {
      name: "Pistachio Monster Cookie",
      description: "Mint-green pistachio sponge filled with crushed cream cookies and loaded with green marshmallow frosting.",
      image: "/cupcakes_alt.png",
      sweetness: 86, richness: 70, fruitiness: 20, match: 93
    },
    biscoff: {
      name: "Carnival Biscoff Popcorn",
      description: "Biscoff cookie sponge topped with caramel popcorn, marshmallow fluff, and a shower of rainbow sprinkles.",
      image: "/dessert_box.png",
      sweetness: 94, richness: 82, fruitiness: 5, match: 96
    }
  },
  Rustic: {
    chocolate: {
      name: "Rustic Woodland Cocoa",
      description: "Semi-naked chocolate sponge layered with espresso frosting and topped with wild blackberries, rosemary twigs, and fresh figs.",
      image: "/rustic_cake.png",
      sweetness: 60, richness: 82, fruitiness: 45, match: 96
    },
    'red-velvet': {
      name: "Botanical Crimson Velvet",
      description: "Naked style red velvet layers paired with honeyed cream cheese and decorated with wild red currants and eucalyptus leaves.",
      image: "/red_velvet_cake.png",
      sweetness: 62, richness: 75, fruitiness: 40, match: 93
    },
    vanilla: {
      name: "Naked Elderflower Berry",
      description: "Classic vanilla sponge infused with elderflower cordial, layered with whipped cream and loaded with wild strawberries.",
      image: "/elderflower_berry_cake.png",
      sweetness: 58, richness: 55, fruitiness: 78, match: 98
    },
    mango: {
      name: "Rustic Coconut & Mango",
      description: "Moist coconut-floured mango sponge layered with thick mango jam and decorated with dried pineapple flowers.",
      image: "/mango_cake.png",
      sweetness: 65, richness: 60, fruitiness: 88, match: 95
    },
    strawberry: {
      name: "Woodland Wild Strawberry",
      description: "Semi-naked strawberry sponge with whipped lavender buttercream, fresh strawberries, and edible pansy flowers.",
      image: "/strawberry_cake.png",
      sweetness: 60, richness: 58, fruitiness: 90, match: 97
    },
    pistachio: {
      name: "Pistachio Olive & Honey",
      description: "A unique, rustic pistachio cake baked with extra virgin olive oil, layered with raw wild honey cream and edible chamomile.",
      image: "/pistachio_cake.png",
      sweetness: 50, richness: 72, fruitiness: 25, match: 99
    },
    biscoff: {
      name: "Naked Oatmeal Biscoff",
      description: "Semi-naked spiced cookie butter cake topped with organic rolled oat crumble and vanilla maple cream.",
      image: "/biscoff_cake.png",
      sweetness: 68, richness: 74, fruitiness: 10, match: 94
    }
  },
  Festive: {
    chocolate: {
      name: "Royal Cardamom Truffle",
      description: "Belgian chocolate cake spiced with fresh green cardamom, layered with dark saffron ganache and decorated with real 24k gold foil.",
      image: "/wedding_cake_alt.png",
      sweetness: 72, richness: 92, fruitiness: 15, match: 98
    },
    'red-velvet': {
      name: "Royal Rose Velvet Jubilee",
      description: "Deep crimson layers infused with floral rose syrup, layered with saffron cream cheese and toasted pistachios.",
      image: "/wedding_cake_alt.png",
      sweetness: 76, richness: 84, fruitiness: 30, match: 95
    },
    vanilla: {
      name: "Saffron Kesar Pista Dream",
      description: "Moist vanilla sponge infused with saffron milk, layered with crushed pistachios, almonds, and decorated with silver vark.",
      image: "/wedding_cake.png",
      sweetness: 78, richness: 82, fruitiness: 10, match: 99
    },
    mango: {
      name: "Alphonso Shrikhand Shahi",
      description: "Mango sponge layered with sweet cardamom-spiced hung yogurt cream (Shrikhand) and raw almond slivers.",
      image: "/mango_cake.png",
      sweetness: 70, richness: 78, fruitiness: 92, match: 97
    },
    strawberry: {
      name: "Kesar Strawberry Rabdi",
      description: "Strawberry cake layered with a rich, reduced saffron milk rabdi cream and fresh chopped Mahabaleshwar strawberries.",
      image: "/strawberry_cake.png",
      sweetness: 74, richness: 86, fruitiness: 85, match: 96
    },
    pistachio: {
      name: "Shahi Pistachio Baklava Palace",
      description: "Premium pistachio sponge layered with honey-infused cream, crispy phyllo crunch, rose syrup, and saffron highlights.",
      image: "/pistachio_cake.png",
      sweetness: 80, richness: 90, fruitiness: 25, match: 99
    },
    biscoff: {
      name: "Festive Biscoff Kheer Shahi",
      description: "Caramelized Biscoff cookie cake layered with thickened sweet milk pudding (kheer) and a pinch of ground nutmeg.",
      image: "/biscoff_cake.png",
      sweetness: 85, richness: 88, fruitiness: 5, match: 94
    }
  }
};

const FlavorPairingLab = () => {
  const [selectedVibe, setSelectedVibe] = useState('Elegant');
  const [selectedSponge, setSelectedSponge] = useState('chocolate');
  
  const currentPairing = PAIRING_RECIPES[selectedVibe][selectedSponge];

  // Trigger confetti on high matches
  useEffect(() => {
    if (currentPairing.match >= 98) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 }
      });
    }
  }, [selectedVibe, selectedSponge]);

  const handleOrder = () => {
    const textMsg = `Hi Sweety Shah! I just matched a cake on your Flavor Pairing Lab:
- Vibe: ${selectedVibe}
- Sponge Base: ${selectedSponge.replace('-', ' ').toUpperCase()}
- Recommended Pairing: ${currentPairing.name} (Match Score: ${currentPairing.match}%)

I would like to place an order for this cake!`;
    const urlEncoded = encodeURIComponent(textMsg);
    window.open(getWhatsAppLink(textMsg), '_blank');
  };

  const vibes = [
    { id: 'Elegant', label: 'Elegant & Classic', icon: <Sparkles size={18} />, desc: 'For sophisticated, timeless celebrations.' },
    { id: 'Decadent', label: 'Rich & Decadent', icon: <Award size={18} />, desc: 'For ultimate chocolate lovers and pure indulgence.' },
    { id: 'Fruity', label: 'Light & Fruity', icon: <Heart size={18} />, desc: 'For refreshing, zesty, and natural fruit notes.' },
    { id: 'Whimsical', label: 'Fun & Whimsical', icon: <ChefHat size={18} />, desc: 'For colorful, joyful, and surprise-filled parties.' },
    { id: 'Rustic', label: 'Rustic & Botanical', icon: <Leaf size={18} />, desc: 'Semi-naked cakes, fresh flowers, and natural earth tones.' },
    { id: 'Festive', label: 'Royalty & Festive', icon: <Crown size={18} />, desc: 'For grand celebrations, weddings, and rich traditional elements.' }
  ];

  const sponges = [
    { id: 'chocolate', label: 'Belgian Chocolate', color: '#3E2A20' },
    { id: 'red-velvet', label: 'Crimson Red Velvet', color: '#8C1D1D' },
    { id: 'vanilla', label: 'Vanilla Bean', color: '#EADCB9' },
    { id: 'mango', label: 'Alphonso Mango', color: '#DCA842' },
    { id: 'strawberry', label: 'Fresh Strawberry', color: '#C2787E' },
    { id: 'pistachio', label: 'Premium Pistachio', color: '#93C572' },
    { id: 'biscoff', label: 'Lotus Biscoff', color: '#B38B6D' }
  ];

  // SVG circular gauge properties
  const radius = 55;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentPairing.match / 100) * circumference;

  return (
    <motion.section 
      id="customizer" 
      className="py-24 bg-card-bg/30 relative"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: false, margin: "-150px" }}
      variants={staggerContainer}
    >
      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="font-script text-3xl text-primary-dark block mb-2">
            The Flavor Pairing Lab
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Perfect Cake Match</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Choose your celebration vibe and favorite sponge base. Our interactive matcher will craft the ultimate flavor profiles and recommend your signature bake.
          </p>
        </motion.div>

        <motion.div 
          variants={scaleUp}
          className="grid lg:grid-cols-12 gap-12 bg-card-bg rounded-3xl p-8 md:p-12 shadow-soft border border-border-subtle"
        >
          {/* Left Panel: Selectors */}
          <div className="lg:col-span-6 space-y-10">
            {/* Vibe Selection */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-text-main">1</span>
                What is the vibe?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vibes.map((v) => {
                  const isActive = selectedVibe === v.id;
                  return (
                    <motion.button
                      key={v.id}
                      onClick={() => setSelectedVibe(v.id)}
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary/10 border-primary shadow-sm' 
                          : 'bg-card-bg border-border-subtle hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-primary text-text-main' : 'bg-primary/10 text-primary-dark'}`}>
                          {v.icon}
                        </span>
                        <span className="font-bold text-lg">{v.label}</span>
                      </div>
                      <p className="text-sm text-text-muted leading-snug">{v.desc}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Sponge Selection */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-text-main">2</span>
                Choose your Sponge Base
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {sponges.map((s) => {
                  const isActive = selectedSponge === s.id;
                  return (
                    <motion.button
                      key={s.id}
                      onClick={() => setSelectedSponge(s.id)}
                      whileHover={{ scale: 1.06, rotate: isActive ? 0 : [0, -1, 1, 0] }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer text-left font-semibold transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary/10 border-primary text-text-main scale-[1.02]' 
                          : 'bg-card-bg border-border-subtle text-text-muted hover:border-primary/50'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="text-sm capitalize">{s.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel: Match Details & Recommended Cake */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-bg-light/60 rounded-3xl p-8 border border-border-subtle relative overflow-hidden">
            {/* Header: Score and Tasting Profiles */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-8 bg-card-bg p-6 rounded-2xl border border-border-subtle shadow-sm">
                {/* Match Score SVG circle */}
                <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="56" cy="56" r={radius} 
                      className="text-primary/20 stroke-current" 
                      strokeWidth={strokeWidth} 
                      fill="transparent" 
                    />
                    <motion.circle 
                      cx="56" cy="56" r={radius} 
                      className="text-primary stroke-current" 
                      strokeWidth={strokeWidth} 
                      fill="transparent"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset }}
                      transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <motion.span 
                      key={currentPairing.match}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="text-3xl font-extrabold text-text-main"
                    >
                      {currentPairing.match}%
                    </motion.span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted mt-0.5">Match</span>
                  </div>
                </div>

                <div className="flex-grow w-full space-y-3">
                  <h4 className="text-xl font-bold mb-1 text-center sm:text-left">Tasting Profile</h4>
                  
                  {/* Sweetness */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-text-muted">
                      <span>Sweetness</span>
                      <span>{currentPairing.sweetness}%</span>
                    </div>
                    <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${currentPairing.sweetness}%` }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>

                  {/* Richness */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-text-muted">
                      <span>Richness</span>
                      <span>{currentPairing.richness}%</span>
                    </div>
                    <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${currentPairing.richness}%` }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                  </div>

                  {/* Fruitiness */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-text-muted">
                      <span>Fruitiness</span>
                      <span>{currentPairing.fruitiness}%</span>
                    </div>
                    <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${currentPairing.fruitiness}%` }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        className="h-full bg-primary-dark rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Cake Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPairing.name}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="bg-card-bg rounded-2xl overflow-hidden border border-border-subtle shadow-sm flex flex-col md:flex-row items-stretch"
                >
                  <div className="md:w-2/5 relative min-h-[140px] md:min-h-auto">
                    <img 
                      src={currentPairing.image} 
                      alt={currentPairing.name}
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                  <div className="p-6 md:w-3/5 flex flex-col justify-center">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="bg-primary-dark/20 text-text-main text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Perfect Match</span>
                    </div>
                    <h5 className="text-2xl font-bold text-text-main leading-tight mb-2">{currentPairing.name}</h5>
                    <p className="text-sm text-text-muted leading-relaxed">{currentPairing.description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTA Order Button */}
            <motion.button 
              onClick={handleOrder}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0px 8px 20px rgba(229, 169, 184, 0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="btn-primary w-full py-4 text-lg font-bold shadow-md mt-8 flex items-center justify-center gap-2 cursor-pointer"
            >
              Order This Perfect Match 🍰
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const Testimonials = () => {
  return (
    <motion.section 
      id="reviews" 
      className="py-24 relative overflow-hidden bg-card-bg transition-colors duration-500"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: false, margin: "-150px" }}
      variants={fadeInUp}
    >
      <div className="max-w-4xl mx-auto text-center px-6">
        <Heart className="text-primary-dark mx-auto mb-8" size={60} />
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Customer Love</h2>
        
        <div className="flex overflow-x-auto gap-8 no-scrollbar snap-x">
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="testimonial-card snap-center cursor-grab active:cursor-grabbing select-none"
            >
              <p className="text-2xl md:text-3xl font-serif italic mb-10 leading-relaxed">"{t.text}"</p>
              <div className="flex justify-center gap-1 text-accent mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
              </div>
              <div className="font-bold text-xl">— {t.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.section 
      className="py-24 bg-bg-light"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: false, margin: "-150px" }}
      variants={staggerContainer}
    >
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-center mb-16">Frequently Asked</motion.h2>
        <motion.div 
          variants={staggerContainer}
          className="space-y-4"
        >
          {FAQS.map((faq, i) => (
            <motion.div 
              key={i} 
              variants={fadeInUpStagger}
              whileHover={{ scale: 1.02, y: -3, boxShadow: "0 10px 25px rgba(93, 64, 55, 0.08)" }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="bg-card-bg rounded-2xl overflow-hidden shadow-sm border border-border-subtle"
            >
              <motion.button 
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                whileHover={{ backgroundColor: "rgba(255, 209, 220, 0.15)" }}
                className="w-full p-6 flex justify-between items-center text-left transition-colors text-text-main cursor-pointer"
              >
                <span className="text-xl font-semibold">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <ChevronDown />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      height: { type: "spring", stiffness: 300, damping: 20 },
                      opacity: { duration: 0.25 }
                    }}
                  >
                    <div className="p-6 pt-0 text-text-muted text-lg border-t border-border-subtle">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmSend = () => {
    const emailStr = formData.email.trim() ? `\n- Email: ${formData.email.trim()}` : '';
    const textMsg = `Hi Sweety Shah! I would like to make a quick inquiry:
- Name: ${formData.name.trim()}${emailStr}
- Event details: ${formData.message.trim()}`;
    
    window.open(getWhatsAppLink(textMsg), '_blank');
    setShowConfirmModal(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <motion.section 
      id="contact" 
      className="py-24 bg-secondary/30"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: false, margin: "-150px" }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={scaleUp}
          className="bg-card-bg rounded-[3rem] p-10 md:p-20 shadow-soft flex flex-col lg:flex-row gap-20 border border-border-subtle"
        >
          <motion.div 
            variants={slideInLeft}
            className="lg:w-1/2"
          >
            <h2 className="text-5xl font-bold mb-8 leading-tight">Let's Make Your <br /> Day Popilicious!</h2>
            <p className="text-text-muted text-xl mb-12">
              Have a custom request or want to inquire about availability? We'd love to hear from you and create something special.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <MapPin size={28} />
                </div>
                <div>
                  <div className="font-bold text-lg">Our Location</div>
                  <div className="text-text-muted">Surat, Gujarat, India</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Instagram size={28} />
                </div>
                <div>
                  <div className="font-bold text-lg">Instagram</div>
                  <a 
                    href={getInstagramProfile()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-muted hover:text-primary transition-colors duration-200"
                  >
                    @popilicious_cake
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-16">
              <motion.a 
                href={getWhatsAppLink("Hi! I would like to inquire about a custom cake.")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="btn-primary flex items-center justify-center gap-3 py-4 text-lg cursor-pointer"
              >
                <MessageCircle size={24} /> WhatsApp Us
              </motion.a>
              <motion.a 
                href={getInstagramDM()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="btn-outline flex items-center justify-center gap-3 py-4 text-lg cursor-pointer"
              >
                <Instagram size={24} /> Instagram DM
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            variants={slideInRight}
            className="lg:w-1/2"
          >
             <div className="bg-bg-light p-10 rounded-[2rem] border border-primary/10">
               <h3 className="text-3xl font-bold mb-8 text-center">Quick Inquiry</h3>
               <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <motion.input 
                     whileFocus={{ scale: 1.02, borderColor: "#FFD1DC" }}
                     transition={{ type: "spring", stiffness: 400, damping: 15 }}
                     type="text" 
                     name="name"
                     value={formData.name}
                     onChange={handleInputChange}
                     required
                     placeholder="Your Name" 
                     className="w-full p-5 rounded-2xl bg-card-bg border border-border-subtle focus:ring-2 focus:ring-primary outline-none text-lg shadow-sm text-text-main placeholder:text-text-muted/50 transition-shadow" 
                   />
                   <motion.input 
                     whileFocus={{ scale: 1.02, borderColor: "#FFD1DC" }}
                     transition={{ type: "spring", stiffness: 400, damping: 15 }}
                     type="email" 
                     name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     placeholder="Your Email" 
                     className="w-full p-5 rounded-2xl bg-card-bg border border-border-subtle focus:ring-2 focus:ring-primary outline-none text-lg shadow-sm text-text-main placeholder:text-text-muted/50 transition-shadow" 
                   />
                 </div>
                 <motion.textarea 
                   whileFocus={{ scale: 1.01, borderColor: "#FFD1DC" }}
                   transition={{ type: "spring", stiffness: 400, damping: 15 }}
                   name="message"
                   value={formData.message}
                   onChange={handleInputChange}
                   required
                   placeholder="Tell us about your event (Date, Theme, Servings...)" 
                   rows="5" 
                   className="w-full p-5 rounded-2xl bg-card-bg border border-border-subtle focus:ring-2 focus:ring-primary outline-none text-lg shadow-sm text-text-main placeholder:text-text-muted/50 transition-shadow" 
                 />
                 <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    type="submit"
                    className="btn-primary w-full py-5 text-xl shadow-lg cursor-pointer"
                 >
                    Send Message
                 </motion.button>
               </form>
             </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showConfirmModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[6000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowConfirmModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="bg-card-bg rounded-[2rem] p-8 md:p-10 max-w-lg w-full border border-primary/20 shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative top circle */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary-dark">
                  <MessageCircle size={24} />
                </div>
                <h4 className="text-2xl font-bold text-text-main">Send via WhatsApp?</h4>
              </div>

              <p className="text-text-muted mb-6 leading-relaxed">
                You will be redirected to WhatsApp to send this message to Sweety Shah:
              </p>

              <div className="bg-bg-light/60 p-5 rounded-2xl border border-border-subtle text-left mb-8 max-h-[200px] overflow-y-auto font-medium text-sm text-text-main space-y-2 whitespace-pre-wrap">
                <strong>Name:</strong> {formData.name}
                {formData.email && <><br /><strong>Email:</strong> {formData.email}</>}
                <br /><strong>Message:</strong><br />{formData.message}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="btn-outline flex-1 py-3 text-base font-bold order-2 sm:order-1 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmSend}
                  className="btn-primary flex-1 py-3 text-base font-bold order-1 sm:order-2 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageCircle size={18} /> Yes, Send Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 px-6 bg-card-bg border-t border-border-subtle transition-colors duration-500">
      <motion.div {...fadeInUp} className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-4xl font-heading font-bold text-gradient">Popilicious</div>
        
        <div className="flex flex-wrap justify-center gap-10 text-sm font-semibold uppercase tracking-widest text-text-muted">
          {['About', 'Cakes', 'Gallery', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors">{item}</a>
          ))}
        </div>

        <div className="flex gap-6">
          {[
            { icon: Instagram, href: getInstagramProfile() },
            { icon: MessageCircle, href: getWhatsAppLink("Hi! I would like to get in touch.") }
          ].map(({ icon: Icon, href }, i) => (
            <motion.a 
              key={i} 
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 12 }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-text-main hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </div>
      </motion.div>
      <div className="text-center mt-24 text-text-muted font-medium">
        © {new Date().getFullYear()} Popilicious Cake. Handcrafted with ❤️ in Surat.
      </div>
    </footer>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="selection:bg-primary selection:text-[#5D4037] antialiased">
      <ClickParticles />
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-[9999] origin-left"
        style={{ scaleX }}
      />
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5000] bg-bg-light flex flex-col items-center justify-center transition-colors duration-500"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-primary mb-8"
            >
              <Cake size={100} />
            </motion.div>
            <h2 className="text-4xl font-heading text-gradient">Preparing Something Sweet...</h2>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      <ScrollParallaxDecorations />
      
      <div className="relative overflow-hidden">
        <FloatingSprinkles />
        <Hero />
      </div>

      <FrostingDripDivider flip={true} bgLight={false} />
      
      <About />
      
      <SignatureCakes />

      <FlavorPairingLab />
      
      <WhyChooseUs />
      
      <FrostingDripDivider flip={false} bgLight={true} />
      
      <Gallery />
      
      <Testimonials />
      
      <FAQ />
      
      <div className="relative">
        <Contact />
        <FrostingDripDivider flip={false} bgLight={false} />
      </div>
      
      <Footer />
    </div>
  );
};

export default App;
