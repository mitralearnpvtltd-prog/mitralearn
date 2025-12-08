import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  BookOpen,
  Code,
  Award,
  Zap,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Play,
  Star,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "60-Day Curriculum",
      description: "Structured learning path from Python basics to deep learning and deployment.",
    },
    {
      icon: Code,
      title: "Hands-On Coding",
      description: "Daily coding challenges and real-world projects to build your portfolio.",
    },
    {
      icon: Award,
      title: "Certification",
      description: "Earn a verified certificate upon completion to showcase your skills.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Visual progress dashboard with streaks, scores, and achievements.",
    },
    {
      icon: Users,
      title: "Internship Ready",
      description: "Designed to prepare you for data science internships and entry-level roles.",
    },
    {
      icon: Zap,
      title: "Daily Quizzes",
      description: "Reinforce your learning with quick quizzes after each lesson.",
    },
  ];

  const curriculum = [
    { week: 1, title: "Python Foundations", topics: ["Variables", "Control Flow", "Functions", "OOP"] },
    { week: 2, title: "NumPy & Pandas", topics: ["Arrays", "DataFrames", "Data Cleaning", "Aggregations"] },
    { week: 3, title: "Data Visualization", topics: ["Matplotlib", "Seaborn", "Plotly", "Dashboards"] },
    { week: 4, title: "Statistics", topics: ["Probability", "Distributions", "Hypothesis Testing", "A/B Testing"] },
    { week: 5, title: "ML Fundamentals", topics: ["Regression", "Classification", "Model Evaluation", "Feature Engineering"] },
    { week: 6, title: "Advanced ML", topics: ["Ensemble Methods", "Trees", "SVM", "Clustering"] },
    { week: 7, title: "Deep Learning & NLP", topics: ["Neural Networks", "TensorFlow", "NLP", "Transformers"] },
    { week: 8, title: "Capstone & Career", topics: ["Final Project", "Portfolio", "Resume", "Interviews"] },
  ];

  const testimonials = [
    {
      name: "Priya S.",
      role: "Data Analyst at TechCorp",
      quote: "Silk Miltra gave me the structured learning path I needed. Got my first data job within 3 months!",
      rating: 5,
    },
    {
      name: "Rahul M.",
      role: "ML Engineer Intern",
      quote: "The hands-on projects and daily challenges really prepared me for real-world problems.",
      rating: 5,
    },
    {
      name: "Ananya K.",
      role: "Data Science Student",
      quote: "Best investment in my career. The certification helped me stand out in applications.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <Badge className="mb-6 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 backdrop-blur-sm">
            <Zap className="w-3 h-3 mr-1" />
            60-Day Internship Prep Program
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground mb-6 leading-tight">
            Become a{" "}
            <span className="text-gradient-secondary">Data Scientist</span>
            <br />in 60 Days
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Master Python, Machine Learning, and Deep Learning with our comprehensive,
            beginner-friendly curriculum. Get certified and land your dream internship.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/curriculum">
              <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                <Play className="w-5 h-5" />
                Start Learning Free
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="heroOutline" size="xl" className="gap-2 w-full sm:w-auto">
                Sign In
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-primary-foreground/70 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>60 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>200+ Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>50+ Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Verified Certificate</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed to take you from complete beginner to internship-ready
              data scientist with structured learning and hands-on practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Curriculum</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              8 Weeks of Structured Learning
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our curriculum is carefully designed to build your skills progressively,
              from fundamentals to advanced topics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {curriculum.map((week) => (
              <Card key={week.week} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground">
                      {week.week}
                    </div>
                    <h3 className="font-display font-bold">{week.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {week.topics.map((topic, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/curriculum">
              <Button variant="default" size="lg" className="gap-2">
                View Full Curriculum
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Loved by Learners
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-display font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Start Your Data Science Journey?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Join thousands of learners who have transformed their careers with Silk Miltra.
            Start learning today – it's free to begin.
          </p>
          <Link to="/curriculum">
            <Button variant="hero" size="xl" className="gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Start Day 1 Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-lg">Silk Miltra</span>
                <span className="text-xs text-muted-foreground block">By Innovkaro</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Silk Miltra by Innovkaro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
