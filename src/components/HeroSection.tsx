import { useState, useEffect } from 'react';
import { Play, Info, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  const [currentAnime, setCurrentAnime] = useState(0);

  // Mock featured anime data
  const featuredAnime = [
    {
      id: 1,
      title: "Attack on Titan",
      description: "Humanity fights for survival against giant humanoid Titans that have brought civilization to the brink of extinction.",
      rating: 9.0,
      year: 2023,
      genre: ["Action", "Drama", "Fantasy"],
      image: "/api/placeholder/1920/1080"
    },
    {
      id: 2,
      title: "Demon Slayer",
      description: "A young boy becomes a demon slayer to avenge his family and cure his sister who has been turned into a demon.",
      rating: 8.7,
      year: 2023,
      genre: ["Action", "Supernatural", "Historical"],
      image: "/api/placeholder/1920/1080"
    },
    {
      id: 3,
      title: "Jujutsu Kaisen",
      description: "A high school student joins a secret organization of sorcerers to eliminate a powerful curse.",
      rating: 8.9,
      year: 2023,
      genre: ["Action", "Supernatural", "School"],
      image: "/api/placeholder/1920/1080"
    }
  ];

  // Auto-rotate featured anime every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnime((prev) => (prev + 1) % featuredAnime.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [featuredAnime.length]);

  const anime = featuredAnime[currentAnime];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold hero-gradient bg-clip-text text-transparent mb-4 animate-fade-in-up">
              INTZ.ANIME
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Stream the best anime content
            </p>
          </div>

          {/* Featured Anime Card */}
          <div className="card-gradient border border-border rounded-xl p-8 card-shadow animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Anime Info */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    Featured
                  </Badge>
                  <div className="flex items-center gap-1 text-accent">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{anime.rating}</span>
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {anime.title}
                </h2>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {anime.genre.map((g) => (
                    <Badge key={g} variant="outline" className="border-primary text-primary">
                      {g}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {anime.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="button-gradient button-shadow hover:opacity-90 transition-opacity"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Watch Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Info className="h-5 w-5 mr-2" />
                    More Info
                  </Button>
                </div>
              </div>

              {/* Anime Thumbnail */}
              <div className="relative group">
                <div className="w-64 h-36 bg-muted rounded-lg overflow-hidden glow-effect">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Play className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors rounded-lg" />
              </div>
            </div>
          </div>

          {/* Anime Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {featuredAnime.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAnime(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentAnime 
                    ? 'bg-primary glow-effect' 
                    : 'bg-muted hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;