
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import PlantDetector from '../components/PlantDetector';
import Features from '../components/Features';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      <Hero />
      <PlantDetector />
      <Features />
    </div>
  );
};

export default Index;
