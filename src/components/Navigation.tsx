
import React from 'react';
import { Book, Camera, Users, Brain } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              AgriMate
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#detect" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <Camera className="h-4 w-4" />
              <span>Plant ID</span>
            </a>
            <a href="#learn" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <Book className="h-4 w-4" />
              <span>Learn</span>
            </a>
            <a href="#quiz" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <Brain className="h-4 w-4" />
              <span>Quiz</span>
            </a>
            <a href="#teachers" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <Users className="h-4 w-4" />
              <span>Teachers</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
