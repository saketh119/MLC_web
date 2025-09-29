"use client";

import { useState, useEffect } from "react";
import { Brain, Code2, Lightbulb, Play, BookOpen, Cpu, Zap } from "lucide-react";

const codeSnippets = [
  "import tensorflow as tf",
  "model = tf.keras.Sequential()",
  "model.add(Dense(128, activation='relu'))",
  "model.compile(optimizer='adam')",
];

const TechHeroSection = () => {
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentCodeIndex((prev) => (prev + 1) % codeSnippets.length);
        setIsTyping(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black overflow-hidden">

      {/* Animated Circuit Background */}
      <div className="absolute inset-0 circuit-pattern opacity-20"></div>

      {/* Floating Tech Elements */}
      <div className="absolute top-20 left-10 float-animation">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
          <Cpu className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="absolute top-40 right-20 float-animation" style={{ animationDelay: "1s" }}>
        <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
          <Zap className="w-6 h-6 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 float-animation" style={{ animationDelay: "2s" }}>
        <div className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center">
          <Brain className="w-7 h-7 text-secondary" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Main Interactive Sections */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* LEARN Section */}
          <div className="group relative">
            <div className="bg-black/80 rounded-2xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
              <div className="relative pulse-ring-animation mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
              </div>

              <h3 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                LEARN
              </h3>

              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Machine Learning Fundamentals</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Deep Learning Architectures</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-900">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Data Science Techniques</span>
                </div>
              </div>
            </div>
          </div>

          {/* CODE Section */}
          <div className="group relative">
            <div className="bg-black/80 rounded-2xl p-8 border border-white/10 hover:border-accent/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20">
              <div className="relative pulse-ring-animation mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto">
                  <Code2 className="w-10 h-10 text-white" />
                </div>
              </div>

              <h3 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                CODE
              </h3>

              {/* Interactive Code Display */}
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm border border-accent/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-accent">
                  <span className={`${isTyping ? "typing-animation" : ""}`}>{codeSnippets[currentCodeIndex]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* INNOVATE Section */}
          <div className="group relative">
            <div className="bg-black/80 rounded-2xl p-8 border border-white/10 hover:border-secondary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-secondary/20">
              <div className="relative pulse-ring-animation mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto">
                  <Lightbulb className="w-10 h-10 text-white" />
                </div>
              </div>

              <h3 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                INNOVATE
              </h3>

              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  <span>AI-Powered Solutions</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span>Research Projects</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-900">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Industry Partnerships</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Central Connecting Element */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            <div className="w-32 h-32 gradient-bg rounded-full flex items-center justify-center">
              <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center">
                <Brain className="w-12 h-12 text-primary animate-pulse" />
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-bounce">
              <Play className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xl text-muted-foreground mb-8">
            This isn&apos;t just a motto &mdash; it&apos;s our <span className="text-primary font-semibold">mission</span>.
          </p>

          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            Join the <span className="text-accent font-semibold">Best Technical Club</span> of VIT-AP, where curiosity
            meets innovation. Engage in hands-on learning, develop groundbreaking projects, and be part of a community
            that&apos;s shaping the future of <span className="text-secondary font-semibold">AI &amp; ML</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechHeroSection;
