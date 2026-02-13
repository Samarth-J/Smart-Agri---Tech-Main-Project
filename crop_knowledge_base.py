"""
Fast crop knowledge base for instant responses
"""

CROP_DATABASE = {
    "rice": {
        "soil_requirements": [
            "Nitrogen (N): 80-120 kg/ha",
            "Phosphorus (P): 40-60 kg/ha",
            "Potassium (K): 40-60 kg/ha",
            "pH Level: 5.5-7.0 (slightly acidic to neutral)",
            "Soil Type: Clay loam or silty clay loam with good water retention"
        ],
        "climate_requirements": [
            "Temperature: 20-35°C (optimal 25-30°C)",
            "Humidity: 70-80% (high humidity preferred)",
            "Rainfall: 1000-2000 mm annually",
            "Season: Kharif (June-November) and Rabi (November-April)"
        ],
        "growing_tips": [
            "Maintain 5-10 cm standing water during vegetative stage",
            "Transplant seedlings at 20-25 days after sowing",
            "Apply nitrogen in 3 splits: basal, tillering, and panicle initiation"
        ],
        "harvest_info": [
            "Growing Duration: 120-150 days",
            "Best Harvest Time: When 80-85% of grains turn golden yellow",
            "Expected Yield: 4-6 tons/ha"
        ]
    },
    "wheat": {
        "soil_requirements": [
            "Nitrogen (N): 100-150 kg/ha",
            "Phosphorus (P): 50-60 kg/ha",
            "Potassium (K): 40-50 kg/ha",
            "pH Level: 6.0-7.5 (neutral to slightly alkaline)",
            "Soil Type: Well-drained loamy soil"
        ],
        "climate_requirements": [
            "Temperature: 10-25°C (optimal 20-25°C)",
            "Humidity: 50-60% (moderate humidity)",
            "Rainfall: 450-650 mm during growing season",
            "Season: Rabi (October-March)"
        ],
        "growing_tips": [
            "Sow seeds at 5-6 cm depth with 20-23 cm row spacing",
            "First irrigation at 20-25 days after sowing (crown root stage)",
            "Apply nitrogen in 3 splits for better utilization"
        ],
        "harvest_info": [
            "Growing Duration: 110-130 days",
            "Best Harvest Time: When moisture content is 20-25%",
            "Expected Yield: 4-5 tons/ha"
        ]
    },
    "maize": {
        "soil_requirements": [
            "Nitrogen (N): 120-150 kg/ha",
            "Phosphorus (P): 60-80 kg/ha",
            "Potassium (K): 40-60 kg/ha",
            "pH Level: 5.5-7.5 (slightly acidic to neutral)",
            "Soil Type: Well-drained sandy loam to clay loam"
        ],
        "climate_requirements": [
            "Temperature: 21-27°C (optimal 25°C)",
            "Humidity: 50-70%",
            "Rainfall: 500-800 mm well distributed",
            "Season: Kharif (June-September) and Rabi (October-February)"
        ],
        "growing_tips": [
            "Plant seeds 5-7 cm deep with 60-75 cm row spacing",
            "Ensure adequate moisture during tasseling and silking stages",
            "Control weeds in first 30-40 days for better yield"
        ],
        "harvest_info": [
            "Growing Duration: 80-110 days",
            "Best Harvest Time: When kernels are hard and moisture is 20-25%",
            "Expected Yield: 5-7 tons/ha"
        ]
    },
    "tomato": {
        "soil_requirements": [
            "Nitrogen (N): 120-180 kg/ha",
            "Phosphorus (P): 60-90 kg/ha",
            "Potassium (K): 150-200 kg/ha",
            "pH Level: 6.0-7.0 (slightly acidic to neutral)",
            "Soil Type: Well-drained sandy loam with high organic matter"
        ],
        "climate_requirements": [
            "Temperature: 18-27°C (optimal 21-24°C)",
            "Humidity: 60-80%",
            "Rainfall: 600-800 mm annually",
            "Season: Year-round in controlled conditions, best in winter"
        ],
        "growing_tips": [
            "Transplant seedlings at 4-5 week stage",
            "Provide support with stakes or cages for indeterminate varieties",
            "Mulch to conserve moisture and prevent soil-borne diseases"
        ],
        "harvest_info": [
            "Growing Duration: 70-90 days from transplanting",
            "Best Harvest Time: When fruits are fully colored and firm",
            "Expected Yield: 25-40 tons/ha"
        ]
    },
    "potato": {
        "soil_requirements": [
            "Nitrogen (N): 100-150 kg/ha",
            "Phosphorus (P): 80-100 kg/ha",
            "Potassium (K): 100-150 kg/ha",
            "pH Level: 5.0-6.5 (slightly acidic)",
            "Soil Type: Well-drained sandy loam to loamy soil"
        ],
        "climate_requirements": [
            "Temperature: 15-25°C (optimal 18-20°C)",
            "Humidity: 60-80%",
            "Rainfall: 500-700 mm well distributed",
            "Season: Rabi (October-January) and Kharif (July-September)"
        ],
        "growing_tips": [
            "Plant seed tubers 5-7 cm deep with 50-60 cm row spacing",
            "Earth up (hilling) at 30 and 45 days after planting",
            "Ensure consistent moisture, avoid waterlogging"
        ],
        "harvest_info": [
            "Growing Duration: 90-120 days",
            "Best Harvest Time: When foliage turns yellow and dies back",
            "Expected Yield: 20-30 tons/ha"
        ]
    },
    "cotton": {
        "soil_requirements": [
            "Nitrogen (N): 100-120 kg/ha",
            "Phosphorus (P): 50-60 kg/ha",
            "Potassium (K): 50-60 kg/ha",
            "pH Level: 6.0-8.0 (neutral to slightly alkaline)",
            "Soil Type: Deep, well-drained black cotton soil"
        ],
        "climate_requirements": [
            "Temperature: 21-30°C (optimal 25-30°C)",
            "Humidity: 50-70%",
            "Rainfall: 500-1000 mm during growing season",
            "Season: Kharif (May-October)"
        ],
        "growing_tips": [
            "Sow seeds 3-5 cm deep with 60-90 cm row spacing",
            "First irrigation at square formation stage",
            "Remove early formed squares to promote vegetative growth"
        ],
        "harvest_info": [
            "Growing Duration: 150-180 days",
            "Best Harvest Time: When bolls are fully opened and dry",
            "Expected Yield: 2-3 tons/ha (seed cotton)"
        ]
    },
    "sugarcane": {
        "soil_requirements": [
            "Nitrogen (N): 200-250 kg/ha",
            "Phosphorus (P): 80-100 kg/ha",
            "Potassium (K): 100-150 kg/ha",
            "pH Level: 6.5-7.5 (neutral)",
            "Soil Type: Deep, well-drained loamy soil"
        ],
        "climate_requirements": [
            "Temperature: 20-35°C (optimal 26-32°C)",
            "Humidity: 70-80% (high humidity)",
            "Rainfall: 1500-2500 mm annually",
            "Season: Year-round crop, planted Feb-March or Oct-Nov"
        ],
        "growing_tips": [
            "Plant 2-3 budded setts in furrows 75-90 cm apart",
            "Ensure adequate moisture during germination and tillering",
            "Apply nitrogen in 3-4 splits throughout growing season"
        ],
        "harvest_info": [
            "Growing Duration: 10-18 months",
            "Best Harvest Time: When sugar content reaches 18-20%",
            "Expected Yield: 70-100 tons/ha"
        ]
    },
    "banana": {
        "soil_requirements": [
            "Nitrogen (N): 200-300 kg/ha",
            "Phosphorus (P): 60-90 kg/ha",
            "Potassium (K): 300-400 kg/ha",
            "pH Level: 6.0-7.5 (slightly acidic to neutral)",
            "Soil Type: Deep, well-drained loamy soil rich in organic matter"
        ],
        "climate_requirements": [
            "Temperature: 15-35°C (optimal 27-30°C)",
            "Humidity: 75-85% (high humidity)",
            "Rainfall: 1000-1500 mm well distributed",
            "Season: Year-round in tropical regions"
        ],
        "growing_tips": [
            "Plant suckers at 1.8-2.0 m spacing",
            "Mulch heavily to conserve moisture and suppress weeds",
            "Provide wind protection and support for heavy bunches"
        ],
        "harvest_info": [
            "Growing Duration: 11-15 months",
            "Best Harvest Time: When fruits are 75% mature (green)",
            "Expected Yield: 30-50 tons/ha"
        ]
    },
    "mango": {
        "soil_requirements": [
            "Nitrogen (N): 500-1000 g/tree/year",
            "Phosphorus (P): 250-500 g/tree/year",
            "Potassium (K): 500-1000 g/tree/year",
            "pH Level: 5.5-7.5 (slightly acidic to neutral)",
            "Soil Type: Deep, well-drained sandy loam to clay loam"
        ],
        "climate_requirements": [
            "Temperature: 24-30°C (optimal 27°C)",
            "Humidity: 50-70%",
            "Rainfall: 750-2500 mm annually with dry period for flowering",
            "Season: Flowering in winter, fruiting in summer"
        ],
        "growing_tips": [
            "Plant grafted saplings at 8-10 m spacing",
            "Prune to maintain tree height and shape",
            "Apply paclobutrazol for regular bearing in off-season"
        ],
        "harvest_info": [
            "Growing Duration: 3-5 years to first harvest (from planting)",
            "Best Harvest Time: When fruits develop characteristic color",
            "Expected Yield: 100-200 kg/tree (mature tree)"
        ]
    },
    "onion": {
        "soil_requirements": [
            "Nitrogen (N): 100-120 kg/ha",
            "Phosphorus (P): 50-60 kg/ha",
            "Potassium (K): 60-80 kg/ha",
            "pH Level: 6.0-7.0 (neutral)",
            "Soil Type: Well-drained sandy loam to clay loam"
        ],
        "climate_requirements": [
            "Temperature: 13-24°C (optimal 20-25°C)",
            "Humidity: 60-70%",
            "Rainfall: 650-750 mm",
            "Season: Kharif (June-October) and Rabi (November-February)"
        ],
        "growing_tips": [
            "Transplant seedlings at 45-50 days after sowing",
            "Maintain consistent moisture, avoid waterlogging",
            "Stop irrigation 10-15 days before harvest for better storage"
        ],
        "harvest_info": [
            "Growing Duration: 120-150 days",
            "Best Harvest Time: When tops fall over and dry",
            "Expected Yield: 20-30 tons/ha"
        ]
    },
    "carrot": {
        "soil_requirements": [
            "Nitrogen (N): 80-100 kg/ha",
            "Phosphorus (P): 50-60 kg/ha",
            "Potassium (K): 80-100 kg/ha",
            "pH Level: 6.0-7.0 (neutral)",
            "Soil Type: Deep, loose, well-drained sandy loam"
        ],
        "climate_requirements": [
            "Temperature: 16-20°C (cool season crop)",
            "Humidity: 60-70%",
            "Rainfall: 600-750 mm",
            "Season: Rabi (October-February)"
        ],
        "growing_tips": [
            "Sow seeds directly 1-2 cm deep with 5-7 cm spacing",
            "Thin seedlings to 5-7 cm apart after germination",
            "Keep soil consistently moist but not waterlogged"
        ],
        "harvest_info": [
            "Growing Duration: 90-120 days",
            "Best Harvest Time: When roots reach desired size (2-3 cm diameter)",
            "Expected Yield: 20-30 tons/ha"
        ]
    },
    "broccoli": {
        "soil_requirements": [
            "Nitrogen (N): 120-150 kg/ha",
            "Phosphorus (P): 60-80 kg/ha",
            "Potassium (K): 80-100 kg/ha",
            "pH Level: 6.0-7.0 (slightly acidic to neutral)",
            "Soil Type: Well-drained loamy soil rich in organic matter"
        ],
        "climate_requirements": [
            "Temperature: 15-20°C (cool season crop)",
            "Humidity: 60-80%",
            "Rainfall: 600-800 mm",
            "Season: Rabi (October-March)"
        ],
        "growing_tips": [
            "Transplant seedlings at 4-5 week stage with 45-60 cm spacing",
            "Provide consistent moisture throughout growing period",
            "Harvest main head before flowers open, side shoots will continue"
        ],
        "harvest_info": [
            "Growing Duration: 70-100 days from transplanting",
            "Best Harvest Time: When heads are tight and compact",
            "Expected Yield: 10-15 tons/ha"
        ]
    },
    "cauliflower": {
        "soil_requirements": [
            "Nitrogen (N): 120-150 kg/ha",
            "Phosphorus (P): 60-80 kg/ha",
            "Potassium (K): 80-100 kg/ha",
            "pH Level: 6.0-7.0 (neutral)",
            "Soil Type: Well-drained loamy soil with high organic content"
        ],
        "climate_requirements": [
            "Temperature: 15-20°C (cool season crop)",
            "Humidity: 60-80%",
            "Rainfall: 600-800 mm",
            "Season: Rabi (October-March)"
        ],
        "growing_tips": [
            "Transplant at 4-5 week stage with 45-60 cm spacing",
            "Tie outer leaves over curd to protect from sun (blanching)",
            "Maintain consistent moisture for quality curd development"
        ],
        "harvest_info": [
            "Growing Duration: 60-90 days from transplanting",
            "Best Harvest Time: When curds are compact and white",
            "Expected Yield: 15-20 tons/ha"
        ]
    },
    "cabbage": {
        "soil_requirements": [
            "Nitrogen (N): 100-150 kg/ha",
            "Phosphorus (P): 60-80 kg/ha",
            "Potassium (K): 80-100 kg/ha",
            "pH Level: 6.0-7.5 (neutral)",
            "Soil Type: Well-drained loamy soil"
        ],
        "climate_requirements": [
            "Temperature: 15-20°C (cool season crop)",
            "Humidity: 60-80%",
            "Rainfall: 600-800 mm",
            "Season: Rabi (October-March)"
        ],
        "growing_tips": [
            "Transplant at 4-5 week stage with 45-60 cm spacing",
            "Ensure consistent moisture for head formation",
            "Control aphids and caterpillars regularly"
        ],
        "harvest_info": [
            "Growing Duration: 70-120 days from transplanting",
            "Best Harvest Time: When heads are firm and solid",
            "Expected Yield: 30-50 tons/ha"
        ]
    },
    "chilli": {
        "soil_requirements": [
            "Nitrogen (N): 100-120 kg/ha",
            "Phosphorus (P): 50-60 kg/ha",
            "Potassium (K): 60-80 kg/ha",
            "pH Level: 6.0-7.0 (neutral)",
            "Soil Type: Well-drained sandy loam to clay loam"
        ],
        "climate_requirements": [
            "Temperature: 20-30°C (warm season crop)",
            "Humidity: 60-80%",
            "Rainfall: 600-1000 mm",
            "Season: Kharif (June-October) and Summer (February-May)"
        ],
        "growing_tips": [
            "Transplant at 4-5 week stage with 45-60 cm spacing",
            "Mulch to conserve moisture and control weeds",
            "Multiple pickings increase total yield"
        ],
        "harvest_info": [
            "Growing Duration: 150-180 days",
            "Best Harvest Time: Green or red stage depending on market",
            "Expected Yield: 10-15 tons/ha (green), 2-3 tons/ha (dry)"
        ]
    },
    "cucumber": {
        "soil_requirements": [
            "Nitrogen (N): 80-100 kg/ha",
            "Phosphorus (P): 50-60 kg/ha",
            "Potassium (K): 60-80 kg/ha",
            "pH Level: 6.0-7.0 (neutral)",
            "Soil Type: Well-drained sandy loam rich in organic matter"
        ],
        "climate_requirements": [
            "Temperature: 18-24°C (warm season crop)",
            "Humidity: 60-80%",
            "Rainfall: 600-800 mm",
            "Season: Summer (February-May) and Rainy (June-September)"
        ],
        "growing_tips": [
            "Sow seeds directly or transplant at 2-3 week stage",
            "Provide trellis support for better fruit quality",
            "Harvest regularly to encourage continuous production"
        ],
        "harvest_info": [
            "Growing Duration: 50-70 days",
            "Best Harvest Time: When fruits are tender and green",
            "Expected Yield: 15-25 tons/ha"
        ]
    },
    "pumpkin": {
        "soil_requirements": [
            "Nitrogen (N): 80-100 kg/ha",
            "Phosphorus (P): 50-60 kg/ha",
            "Potassium (K): 60-80 kg/ha",
            "pH Level: 6.0-7.0 (neutral)",
            "Soil Type: Well-drained sandy loam with high organic matter"
        ],
        "climate_requirements": [
            "Temperature: 18-27°C (warm season crop)",
            "Humidity: 50-70%",
            "Rainfall: 600-800 mm",
            "Season: Summer (February-May) and Rainy (June-September)"
        ],
        "growing_tips": [
            "Sow seeds directly in pits with 2-3 m spacing",
            "Pinch growing tips to encourage branching",
            "Turn fruits occasionally for uniform ripening"
        ],
        "harvest_info": [
            "Growing Duration: 90-120 days",
            "Best Harvest Time: When skin is hard and color is deep",
            "Expected Yield: 20-30 tons/ha"
        ]
    },
    "watermelon": {
        "soil_requirements": [
            "Nitrogen (N): 80-100 kg/ha",
            "Phosphorus (P): 50-60 kg/ha",
            "Potassium (K): 80-100 kg/ha",
            "pH Level: 6.0-7.0 (neutral)",
            "Soil Type: Well-drained sandy loam"
        ],
        "climate_requirements": [
            "Temperature: 24-30°C (warm season crop)",
            "Humidity: 50-70%",
            "Rainfall: 500-700 mm",
            "Season: Summer (February-May)"
        ],
        "growing_tips": [
            "Sow seeds directly with 2-3 m spacing between plants",
            "Mulch with straw to prevent fruit rot",
            "Reduce watering as fruits mature for better sweetness"
        ],
        "harvest_info": [
            "Growing Duration: 80-100 days",
            "Best Harvest Time: When tendril near fruit dries and bottom turns yellow",
            "Expected Yield: 25-35 tons/ha"
        ]
    },
    "grapes": {
        "soil_requirements": [
            "Nitrogen (N): 40-60 kg/ha/year",
            "Phosphorus (P): 40-60 kg/ha/year",
            "Potassium (K): 60-80 kg/ha/year",
            "pH Level: 6.5-7.5 (neutral to slightly alkaline)",
            "Soil Type: Well-drained sandy loam to clay loam"
        ],
        "climate_requirements": [
            "Temperature: 15-35°C (optimal 25-30°C)",
            "Humidity: 50-70%",
            "Rainfall: 650-1000 mm with dry period during ripening",
            "Season: Perennial, fruiting in summer"
        ],
        "growing_tips": [
            "Plant grafted vines at 3-4 m spacing",
            "Prune annually for better fruit quality",
            "Provide trellis support and train vines properly"
        ],
        "harvest_info": [
            "Growing Duration: 2-3 years to first harvest",
            "Best Harvest Time: When sugar content reaches 16-18 Brix",
            "Expected Yield: 15-25 tons/ha"
        ]
    }
}

def get_crop_requirements(crop_name):
    """
    Get crop requirements instantly from knowledge base
    Returns dict with status and crop data
    """
    crop_name = crop_name.lower().strip()
    
    if crop_name in CROP_DATABASE:
        return {
            "status": "success",
            "crop": crop_name.title(),
            **CROP_DATABASE[crop_name]
        }
    else:
        # Crop not found - will trigger AI fallback
        return {
            "status": "not_found",
            "message": f"Crop '{crop_name}' not in knowledge base"
        }
