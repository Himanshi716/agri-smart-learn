
import React, { useState } from 'react';
import { BookOpen, Thermometer, Droplets, Bug, ShieldCheck, Leaf } from 'lucide-react';

interface CropInfoCardProps {
  crop: {
    crop_name: string;
    botanical_name: string;
    family: string;
    confidence: number;
    origin: string;
    climate: string;
    soil: string;
    seed_rate: string;
    spacing: string;
    fertilizer: {
      FYM: string;
      NPK: string;
    };
    sowing_method: string;
    pests: string[];
    diseases: string[];
    varieties: string[];
    uses: string[];
  };
}

const CropInfoCard: React.FC<CropInfoCardProps> = ({ crop }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'production', label: 'Production', icon: Leaf },
    { id: 'protection', label: 'Protection', icon: ShieldCheck },
    { id: 'varieties', label: 'Varieties', icon: Droplets }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
        <h2 className="text-2xl font-bold">{crop.crop_name}</h2>
        <p className="text-green-100 italic">{crop.botanical_name}</p>
        <p className="text-green-100 text-sm">Family: {crop.family}</p>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600 bg-green-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Thermometer className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Climate</h4>
                </div>
                <p className="text-blue-700">{crop.climate}</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Droplets className="h-5 w-5 text-amber-600" />
                  <h4 className="font-semibold text-amber-800">Soil Requirements</h4>
                </div>
                <p className="text-amber-700">{crop.soil}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Origin</h4>
              <p className="text-gray-600">{crop.origin}</p>
            </div>
          </div>
        )}

        {activeTab === 'production' && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Seed Rate</h4>
                <p className="text-green-700">{crop.seed_rate}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Spacing</h4>
                <p className="text-green-700">{crop.spacing}</p>
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">Sowing Method</h4>
              <p className="text-purple-700">{crop.sowing_method}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-3">Fertilizer Requirements</h4>
              <div className="space-y-2">
                <p className="text-orange-700"><strong>FYM:</strong> {crop.fertilizer.FYM}</p>
                <p className="text-orange-700"><strong>NPK:</strong> {crop.fertilizer.NPK}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'protection' && (
          <div className="space-y-4">
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-3 flex items-center space-x-2">
                <Bug className="h-5 w-5" />
                <span>Common Pests</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {crop.pests.map((pest, index) => (
                  <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    {pest}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5" />
                <span>Common Diseases</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {crop.diseases.map((disease, index) => (
                  <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                    {disease}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'varieties' && (
          <div className="space-y-4">
            <div className="bg-indigo-50 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-800 mb-3">Popular Varieties</h4>
              <div className="grid gap-2">
                {crop.varieties.map((variety, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span className="text-indigo-700">{variety}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-teal-50 rounded-lg p-4">
              <h4 className="font-semibold text-teal-800 mb-3">Uses & Applications</h4>
              <div className="grid gap-2">
                {crop.uses.map((use, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                    <span className="text-teal-700">{use}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropInfoCard;
