
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Smart Agriculture
          </span>
          <br />
          <span className="text-gray-800">Learning Platform</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Identify plants instantly with AI, access comprehensive crop knowledge, 
          practice with interactive quizzes, and enhance your agricultural education journey.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button 
            onClick={() => document.getElementById('detector')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Plant Detection
          </button>
          <button className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-200">
            Explore Features
          </button>
        </div>
        
        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-green-500 mx-auto" />
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
