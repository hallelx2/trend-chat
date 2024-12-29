import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Demo } from "@/components/sections/demo";
import { features, testimonials } from "@/data";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Pricing } from "@/components/sections/pricing";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiPlayCircle } from "react-icons/fi";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 px-6 py-24 sm:py-32">
          {/* Background Layer */}
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:30px_30px] [mask-image:linear-gradient(0deg,transparent,white)] z-0" />

          {/* Content Layer */}
          <div className="relative z-10 mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Talk to Trends.{" "}
              <span className="text-primary">Act Smarter.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Track, analyze, and chat with trends from niche online communities.
              Get actionable insights powered by <span className="font-bold text-blue-600">BrightData</span> and <span className="font-bold text-blue-600">AI</span>.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {/* Try TrendChat Now */}
              <Link href="/sign-up" passHref>
                <Button variant="default" className="cyberpunk-button px-6 py-3 rounded-full text-lg">
                  Try TrendChat Now
                </Button>
              </Link>
              {/* Watch Demo */}
              <Link href="#demo" passHref>
                <Button
                  variant="outline"
                  className="cyberpunk-button-outline px-6 py-3 rounded-full text-lg flex items-center gap-2"
                >
                  <FiPlayCircle className="text-lg" />
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>


        {/* Features Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Powerful Features for Smart Decisions
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Everything you need to stay ahead of trends and make data-driven decisions.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <FeatureCard
                    key={feature.title}
                    title={feature.title}
                    description={feature.description}
                    Icon={feature.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />
        <Demo />
        <Pricing />

        {/* Testimonials Section */}
        <section className="py-20 bg-background/50 backdrop-blur-md">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 neon-text">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.name}
                  quote={testimonial.quote}
                  name={testimonial.name}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 neon-text">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-foreground/80">
              Join TrendChat today and start making smarter, data-driven decisions for your business.
            </p>
            <Link href="/sign-up" passHref>
              <Button className="cyberpunk-button px-6 py-3 rounded-full text-lg hover:bg-primary/80 transition duration-300">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-accent/20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8 neon-text">Stay Updated</h2>
            <p className="text-center mb-8 text-foreground/80">
              Subscribe to our newsletter for the latest trends and insights.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email for newsletter subscription"
                  className="cyberpunk-input flex-grow px-4 py-2 rounded-l-md"
                />
                <button
                  type="submit"
                  className="cyberpunk-button px-6 py-2 rounded-r-md hover:bg-primary/80 transition duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
