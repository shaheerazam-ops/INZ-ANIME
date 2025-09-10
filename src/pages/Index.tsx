import HeroSection from '@/components/HeroSection';
import TrendingSlider from '@/components/TrendingSlider';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Trending Anime Slider */}
        <TrendingSlider />
        
        {/* Additional Content Sections */}
        <section className="py-16 bg-background relative z-10">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="text-center relative z-20"
    >
      <h2 className="text-3xl md:text-4xl font-bold hero-gradient bg-clip-text text-colour:black mb-6">
        Start Your Anime Journey
      </h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Discover thousands of anime series and movies. From classic masterpieces to the latest releases, 
        find your next favorite show on INZ.ANIME.
      </p>
    </motion.div>
  </div>
</section>
      </div>
    </Layout>
  );
};

export default Index;
