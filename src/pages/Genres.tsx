import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Layout from '@/components/Layout';

const Genres = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const genres = [
    'All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
    'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Thriller'
  ];

  const animeByGenre = {
    Action: [
      { id: 1, title: 'Attack on Titan', rating: 9.0, episodes: 87, status: 'Completed', image: '/aot.jpg.jpeg' },
      { id: 2, title: 'Demon Slayer', rating: 8.7, episodes: 32, status: 'Ongoing', image: '/demonslayer.jpg.jpeg' },
      { id: 3, title: 'Jujutsu Kaisen', rating: 8.9, episodes: 24, status: 'Ongoing', image: '/jujutsu.jpg.jpeg' },
    ],
    Comedy: [
      { id: 4, title: 'One Punch Man', rating: 8.8, episodes: 24, status: 'Ongoing', image: '/onepunch.jpeg' },
      { id: 5, title: 'Spy x Family', rating: 9.1, episodes: 25, status: 'Ongoing', image: '/spyxfamily.jpeg' },
      { id: 6, title: 'Gintama', rating: 9.0, episodes: 367, status: 'Completed', image: '/gintama.jpeg' },
    ],
    Romance: [
      { id: 7, title: 'Your Name', rating: 8.4, episodes: 1, status: 'Movie', image: '/yourname.jpeg' },
      { id: 8, title: 'Kaguya-sama', rating: 8.9, episodes: 37, status: 'Completed', image: '/kaguya.jpeg' },
      { id: 9, title: 'Horimiya', rating: 8.2, episodes: 13, status: 'Completed', image: '/horimiya.jpeg' },
    ],
  };

  const getAllAnime = () => Object.values(animeByGenre).flat();

  const getFilteredAnime = () => {
    const animeList = selectedGenre === 'All'
      ? getAllAnime()
      : animeByGenre[selectedGenre as keyof typeof animeByGenre] || [];

    return animeList.filter(anime =>
      anime.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold hero-gradient bg-clip-text  mb-4">
              Browse by Genre
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover anime by your favorite genres
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border text-lg py-6"
            />
          </div>

          {/* Genre Filter */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filter by genre:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  onClick={() => setSelectedGenre(genre)}
                  className={
                    selectedGenre === genre
                      ? "button-gradient button-shadow"
                      : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  }
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>

          {/* Anime Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getFilteredAnime().map((anime) => (
              <AnimeGenreCard key={anime.id} anime={anime} />
            ))}
          </div>

          {/* No Results */}
          {getFilteredAnime().length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No anime found for "{selectedGenre}" genre
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const AnimeGenreCard = ({ anime }: { anime: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group relative overflow-hidden card-gradient border-border anime-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {/* Thumbnail */}
        {anime.image ? (
          <img
            src={anime.image}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="text-6xl font-bold text-primary/20">
              {anime.title.charAt(0)}
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 p-4 flex flex-col justify-center text-center">
            <div className="space-y-3 transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
              <h3 className="font-bold text-lg text-white">{anime.title}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-center">
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    ★ {anime.rating}
                  </Badge>
                </div>
                <p className="text-gray-300">Episodes: {anime.episodes}</p>
                <p className="text-gray-300">Status: {anime.status}</p>
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

      {/* Anime Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">
          {anime.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>★ {anime.rating}</span>
          <Badge variant="outline" className="border-primary/50 text-primary">
            {anime.status}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default Genres;
