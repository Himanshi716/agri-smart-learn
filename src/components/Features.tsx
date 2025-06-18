
import React from 'react';
import { Brain, BookOpen, Users, Camera, Award, TrendingUp } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "AI Plant Recognition",
      description: "Advanced machine learning models identify plants from photos with 95%+ accuracy",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Crop Database",
      description: "Detailed information on cultivation, climate, soil, pests, and best practices",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Brain,
      title: "Interactive Learning",
      description: "Flashcards, quizzes, and games to reinforce agricultural knowledge",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Teacher Integration",
      description: "Upload notes, create assignments, and track student progress",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Monitor learning progress with detailed analytics and achievements",
      color: "from-teal-500 to-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Smart Recommendations",
      description: "Personalized content suggestions based on learning patterns",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Powerful Features for Modern Agriculture Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Combining cutting-edge AI technology with comprehensive agricultural knowledge to create the ultimate learning platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Transform Agricultural Education?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of students and educators already using AgriMate to enhance their agricultural knowledge and skills.
            </p>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
