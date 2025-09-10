import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Settings, 
  Maximize, 
  ArrowLeft,
  Clock,
  Star,
  Eye,
  Server,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';

const StreamingPage = () => {
  const { animeId, episodeId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [selectedServer, setSelectedServer] = useState('server1');
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // Mock anime data
  const animeData = {
    1: {
      id: 1,
      title: "Attack on Titan",
      description: "Humanity fights for survival against giant humanoid Titans that have brought civilization to the brink of extinction.",
      rating: 9.0,
      year: 2023,
      genre: ["Action", "Drama", "Fantasy"],
      image: "/aot.jpg.jpeg",
      totalEpisodes: 25,
      currentEpisode: 1
    },
    2: {
      id: 2,
      title: "Demon Slayer",
      description: "A young boy becomes a demon slayer to avenge his family and cure his sister who has been turned into a demon.",
      rating: 8.7,
      year: 2023,
      genre: ["Action", "Supernatural", "Historical"],
      image: "/demonslayer.jpg.jpeg",
      totalEpisodes: 26,
      currentEpisode: 1
    },
    3: {
      id: 3,
      title: "Jujutsu Kaisen",
      description: "A high school student joins a secret organization of sorcerers to eliminate a powerful curse.",
      rating: 8.9,
      year: 2023,
      genre: ["Action", "Supernatural", "School"],
      image: "/jujutsu.jpg.jpeg",
      totalEpisodes: 24,
      currentEpisode: 1
    }
  };

  // Mock episode data
  const episodes = Array.from({ length: animeData[animeId]?.totalEpisodes || 25 }, (_, i) => ({
    id: i + 1,
    title: `Episode ${i + 1}`,
    description: `Episode ${i + 1} description`,
    duration: '24:30',
    isWatched: i < 5, // First 5 episodes are watched
    thumbnail: animeData[animeId]?.image || '/placeholder.jpg'
  }));

  // Mock server data
  const servers = [
    { id: 'server1', name: 'Server 1', quality: '1080p', status: 'active' },
    { id: 'server2', name: 'Server 2', quality: '720p', status: 'active' },
    { id: 'server3', name: 'Server 3', quality: '480p', status: 'active' },
    { id: 'server4', name: 'Server 4', quality: '1080p', status: 'maintenance' }
  ];

  const qualityOptions = ['1080p', '720p', '480p', '360p'];
  const currentAnime = animeData[animeId] || animeData[1];
  const currentEpisode = episodes[parseInt(episodeId || '1') - 1] || episodes[0];

  // Video controls
  const togglePlay = () => setIsPlaying(!isPlaying);
  const skipBackward = () => setCurrentTime(Math.max(0, currentTime - 10));
  const skipForward = () => setCurrentTime(Math.min(duration, currentTime + 10));
  const toggleMute = () => setIsMuted(!isMuted);

  // Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Auto-hide controls
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showControls]);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(-1)}
                  className="hover:bg-primary/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-foreground">{currentAnime.title}</h1>
                  <p className="text-sm text-muted-foreground">Episode {currentEpisode.id}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">{currentAnime.rating}</span>
                </div>
                <Badge variant="outline" className="border-primary text-primary">
                  {selectedQuality}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* ===== Responsive wrapper: stacks on mobile, row on md+ ===== */}
        <div className="flex flex-col md:flex-row">
          {/* Main Video Player */}
          <div className="flex-1">
            <div className="relative bg-black">
              {/* Video Container */}
              <div 
                className="relative aspect-video bg-black cursor-pointer"
                onMouseMove={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                {/* Placeholder Video */}
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">Video Player</p>
                    <p className="text-sm text-muted-foreground">Click to play</p>
                  </div>
                </div>

                {/* Video Controls Overlay */}
                <AnimatePresence>
                  {showControls && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"
                    >
                      {/* Top Controls */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-red-600 text-white">
                            LIVE
                          </Badge>
                          <span className="text-white text-sm">Episode {currentEpisode.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowSettings(!showSettings)}
                            className="text-white hover:bg-white/20"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/20"
                          >
                            <Maximize className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Center Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            size="lg"
                            onClick={togglePlay}
                            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white"
                          >
                            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                          </Button>
                        </motion.div>
                      </div>

                      {/* Bottom Controls */}
                      <div className="absolute bottom-4 left-4 right-4">
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <Slider
                            value={[currentTime]}
                            max={duration || 100}
                            step={1}
                            className="w-full"
                            onValueChange={(value) => setCurrentTime(value[0])}
                          />
                          <div className="flex justify-between text-xs text-white mt-1">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                          </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={skipBackward}
                              className="text-white hover:bg-white/20"
                            >
                              <SkipBack className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={togglePlay}
                              className="text-white hover:bg-white/20"
                            >
                              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={skipForward}
                              className="text-white hover:bg-white/20"
                            >
                              <SkipForward className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center gap-2 ml-4">
                              <Volume2 className="h-4 w-4 text-white" />
                              <Slider
                                value={[isMuted ? 0 : volume]}
                                max={100}
                                step={1}
                                className="w-20"
                                onValueChange={(value) => {
                                  setVolume(value[0]);
                                  setIsMuted(value[0] === 0);
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-white text-sm">10s</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={skipBackward}
                              className="text-white hover:bg-white/20"
                            >
                              <SkipBack className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={skipForward}
                              className="text-white hover:bg-white/20"
                            >
                              <SkipForward className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Settings Panel */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute top-12 right-4 bg-background/95 backdrop-blur-md border border-border rounded-lg p-4 w-64"
                    >
                      <h3 className="font-semibold mb-3">Settings</h3>
                      
                      {/* Quality Selection */}
                      <div className="mb-4">
                        <label className="text-sm font-medium mb-2 block">Quality</label>
                        <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {qualityOptions.map((quality) => (
                              <SelectItem key={quality} value={quality}>
                                {quality}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Server Selection */}
                      <div className="mb-4">
                        <label className="text-sm font-medium mb-2 block">Server</label>
                        <Select value={selectedServer} onValueChange={setSelectedServer}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {servers.map((server) => (
                              <SelectItem 
                                key={server.id} 
                                value={server.id}
                                disabled={server.status === 'maintenance'}
                              >
                                <div className="flex items-center gap-2">
                                  <Server className="h-4 w-4" />
                                  {server.name} ({server.quality})
                                  {server.status === 'maintenance' && (
                                    <Badge variant="destructive" className="text-xs">Maintenance</Badge>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Download Button */}
                      <Button className="w-full" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Episode
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {currentAnime.title} - Episode {currentEpisode.id}
                    </h2>
                    <p className="text-muted-foreground">{currentEpisode.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-primary text-primary">
                      {selectedQuality}
                    </Badge>
                    <Badge variant="secondary">
                      {currentEpisode.duration}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-accent" />
                    <span>{currentAnime.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{currentEpisode.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>2.5M views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Episode Sidebar (responsive) */}
          <div className="w-full md:w-80 bg-card border-t md:border-t-0 md:border-l border-border">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Episodes</h3>
              <p className="text-sm text-muted-foreground">{episodes.length} episodes</p>
            </div>
            
            <div className="max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-100px)] overflow-y-auto">
              {episodes.map((episode, index) => (
                <motion.div
                  key={episode.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className={`m-2 p-3 cursor-pointer transition-all hover:bg-primary/10 ${
                      episode.id === currentEpisode.id ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => navigate(`/stream/${animeId}/${episode.id}`)}
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={episode.thumbnail} 
                          alt={episode.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-foreground truncate">
                          {episode.title}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {episode.description}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">
                            {episode.duration}
                          </span>
                          {episode.isWatched && (
                            <Badge variant="secondary" className="text-xs">
                              Watched
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamingPage;

