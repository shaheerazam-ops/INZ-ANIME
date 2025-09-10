import { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Layout from '@/components/Layout';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Mock search data
  const allAnime = [
    { id: 1, title: 'Attack on Titan', genre: ['Action', 'Drama'], rating: 9.0, year: 2013, popularity: 'high' },
    { id: 2, title: 'Demon Slayer', genre: ['Action', 'Supernatural'], rating: 8.7, year: 2019, popularity: 'high' },
    { id: 3, title: 'One Piece', genre: ['Adventure', 'Comedy'], rating: 9.2, year: 1999, popularity: 'high' },
    { id: 4, title: 'Naruto', genre: ['Action', 'Adventure'], rating: 8.4, year: 2002, popularity: 'high' },
    { id: 5, title: 'Death Note', genre: ['Thriller', 'Supernatural'], rating: 9.1, year: 2006, popularity: 'medium' },
    { id: 6, title: 'My Hero Academia', genre: ['Action', 'School'], rating: 8.5, year: 2016, popularity: 'high' },
    { id: 7, title: 'Spirited Away', genre: ['Adventure', 'Family'], rating: 9.3, year: 2001, popularity: 'medium' },
    { id: 8, title: 'Your Name', genre: ['Romance', 'Drama'], rating: 8.4, year: 2016, popularity: 'medium' },
  ];

  const popularSearches = ['Attack on Titan', 'Demon Slayer', 'One Piece', 'Naruto', 'Death Note'];
  const recentSearches = ['Jujutsu Kaisen', 'Spy x Family', 'Chainsaw Man'];
  const filters = ['All', 'Movies', 'Series', 'OVA', 'Special'];

  // Simulate search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const filtered = allAnime.filter(anime =>
        anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anime.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold hero-gradient bg-clip-text text-transparent mb-4">
              Search Anime
            </h1>
            <p className="text-muted-foreground text-lg">
              Find your next favorite anime series or movie
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
            <Input
              placeholder="Search for anime titles, genres, or characters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-input border-border text-lg py-6 text-center"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={
                    selectedFilter === filter
                      ? "button-gradient"
                      : "hover:bg-background"
                  }
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Search Results for "{searchQuery}"
              </h2>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Card key={i} className="card-gradient border-border">
                      <div className="aspect-[3/4] bg-muted animate-pulse rounded-t-lg" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <>
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {searchResults.map((anime) => (
                        <SearchResultCard key={anime.id} anime={anime} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-muted-foreground text-lg mb-4">
                        No results found for "{searchQuery}"
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Try searching with different keywords or check the spelling
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Quick Search Suggestions */}
          {!searchQuery && (
            <div className="space-y-8">
              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Popular Searches</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((search) => (
                    <Button
                      key={search}
                      variant="outline"
                      onClick={() => handleQuickSearch(search)}
                      className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-secondary" />
                  <h3 className="text-xl font-semibold text-foreground">Recent Searches</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {recentSearches.map((search) => (
                    <Button
                      key={search}
                      variant="outline"
                      onClick={() => handleQuickSearch(search)}
                      className="border-secondary/50 text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Featured Categories */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Browse by Category</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Action', 'Romance', 'Comedy', 'Thriller'].map((category) => (
                    <Card
                      key={category}
                      className="p-6 text-center card-gradient border-border hover:border-primary transition-colors cursor-pointer"
                      onClick={() => handleQuickSearch(category)}
                    >
                      <h4 className="font-semibold text-lg text-foreground">{category}</h4>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const SearchResultCard = ({ anime }: { anime: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group relative overflow-hidden card-gradient border-border anime-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <div className="text-4xl font-bold text-primary/40">
            {anime.title.charAt(0)}
          </div>
        </div>
        
        {/* Hover Details */}
        <div className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 p-4 flex flex-col justify-center">
            <div className="space-y-3 transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
              <h3 className="font-bold text-lg text-white text-center">{anime.title}</h3>
              <div className="space-y-2 text-sm text-center">
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  ★ {anime.rating}
                </Badge>
                <p className="text-gray-300">Year: {anime.year}</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {anime.genre.slice(0, 2).map((g: string) => (
                    <Badge key={g} variant="outline" className="text-xs border-primary/50 text-primary">
                      {g}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button 
                size="sm" 
                className="w-full button-gradient button-shadow hover:opacity-90 transition-opacity"
              >
                Watch Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">
          {anime.title}
        </h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">★ {anime.rating}</span>
          <span className="text-muted-foreground">{anime.year}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
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

export default SearchPage;