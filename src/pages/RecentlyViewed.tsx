import { useState } from 'react';
import { Clock, Trash2, Play, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Layout from '@/components/Layout';

const RecentlyViewed = () => {
  const [recentAnime, setRecentAnime] = useState([
    {
      id: 1,
      title: 'Attack on Titan',
      episode: 'Episode 75',
      progress: 85,
      watchedAt: '2 hours ago',
      totalEpisodes: 87,
      genre: ['Action', 'Drama'],
      rating: 9.0,
      thumbnail: '/public/aot.jpg.jpeg'
    },
    {
      id: 2,
      title: 'Demon Slayer',
      episode: 'Episode 12',
      progress: 45,
      watchedAt: '1 day ago',
      totalEpisodes: 32,
      genre: ['Action', 'Supernatural'],
      rating: 8.7,
      thumbnail: '/public/demonslayer.jpg.jpeg'
    },
    {
      id: 3,
      title: 'One Piece',
      episode: 'Episode 1085',
      progress: 92,
      watchedAt: '3 days ago',
      totalEpisodes: 1085,
      genre: ['Adventure', 'Comedy'],
      rating: 9.2,
      thumbnail: '/public/onepeice.jpeg'
    },
    {
      id: 4,
      title: 'Jujutsu Kaisen',
      episode: 'Episode 8',
      progress: 33,
      watchedAt: '1 week ago',
      totalEpisodes: 24,
      genre: ['Action', 'Supernatural'],
      rating: 8.9,
      thumbnail: '/public/jujutsu.jpg.jpeg'
    },
    {
      id: 5,
      title: 'Spy x Family',
      episode: 'Episode 20',
      progress: 67,
      watchedAt: '2 weeks ago',
      totalEpisodes: 25,
      genre: ['Comedy', 'Action'],
      rating: 9.1,
      thumbnail: '/spyxfamily.jpeg'
    }
  ]);

  const removeFromRecent = (id: number) => {
    setRecentAnime(prev => prev.filter(anime => anime.id !== id));
  };

  const clearAll = () => {
    setRecentAnime([]);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold hero-gradient bg-clip-text mb-4">
                Recently Viewed
              </h1>
              <p className="text-muted-foreground text-lg">
                Continue watching where you left off
              </p>
            </div>
            
            {recentAnime.length > 0 && (
              <Button
                variant="outline"
                onClick={clearAll}
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Recent Anime List */}
          {recentAnime.length > 0 ? (
            <div className="space-y-6">
              {recentAnime.map((anime, index) => (
                <RecentAnimeCard
                  key={anime.id}
                  anime={anime}
                  index={index}
                  onRemove={() => removeFromRecent(anime.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <Clock className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No Recent Activity
              </h3>
              <p className="text-muted-foreground text-lg mb-8">
                Start watching anime to see your viewing history here
              </p>
              <Button className="button-gradient button-shadow">
                Browse Anime
              </Button>
            </div>
          )}

          {/* Continue Watching Quick Actions */}
          {recentAnime.length > 0 && (
            <div className="mt-12 p-6 card-gradient border border-border rounded-xl">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Mark All as Watched
                </Button>
                <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Add to Watchlist
                </Button>
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                  Download for Offline
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const RecentAnimeCard = ({ anime, index, onRemove }: { anime: any; index: number; onRemove: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="overflow-hidden card-gradient border-border anime-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail */}
        <div className="relative md:w-80 aspect-video md:aspect-auto">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <Play className="h-12 w-12 text-primary/60" />
          </div>
          
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
            <div className="w-full bg-muted/30 rounded-full h-1">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${anime.progress}%` }}
              />
            </div>
            <div className="text-xs text-white mt-1">
              {anime.progress}% complete
            </div>
          </div>

          {/* Play Overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button size="lg" className="button-gradient button-shadow">
              <Play className="h-6 w-6 mr-2" />
              Continue Watching
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {anime.title}
                </h3>
                <p className="text-muted-foreground font-medium">
                  {anime.episode} • {anime.totalEpisodes} episodes
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-accent">
                <span className="text-sm font-medium">★ {anime.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{anime.watchedAt}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {anime.genre.map((g: string) => (
                <Badge key={g} variant="outline" className="border-primary/50 text-primary">
                  {g}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button className="button-gradient button-shadow">
              <Play className="h-4 w-4 mr-2" />
              Continue
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Episode List
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecentlyViewed;