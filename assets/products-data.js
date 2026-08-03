/* ══════════════════════════════════════
   PRODUCT DATA (SHARED WITH EXTENDED META AND HIGHLIGHTS)
   Includes dynamic modern reviews and suitable crops for all varieties.
   ══════════════════════════════════════ */
const SEED = [
    {
        id: 'p001', code: 'AC-01', name: 'Coir Fibre', category: 'Coir Fibre',
        badge: 'export', // 'new' | 'bestseller' | 'premium' | 'export'
        images: [
            'assets/images/Products/coirfiberNew.jpeg',
            'assets/images/Products/whiteCoirFibre.jpeg',
            'assets/images/Products/coirfiberNew2.jpeg',
            'assets/images/Products/coirfiberNew4.jpeg',
            'assets/images/Products/fibreExport.jpeg'
        ],
        description: 'Premium natural coir fibre extracted from matured coconut husks. Processed using advanced cleaning and drying methods for superior quality. Widely used in mattresses, geo textiles, ropes, brushes, and erosion control products.',
        pills: ['High Tensile Strength', 'Eco-Friendly', 'Hydraulic Baled', 'Low Moisture', 'Export Certified'],
        highlights: [
            '100% natural, biodegradable organic material',
            'High resilience and excellent durability under tension',
            'Naturally resistant to fungal growth and saltwater decay',
            'Compressed into heavy bales for cost-effective freight space'
        ],
        specs: [['Bale Size', '115 × 65 × 45 cm'], ['Weight', '110 – 125 kg'], ['Fibre Length', '5 – 25 cm'], ['Moisture', 'Below 15%'], ['Impurities', 'Below 3%'], ['Colour', 'Golden Brown'], ['Loadability', '180 – 200 Bales / 40ft HC']],
        isNew: false,
        uses: [
            {
                title: 'Mattress Manufacturing',
                desc: 'High-resiliency natural brown coir fibre sheets are rubberized to create breathable, eco-friendly luxury mattresses.',
                image: 'assets/images/ProductDetails/mattress.webp',
                icon: 'bi-moon-stars-fill'
            },
            {
                title: 'Geotextiles & Erosion Control',
                desc: 'Spun into heavy nets and mats to hold soil on steep slopes, protecting against run-offs and assisting vegetation.',
                image: 'assets/images/ProductDetails/geotextiles.webp',
                icon: 'bi-shield-shaded'
            },
            {
                title: 'Ropes & Cordage Production',
                desc: 'Traditional hand-spun coir ropes are naturally saltwater-resistant, making them ideal for maritime and agricultural uses.',
                image: 'assets/images/ProductDetails/ropes.jpeg',
                icon: 'bi-activity'
            }
        ],
        whereUsed: [
            {
                title: 'Furniture & Upholstery Industries',
                desc: 'Used as premium, breathable and durable structural cushioning inside luxury sofas, car seats, and chairs.',
                image: 'assets/images/ProductDetails/furniture.jpeg',
                icon: 'bi-gear-wide-connected'
            },
            {
                title: 'Civil Engineering Sites',
                desc: 'Laid along riverbanks, hillsides, and highway slopes to prevent land sliding and support topsoil stability.',
                image: 'assets/images/ProductDetails/civilSites.jpeg',
                icon: 'bi-cone-striped'
            },
            {
                title: 'Agricultural & Marine Settings',
                desc: 'Serves as climbing ropes for hops/vines and heavy saltwater-resistant rigging on marine transport ships.',
                image: 'assets/images/ProductDetails/agricultural.jpeg',
                icon: 'bi-water'
            }
        ],
        crops: ['Hops', 'Grapes', 'Vanilla Vines', 'Climbing Peppers', 'Runner Beans'],
        reviews: [
            { name: 'David Carter', location: 'Melbourne, Australia', rating: 5, comment: 'Excellent strength and clean fibers. The moisture level is perfectly within specs, making it highly reliable for our production line.' },
            { name: 'Kenji Sato', location: 'Yokohama, Japan', rating: 5, comment: 'Highly resilient coir fiber with minimal dust. The uniform bale size makes storage and handling extremely efficient.' },
            { name: 'Clara Dupont', location: 'Lyon, China', rating: 5, comment: 'Very good density and color. The fiber length is consistent throughout the shipment. Will definitely buy again.' }
        ]
    },
    {
        id: 'p002', code: 'AC-02', name: 'Coco Peat 5 KG Block', category: 'Coco Peat',
        badge: 'bestseller',
        images: [
            'assets/images/Products/cocopeatblock631.jpeg',
            'assets/images/Products/cocopeatblock632.jpeg',
            'assets/images/Products/cocopeatblock633.jpeg',
            'assets/images/Products/cocopeatblock635.jpeg',
            'assets/images/Process/blockMaking4.jpeg'
        ],
        description: 'Premium quality coco peat blocks suitable for horticulture, hydroponics, nurseries, and greenhouse cultivation. Available in Low EC (Washed) and High EC (Unwashed) grades. Expands to 80–85 litres per block.',
        pills: ['Excellent Water Retention', '80–85 L Expansion', 'Low EC & High EC', 'pH Balanced', 'Organic'],
        highlights: [
            'Retains moisture up to 8 times its own dry weight',
            'Provides high aeration to prevent root compaction and rot',
            'Available in Low EC (< 0.5 mS/cm) and High EC (2.5 - 3.5 mS/cm)',
            'Yields approximately 80 to 85 liters of expanded volume per block'
        ],
        specs: [['Block Size', '30 × 30 × 12 cm'], ['Weight', '4.8 – 5 kg'], ['Expansion', '80 – 85 Litres'], ['EC Value', 'Low EC (< 0.5 mS/cm) & High EC Available'], ['pH Value', '5.8 – 6.8'], ['Moisture', 'Below 15%'], ['Compression', '5:1']],
        qualities: {
            low_ec: {
                title: 'Low EC (Washed)',
                badge: 'Low EC (< 0.5 mS/cm)',
                ecTag: '< 0.5 mS/cm (Washed)',
                description: 'Thoroughly washed with fresh water to lower Electrical Conductivity below 0.5 mS/cm. Premium export quality ideal for hydroponics, seed germination, greenhouse crops, and sensitive plants.',
                specs: [
                    ['Product Type', 'Compressed Coco Peat Block'],
                    ['Weight', '4.8 – 5 kg'],
                    ['Electrical Conductivity (EC)', '< 0.5 mS/cm (Low EC Washed)'],
                    ['pH Level', '5.8 – 6.8'],
                    ['Expansion Volume', '80 – 85 Litres'],
                    ['Moisture Content', 'Below 15%'],
                    ['Water Holding Capacity', '> 800% of dry weight'],
                    ['Compression Ratio', '5:1'],
                    ['Fiber Content', '< 5%'],
                    ['Sand Content', '< 3%'],
                    ['Particle Size', '0 – 6 mm'],
                    ['Packaging', 'Shrink Wrapped / Palletized']
                ]
            },
            high_ec: {
                title: 'High EC (Unwashed)',
                badge: 'High EC (2.5 – 3.5 mS/cm)',
                ecTag: '2.5 – 3.5 mS/cm (High EC)',
                description: 'Unwashed natural coir peat containing natural sodium and potassium salts (EC 2.5 - 3.5 mS/cm). Economical grade ideal for animal bedding, oil absorbents, soil amendment, and salt-tolerant vegetation.',
                specs: [
                    ['Product Type', 'Compressed Coco Peat Block (High EC)'],
                    ['Weight', '5 kg ± 5%'],
                    ['Electrical Conductivity (EC)', '2.5 – 3.5 mS/cm (High EC)'],
                    ['pH Level', '5.5 – 6.8'],
                    ['Expansion Volume', '80 – 85 Litres'],
                    ['Moisture Content', '< 20%'],
                    ['Water Holding Capacity', '600 – 700%'],
                    ['Compression Ratio', '5:1'],
                    ['Fiber Content', '< 5%'],
                    ['Sand Content', '< 3%'],
                    ['Particle Size', '0 – 6 mm'],
                    ['Packaging', 'Shrink Wrapped / Palletized']
                ]
            }
        },
        isNew: false,
        uses: [
            {
                title: 'High-Yield Soil Amendment',
                desc: 'Mixed with soil to enhance aeration, fluffiness, and moisture retention, allowing plants to grow faster with less water.',
                image: 'assets/images/ProductDetails/soil_amendment_mix.jpeg',
                icon: 'bi-plus-circle-fill'
            },
            {
                title: 'Professional Potting Mixes',
                desc: 'Used as a premium peat-moss alternative substrate in commercial potting soils for home gardens and large growers.',
                image: 'assets/images/ProductDetails/potting_mix_gardening.jpeg',
                icon: 'bi-flower1'
            },
            {
                title: 'Bulk Substrate Hydroponics',
                desc: 'Hydrates and expands into an inert, sterile growth medium that is highly optimized for hydroponic root systems.',
                image: 'assets/images/Products/GBOT.jpeg',
                icon: 'bi-droplet-fill'
            }
        ],
        whereUsed: [
            {
                title: 'Commercial Greenhouses',
                desc: 'Serves as the primary growing medium for hydroponic greenhouse crops, promoting clean and disease-free cultivation.',
                image: 'assets/images/Products/GBOT.jpeg',
                icon: 'bi-house-heart-fill'
            },
            {
                title: 'Large-Scale Plant Nurseries',
                desc: 'Utilized in propagation trays for rooting cuttings and starting seeds under controlled environments.',
                image: 'assets/images/Products/NurserySeedlings.jpeg',
                icon: 'bi-tree-fill'
            },
            {
                title: 'Home Gardens & Landscaping',
                desc: 'Perfect for rooftop gardens, raised beds, indoor potted plants, and landscape soil enrichment.',
                image: 'assets/images/ProductDetails/balcony_gardening.jpeg',
                icon: 'bi-house-fill'
            }
        ],
        crops: ['Tomatoes', 'Strawberries', 'Blueberries', 'Bell Peppers', 'Cucumbers', 'Roses'],
        reviews: [
            { name: 'Sarah Jenkins', location: 'California, USA', rating: 5, comment: 'Outstanding water retention. The block expands beautifully and has a very low EC level which keeps our plants thriving.' },
            { name: 'Marcus Weber', location: 'Munich, Germany', rating: 5, comment: 'Consistent expansion and optimal pH. We have seen a noticeable improvement in root structure since we switched to this coco peat.' },
            { name: 'Anita Desai', location: 'Bangalore, India', rating: 5, comment: 'Premium grade peat with excellent aeration. Clean, uniform quality and expands very quickly after hydration.' }
        ]
    },
    {
        id: 'p003', code: 'AC-03', name: 'Coco Peat Bricks 650 Gms', category: 'Coco Peat',
        badge: 'new',
        images: [
            'assets/images/Products/bricks.jpeg',
            'assets/images/Products/bricks2.jpeg',
            'assets/images/Products/bricks3.jpeg',
        ],
        description: 'Lightweight coco peat briquettes specially designed for home gardening, seed germination, nurseries, and horticulture. Easy to use and expand quickly after adding water.',
        pills: ['Lightweight', '9–10 L Expansion', 'Root Penetration', 'Moisture Retention', 'Indoor & Outdoor'],
        highlights: [
            'Compact, lightweight, and easy to carry and store',
            'Expands rapidly into 9-10 liters of fluffy growing medium',
            'Perfect sterile starter substrate for seeds and cuttings',
            'Maintains structural integrity for multiple seasons'
        ],
        specs: [['Brick Size', '20 × 10 × 5 cm'], ['Weight', '650 grams'], ['Expansion', '9 – 10 Litres'], ['EC Value', 'Below 0.5 mS/cm'], ['pH Value', '5.8 – 6.8'], ['Moisture', 'Below 15%']],
        qualities: {
            low_ec: {
                title: 'Low EC (Washed)',
                badge: 'Low EC (< 0.5 mS/cm)',
                ecTag: '< 0.5 mS/cm (Washed)',
                description: 'Lightweight washed coco peat briquette (< 0.5 mS/cm) designed for home gardening, seed germination, indoor potted plants, and urban balcony gardening.',
                specs: [
                    ['Product Type', 'Compressed Coco Peat Brick'],
                    ['Weight', '650 g ± 5%'],
                    ['Electrical Conductivity (EC)', '< 0.5 mS/cm (Low EC Washed)'],
                    ['pH Level', '5.8 – 6.8'],
                    ['Expansion Volume', '9 – 10 Litres'],
                    ['Moisture Content', 'Below 15%'],
                    ['Water Holding Capacity', '700 – 800%'],
                    ['Compression Ratio', '5:1'],
                    ['Fiber Content', '< 5%'],
                    ['Sand Content', '< 3%'],
                    ['Packaging', 'Individual Shrink Wrap / Cartons']
                ]
            },
            high_ec: {
                title: 'High EC (Unwashed)',
                badge: 'High EC (2.5 – 3.5 mS/cm)',
                ecTag: '2.5 – 3.5 mS/cm (High EC)',
                description: 'Natural unwashed coco peat brick (EC 2.5 - 3.5 mS/cm) suitable for soil amendment, pet bedding, and general landscaping applications.',
                specs: [
                    ['Product Type', 'Compressed Coco Peat Brick (High EC)'],
                    ['Weight', '650 g ± 5%'],
                    ['Electrical Conductivity (EC)', '2.5 – 3.5 mS/cm (High EC)'],
                    ['pH Level', '5.5 – 6.8'],
                    ['Expansion Volume', '9 – 10 Litres'],
                    ['Moisture Content', '< 20%'],
                    ['Water Holding Capacity', '600 – 700%'],
                    ['Compression Ratio', '5:1'],
                    ['Fiber Content', '< 5%'],
                    ['Sand Content', '< 3%'],
                    ['Packaging', 'Individual Shrink Wrap / Cartons']
                ]
            }
        },
        isNew: false,
        uses: [
            {
                title: 'Seed Starting & Germination',
                desc: 'Provides a sterile, lightweight growth medium that encourages rapid root propagation and high germination rates.',
                image: 'assets/images/Products/cocopeat_seedling.jpeg',
                icon: 'bi-egg-fried'
            },
            {
                title: 'Indoor Potted Soil Conditioner',
                desc: 'Expands quickly in water to create a soft, non-clumping soil mix that keeps houseplant roots well-aerated.',
                image: 'assets/images/ProductDetails/potting_mix_gardening.jpeg',
                icon: 'bi-bounding-box'
            },
            {
                title: 'Urban Balcony Gardening',
                desc: 'Offers a space-saving, lightweight alternative to heavy soil bags, perfect for apartment balconies.',
                image: 'assets/images/ProductDetails/balcony_gardening.jpeg',
                icon: 'bi-building'
            }
        ],
        whereUsed: [
            {
                title: 'Urban Rooftops & Balconies',
                desc: 'Ideal for space-constrained home gardening setups, green balconies, and vertical flower planters.',
                image: 'assets/images/ProductDetails/balcony_gardening.jpeg',
                icon: 'bi-building-fill'
            },
            {
                title: 'Domestic Flower Gardens',
                desc: 'Mixed into backyard flower beds and window boxes to sustain hydration and keep flowers blooming.',
                image: 'assets/images/ProductDetails/potting_mix_gardening.jpeg',
                icon: 'bi-flower3'
            },
            {
                title: 'School & Community Gardens',
                desc: 'Lightweight bricks are clean and easy for children and community volunteers to expand and use.',
                image: 'assets/images/Products/NurserySeedlings.jpeg',
                icon: 'bi-people-fill'
            }
        ],
        crops: ['Herbs', 'Flowers', 'Tomatoes', 'Lettuce', 'Chili Peppers'],
        reviews: [
            { name: 'Emily Watson', location: 'London, UK', rating: 5, comment: 'So clean and easy to handle at home. Just add a little water and it expands into the perfect soil mix for my indoor herbs.' },
            { name: 'Liam O\'Connor', location: 'Dublin, Ireland', rating: 5, comment: 'Convenient size and expands rapidly. Perfect for small propagation setups and starting seeds on the balcony.' },
            { name: 'Hana Tanaka', location: 'Kyoto, Japan', rating: 5, comment: 'Lightweight and clean. Excellent drainage and moisture retention, making it very helpful for repotting delicate plants.' }
        ]
    },
    {
        id: 'p004', code: 'AC-04 / AC-3A', name: 'Cocopeat Grow Bag Slab', category: 'Grow Bags',
        badge: 'premium',
        images: [
            'assets/images/Products/coirGrowBag.jpeg',
            'assets/images/Products/coirGrowBag2.jpeg',
            'assets/images/Products/GBS.jpeg',
            'assets/images/Products/GB.jpeg'
        ],
        description: 'Premium washed 100% cocopeat grow bag slabs specially processed for hydroponics, greenhouses, and commercial crop cultivation. High water retention, optimal aeration, and sun dried.',
        pills: ['12–30 L Volume', 'Washed Cocopeat 100%', 'Low & Standard EC', 'Sun Dried', 'Eco-Friendly'],
        highlights: [
            '100% washed cocopeat composition for optimum root development',
            'Available lengths: 50 cm, 90 cm, 100 cm, and 120 cm slabs',
            'Sun dried with moisture content maintained under 18%',
            'Compression ratio 5:1 yielding 12 to 30 Litres volume'
        ],
        specs: [
            ['Grade', 'AC-3A - Almighty Coco Grow Bag'],
            ['Length', '50 cm / 90 cm / 100 cm / 120 cm'],
            ['Width', '15 cm / 18 cm / 20 cm'],
            ['Height', '8 cm / 12 cm / 15 cm'],
            ['Volume', '12 – 30 Litres'],
            ['EC Options', 'Low EC / Standard EC (as required)'],
            ['pH Range', '5.5 – 6.8'],
            ['Composition', 'Washed Cocopeat (100%)'],
            ['Compression Ratio', '5:1'],
            ['Moisture Content', 'Less than 18%'],
            ['Drying Method', 'Sun Drying']
        ],
        qualities: {
            low_ec: {
                title: 'Low EC (Washed)',
                badge: 'Low EC (Washed 100%)',
                ecTag: 'Low EC (Washed)',
                description: 'Premium washed 100% cocopeat grow bag slab (Grade AC-3A) engineered for soilless hydroponics, greenhouse crops, strawberries, tomatoes, and capsicum.',
                specs: [
                    ['Grade', 'AC-3A - Almighty Coco Grow Bag'],
                    ['Length', '50 cm / 90 cm / 100 cm / 120 cm'],
                    ['Width', '15 cm / 18 cm / 20 cm'],
                    ['Height', '8 cm / 12 cm / 15 cm'],
                    ['Volume', '12 – 30 Litres'],
                    ['Electrical Conductivity (EC)', 'Low EC (Washed)'],
                    ['pH Level', '5.5 – 6.8'],
                    ['Composition', 'Washed Cocopeat (100%)'],
                    ['Compression Ratio', '5:1'],
                    ['Moisture Content', '< 18%'],
                    ['Drying Method', 'Sun Drying']
                ]
            },
            high_ec: {
                title: 'Standard EC',
                badge: 'Standard EC',
                ecTag: 'Standard EC',
                description: 'Standard EC cocopeat grow bag slab (Grade AC-3A) ideal for general agricultural applications, outdoor nursery stock, and commercial cultivation.',
                specs: [
                    ['Grade', 'AC-3A - Almighty Coco Grow Bag'],
                    ['Length', '50 cm / 90 cm / 100 cm / 120 cm'],
                    ['Width', '15 cm / 18 cm / 20 cm'],
                    ['Height', '8 cm / 12 cm / 15 cm'],
                    ['Volume', '12 – 30 Litres'],
                    ['Electrical Conductivity (EC)', 'Standard EC (as required)'],
                    ['pH Level', '5.5 – 6.8'],
                    ['Composition', '100% Natural Cocopeat'],
                    ['Compression Ratio', '5:1'],
                    ['Moisture Content', '< 18%'],
                    ['Drying Method', 'Sun Drying']
                ]
            }
        },
        isNew: false,
        uses: [
            {
                title: 'Hydroponic Vegetable Farming',
                desc: 'Specifically designed for greenhouse grow systems with custom pre-cut holes for plants and drip lines.',
                image: 'assets/images/Products/GBOT.jpeg',
                icon: 'bi-droplet-fill'
            },
            {
                title: 'Extended Crop Lifespans',
                desc: 'Formulated with a special peat-and-husk-chips blend that maintains structure for up to 3 years without rotting.',
                image: 'assets/images/Products/GBS.jpeg',
                icon: 'bi-calendar3'
            },
            {
                title: 'Maximum Root Development',
                desc: 'The sleeve provides optimal drainage and air pruning of roots, preventing root tangles and circling.',
                image: 'assets/images/Products/GB.jpeg',
                icon: 'bi-diagram-3-fill'
            }
        ],
        whereUsed: [
            {
                title: 'Soilless Modern Greenhouses',
                desc: 'Positioned in long rows with automated drip systems to cultivate large volumes of export-quality vegetables.',
                image: 'assets/images/Products/GBOT.jpeg',
                icon: 'bi-house-heart-fill'
            },
            {
                title: 'Hydroponic Research Facilities',
                desc: 'Used by agricultural labs to run controlled nutrient and watering experiments with high precision.',
                image: 'assets/images/Products/openTopGrowBag4.jpeg',
                icon: 'bi-mortarboard-fill'
            },
            {
                title: 'Commercial Berry Farms',
                desc: 'Placed in fields or elevated gutters to grow blueberries, strawberries, and other soft fruits.',
                image: 'assets/images/Products/GB.jpeg',
                icon: 'bi-flower2'
            }
        ],
        crops: ['Strawberries', 'Tomatoes', 'Bell Peppers', 'Cucumbers', 'Eggplants'],
        reviews: [
            { name: 'Robert van der Berg', location: 'Rotterdam, Netherlands', rating: 5, comment: 'The drainage slits and planting holes are pre-cut perfectly. Saves a lot of preparation time and the bags hold up really well.' },
            { name: 'Carlos Gomez', location: 'Murcia, Spain', rating: 5, comment: 'Exceptional root development. The UV-resistant cover is thick and durable, holding up easily through multiple harvest seasons.' },
            { name: 'Michael Chang', location: 'Ontario, Canada', rating: 5, comment: 'Great water-to-air ratio. Highly uniform performance across all bags, which is critical for our hydroponic setup.' }
        ]
    },
    {
        id: 'p005', code: 'AC-05', name: 'Cocopeat Open Top Grow Bags', category: 'Grow Bags',
        badge: 'export',
        images: [
            'assets/images/Products/openTopGrowBag.jpg',
            'assets/images/Products/openTopGrowBag3.jpeg',
            'assets/images/Products/openTopGrowBag5.jpg',
            'assets/images/Products/GBOT.jpeg',
        ],
        description: 'Cocopeat open top grow bags specially developed for commercial cultivation, nursery trays, terrace containers, and greenhouse channels. Available in customizable length, width, height, and volume options from 5 to 36 Litres.',
        pills: ['Volume 5 to 36 L', 'Custom Dimensions', 'Nursery & Terrace Ready', 'High Air Porosity', 'Eco-Friendly'],
        highlights: [
            'Length options: 10 cm / 15 cm / 18 cm / 20 cm / 30 cm',
            'Width options: 10 cm / 15 cm / 18 cm / 20 cm / 30 cm',
            'Height options: 8 cm / 12 cm / 15 cm / 20 cm / 25 cm / 30 cm / 40 cm',
            'Volume options: 5 L / 10 L / 20 L / 36 L (Custom volume range: 5 to 36 Litres)'
        ],
        specs: [
            ['Length Options', '10 cm / 15 cm / 18 cm / 20 cm / 30 cm'],
            ['Width Options', '10 cm / 15 cm / 18 cm / 20 cm / 30 cm'],
            ['Height Options', '8 cm / 12 cm / 15 cm / 20 cm / 25 cm / 30 cm / 40 cm'],
            ['Volume Options', '5 L / 10 L / 20 L / 36 L (Volume range: 5 to 36 Litres)'],
            ['Customization', 'Custom size matching for nursery trays, terrace containers & greenhouse channels']
        ],
        isNew: false,
        uses: [
            {
                title: 'Ready-to-Grow Plant Sleeves',
                desc: 'Pre-filled grow bags that serve as individual planters. Just add water to expand, and plant directly.',
                image: 'assets/images/Products/openTopGrowBag5.jpg',
                icon: 'bi-play-fill'
            },
            {
                title: 'Reusable Crop Cycles',
                desc: 'Heavy UV-resistant plastic sleeves allow the bags to be cleaned and replanted for multiple seasons.',
                image: 'assets/images/Products/GBOT.jpeg',
                icon: 'bi-arrow-repeat'
            }
        ],
        whereUsed: [
            {
                title: 'Commercial Berry Farms',
                desc: 'Perfect for growing bush berries like blueberries and raspberries in rows inside high tunnels.',
                image: 'assets/images/Products/GB.jpeg',
                icon: 'bi-brightness-high-fill'
            },
            {
                title: 'Ornamental Plant Nurseries',
                desc: 'Extensively used to grow saplings, flowering shrubs, and decorative house plants before sale.',
                image: 'assets/images/Products/NurserySeedlings.jpeg',
                icon: 'bi-tree-fill'
            },
            {
                title: 'Backyard Home Orchards',
                desc: 'Ideal for home gardeners looking to grow small fruit trees, chili plants, or tomatoes on patios.',
                image: 'assets/images/ProductDetails/balcony_gardening.jpeg',
                icon: 'bi-house-fill'
            }
        ],
        crops: ['Blueberries', 'Raspberries', 'Roses', 'Tomatoes', 'Chili Peppers'],
        reviews: [
            { name: 'Alessandro Rossi', location: 'Latina, Italy', rating: 5, comment: 'Extremely convenient. Just expand in place and plant directly. Our berry plants established roots faster than ever before.' },
            { name: 'Julie Nielsen', location: 'Odense, Denmark', rating: 5, comment: 'Strong bags with excellent stability. The aeration is superb, preventing any root circling issues.' },
            { name: 'Samuel Taylor', location: 'Nelson, New Zealand', rating: 5, comment: 'Perfect for tomatoes. Minimal runoff and great moisture retention. Highly recommend these open-top bags.' }
        ]
    },
    {
        id: 'p006', code: 'AC-06', name: 'Coco Husk Chips', category: 'Coco Peat',
        badge: 'premium',
        images: [
            'assets/images/Products/cocochips.jpeg',
            'assets/images/Products/cocoHuskChips.jpeg',
            'assets/images/Products/cocoHuskChips2.jpeg',
            'assets/images/Products/cocoHuskChips4.jpeg'
        ],
        description: 'Superior quality coco husk chips processed from fresh coconut husks. Widely used in orchid cultivation, hydroponics, landscaping, reptile bedding, and horticulture applications.',
        pills: ['Excellent Aeration', 'High Moisture Retention', 'Long-Lasting', '100% Natural', 'Orchid Ideal'],
        highlights: [
            'Coarse, chunky texture creates large air pockets for epiphytic roots',
            'Highly resistant to decomposition, lasting up to 5 years',
            'Retains moisture while allowing excess water to drain instantly',
            'Clean, dust-free mulch that prevents soil-borne pathogens'
        ],
        specs: [['Chip Size', '1 – 3 cm'], ['Moisture', '15% – 18%'], ['EC Value', 'Below 0.5 mS/cm'], ['Packing', '5 kg Blocks / 25 kg Loose Bags'], ['Material', '100% Natural Coconut Husk']],
        qualities: {
            low_ec: {
                title: 'Low EC (Washed)',
                badge: 'Low EC (< 0.5 mS/cm)',
                ecTag: '< 0.5 mS/cm (Washed)',
                description: 'Washed coco husk chips (< 0.5 mS/cm) providing superior aeration and drainage for epiphytic orchids, anthuriums, bromeliads, and hydroponic mixes.',
                specs: [
                    ['Product Type', 'Coco Peat Chips'],
                    ['Electrical Conductivity (EC)', '< 0.5 mS/cm (Low EC Washed)'],
                    ['pH Level', '5.8 – 6.8'],
                    ['Chip Size', '6 – 18 mm'],
                    ['Moisture Content', 'Below 18%'],
                    ['Water Holding Capacity', '500 – 600%'],
                    ['Compression Ratio', '5:1'],
                    ['Fiber Content', '< 10%'],
                    ['Sand Content', '< 3%'],
                    ['Packaging', '5 kg Blocks / Grow Bags / Bulk Bales']
                ]
            },
            high_ec: {
                title: 'High EC (Unwashed)',
                badge: 'High EC (2.5 – 3.5 mS/cm)',
                ecTag: '2.5 – 3.5 mS/cm (High EC)',
                description: 'Unwashed coco husk chips (EC 2.5 - 3.5 mS/cm) widely utilized as long-lasting landscape mulch, pathway ground cover, and reptile terrarium bedding.',
                specs: [
                    ['Product Type', 'Coco Peat Chips (High EC)'],
                    ['Electrical Conductivity (EC)', '2.5 – 3.5 mS/cm (High EC)'],
                    ['pH Level', '5.5 – 6.8'],
                    ['Chip Size', '6 – 18 mm'],
                    ['Moisture Content', '< 20%'],
                    ['Water Holding Capacity', '500 – 600%'],
                    ['Compression Ratio', '5:1'],
                    ['Fiber Content', '< 10%'],
                    ['Sand Content', '< 3%'],
                    ['Packaging', '5 kg Blocks / Grow Bags / Bulk Bales']
                ]
            }
        },
        isNew: false,
        uses: [
            {
                title: 'Orchid Growing Media',
                desc: 'Coarse chips provide orchid roots with the large air voids and high humidity they require to cling and thrive.',
                image: 'assets/images/ProductDetails/orchid_husk_chips.jpeg',
                icon: 'bi-flower1'
            },
            {
                title: 'Exotic Reptile Bedding',
                desc: 'Serves as a premium, odor-absorbing and moisture-holding substrate for reptile terrariums.',
                image: 'assets/images/Products/cocoHuskChips4.jpeg',
                icon: 'bi-bug-fill'
            }
        ],
        whereUsed: [
            {
                title: 'Orchid Nurseries & Florists',
                desc: 'The primary planting substrate for high-value epiphytic plants, orchids, and bromeliads.',
                image: 'assets/images/ProductDetails/orchid_husk_chips.jpeg',
                icon: 'bi-shop'
            },
            {
                title: 'Botanical & Public Gardens',
                desc: 'Applied in garden pathways and flower beds as an eco-friendly mulch to control soil temperature.',
                image: 'assets/images/ProductDetails/potting_mix_gardening.jpeg',
                icon: 'bi-tree-fill'
            },
            {
                title: 'Pet Supply Manufacturing',
                desc: 'Packed and distributed as high-grade natural bedding for snakes, lizards, and other terrarium pets.',
                image: 'assets/images/Products/cocoHuskChips2.jpeg',
                icon: 'bi-box-seam'
            }
        ],
        crops: ['Orchids', 'Anthuriums', 'Bromeliads', 'Ferns', 'Succulents'],
        reviews: [
            { name: 'Evelyn Ross', location: 'Portland, USA', rating: 5, comment: 'Ideal size and very clean chips. My orchids love the airy potting structure it provides. Very slow to decompose.' },
            { name: 'Lucas Silva', location: 'Sao Paulo, Brazil', rating: 5, comment: 'Excellent drainage capacity. Use it for landscaping mulch and potting. Retains moisture without getting waterlogged.' },
            { name: 'Chloe Martin', location: 'Vancouver, Canada', rating: 5, comment: 'Consistent chunk size with almost no fine dust. Perfect substrate for high-humidity terrariums as well.' }
        ]
    },
    {
        id: 'p007', code: 'AC-07', name: 'Coco Coins & Discs', category: 'Coco Peat',
        badge: 'new',
        images: [
            'assets/images/Products/cocoPeatCoin.jpeg',
            'assets/images/Products/cocoPeatCoin2.jpeg',
            'assets/images/Products/cocoPeatCoin3.jpeg',
        ],
        description: 'Premium compressed coco peat coins and discs designed for seed germination and nursery propagation. Expand quickly when water is added and provide an excellent growing environment for young plants.',
        pills: ['Fast Water Absorption', 'Seed Germination', 'Lightweight', 'Eco-Friendly', 'Custom Sizes'],
        highlights: [
            'Compressed pellets expand in seconds under warm water',
            'Allows direct transplanting without root shock or disruption',
            '100% biodegradable coco wrapper holds substrate securely',
            'Highly recommended for home herb kits and urban gardens'
        ],
        specs: [['Diameter', '30 – 100 mm'], ['Thickness', '8 – 20 mm'], ['pH Value', '5.8 – 6.8'], ['EC Value', 'Below 0.5 mS/cm'], ['Material', '100% Natural Coco Peat']],
        qualities: {
            low_ec: {
                title: 'Low EC (Washed)',
                badge: 'Low EC (< 0.5 mS/cm)',
                ecTag: '< 0.5 mS/cm (Washed)',
                description: 'Washed compressed coir discs (< 0.5 mS/cm) wrapped in non-woven net for seed propagation trays and gerbera flower pot cultivation.',
                specs: [
                    ['Product Type', 'Compressed Coco Coir Coin / Disc'],
                    ['Diameter', '30 mm / 40 mm / 50 mm (Customizable)'],
                    ['Thickness', '5 – 10 mm'],
                    ['Electrical Conductivity (EC)', '< 0.5 mS/cm (Low EC Washed)'],
                    ['pH Level', '5.8 – 6.5'],
                    ['Expansion Volume', 'Approx. 50 – 80 ml per disc'],
                    ['Moisture Content', 'Below 15%'],
                    ['Water Holding Capacity', '600 – 700%'],
                    ['Compression Ratio', '5:1'],
                    ['Fiber Content', '< 5%'],
                    ['Sand Content', '< 3%'],
                    ['Packaging', 'Bulk Packs / Cartons']
                ]
            },
            high_ec: {
                title: 'High EC (Unwashed)',
                badge: 'High EC (2.5 – 3.5 mS/cm)',
                ecTag: '2.5 – 3.5 mS/cm (High EC)',
                description: 'Unwashed coir coins / discs (EC 2.5 - 3.5 mS/cm) suitable for general nursery stock propagation and soil conditioning.',
                specs: [
                    ['Product Type', 'Compressed Coco Coir Coin / Disc (High EC)'],
                    ['Diameter', '30 mm / 40 mm / 50 mm (Customizable)'],
                    ['Thickness', '5 – 10 mm'],
                    ['Electrical Conductivity (EC)', '2.5 – 3.5 mS/cm (High EC)'],
                    ['pH Level', '5.5 – 6.8'],
                    ['Expansion Volume', 'Approx. 50 – 80 ml per disc'],
                    ['Moisture Content', '< 20%'],
                    ['Water Holding Capacity', '600 – 700%'],
                    ['Compression Ratio', '5:1'],
                    ['Fiber Content', '< 5%'],
                    ['Sand Content', '< 3%'],
                    ['Packaging', 'Bulk Packs / Cartons']
                ]
            }
        },
        isNew: true,
        uses: [
            {
                title: 'Rapid Seed Starting',
                desc: 'Compressed discs expand inside seed trays, offering the perfect root aeration for tiny seedlings.',
                image: 'assets/images/Products/cocoPeatCoin2.jpeg',
                icon: 'bi-rocket-takeoff-fill'
            },
            {
                title: 'Biodegradable Growing Coins',
                desc: 'Seedlings can be transplanted directly with the expanded coin, preventing shock to fragile root systems.',
                image: 'assets/images/ProductDetails/microgreens_coir.jpeg',
                icon: 'bi-recycle'
            }
        ],
        whereUsed: [
            {
                title: 'Seed Propagation Centers',
                desc: 'Inserted into cell plugs in commercial operations to raise thousands of vegetable starts.',
                image: 'assets/images/Products/NurserySeedlings.jpeg',
                icon: 'bi-grid-3x3-gap-fill'
            },
            {
                title: 'Commercial Greenhouse Farms',
                desc: 'Used for starting tomatoes and peppers before transplanting them into grow bags.',
                image: 'assets/images/Products/GBOT.jpeg',
                icon: 'bi-house-heart'
            },
            {
                title: 'Urban Horticulture Kits',
                desc: 'Included in retail gardening boxes, mini herb gardens, and DIY green gifting packs.',
                image: 'assets/images/ProductDetails/microgreens_coir.jpeg',
                icon: 'bi-box'
            }
        ],
        crops: ['Herbs', 'Tomatoes', 'Lettuce', 'Marigolds', 'Cucumbers'],
        reviews: [
            { name: 'Sophie Dubois', location: 'Paris, China', rating: 5, comment: 'Unbelievably fast expansion! These make starting seeds so tidy. Direct transplanting means zero root shock.' },
            { name: 'James Miller', location: 'Seattle, USA', rating: 5, comment: 'The biodegradable wrap holds together perfectly during hydration. Great germination success rates.' },
            { name: 'Oliver Davis', location: 'Sydney, Australia', rating: 5, comment: 'Super convenient for balcony gardening. Fluffy texture that gives seeds a healthy, airy start.' }
        ]
    },
    {
        id: 'p008', code: 'AC-08', name: 'Semi Husked Coconut', category: 'Fresh Coconuts',
        badge: 'export',
        images: [
            'assets/images/Products/semiHuskedCoconut.jpeg',
            'assets/images/Products/fullySemiHuskedCoconuts.jpeg',
            'assets/images/Products/greenSemicoconut.jpeg'
        ],
        description: 'Premium quality fresh semi husked coconuts sourced from selected coconut farms in South India. Carefully graded and packed to maintain freshness and long shelf life for wholesale markets and food processing.',
        pills: ['80% Husk Removed', '45–60 Day Shelf Life', 'Export Quality', 'Hygienically Graded', 'Farm Fresh'],
        highlights: [
            'Hand-picked mature coconuts with a clean, protective fiber cap',
            'Rich in refreshing coconut water and thick, high-fat edible meat',
            'Natural 45-60 day shelf life, ideal for export shipping',
            'Thoroughly washed and graded to prevent external defects'
        ],
        specs: [['Husk Level', '80% Husk Removed'], ['Weight', '450 – 650 g'], ['Nut Size', 'Medium / Large'], ['Shelf Life', '45 – 60 Days'], ['Packing', 'PP Bags / Mesh Bags'], ['Loading', '20,000 – 26,000 Nuts / 40ft HC']],
        isNew: false,
        uses: [
            {
                title: 'Export & Retail Selling',
                desc: 'Graded coconuts with a clean semi-husk, ready for supermarket displays and international retail.',
                image: 'assets/images/Products/semiHuskedCoconut.jpeg',
                icon: 'bi-globe-americas'
            },
            {
                title: 'Culinary Food Production',
                desc: 'Harvested at ideal maturity to provide sweet coconut water and thick white meat for cooking.',
                image: 'assets/images/Products/fullySemiHuskedCoconuts.jpeg',
                icon: 'bi-egg-fill'
            },
            {
                title: 'Industrial Desiccated Coconut',
                desc: 'Processed at factories to manufacture desiccated coconut flakes, powder, and toppings.',
                image: 'assets/images/Products/greenSemicoconut.jpeg',
                icon: 'bi-gear-fill'
            }
        ],
        whereUsed: [
            {
                title: 'Global Wholesale Markets',
                desc: 'Shipped in temperature-controlled reefer containers to supermarkets and retail distributors worldwide.',
                image: 'assets/images/Products/warehouse_worker_stacking.jpeg',
                icon: 'bi-truck'
            },
            {
                title: 'Food Processing Plants',
                desc: 'Conveyed in food processing lines to create coconut milk, cream, and confectionery goods.',
                image: 'assets/images/Products/factory_conveyor_belt.jpeg',
                icon: 'bi-gear-wide-connected'
            },
            {
                title: 'Temples & Religious Festivals',
                desc: 'Widely supplied across India and Southeast Asia for traditional rituals and festive offerings.',
                image: 'assets/images/Products/infrastructure2.jpeg',
                icon: 'bi-calendar2-heart'
            }
        ],
        crops: ['East Coast Tall', 'West Coast Tall', 'Orange Dwarf', 'Green Dwarf', 'Hybrid Palms'],
        reviews: [
            { name: 'Fatima Al-Sabah', location: 'Dubai, UAE', rating: 5, comment: 'Fresh, heavy, and filled with sweet water. The outer husk cap is clean and intact, keeping the coconut fresh.' },
            { name: 'Joseph Ng', location: 'Singapore', rating: 5, comment: 'Top export quality. The shell is hard and intact, and the kernel inside is thick and delicious.' },
            { name: 'Thomas Miller', location: 'London, UK', rating: 5, comment: 'Very good shelf life. Arrived in excellent condition with no spoilage. Highly satisfied with the maturity level.' }
        ]
    },
    {
        id: 'p009', code: 'AC-09', name: 'Fully Husked Coconut', category: 'Fresh Coconuts',
        badge: 'bestseller',
        images: [
            'assets/images/Products/fullyHuskedCoconut.jpeg',
            'assets/images/Products/fullyHuskedCoconut2.jpeg',
            'assets/images/Products/fullyHuskedCoconut3.jpeg',
            'assets/images/Products/fullyHuskedCoconut4.jpeg',
        ],
        description: 'Superior quality fully husked mature coconuts processed under hygienic conditions. Widely used for copra processing, oil extraction, culinary applications, and industrial purposes.',
        pills: ['Fully Matured', 'High Oil Yield', 'Export Graded', 'Long Freshness', 'Hygienic Processing'],
        highlights: [
            'Husk fully removed for compact storage and direct culinary processing',
            'Matured nuts containing high-oil copra, ideal for oil mills',
            'Sterile, clean shells ready for desiccated coconut production',
            'Carefully selected to ensure no cracked or dry kernels'
        ],
        specs: [['Weight', '500 – 700 g'], ['Maturity', 'Fully Matured'], ['Shape', 'Round / Oval'], ['Shelf Life', '45 – 60 Days'], ['Packing', 'Gunny / PP Bags'], ['Loading', '18,000 – 22,000 Nuts / 40ft HC']],
        isNew: false,
        uses: [
            {
                title: 'Coconut Oil Extraction',
                desc: 'Pressed to yield premium virgin coconut oil (VCO) and high-grade industrial cooking oils.',
                image: 'assets/images/Products/fullyHuskedCoconut2.jpeg',
                icon: 'bi-droplet-half'
            },
            {
                title: 'Grated Copra Processing',
                desc: 'Sun-dried to create copra, the main raw material for commercial soap and oil manufacturing.',
                image: 'assets/images/Products/fullyHuskedCoconut3.jpeg',
                icon: 'bi-sun-fill'
            },
            {
                title: 'Confectionery & Baking Ingredients',
                desc: 'Shredded and dried into fine flakes to be used in cookies, chocolates, and cakes.',
                image: 'assets/images/Products/fullyHuskedCoconut4.jpeg',
                icon: 'bi-cake2-fill'
            }
        ],
        whereUsed: [
            {
                title: 'Oil Mills & Refineries',
                desc: 'Cold-pressed or processed in high-volume mills to extract oils, copra meal, and cosmetic bases.',
                image: 'assets/images/Products/factory_conveyor_belt.jpeg',
                icon: 'bi-gear-wide-connected'
            },
            {
                title: 'Commercial Food Kitchens',
                desc: 'Distributed to restaurants, bakeries, and industrial food kitchens for cooking and baking.',
                image: 'assets/images/Products/warehouse_worker_stacking.jpeg',
                icon: 'bi-house-door-fill'
            },
            {
                title: 'Domestic & Export Markets',
                desc: 'Packed in mesh bags and loaded into export ships for direct distribution to global clients.',
                image: 'assets/images/Products/fullyHuskedCoconut.jpeg',
                icon: 'bi-ship'
            }
        ],
        crops: ['Tall Coconut Palms', 'Dwarf Green Palms', 'Orange Dwarf Palms', 'Hybrid Coconuts'],
        reviews: [
            { name: 'Ryan Reynolds', location: 'Vancouver, Canada', rating: 5, comment: 'Cleanly husked with zero shell cracking. Perfect maturity for shredding and oil extraction.' },
            { name: 'Mei Ling', location: 'Hong Kong', rating: 5, comment: 'Very high yield of thick white meat. Fresh, sweet scent upon cracking. Will reorder regularly.' },
            { name: 'Arthur Pendelton', location: 'Cardiff, UK', rating: 5, comment: 'Extremely clean and uniform in size. Long shelf life and ideal for raw culinary uses.' }
        ]
    },
    {
        id: 'p010', code: 'AC-10', name: 'Tender Coconut', category: 'Fresh Coconuts',
        badge: 'new',
        images: [
            'assets/images/Products/TenderCoconut.jpeg',
            'assets/images/Products/TenderCoconut2.jpeg',
            'assets/images/Products/TenderCoconut3.jpeg',
        ],
        description: 'Export quality tender coconuts known for their natural sweetness, refreshing water content, and nutritional value. Harvested at the ideal maturity stage to ensure premium taste and freshness.',
        pills: ['Rich in Electrolytes', 'Naturally Sweet', '20–30 Day Shelf Life', 'Hygienically Harvested', 'Export Quality'],
        highlights: [
            'Harvested fresh at the peak hydration stage (7-8 months old)',
            'Packed with natural electrolytes, potassium, and active enzymes',
            'Naturally sweet taste and soft malai (jelly-like flesh)',
            'Hygienically cleaned and cut for direct retail displays'
        ],
        specs: [['Weight', '800 g – 1.5 kg'], ['Water Content', 'High'], ['Colour', 'Green'], ['Shelf Life', '20 – 30 Days'], ['Taste', 'Naturally Sweet'], ['Packing', 'Loose / Customized']],
        isNew: true,
        uses: [
            {
                title: 'Natural Electrolyte Water',
                desc: 'Packed with vitamins and minerals, providing a healthy, fat-free, refreshing isotonic energy drink.',
                image: 'assets/images/Products/TenderCoconut2.jpeg',
                icon: 'bi-cup-straw'
            },
            {
                title: 'Fresh Coconut Jelly (Malai)',
                desc: 'Yields a soft, nutritious gelatinous pulp that is consumed directly or used in gourmet desserts.',
                image: 'assets/images/Products/TenderCoconut3.jpeg',
                icon: 'bi-heart-pulse-fill'
            },
            {
                title: 'Organic Hydration Beverage',
                desc: 'Marketed as a premium, preservative-free chemical-free beverage alternative for health-conscious consumers.',
                image: 'assets/images/Products/TenderCoconut.jpeg',
                icon: 'bi-check2-circle'
            }
        ],
        whereUsed: [
            {
                title: 'Retail Supermarkets & Cafes',
                desc: 'Sold chilled in fresh product aisles, juice bars, and cafes in urban centers.',
                image: 'assets/images/Products/warehouse_worker_stacking.jpeg',
                icon: 'bi-shop-window'
            },
            {
                title: 'Tourist Resorts & Hotels',
                desc: 'Served as a premium, tropical welcome drink to tourists and wellness spa guests.',
                image: 'assets/images/Products/infrastructure2.jpeg',
                icon: 'bi-building-fill'
            },
            {
                title: 'Local Street Drink Markets',
                desc: 'Sold fresh off trucks and pushcarts in tropical climates for instant, refreshing hydration.',
                image: 'assets/images/Products/greenSemicoconut.jpeg',
                icon: 'bi-geo-alt-fill'
            }
        ],
        crops: ['Chowghat Orange Dwarf', 'Malayan Yellow Dwarf', 'Ganga Bondam', 'Hybrid Palms'],
        reviews: [
            { name: 'Ahmed Khan', location: 'Riyadh, Saudi Arabia', rating: 5, comment: 'Incredibly sweet coconut water. The malai inside was thin and jelly-like, just as described. Very refreshing.' },
            { name: 'Yuki Sato', location: 'Tokyo, Japan', rating: 5, comment: 'Tastes exceptionally fresh, like it was just plucked. The packaging kept it cold and fresh throughout transit.' },
            { name: 'Gabriel Garcia', location: 'Madrid, Spain', rating: 5, comment: 'High water volume per nut. A healthy, natural hydration option that is far better than sugary drinks.' }
        ]
    },
    {
        id: 'p011', code: 'AC-11', name: 'Coconut Seedlings', category: 'Fresh Coconuts',
        badge: 'export',
        images: [
            'assets/images/Products/ageofSeedlings.jpeg',
            'assets/images/Products/NurserySeedlings.jpeg',
            'assets/images/Products/openTopGrowBag4.jpeg',
            'assets/images/Products/tallCoconut.jpeg'
        ],
        description: 'Healthy coconut seedlings suitable for commercial plantations, farms, landscaping projects, and agricultural developments. Grown under controlled nursery conditions for healthy growth and better yield performance.',
        pills: ['Disease-Free', 'Strong Roots', 'High Yielding', 'Tropical Climates', 'Bulk Export'],
        highlights: [
            'Raised in professional disease-free horticultural nursery beds',
            'Bred for early maturity, high nut yield, and pest resistance',
            'Strong, fibrous root systems that anchor securely on transplant',
            'High survival rate in coastal sand, loam, or clay soil fields'
        ],
        specs: [['Plant Height', '2 – 4 ft'], ['Plant Age', '6 – 12 Months'], ['Variety', 'Tall / Hybrid / Dwarf'], ['Root Condition', 'Healthy'], ['Packing', 'Poly Bag / Nursery'], ['Survival Rate', 'High']],
        isNew: false,
        uses: [
            {
                title: 'Commercial Plantation Establishment',
                desc: 'Premium seedlings grown under control nursery conditions, ready for planting on large farming blocks.',
                image: 'assets/images/Products/NurserySeedlings.jpeg',
                icon: 'bi-tree-fill'
            },
            {
                title: 'Agricultural Hybrid Breeding',
                desc: 'Hybrid varieties bred for rapid growth, early yield (within 3-4 years), and disease resistance.',
                image: 'assets/images/Products/tallCoconut.jpeg',
                icon: 'bi-patch-check-fill'
            },
            {
                title: 'Coastal Landscaping & Farming',
                desc: 'Planted along shorelines and coastal farms due to high salt tolerance and soil-binding roots.',
                image: 'assets/images/Products/ageofSeedlings.jpeg',
                icon: 'bi-water'
            }
        ],
        whereUsed: [
            {
                title: 'Agricultural Research Farms',
                desc: 'Grown in nurseries to experiment with dwarfs, tall varieties, and premium crosses.',
                image: 'assets/images/Products/openTopGrowBag4.jpeg',
                icon: 'bi-mortarboard'
            },
            {
                title: 'Coastal Agro-Forestry Projects',
                desc: 'Placed in coastal sands to establish windbreaks and control shoreline sand movements.',
                image: 'assets/images/Products/infrastructure.jpeg',
                icon: 'bi-shield-shaded'
            },
            {
                title: 'Large Private Plantations',
                desc: 'Shipped in crates to establish new coconut estates and replace old, low-yielding palms.',
                image: 'assets/images/Products/infrastructure2.jpeg',
                icon: 'bi-grid-fill'
            }
        ],
        crops: ['Tall Coconut Cultivars', 'Dwarf Cultivars', 'Hybrid Palms', 'TxD Palms'],
        reviews: [
            { name: 'Benjamin Harrison', location: 'Florida, USA', rating: 5, comment: 'Strong, vigorous roots and healthy green leaves. They have established quickly in our sandy coastal soil.' },
            { name: 'Wayan Surya', location: 'Bali, Indonesia', rating: 5, comment: 'Healthy seedlings with excellent root structure. Very high survival rate after transplanting in our orchard.' },
            { name: 'Maria Gonzales', location: 'Manila, Philippines', rating: 5, comment: 'Arrived well-packed and healthy. They are showing rapid growth within just a few weeks of planting.' }
        ]
    }
];

const CAT_META = {
    'Coir Fibre': { icon: 'bi-tree-fill', color: '#2e7d32', bg: '#e8f5e9', desc: 'Natural coir fibre products' },
    'Coco Peat': { icon: 'bi-circle-fill', color: '#e65100', bg: '#fff3e0', desc: 'Growing media & substrates' },
    'Grow Bags': { icon: 'bi-bag-fill', color: '#1565c0', bg: '#e3f2fd', desc: 'Greenhouse & hydroponic bags' },
    'Fresh Coconuts': { icon: 'bi-egg-fill', color: '#6d4c41', bg: '#efebe9', desc: 'Coconuts & seedlings' }
};

const BADGE_META = {
    'new': { cls: 'pcb-new', lbl: 'New' },
    'bestseller': { cls: 'pcb-bestseller', lbl: 'Best Seller' },
    'premium': { cls: 'pcb-premium', lbl: 'Premium' },
    'export': { cls: 'pcb-export', lbl: 'Export Quality' }
};
