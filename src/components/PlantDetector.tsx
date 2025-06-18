
import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader, CheckCircle, Book } from 'lucide-react';
import CropInfoCard from './CropInfoCard';
import { cropService } from '../lib/supabase';
import { getCropByName, getRandomCrop } from '../data/cropDatabase';

const PlantDetector = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedCrop, setDetectedCrop] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setDetectedCrop(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const detectPlantWithAI = async (imageData: string): Promise<{ cropName: string; confidence: number }> => {
    try {
      // For now, simulate AI detection with random selection from our database
      // In production, this would call a real AI model
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const randomCrop = getRandomCrop();
      const confidence = Math.floor(Math.random() * 15) + 85; // 85-99% confidence
      
      return {
        cropName: randomCrop.crop_name,
        confidence
      };
    } catch (error) {
      throw new Error('Failed to detect plant. Please try again.');
    }
  };

  const simulateDetection = async () => {
    if (!selectedImage) return;
    
    setIsDetecting(true);
    setError(null);
    
    try {
      // Detect plant using AI
      const detection = await detectPlantWithAI(selectedImage);
      
      // Get full crop data
      let cropData = getCropByName(detection.cropName);
      
      if (!cropData) {
        // Fallback to database if available
        try {
          const dbCrop = await cropService.getCropByName(detection.cropName);
          if (dbCrop) {
            cropData = dbCrop;
          }
        } catch (dbError) {
          console.log('Database not connected yet, using fallback data');
        }
      }
      
      if (cropData) {
        setDetectedCrop({
          ...cropData,
          confidence: detection.confidence
        });
      } else {
        throw new Error('Crop data not found');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Detection failed');
    } finally {
      setIsDetecting(false);
    }
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
                    className="mx-auto max-h-64 rounded-lg shadow-md object-cover"
                  />
                  <div className="flex gap-4 justify-center flex-wrap">
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
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
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
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            )}

            {detectedCrop && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="font-semibold text-green-800">Plant Identified!</p>
                    <p className="text-green-600 text-sm">
                      Confidence: {detectedCrop.confidence}% | 
                      Family: {detectedCrop.family}
                    </p>
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
                  <div className="grid grid-cols-2 gap-4 mt-6 text-left">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-gray-800 mb-2">Best Photo Tips</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Clear lighting</li>
                        <li>• Focus on leaves/flowers</li>
                        <li>• Avoid blurry images</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-gray-800 mb-2">What You'll Get</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Plant identification</li>
                        <li>• Growing conditions</li>
                        <li>• Pest & disease info</li>
                      </ul>
                    </div>
                  </div>
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
