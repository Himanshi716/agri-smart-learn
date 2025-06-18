
import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader, CheckCircle } from 'lucide-react';
import CropInfoCard from './CropInfoCard';

const PlantDetector = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedCrop, setDetectedCrop] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setDetectedCrop(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateDetection = () => {
    setIsDetecting(true);
    
    // Simulate AI detection delay
    setTimeout(() => {
      // Mock detection result
      const mockCrop = {
        crop_name: "Tomato",
        botanical_name: "Solanum lycopersicum",
        family: "Solanaceae",
        confidence: 94.2,
        origin: "Peru",
        climate: "20–25°C, sunny conditions",
        soil: "Well-drained loamy soil, pH 6.0-7.0",
        seed_rate: "300-400 gm/acre",
        spacing: "60x45 cm",
        fertilizer: {
          FYM: "20 tons/ha",
          NPK: "100:50:50 kg/ha"
        },
        sowing_method: "Transplanting method",
        pests: ["Fruit borer", "Whitefly", "Aphids"],
        diseases: ["Leaf curl virus", "Early blight"],
        varieties: ["Pusa Ruby", "Arka Rakshak", "Himsona"],
        uses: ["Fresh consumption", "Processing", "Sauce making"]
      };
      
      setDetectedCrop(mockCrop);
      setIsDetecting(false);
    }, 2000);
  };

  return (
    <section id="detector" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            AI-Powered Plant Identification
          </h2>
          <p className="text-xl text-gray-600">
            Upload a photo of any plant and get instant identification with detailed agricultural information
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center">
              {selectedImage ? (
                <div className="space-y-4">
                  <img 
                    src={selectedImage} 
                    alt="Selected plant" 
                    className="mx-auto max-h-64 rounded-lg shadow-md"
                  />
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Upload className="h-5 w-5" />
                      <span>Choose Different Image</span>
                    </button>
                    <button
                      onClick={simulateDetection}
                      disabled={isDetecting}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50"
                    >
                      {isDetecting ? (
                        <Loader className="h-5 w-5 animate-spin" />
                      ) : (
                        <Camera className="h-5 w-5" />
                      )}
                      <span>{isDetecting ? 'Detecting...' : 'Identify Plant'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <Camera className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Upload Plant Image</h3>
                  <p className="text-gray-600">
                    Take a clear photo of the plant's leaves, flowers, or fruits for best results
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Choose Image</span>
                  </button>
                </div>
              )}
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {isDetecting && (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="space-y-4">
                  <Loader className="h-12 w-12 text-green-500 animate-spin mx-auto" />
                  <h3 className="text-xl font-semibold text-gray-800">Analyzing Image...</h3>
                  <p className="text-gray-600">Our AI is identifying the plant and gathering agricultural data</p>
                </div>
              </div>
            )}

            {detectedCrop && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="font-semibold text-green-800">Plant Identified!</p>
                    <p className="text-green-600 text-sm">Confidence: {detectedCrop.confidence}%</p>
                  </div>
                </div>
                <CropInfoCard crop={detectedCrop} />
              </div>
            )}

            {!selectedImage && !isDetecting && !detectedCrop && (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <Book className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600">Ready to Learn</h3>
                  <p className="text-gray-500">
                    Upload an image to see detailed crop information, growing conditions, and agricultural best practices
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantDetector;
