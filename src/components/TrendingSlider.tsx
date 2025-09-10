import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const TrendingSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mock trending anime data
  const trendingAnime = [
    {
      id: 1,
      title: "One Piece",
      episode: "Episode 1085",
      rating: 9.2,
      views: "2.5M",
      genre: ["Adventure", "Comedy", "Shounen"],
      image: "/api/placeholder/400/600",
      description: "Follow Monkey D. Luffy and his Straw Hat Pirates as they explore the Grand Line to find the legendary treasure One Piece."
    },
    {
      id: 2,
      title: "Chainsaw Man",
      episode: "Episode 12",
      rating: 8.8,
      views: "1.8M",
      genre: ["Action", "Supernatural", "Gore"],
      image: "/api/placeholder/400/600",
      description: "A young man becomes a devil hunter to pay off his father's debt, wielding the power of chainsaws."
    },
    {
      id: 3,
      title: "Spy x Family",
      episode: "Episode 25",
      rating: 9.1,
      views: "3.2M",
      genre: ["Comedy", "Action", "Family"],
      image: "/api/placeholder/400/600",
      description: "A spy must create a fake family for a mission, unknowingly recruiting an assassin and a telepath."
    },
    {
      id: 4,
      title: "My Hero Academia",
      episode: "Episode 150",
      rating: 8.5,
      views: "2.1M",
      genre: ["Action", "School", "Superhero"],
      image: "/api/placeholder/400/600",
      description: "In a world where superpowers are common, a powerless boy dreams of becoming the greatest hero."
    },
    {
      id: 5,
      title: "Tokyo Revengers",
      episode: "Episode 24",
      rating: 8.7,
      views: "1.9M",
      genre: ["Drama", "Supernatural", "Delinquents"],
      image: "/api/placeholder/400/600",
      description: "A man travels back in time to his school days to save his girlfriend from being killed by a gang."
    },
    {
      id: 6,
      title: "Mob Psycho 100",
      episode: "Episode 37",
      rating: 9.0,
      views: "1.5M",
      genre: ["Comedy", "Supernatural", "Psychology"],
      image: "/api/placeholder/400/600",
      description: "A psychic middle schooler tries to live a normal life while dealing with his overwhelming powers."
    }
  ];

  const itemsPerSlide = 4;
  const maxSlides = Math.ceil(trendingAnime.length / itemsPerSlide) - 1;

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlides ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [maxSlides, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlides ? 0 : prev + 1));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlides : prev - 1));
    setIsAutoPlaying(false);
  };

  const getVisibleAnime = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return trendingAnime.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold hero-gradient bg-clip-text text-transparent">
              Trending Now
            </h2>
            <p className="text-muted-foreground mt-2">
              Most watched anime this week
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: Math.ceil(trendingAnime.length / itemsPerSlide) }, (_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingAnime
                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                    .map((anime, index) => (
                      <AnimeCard key={anime.id} anime={anime} index={index} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxSlides + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-primary glow-effect' 
                  : 'bg-muted hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Individual Anime Card Component
const AnimeCard = ({ anime, index }: { anime: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group relative overflow-hidden card-gradient border-border anime-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {/* Anime Poster */}
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <Play className="h-16 w-16 text-primary/60" />
        </div>
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <div className="space-y-2 transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 text-accent">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{anime.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Eye className="h-3 w-3" />
                  <span>{anime.views}</span>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground line-clamp-3">
                {anime.description}
              </p>
              
              <Button 
                size="sm" 
                className="w-full button-gradient button-shadow hover:opacity-90 transition-opacity"
              >
                <Play className="h-4 w-4 mr-2" />
                Watch Now
              </Button>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/60 text-white border-none">
            <Star className="h-3 w-3 mr-1 fill-current text-accent" />
            {anime.rating}
          </Badge>
        </div>
      </div>

      {/* Anime Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">
          {anime.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          {anime.episode}
        </p>
        <div className="flex flex-wrap gap-1">
          {anime.genre.slice(0, 2).map((g: string) => (
            <Badge key={g} variant="outline" className="text-xs border-primary/50 text-primary">
              {g}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TrendingSlider;