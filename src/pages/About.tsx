import { Heart, Users, Zap, Shield, Globe, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

const About = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Streaming',
      description: 'Experience ultra-fast streaming with our advanced CDN technology and optimized video delivery.',
    },
    {
      icon: Shield,
      title: 'Ad-Free Experience',
      description: 'Enjoy uninterrupted anime viewing without any advertisements or pop-ups.',
    },
    {
      icon: Globe,
      title: 'Multiple Languages',
      description: 'Watch anime with subtitles in multiple languages or dubbed versions.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join millions of anime fans worldwide and discover new shows through community recommendations.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Anime Series' },
    { number: '50,000+', label: 'Episodes' },
    { number: '5M+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
  ];

  const team = [
    { name: 'shaheer azam', role: 'Founder & CEO', specialty: 'Anime Enthusiast' },
    { name: 'hamza azam ', role: 'CTO', specialty: 'Tech Wizard' },
    { name: 'bobo khan', role: 'Head of Content', specialty: 'Curator' },
    { name: 'saturo gojo', role: 'Community Manager', specialty: 'Fan Advocate' },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 hero-gradient opacity-20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold hero-gradient bg-clip-text  mb-6">
                About INZ.ANIME
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Your ultimate destination for premium anime streaming. We're passionate about bringing the best anime content to fans worldwide.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                <Badge className="bg-primary text-primary-foreground">Premium Quality</Badge>
                <Badge className="bg-secondary text-secondary-foreground">Global Community</Badge>
                <Badge className="bg-accent text-accent-foreground">24/7 Support</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="p-8 md:p-12 card-gradient border-border card-shadow">
              <div className="text-center max-w-3xl mx-auto">
                <Heart className="h-16 w-16 mx-auto mb-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At INZ.ANIME, we believe that anime is more than just entertainment—it's a bridge between cultures, 
                  a source of inspiration, and a community that brings people together. Our mission is to provide the 
                  highest quality anime streaming experience while fostering a global community of anime enthusiasts.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold hero-gradient bg-clip-text  mb-4">
                Why Choose INZ.ANIME?
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover what makes us the preferred choice for anime lovers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={feature.title}
                  className="p-6 card-gradient border-border anime-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Impact
              </h2>
              <p className="text-lg text-muted-foreground">
                Numbers that showcase our commitment to the anime community
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl md:text-5xl font-bold hero-gradient bg-clip-text  mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold hero-gradient bg-clip-text  mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground">
                The passionate individuals behind INZ.ANIME
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card
                  key={member.name}
                  className="p-6 text-center card-gradient border-border anime-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground font-medium mb-1">
                    {member.role}
                  </p>
                  <Badge variant="outline" className="border-primary/50 text-primary text-xs">
                    {member.specialty}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="p-8 md:p-12 text-center card-gradient border-border card-shadow">
              <Star className="h-16 w-16 mx-auto mb-6 text-primary animate-glow-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Join the INZ.ANIME Community
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Ready to dive into the world of premium anime streaming? 
                Join millions of anime fans and start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="button-gradient button-shadow">
                  Start Watching Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Learn More
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;