
import { Database } from '../types/database';

type CropInsert = Database['public']['Tables']['crops']['Insert'];

export const cropDatabase: CropInsert[] = [
  {
    crop_name: "Tomato",
    botanical_name: "Solanum lycopersicum",
    family: "Solanaceae",
    origin: "Peru",
    climate: "20–25°C, sunny conditions with moderate humidity",
    soil: "Well-drained loamy soil, pH 6.0-7.0",
    seed_rate: "300-400 gm/acre",
    spacing: "60x45 cm",
    fertilizer: {
      FYM: "20 tons/ha",
      NPK: "100:50:50 kg/ha"
    },
    sowing_method: "Transplanting method",
    pests: ["Fruit borer", "Whitefly", "Aphids", "Cutworm"],
    diseases: ["Leaf curl virus", "Early blight", "Late blight", "Bacterial wilt"],
    varieties: ["Pusa Ruby", "Arka Rakshak", "Himsona", "Punjab Chhuhara"],
    uses: ["Fresh consumption", "Processing", "Sauce making", "Puree production"]
  },
  {
    crop_name: "Wheat",
    botanical_name: "Triticum aestivum",
    family: "Poaceae",
    origin: "Middle East",
    climate: "15-20°C during growing season, cool and moist conditions",
    soil: "Well-drained fertile loam, pH 6.0-7.5",
    seed_rate: "100-125 kg/ha",
    spacing: "20-25 cm between rows",
    fertilizer: {
      FYM: "10-15 tons/ha",
      NPK: "120:60:40 kg/ha"
    },
    sowing_method: "Broadcasting or drilling",
    pests: ["Aphids", "Termites", "Army worm", "Shoot fly"],
    diseases: ["Rust", "Smut", "Bunt", "Leaf blight"],
    varieties: ["HD-2967", "PBW-343", "WH-147", "DBW-17"],
    uses: ["Food grain", "Flour production", "Animal feed", "Straw for cattle"]
  },
  {
    crop_name: "Rice",
    botanical_name: "Oryza sativa",
    family: "Poaceae",
    origin: "Asia",
    climate: "20-25°C, high humidity, abundant water supply",
    soil: "Clay loam with good water retention, pH 5.5-6.5",
    seed_rate: "20-25 kg/ha",
    spacing: "20x15 cm",
    fertilizer: {
      FYM: "12-15 tons/ha",
      NPK: "80:40:40 kg/ha"
    },
    sowing_method: "Transplanting in puddled field",
    pests: ["Stem borer", "Brown plant hopper", "Leaf folder", "Gall midge"],
    diseases: ["Blast", "Bacterial blight", "Sheath blight", "Brown spot"],
    varieties: ["IR-64", "Pusa Basmati-1", "Swarna", "MTU-7029"],
    uses: ["Staple food", "Rice flour", "Animal feed", "Industrial use"]
  },
  {
    crop_name: "Potato",
    botanical_name: "Solanum tuberosum",
    family: "Solanaceae",
    origin: "South America",
    climate: "15-20°C, cool and humid conditions",
    soil: "Well-drained sandy loam, pH 5.2-6.4",
    seed_rate: "25-30 quintals/ha",
    spacing: "60x20 cm",
    fertilizer: {
      FYM: "20-25 tons/ha",
      NPK: "180:80:100 kg/ha"
    },
    sowing_method: "Planting of seed tubers",
    pests: ["Colorado beetle", "Aphids", "Cutworm", "White grub"],
    diseases: ["Late blight", "Early blight", "Black scurf", "Common scab"],
    varieties: ["Kufri Chandramukhi", "Kufri Jyoti", "Kufri Pukhraj", "Kufri Bahar"],
    uses: ["Vegetable", "Processing", "Starch production", "Chips making"]
  },
  {
    crop_name: "Maize",
    botanical_name: "Zea mays",
    family: "Poaceae",
    origin: "Mexico",
    climate: "20-30°C, warm and humid conditions",
    soil: "Well-drained fertile loam, pH 6.0-7.5",
    seed_rate: "20-25 kg/ha",
    spacing: "60x25 cm",
    fertilizer: {
      FYM: "15-20 tons/ha",
      NPK: "120:60:40 kg/ha"
    },
    sowing_method: "Direct seeding",
    pests: ["Stem borer", "Fall army worm", "Shoot fly", "Pink borer"],
    diseases: ["Leaf blight", "Downy mildew", "Common rust", "Stalk rot"],
    varieties: ["HQPM-1", "Vivek QPM-9", "DHM-117", "Bio-9681"],
    uses: ["Food grain", "Animal feed", "Industrial use", "Popcorn"]
  },
  {
    crop_name: "Cotton",
    botanical_name: "Gossypium hirsutum",
    family: "Malvaceae",
    origin: "India and Mexico",
    climate: "21-27°C, warm and humid with adequate rainfall",
    soil: "Deep fertile soil, pH 6.0-8.0",
    seed_rate: "12-15 kg/ha",
    spacing: "90x45 cm",
    fertilizer: {
      FYM: "15-20 tons/ha",
      NPK: "80:40:40 kg/ha"
    },
    sowing_method: "Direct seeding",
    pests: ["Bollworm", "Whitefly", "Aphids", "Thrips"],
    diseases: ["Leaf curl virus", "Bacterial blight", "Verticillium wilt", "Fusarium wilt"],
    varieties: ["Bt Cotton varieties", "RCH-2", "MRC-6301", "Ankur-651"],
    uses: ["Textile fiber", "Cottonseed oil", "Animal feed", "Medical cotton"]
  },
  {
    crop_name: "Sugarcane",
    botanical_name: "Saccharum officinarum",
    family: "Poaceae",
    origin: "Southeast Asia",
    climate: "20-26°C, high humidity, abundant water",
    soil: "Deep fertile soil, pH 6.5-7.5",
    seed_rate: "40,000-50,000 setts/ha",
    spacing: "90-120 cm between rows",
    fertilizer: {
      FYM: "25-30 tons/ha",
      NPK: "280:80:80 kg/ha"
    },
    sowing_method: "Planting of setts",
    pests: ["Early shoot borer", "Top borer", "Root borer", "Pyrilla"],
    diseases: ["Red rot", "Smut", "Wilt", "Mosaic"],
    varieties: ["Co-86032", "CoM-0265", "Co-238", "CoLk-94184"],
    uses: ["Sugar production", "Jaggery", "Ethanol", "Bagasse for paper"]
  },
  {
    crop_name: "Soybean",
    botanical_name: "Glycine max",
    family: "Fabaceae",
    origin: "East Asia",
    climate: "20-30°C, moderate rainfall",
    soil: "Well-drained loamy soil, pH 6.0-7.0",
    seed_rate: "75-80 kg/ha",
    spacing: "30x5 cm",
    fertilizer: {
      FYM: "10-15 tons/ha",
      NPK: "30:60:40 kg/ha"
    },
    sowing_method: "Direct seeding",
    pests: ["Stem fly", "Leaf miner", "Pod borer", "Aphids"],
    diseases: ["Rust", "Bacterial blight", "Charcoal rot", "Purple seed stain"],
    varieties: ["JS-335", "MACS-450", "PK-416", "Bragg"],
    uses: ["Oil production", "Protein meal", "Food products", "Animal feed"]
  }
];

export const getRandomCrop = (): CropInsert => {
  return cropDatabase[Math.floor(Math.random() * cropDatabase.length)];
};

export const getCropByName = (name: string): CropInsert | undefined => {
  return cropDatabase.find(crop => 
    crop.crop_name.toLowerCase() === name.toLowerCase()
  );
};
