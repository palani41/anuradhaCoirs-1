/**
 * ==========================================================================
 * ANURADHA COIRS & FIBRES - INTERACTIVE CHATBOT APPLICATION
 * Features: Product Selection, Detailed Product Cards & Spec Engine
 * Built with jQuery, Bootstrap & Vanilla JavaScript
 * ==========================================================================
 */

$(document).ready(function () {

  // 1. ANURADHA COIRS FULL PRODUCT DATASET (Exact local image paths)
  const PRODUCTS_CATALOG = [
    {
      id: 'p001', code: 'AC-01', name: 'Coir Fibre', category: 'Coir Fibre', badge: 'Export Grade',
      image: 'assets/images/Products/coirfiberNew.jpeg',
      description: 'Premium natural coir fibre extracted from matured coconut husks. High tensile strength, fungal resistance, and hydraulic baled for export.',
      specs: [
        ['Bale Size', '115 × 65 × 45 cm'],
        ['Weight', '110 – 125 kg'],
        ['Fibre Length', '5 – 25 cm'],
        ['Moisture', 'Below 15%'],
        ['Loadability', '180–200 Bales / 40ft HC']
      ],
      crops: ['Mattresses', 'Geotextiles', 'Ropes', 'Hops & Vines']
    },
    {
      id: 'p002', code: 'AC-02', name: 'Coco Peat 5 KG Block', category: 'Coco Peat', badge: 'Low EC & High EC',
      image: 'assets/images/Products/cocopeatblock631.jpeg',
      description: 'Top grade 5kg coco peat blocks for horticulture & bedding. Available in both Low EC (< 0.5 mS/cm) and High EC (2.5 – 3.5 mS/cm) grades per buyer selection.',
      specs: [
        ['Block Size', '30 × 30 × 12 cm'],
        ['Weight', '4.8 – 5 kg'],
        ['Expansion', '70 – 75 Litres'],
        ['Quality Choice', 'Low EC (<0.5 mS/cm) or High EC (2.5-3.5 mS/cm)'],
        ['pH Value', '5.5 – 6.8']
      ],
      crops: ['Tomatoes', 'Strawberries', 'Animal Bedding', 'Soil Amendment']
    },
    {
      id: 'p003', code: 'AC-03', name: 'Coco Peat Bricks 650 Gms', category: 'Coco Peat', badge: 'Low EC & High EC',
      image: 'assets/images/Products/bricks.jpeg',
      description: 'Lightweight briquettes for gardening & soil conditioning. Available in Low EC (< 0.5 mS/cm) washed and High EC (2.5 – 3.5 mS/cm) unwashed.',
      specs: [
        ['Brick Size', '20 × 10 × 5 cm'],
        ['Weight', '650 grams'],
        ['Expansion', '8 – 9 Litres per brick'],
        ['Quality Choice', 'Low EC (<0.5 mS/cm) or High EC (2.5-3.5 mS/cm)'],
        ['pH Value', '5.5 – 6.8']
      ],
      crops: ['Indoor Herbs', 'Seedlings', 'Potting Soil', 'Landscaping']
    },
    {
      id: 'p004', code: 'AC-04 / AC-3A', name: 'Cocopeat Grow Bag Slab', category: 'Grow Bags', badge: 'AC-3A Grade',
      image: 'assets/images/Products/coirGrowBag.jpeg',
      description: 'Premium 100% washed cocopeat grow bag slabs (Grade AC-3A - Almighty Coco Grow Bag) for greenhouse & hydroponic farming.',
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
      crops: ['Hydroponic Tomatoes', 'Capsicum', 'Strawberries', 'Roses & Flowers']
    },
    {
      id: 'p005', code: 'AC-05', name: 'Cocopeat Open Top Grow Bags', category: 'Grow Bags', badge: 'Available Sizes',
      image: 'assets/images/Products/openTopGrowBag4.jpeg',
      description: 'Cocopeat open top grow bags with customizable length, width, height, and volume options from 5 to 36 Litres for nursery trays & containers.',
      specs: [
        ['Length Options', '10 cm / 15 cm / 18 cm / 20 cm / 30 cm'],
        ['Width Options', '10 cm / 15 cm / 18 cm / 20 cm / 30 cm'],
        ['Height Options', '8 cm / 12 cm / 15 cm / 20 cm / 25 cm / 30 cm / 40 cm'],
        ['Volume Options', '5 L / 10 L / 20 L / 36 L (Volume range: 5 to 36 Litres)'],
        ['Customization', 'Custom size matching for nursery trays & greenhouse channels']
      ],
      crops: ['Blueberries', 'Raspberries', 'Roses', 'Tomatoes', 'Nursery Saplings']
    },
    {
      id: 'p006', code: 'AC-06', name: 'Coco Husk Chips', category: 'Coco Peat', badge: 'Low EC & High EC',
      image: 'assets/images/Products/cocoHuskChips.jpeg',
      description: 'Uniform cut coconut husk chips (6-18mm). Available in Low EC for orchids and High EC for mulch and reptile bedding.',
      specs: [
        ['Chip Size', '6mm – 18mm'],
        ['Quality Choice', 'Low EC (<0.5 mS/cm) or High EC (2.5-3.5 mS/cm)'],
        ['Packaging', '5kg Blocks / 25kg Loose Bags'],
        ['Water Holding', '500 – 600%']
      ],
      crops: ['Orchids', 'Anthuriums', 'Landscaping Mulch', 'Terrarium Bedding']
    },
    {
      id: 'p007', code: 'AC-07', name: 'Coco Coins & Discs', category: 'Coco Peat', badge: 'Low EC & High EC',
      image: 'assets/images/Products/cocoPeatCoin.jpeg',
      description: 'Compressed coir discs wrapped in non-woven net for seed propagation trays and gerbera flower pots.',
      specs: [
        ['Diameter', '30mm, 40mm, 50mm, 80mm, 100mm'],
        ['Expansion', 'Expands to full pot height in 15 seconds'],
        ['Wrap', '100% Biodegradable Netting'],
        ['pH', '5.5 – 6.5']
      ],
      crops: ['Flower Propagation', 'Vegetable Seedlings', 'Cuttings']
    },
    {
      id: 'p008', code: 'AC-08', name: 'Semi Husked Coconut', category: 'Fresh Coconuts', badge: 'Fresh Export',
      image: 'assets/images/Products/semiHuskedCoconut.jpeg',
      description: 'Fresh mature coconuts with protective husk cap retained. High water content, thick kernel, and long export shelf life.',
      specs: [
        ['Weight', '550g – 650g+ per nut'],
        ['Nut Size', '12 – 13 inches circumference'],
        ['Packaging', '25 Nuts in Mesh Bag'],
        ['Loadability', '2000 Mesh Bags / 40ft Reefer/HC']
      ],
      crops: ['Culinary Uses', 'Coconut Oil', 'Desiccated Powder']
    },
    {
      id: 'p009', code: 'AC-09', name: 'Fully Husked Coconut', category: 'Fresh Coconuts', badge: 'Clean Shell',
      image: 'assets/images/Products/fullyHuskedCoconut.jpeg',
      description: 'Completely husked brown coconuts with smooth intact shells. Cleaned and graded for immediate commercial processing.',
      specs: [
        ['Weight', '450g – 550g per nut'],
        ['Nut Maturity', '12 to 13 Months Matured'],
        ['Packaging', '25 or 50 Nuts per PP Mesh Bag'],
        ['Shelf Life', 'up to 60 Days']
      ],
      crops: ['Food Processing', 'Confectionery', 'Coconut Milk']
    },
    {
      id: 'p010', code: 'AC-10', name: 'Tender Coconut', category: 'Fresh Coconuts', badge: 'Pure Beverage',
      image: 'assets/images/Products/TenderCoconut.jpeg',
      description: 'Fresh green tender coconuts packed with natural electrolyte water (300ml – 500ml per nut) and thin soft jelly meat.',
      specs: [
        ['Water Volume', '300ml – 500ml'],
        ['Weight', '2.0 kg – 3.0 kg per green nut'],
        ['Packaging', 'Corrugated Crates / Mesh Bags'],
        ['Sweetness', 'High Natural BRIX Level']
      ],
      crops: ['Health Drinks', 'Natural Hydration', 'Resorts & Retail']
    },
    {
      id: 'p011', code: 'AC-11', name: 'Coconut Seedlings', category: 'Fresh Coconuts', badge: 'High Yield',
      image: 'assets/images/Products/NurserySeedlings.jpeg',
      description: 'Vigorous hybrid & tall variety coconut palm nursery seedlings with healthy roots, ready for plantation establishment.',
      specs: [
        ['Height', '2.5 to 4 Feet'],
        ['Variety', 'DxT Hybrid / West Coast Tall / East Coast Tall'],
        ['Fruiting Age', '3.5 to 5 Years'],
        ['Potting', 'Rooted in Soil/Peat Bags']
      ],
      crops: ['Commercial Orchards', 'Farm House Landscaping', 'Agriculture']
    }
  ];

  // 1b. MANUFACTURING PROCESS DATASET
  const MANUFACTURING_PROCESS = [
    {
      step: 1, title: 'Raw Husk Collection & Sourcing',
      image: 'assets/images/Process/huskCollection.jpeg',
      description: 'High-maturity coconut husks are collected directly from verified organic coconut groves across South India.'
    },
    {
      step: 2, title: 'Fibre & Pith Decortication',
      image: 'assets/images/Process/fibreExtraction.jpeg',
      description: 'Husks are fed into mechanical decorticators to extract golden coir fibre and separate the spongy coir pith.'
    },
    {
      step: 3, title: 'Washing, EC Control & Buffering',
      image: 'assets/images/Process/washingBuffering.jpeg',
      description: 'Coir pith is thoroughly washed in clean freshwater lagoons to reduce Electrical Conductivity (EC < 0.5 mS/cm) & balance pH levels.'
    },
    {
      step: 4, title: 'Natural Solar Sun Drying',
      image: 'assets/images/Process/drying.jpeg',
      description: 'Washed coir pith is spread evenly across clean concrete drying yards to dry naturally under intense solar heat until moisture falls below 15%.'
    },
    {
      step: 5, title: '5:1 Hydraulic Block Compression',
      image: 'assets/images/Process/blockMaking.jpeg',
      description: 'Dried peat is sieved to remove fine sand and compressed under 100-ton hydraulic presses into 5kg blocks, briquettes, and grow bags.'
    },
    {
      step: 6, title: 'Laboratory Quality Inspection',
      image: 'assets/images/Process/inspection.jpeg',
      description: 'Every batch undergoes lab testing for expansion ratio (80–85L per 5kg block), EC value, pH balance, and moisture content.'
    },
    {
      step: 7, title: 'Palletization & Export Loading',
      image: 'assets/images/Process/loading.jpeg',
      description: 'Finished coir products are shrink-wrapped, strapped onto wooden pallets, and loaded into 40ft HC export containers at Tuticorin/Chennai port.'
    }
  ];

  // 1c. FREQUENTLY ASKED QUESTIONS (FAQ) DATASET
  const FAQ_CATALOG = [
    {
      id: 'faq_tech_specs',
      question: "What technical specifications (EC, pH, expansion ratio, and sieve size) do your coir substrates meet?",
      keywords: ['specifications', 'technical specs', 'ec level', 'ph level', 'expansion ratio', 'sieve size', 'moisture', 'low ec'],
      answer: "Our coir substrates are engineered to meet strict international horticultural standards:\n\n" +
        "• **Electrical Conductivity (EC)**: Low EC washed grade (< 0.5 mS/cm tested via 1:1.5 extraction) & High EC unwashed grade.\n" +
        "• **pH Level**: Balanced 5.5 – 6.8 range optimal for nutrient uptake in commercial crops.\n" +
        "• **Expansion Ratio**: High volumetric yield of 80 to 85 Litres per 5kg compressed block.\n" +
        "• **Sieve Particle Size**: Sieved to < 10% fiber and sand content (< 2%) for maximum water holding capacity & aeration.",
      chips: ['🌱 Select Products', '📝 Request Spec Sheet', '📜 Certifications', '💬 WhatsApp Sales']
    },
    {
      id: 'faq_growbags_blends',
      question: "How do your Grow Bag Slabs and Coco Husk Chip blends optimize root aeration and moisture retention?",
      keywords: ['grow bag', 'grow bags', 'husk chips', 'blends', 'aeration', 'porosity', 'afp', 'whc', 'uv bag'],
      answer: "Our commercial Grow Bags and Husk Chips are engineered for high-yield greenhouse hydroponics:\n\n" +
        "• **Customized Blends**: Tailored Coco Peat to Husk Chip ratios (e.g. 70:30 or 50:50) to optimize Air-Filled Porosity (AFP 18–25%) and WHC.\n" +
        "• **UV-Stabilized Polybag Slabs**: Heavy-duty co-extruded white/black polybags (2–3 years UV guaranteed) with pre-cut plant, drip & drainage holes.\n" +
        "• **Uniform Chip Grading**: Screened to 8–12mm, 12–18mm, or 18–22mm sizes, preventing compaction & promoting root branching.",
      chips: ['🌱 Select Products', '📝 Request Grow Bag Quote', '📜 Certifications', '💬 WhatsApp Sales']
    },
    {
      id: 'faq3',
      question: "What is your Minimum Order Quantity (MOQ) for international shipments?",
      keywords: ['moq', 'minimum order', 'quantity', 'container', 'fcl', '20ft', '40ft'],
      answer: "Our standard export Minimum Order Quantity is **1 × 20ft FCL (Full Container Load)** containing approx. 11–13 Metric Tons.\n\n" +
        "For **40ft High Cube containers**, the loading capacity is 24–26 Metric Tons.\n\n" +
        "We also accept **mixed-product containers** (combining 5kg blocks, grow bags, and husk chips in a single container) to optimize buyer inventory.",
      chips: ['📝 Get Instant Quote', '🚢 Export Ports', '💬 Chat on WhatsApp']
    },
    {
      id: 'faq4',
      question: "Do you offer OEM private labeling, custom branding, and packaging?",
      keywords: ['oem', 'private label', 'custom branding', 'packaging', 'custom size', 'label'],
      answer: "Yes! We specialize in OEM contract manufacturing for overseas distributors, retail chains, and commercial growers:\n\n" +
        "• Custom printed shrink wrap & retail color labels\n" +
        "• Custom grow bag slab dimensions & pre-cut drainage holes\n" +
        "• Tailored Peat-to-Husk ratio blends (e.g. 70/30, 50/50)\n" +
        "• Private label barcoding & multi-language instruction sheets",
      chips: ['📝 Request OEM Quote', '🌱 Select Products', '💬 Chat on WhatsApp']
    },
    {
      id: 'faq5',
      question: "Which ports do you export from and what are typical transit lead times?",
      keywords: ['ports', 'shipping ports', 'lead time', 'transit', 'tuticorin', 'chennai', 'cochin'],
      answer: "We export directly from prime South Indian sea ports: **Tuticorin (VOC Port), Chennai Port, and Cochin Port**.\n\n" +
        "Average transit lead times after container loading:\n" +
        "• **Middle East & Gulf**: 7 – 12 Days\n" +
        "• **Europe & UK**: 18 – 25 Days\n" +
        "• **North America**: 25 – 35 Days\n" +
        "• **Australia & Far East Asia**: 14 – 22 Days",
      chips: ['📦 MOQ & Export', '📝 Get Instant Quote', '💬 Chat on WhatsApp']
    },
    {
      id: 'faq6',
      question: "What export certifications and phytosanitary documents are provided?",
      keywords: ['certification', 'certificate', 'phytosanitary', 'fumigation', 'coo', 'origin'],
      answer: "Every export shipment from Anuradha Coirs is strictly inspected and accompanied by full official documentation:\n\n" +
        "✔ Government Phytosanitary Certificate\n" +
        "✔ Fumigation Certificate (Methyl Bromide / Heat Treated)\n" +
        "✔ Certificate of Origin (COO / Coir Board)\n" +
        "✔ Laboratory Test Report (EC, pH, Moisture & Sand %)",
      chips: ['📜 Certifications', '📝 Get Instant Quote', '💬 Chat on WhatsApp']
    },
    {
      id: 'faq_sampling',
      question: "Is sampling available?",
      keywords: ['sample', 'sampling', 'samples', 'test sample', 'product sample', 'sample available'],
      answer: "Yes, product samples are available! You can discuss directly with our export team to request specific product samples tailored to your required specifications before placing bulk container orders.",
      chips: ['📝 Get Instant Quote', '💬 Chat on WhatsApp']
    },
    {
      id: 'faq_import',
      question: "How do I import Coco Peat and Coir products in bulk?",
      keywords: ['import', 'bulk import', 'how to import', 'importing', 'bulk order', 'import process'],
      answer: "Importing Coco Peat in bulk with Anuradha Coirs is simple and supported step-by-step:\n\n" +
        "1. **Specify Requirements**: Share your required specs (5kg blocks, grow bags, Low/High EC, and quantity).\n" +
        "2. **Quotation & Samples**: Receive FOB/CIF pricing and quality samples.\n" +
        "3. **Order Processing**: Upon deposit or L/C confirmation, we compress, inspect, and package your order.\n" +
        "4. **Documentation & Dispatch**: We provide full phytosanitary clearance, fumigation, COO, and container shipping.",
      chips: ['📦 MOQ & Export', '📝 Get Instant Quote', '💬 Chat on WhatsApp']
    }
  ];

  // 2. INJECT CHATBOT HTML WIDGET IF NOT PRESENT
  if ($('#coir-chatbot-widget').length === 0) {
    const chatbotHtml = `
      <div id="coir-chatbot-widget">
        <!-- Floating Tooltip + Launcher Button -->
        <div class="chatbot-launcher-container">
          <div class="chatbot-tooltip" id="cbTooltip">
            <span class="dot"></span> Need help? Chat with us! 💬
          </div>
          <button class="chatbot-launcher-btn" id="cbLauncherBtn" title="Open Chatbot" aria-label="Open Chatbot">
            <i class="bi bi-chat-dots-fill icon-chat"></i>
            <i class="bi bi-x-lg icon-close"></i>
            <span class="badge-ping" id="cbBadge"></span>
          </button>
        </div>

        <!-- Chatbot Window -->
        <div class="chatbot-window" id="cbWindow" role="dialog" aria-labelledby="cbHeaderTitle">
          <!-- Header -->
          <div class="chatbot-header">
            <div class="chatbot-header-info">
              <img src="assets/images/logo/favicon.png" alt="Anuradha Coirs" class="chatbot-avatar" onerror="this.src='https://cdn-icons-png.flaticon.com/512/4712/4712035.png'">
              <div class="chatbot-title-box">
                <h5 id="cbHeaderTitle">Anuradha Coirs AI</h5>
                <p><span class="online-indicator"></span> Online • Coir Expert Assistant</p>
              </div>
            </div>
            <div class="chatbot-header-actions">
              <button class="chatbot-action-btn" id="cbResetBtn" title="Clear Conversation"><i class="bi bi-arrow-counterclockwise"></i></button>
              <button class="chatbot-action-btn" id="cbMinimizeBtn" title="Minimize Chat"><i class="bi bi-dash-lg"></i></button>
            </div>
          </div>

          <!-- Body / Messages Area -->
          <div class="chatbot-body" id="cbBody">
            <!-- Messages render dynamically here -->
          </div>

          <!-- Footer Input -->
          <form class="chatbot-footer" id="cbForm" onsubmit="return false;">
            <input type="text" class="chatbot-input" id="cbInput" placeholder="Ask about products, specs, FAQ...." autocomplete="off">
            <button type="submit" class="chatbot-send-btn" id="cbSendBtn" aria-label="Send Message">
              <i class="bi bi-send-fill"></i>
            </button>
          </form>

          <div class="chatbot-footer-brand">
            Powered by <a href="index.html" target="_blank">Anuradha Coirs</a> South India
          </div>
        </div>
      </div>
    `;

    $('body').append(chatbotHtml);
  }

  // 3. KNOWLEDGE BASE & INTENT MATCHER
  const KNOWLEDGE_BASE = [
    {
      keywords: ['hello', 'hi', 'hey', 'greetings', 'namaste', 'start', 'help'],
      response: "Hello! Welcome to **Anuradha Coirs** 🌱. We are a leading manufacturer and exporter of premium coco peat, coir fibre, grow bags & husk chips from South India. How can I assist you today?",
      chips: ['❓ FAQ', '🌱 Select Products', '📦 MOQ & Export', '📜 Certifications', '📝 Get Instant Quote', '💬 Chat on WhatsApp']
    },
    {
      keywords: ['faq', 'frequently asked', 'question', 'questions', 'answers', 'got questions'],
      response: "SHOW_FAQ_MENU",
      chips: ['🌱 Select Products', '📦 MOQ & Export', '📝 Get Instant Quote']
    },
    {
      keywords: ['product', 'products', 'catalog', 'list', 'items', 'select product', 'select products', 'all products', 'range'],
      response: "BROWSE_PRODUCTS_MENU", // Trigger custom product menu renderer
      chips: ['📦 MOQ & Export', '⚙️ Manufacturing Process', '📝 Get Instant Quote']
    },
    {
      keywords: ['process', 'manufacturing', 'factory', 'how its made', 'how it is made', 'steps', 'decortication', 'drying', 'washing'],
      response: "SHOW_MANUFACTURING_PROCESS",
      chips: ['🌱 Select Products', '📝 Get Instant Quote', '💬 Chat on WhatsApp']
    },
    {
      keywords: ['coco peat', 'cocopeat', 'pith', '5kg block', 'briquette', 'peat'],
      response: "We produce top-grade **Coco Peat (Coir Pith)** in various formats:\n\n" +
        "• **5kg Blocks**: Low EC (<0.5 mS/cm) & High EC, washed/unwashed.\n" +
        "• **650g Briquettes**: Ideal for home gardening & retail.\n" +
        "• **Coco Peat Grow Bags**: Customized sizes for greenhouse horticulture.\n" +
        "• **Expansion**: High volume (80–85 Litres per 5kg block).\n\n" +
        "Select a product below to view detailed specifications and images:",
      chips: ['🌱 Select Products', '📝 Request Coco Peat Quote', '📦 Minimum Order Quantity', '💬 WhatsApp Sales']
    },
    {
      keywords: ['about', 'history', 'founder', 'director', 'established', 'founded', 'company story', 'who are you', 'background'],
      response: "🏛️ **About Anuradha Coirs**:\n\n" +
        "Founded in 2016, **Anuradha Coirs** has completed nearly a decade of manufacturing excellence in premium coco peat products.\n\n" +
        "• **Leadership**: Founder **A. Aathi Ganesan**, Director **M. Karthikeyan**, and Co-Director **A. Anu Radha**.\n" +
        "• **Specialization**: 5kg coco peat blocks, 650g briquettes, husk chips, coir coins/discs, and grow bags.\n" +
        "• **Mission**: Providing sustainable, high-performance coir solutions for global agriculture & horticulture.",
      chips: ['🌱 Select Products', '📝 Get Instant Quote', '💬 Chat on WhatsApp']
    },
    {
      keywords: ['fibre', 'fiber', 'coir fibre', 'coir fiber', 'bales', 'mattress fibre'],
      response: "SHOW_PRODUCT_DETAIL_p001",
      chips: ['🌱 Select Products', '📝 Quote for Fibre', '🌐 Export Ports', '💬 WhatsApp Sales']
    },
    {
      keywords: ['husk chips', 'chips', 'coconut chips', 'orchid mix', 'mulch'],
      response: "SHOW_PRODUCT_DETAIL_p006",
      chips: ['🌱 Select Products', '📝 Quote for Husk Chips', '💬 WhatsApp Sales']
    },
    {
      keywords: ['moq', 'minimum order', 'order', 'quantity', 'container', 'fcl', 'shipping', 'export', 'port'],
      response: "📦 **MOQ & Export Details**:\n\n" +
        "• **Minimum Order Quantity**: 1 Full Container Load (FCL) — 20ft or 40ft High Cube Container.\n" +
        "• **Loading Capacity**: Approx. 22-26 Metric Tons per 40ft HC for 5kg blocks.\n" +
        "• **Ports of Origin**: Tuticorin Port (VO Chidambaranar) & Chennai Port, India.\n" +
        "• **Worldwide Export**: Serving USA, Europe, Middle East, Asia, Australia & South America.",
      chips: ['🌱 Select Products', '📝 Request Formal Quote', '📜 Certifications', '💬 WhatsApp Sales']
    },
    {
      keywords: ['spec', 'specification', 'quality', 'certification', 'certificate', 'ph', 'ec'],
      response: "📜 **Quality Standards & Certifications**:\n\n" +
        "• **EC Level**: Low EC (<0.5 mS/cm) & High EC options.\n" +
        "• **pH Range**: 5.5 to 6.8 (ideal for plant growth).\n" +
        "• **Moisture**: Below 15%.\n" +
        "• **Certificates**: Phytosanitary Certificate, Certificate of Origin, Fumigation Certificate, and Coir Board Quality Approval.",
      chips: ['🌱 Select Products', '📝 Get Instant Quote', '💬 WhatsApp Sales']
    },
    {
      keywords: ['quote', 'price', 'cost', 'inquiry', 'enquiry', 'buy', 'sample'],
      response: "📍 **Anuradha Coirs**\n\n" +
        "• **Location**: South India (Tamil Nadu)\n" +
        "• **Enquiry Email**: info@anuradhacoirs.com\n" +
        "• **Orders & Process**: exports@anuradhacoirs.com\n" +
        "• **India Phone / WhatsApp**: +91 99448 59177 / +91 89407 87924\n" +
        "• **UK Support**: +44 7466 435508\n" +
        "• **US Support**: +1 (206) 391-9622\n" +
        "• **Working Hours**: Monday – Saturday (9:00 AM – 7:00 PM IST)",
      chips: ['🌱 Select Products', '📝 Get Instant Quote', '💬 Open WhatsApp', '📧 Email Us']
    },
    {
      keywords: ['contact', 'location', 'address', 'phone', 'email', 'factory', 'where'],
      response: "📍 **Anuradha Coirs**\n\n" +
        "• **Location**: South India (Tamil Nadu)\n" +
        "• **Email**: info@anuradhacoirs.com\n" +
        "• **India Phone / WhatsApp**: +91 99448 59177 / +91 89407 87924\n" +
        "• **UK Support**: +44 7466 435508\n" +
        "• **US Support**: +1 (206) 391-9622\n" +
        "• **Working Hours**: Monday – Saturday (9:00 AM – 7:00 PM IST)",
      chips: ['🌱 Select Products', '📝 Get Instant Quote', '💬 Open WhatsApp', '📧 Email Us']
    }
  ];

  // 4. INITIAL SETUP & STATE MANAGEMENT
  const $window = $('#cbWindow');
  const $launcher = $('#cbLauncherBtn');
  const $tooltip = $('#cbTooltip');
  const $badge = $('#cbBadge');
  const $body = $('#cbBody');
  const $input = $('#cbInput');

  let isTyping = false;

  // Restore session chat or set initial welcome message
  const savedChat = sessionStorage.getItem('anuradha_cb_history');
  if (savedChat) {
    $body.html(savedChat);
    bindDynamicEvents();
  } else {
    showInitialWelcome();
  }

  // Hide tooltip after 8 seconds
  setTimeout(function () {
    $tooltip.fadeOut(400);
  }, 8000);

  // 5. EVENT LISTENERS
  $launcher.on('click', function () {
    toggleChatbot();
  });

  $tooltip.on('click', function () {
    toggleChatbot(true);
  });

  $('#cbMinimizeBtn').on('click', function () {
    toggleChatbot(false);
  });

  $('#cbResetBtn').on('click', function () {
    sessionStorage.removeItem('anuradha_cb_history');
    $body.empty();
    showInitialWelcome();
  });

  function handleUserSend() {
    const text = $input.val().trim();
    if (text && !isTyping) {
      sendMessage(text);
      $input.val('');
    }
  }

  $(document).on('click', '#cbSendBtn', function (e) {
    e.preventDefault();
    handleUserSend();
  });

  $('#cbForm').on('submit', function (e) {
    e.preventDefault();
    handleUserSend();
  });

  $input.on('keypress', function (e) {
    if (e.which === 13) {
      e.preventDefault();
      handleUserSend();
    }
  });

  // Delegate click for Quick Action Chips & Product Select Buttons
  $(document).on('click', '.cb-chip', function () {
    const chipText = $(this).text().trim();

    if (chipText.includes('FAQ') || chipText.includes('Frequently Asked Questions') || chipText.includes('Questions')) {
      appendUserMessage(chipText);
      renderFaqMenu();
      return;
    }

    if (chipText.includes('Chat on WhatsApp') || chipText.includes('WhatsApp Sales') || chipText.includes('Open WhatsApp')) {
      window.open('https://api.whatsapp.com/send?phone=919944859177&text=' + encodeURIComponent('Hi! I am interested in Anuradha Coirs products and would like to make an inquiry.'), '_blank');
      return;
    }

    if (chipText.includes('Email Inquiry') || chipText.includes('Email Us')) {
      window.location.href = 'mailto:info@anuradhacoirs.com?subject=Product%20Inquiry%20-%20Anuradha%20Coirs';
      return;
    }

    if (chipText.includes('Request Quote') || chipText.includes('Get Instant Quote') || chipText.includes('Open Inquiry Form')) {
      appendUserMessage(chipText);
      renderInquiryFormCard();
      return;
    }

    if (chipText.includes('Select Products') || chipText.includes('Select Product') || chipText.includes('Browse Products')) {
      appendUserMessage(chipText);
      renderProductSelectionMenu();
      return;
    }

    if (chipText.includes('Process') || chipText.includes('Manufacturing')) {
      appendUserMessage(chipText);
      renderManufacturingProcessMenu();
      return;
    }

    sendMessage(chipText);
  });

  // Delegate click for FAQ Question Buttons
  $(document).on('click', '.cb-faq-btn', function () {
    const faqId = $(this).data('faq-id');
    const faqItem = FAQ_CATALOG.find(f => f.id === faqId);
    if (faqItem) {
      appendUserMessage(faqItem.question);
      showTypingIndicator();
      setTimeout(function () {
        removeTypingIndicator();
        appendBotMessage(faqItem.answer, faqItem.chips);
      }, 500);
    }
  });

  // Delegate click for Product Selection Items
  $(document).on('click', '.cb-product-select-btn', function () {
    const prodId = $(this).data('prod-id');
    const prodName = $(this).data('prod-name');
    appendUserMessage(`Selected: ${prodName}`);
    renderProductDetailCardById(prodId);
  });

  // Delegate click for Process Step Selection Items
  $(document).on('click', '.cb-process-step-btn', function () {
    const stepId = $(this).data('step-id');
    const stepTitle = $(this).data('step-title');
    appendUserMessage(`Selected Step: ${stepTitle}`);
    renderProcessStepDetail(stepId);
  });

  // Delegate click for Product Card Quote Request
  $(document).on('click', '.cb-prod-quote-btn', function () {
    const prodName = $(this).data('prod-name');
    appendUserMessage(`Request Quote for ${prodName}`);
    renderInquiryFormCard(prodName);
  });

  // 6. CORE FUNCTIONS

  function toggleChatbot(forceState) {
    const isOpen = forceState !== undefined ? forceState : !$window.hasClass('open');
    if (isOpen) {
      $window.addClass('open');
      $launcher.addClass('active');
      $badge.hide();
      $tooltip.fadeOut(200);
      $input.focus();
      scrollToBottom();
    } else {
      $window.removeClass('open');
      $launcher.removeClass('active');
    }
  }

  function showInitialWelcome() {
    const welcomeHtml = `
      <div class="cb-msg bot">
        <div class="cb-msg-bubble">
          <strong>Welcome to Anuradha Coirs!</strong> 🌱<br><br>
          We manufacture &amp; export premium <strong>Coco Peat, Coir Fibre, Grow Bags, Coconut Husk Chips &amp; Fresh Coconuts</strong> worldwide.<br><br>
          Select an option below to explore FAQs, products, specs, or our manufacturing process!
        </div>
        <div class="cb-msg-time">${getCurrentTime()}</div>
      </div>
      <div class="chatbot-chips">
        <button class="cb-chip">❓ FAQ</button>
        <button class="cb-chip">🌱 Select Products</button>
        <button class="cb-chip">⚙️ Manufacturing Process</button>
        <button class="cb-chip">📦 MOQ &amp; Export</button>
        <button class="cb-chip">📝 Get Instant Quote</button>
        <button class="cb-chip">💬 Chat on WhatsApp</button>
      </div>
    `;
    $body.append(welcomeHtml);
    saveChatState();
  }

  function sendMessage(text) {
    appendUserMessage(text);
    showTypingIndicator();

    setTimeout(function () {
      removeTypingIndicator();

      // Check if user specifically entered a product code or name
      const matchedProd = PRODUCTS_CATALOG.find(p =>
        text.toLowerCase().includes(p.code.toLowerCase()) ||
        text.toLowerCase().includes(p.name.toLowerCase())
      );

      if (matchedProd) {
        renderProductDetailCardObj(matchedProd);
        return;
      }

      // Check if user specifically matched a question in FAQ catalog
      const matchedFaq = FAQ_CATALOG.find(f =>
        f.keywords.some(kw => text.toLowerCase().includes(kw))
      );

      if (matchedFaq && (text.toLowerCase().includes('faq') || text.toLowerCase().includes('question') || text.length > 8)) {
        appendBotMessage(matchedFaq.answer, matchedFaq.chips);
        return;
      }

      const botResponse = matchResponse(text);

      if (botResponse.response === "BROWSE_PRODUCTS_MENU") {
        renderProductSelectionMenu();
      } else if (botResponse.response === "SHOW_FAQ_MENU") {
        renderFaqMenu();
      } else if (botResponse.response === "SHOW_MANUFACTURING_PROCESS") {
        renderManufacturingProcessMenu();
      } else if (botResponse.response.startsWith("SHOW_PRODUCT_DETAIL_")) {
        const pId = botResponse.response.replace("SHOW_PRODUCT_DETAIL_", "");
        renderProductDetailCardById(pId);
      } else {
        appendBotMessage(botResponse.response, botResponse.chips, botResponse.card);
      }

    }, 600 + Math.random() * 300);
  }

  function appendUserMessage(text) {
    const html = `
      <div class="cb-msg user">
        <div class="cb-msg-bubble">${escapeHtml(text)}</div>
        <div class="cb-msg-time">${getCurrentTime()}</div>
      </div>
    `;
    $body.append(html);
    scrollToBottom();
    saveChatState();
  }

  function appendBotMessage(text, chips, card) {
    let formattedText = escapeHtml(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');

    let chipsHtml = '';
    if (chips && chips.length > 0) {
      chipsHtml = '<div class="chatbot-chips">';
      chips.forEach(chip => {
        chipsHtml += `<button class="cb-chip">${chip}</button>`;
      });
      chipsHtml += '</div>';
    }

    let cardHtml = card ? card : '';

    const html = `
      <div class="cb-msg bot">
        <div class="cb-msg-bubble">${formattedText}${cardHtml}</div>
        <div class="cb-msg-time">${getCurrentTime()}</div>
      </div>
      ${chipsHtml}
    `;

    $body.append(html);
    scrollToBottom();
    saveChatState();
  }

  // RENDER INTERACTIVE FAQ MENU
  function renderFaqMenu() {
    showTypingIndicator();
    setTimeout(function () {
      removeTypingIndicator();

      let faqButtonsHtml = '';
      FAQ_CATALOG.forEach((f, idx) => {
        faqButtonsHtml += `
          <button class="cb-faq-btn" data-faq-id="${f.id}">
            <span style="color:#b8975a;font-weight:700;">Q${idx + 1}.</span>
            <span>${escapeHtml(f.question)}</span>
          </button>
        `;
      });

      const html = `
        <div class="cb-msg bot">
          <div class="cb-msg-bubble">
            <strong>❓ Frequently Asked Questions (FAQ)</strong>
            <p style="margin:4px 0 8px 0;font-size:0.8rem;color:#475569;">Click on any question below to view quick detailed answers regarding products, exports, shipping &amp; customization:</p>
            <div class="cb-faq-menu">
              ${faqButtonsHtml}
            </div>
          </div>
          <div class="cb-msg-time">${getCurrentTime()}</div>
        </div>
        <div class="chatbot-chips">
          <button class="cb-chip">🌱 Select Products</button>
          <button class="cb-chip">📝 Get Instant Quote</button>
          <button class="cb-chip">💬 Chat on WhatsApp</button>
        </div>
      `;

      $body.append(html);
      scrollToBottom();
      saveChatState();
    }, 500);
  }

  // RENDER PRODUCT CATALOG SELECTION MENU
  function renderProductSelectionMenu() {
    showTypingIndicator();
    setTimeout(function () {
      removeTypingIndicator();

      let menuItemsHtml = '';
      PRODUCTS_CATALOG.forEach(p => {
        menuItemsHtml += `
          <button class="cb-product-select-btn" data-prod-id="${p.id}" data-prod-name="${escapeHtml(p.name)}">
            <span><i class="bi bi-box-seam me-1"></i> ${escapeHtml(p.name)}</span>
            <span class="code-tag">${p.code}</span>
          </button>
        `;
      });

      const html = `
        <div class="cb-msg bot">
          <div class="cb-msg-bubble">
            <strong>🌱 Select a Product from Our Catalog:</strong>
            <p style="margin:4px 0 8px 0;font-size:0.8rem;color:#475569;">Click on any product to inspect detailed specifications, images, and quick export quote options:</p>
            <div class="cb-product-menu">
              ${menuItemsHtml}
            </div>
          </div>
          <div class="cb-msg-time">${getCurrentTime()}</div>
        </div>
        <div class="chatbot-chips">
          <button class="cb-chip">📝 Get Instant Quote</button>
          <button class="cb-chip">💬 Chat on WhatsApp</button>
        </div>
      `;

      $body.append(html);
      scrollToBottom();
      saveChatState();
    }, 500);
  }

  // RENDER DETAILED PRODUCT CARD BY ID
  function renderProductDetailCardById(prodId) {
    const prod = PRODUCTS_CATALOG.find(p => p.id === prodId) || PRODUCTS_CATALOG[0];
    renderProductDetailCardObj(prod);
  }

  function renderProductDetailCardObj(prod) {
    showTypingIndicator();
    setTimeout(function () {
      removeTypingIndicator();

      // Build Specs Rows with stacked layout
      let specsRows = '';
      prod.specs.forEach(s => {
        specsRows += `
          <div class="cb-spec-item">
            <span class="cb-spec-label">${escapeHtml(s[0])}</span>
            <span class="cb-spec-value">${escapeHtml(s[1])}</span>
          </div>
        `;
      });

      // Build Crop Tags
      let cropTagsHtml = '';
      if (prod.crops && prod.crops.length > 0) {
        cropTagsHtml = '<div class="cb-crops-box"><div class="cb-crops-title">Suitable Crops &amp; Uses:</div><div class="cb-crops-list">';
        prod.crops.forEach(c => {
          cropTagsHtml += `<span class="cb-crop-tag">${escapeHtml(c)}</span>`;
        });
        cropTagsHtml += '</div></div>';
      }

      const cardHtml = `
        <div class="cb-msg bot">
          <div class="cb-msg-bubble" style="padding:0; overflow:hidden;">
            <div class="cb-product-card">
              <div class="cb-prod-banner-container">
                <img src="${prod.image}" alt="${escapeHtml(prod.name)}" class="cb-prod-banner-img" onerror="this.src='assets/images/Products/cocopeatblock631.jpeg'">
                <div class="cb-prod-banner-badges">
                  <span class="cb-prod-code-badge">${prod.code}</span>
                  <span class="cb-prod-badge">${prod.badge}</span>
                </div>
              </div>

              <div class="cb-prod-content">
                <h6 class="cb-prod-title">${escapeHtml(prod.name)}</h6>
                <div class="cb-prod-desc">${escapeHtml(prod.description)}</div>

                <div class="cb-specs-box">
                  <div class="cb-specs-title"><i class="bi bi-sliders me-1"></i> Technical Specifications</div>
                  <div class="cb-specs-list">
                    ${specsRows}
                  </div>
                </div>

                ${cropTagsHtml}

                <button class="cb-card-btn cb-prod-quote-btn" data-prod-name="${escapeHtml(prod.name)}">
                  <i class="bi bi-file-earmark-text-fill me-1"></i> Request Quote for ${escapeHtml(prod.name)}
                </button>
                <a href="product-detail.html?id=${prod.id}" target="_blank" class="cb-card-btn" style="background:#0F766E;">
                  <i class="bi bi-box-arrow-up-right me-1"></i> View Product Page
                </a>
                <button class="cb-card-btn wa-btn-chat" onclick="window.open('https://api.whatsapp.com/send?phone=919944859177&text=${encodeURIComponent('Hi! I am interested in ' + prod.name + ' (' + prod.code + '). Please send me prices & availability.')}','_blank')">
                  <i class="bi bi-whatsapp me-1"></i> Inquire via WhatsApp
                </button>
              </div>
            </div>
          </div>
          <div class="cb-msg-time">${getCurrentTime()}</div>
        </div>
        <div class="chatbot-chips">
          <button class="cb-chip">🌱 Select Products</button>
          <button class="cb-chip">📦 MOQ &amp; Export</button>
          <button class="cb-chip">💬 Chat on WhatsApp</button>
        </div>
      `;

      $body.append(cardHtml);
      scrollToBottom();
      saveChatState();
    }, 600);
  }

  // RENDER MANUFACTURING PROCESS MENU
  function renderManufacturingProcessMenu() {
    showTypingIndicator();
    setTimeout(function () {
      removeTypingIndicator();

      let stepsListHtml = '';
      MANUFACTURING_PROCESS.forEach(s => {
        stepsListHtml += `
          <button class="cb-process-step-btn" data-step-id="${s.step}" data-step-title="${escapeHtml(s.title)}">
            <span class="cb-step-badge">${s.step}</span>
            <span>${escapeHtml(s.title)}</span>
          </button>
        `;
      });

      const html = `
        <div class="cb-msg bot">
          <div class="cb-msg-bubble">
            <strong>⚙️ Anuradha Coirs Manufacturing &amp; Export Process</strong>
            <p style="margin:4px 0 8px 0;font-size:0.8rem;color:#475569;">From raw coconut husk sourcing to export container loading, we follow strict ISO quality standards. Click any step below to view factory photos &amp; process details:</p>
            <div class="cb-process-menu">
              ${stepsListHtml}
            </div>
          </div>
          <div class="cb-msg-time">${getCurrentTime()}</div>
        </div>
        <div class="chatbot-chips">
          <button class="cb-chip">🌱 Select Products</button>
          <button class="cb-chip">📝 Get Instant Quote</button>
          <button class="cb-chip">💬 Chat on WhatsApp</button>
        </div>
      `;

      $body.append(html);
      scrollToBottom();
      saveChatState();
    }, 500);
  }

  // RENDER PROCESS STEP DETAIL CARD
  function renderProcessStepDetail(stepId) {
    showTypingIndicator();
    setTimeout(function () {
      removeTypingIndicator();

      const step = MANUFACTURING_PROCESS.find(s => s.step === parseInt(stepId)) || MANUFACTURING_PROCESS[0];

      const html = `
        <div class="cb-msg bot">
          <div class="cb-msg-bubble" style="padding:0; overflow:hidden;">
            <div class="cb-process-card">
              <div class="cb-process-img-container">
                <img src="${step.image}" alt="${escapeHtml(step.title)}" class="cb-process-img" onerror="this.src='assets/images/Products/cocopeatblock631.jpeg'">
                <span class="cb-process-tag">Step ${step.step} of 7</span>
              </div>

              <div class="cb-process-body">
                <h6 class="cb-process-title">${escapeHtml(step.title)}</h6>
                <div class="cb-process-desc">${escapeHtml(step.description)}</div>

                <a href="process.html" target="_blank" class="cb-card-btn" style="background:#0F766E;">
                  <i class="bi bi-play-circle-fill me-1"></i> View Full Factory Process Page
                </a>
              </div>
            </div>
          </div>
          <div class="cb-msg-time">${getCurrentTime()}</div>
        </div>
        <div class="chatbot-chips">
          <button class="cb-chip">⚙️ Manufacturing Process</button>
          <button class="cb-chip">🌱 Select Products</button>
          <button class="cb-chip">💬 Chat on WhatsApp</button>
        </div>
      `;

      $body.append(html);
      scrollToBottom();
      saveChatState();
    }, 600);
  }

  function renderInquiryFormCard(preselectedProduct) {
    showTypingIndicator();
    setTimeout(function () {
      removeTypingIndicator();

      const selectedProd = preselectedProduct || 'Coco Peat 5kg Blocks';

      let selectOptionsHtml = '';
      PRODUCTS_CATALOG.forEach(p => {
        const isSelected = (p.name.toLowerCase() === selectedProd.toLowerCase()) ? 'selected' : '';
        selectOptionsHtml += `<option value="${escapeHtml(p.name)}" ${isSelected}>${escapeHtml(p.name)} (${p.code})</option>`;
      });

      const formCardHtml = `
        <div class="cb-msg bot">
          <div class="cb-msg-bubble">
            <strong>📝 Quick Export Inquiry Form</strong>
            <p style="margin:4px 0 8px 0;font-size:0.8rem;color:#475569;">Fill in your details below and our sales export team will respond immediately:</p>
            <div class="cb-form">
              <label>Your Name *</label>
              <input type="text" id="cbfName" placeholder="John Doe">
              
              <label>WhatsApp / Mobile No *</label>
              <input type="tel" id="cbfPhone" placeholder="+1 234 567 890">

              <label>Product Interest *</label>
              <select id="cbfProduct">
                ${selectOptionsHtml}
              </select>

              <label>Quantity / Requirements</label>
              <input type="text" id="cbfQty" placeholder="e.g. 1 x 40ft HC Container">

              <button type="button" class="cb-form-submit" id="cbfSubmitBtn">Send Inquiry via WhatsApp</button>
            </div>
          </div>
          <div class="cb-msg-time">${getCurrentTime()}</div>
        </div>
      `;
      $body.append(formCardHtml);
      scrollToBottom();
      saveChatState();

      // Bind inline submit handler
      $('#cbfSubmitBtn').off('click').on('click', function () {
        const name = $('#cbfName').val().trim();
        const phone = $('#cbfPhone').val().trim();
        const product = $('#cbfProduct').val();
        const qty = $('#cbfQty').val().trim() || '1 Container';

        if (!name || !phone) {
          alert('Please enter your Name and WhatsApp/Mobile number.');
          return;
        }

        const msgText = `Hi Anuradha Coirs!%0A*Name:* ${encodeURIComponent(name)}%0A*Mobile:* ${encodeURIComponent(phone)}%0A*Product:* ${encodeURIComponent(product)}%0A*Quantity:* ${encodeURIComponent(qty)}%0A*Source:* Website Chatbot Inquiry`;

        window.open(`https://api.whatsapp.com/send?phone=919944859177&text=${msgText}`, '_blank');

        appendBotMessage(`Thank you, **${name}**! Your inquiry for **${product}** has been sent to our export manager on WhatsApp. We will contact you shortly.`, [
          '🌱 Select Products', '📦 MOQ & Export', '💬 Chat on WhatsApp'
        ]);
      });

    }, 600);
  }

  function matchResponse(userText) {
    const textLower = userText.toLowerCase();

    for (let item of KNOWLEDGE_BASE) {
      for (let kw of item.keywords) {
        if (textLower.includes(kw)) {
          return item;
        }
      }
    }

    // Default fallback
    return {
      response: "Thank you for reaching out! I want to ensure you get precise details regarding your query.\n\n" +
        "You can browse our product catalog below, request a custom bulk quote, or connect directly with our export team on WhatsApp.",
      chips: ['🌱 Select Products', '📦 MOQ & Export', '📝 Get Instant Quote', '💬 Chat on WhatsApp']
    };
  }

  function showTypingIndicator() {
    isTyping = true;
    const typingHtml = `
      <div class="cb-msg bot" id="cbTypingElem">
        <div class="cb-typing">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    $body.append(typingHtml);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    isTyping = false;
    $('#cbTypingElem').remove();
  }

  function scrollToBottom() {
    $body.scrollTop($body[0].scrollHeight);
  }

  function saveChatState() {
    const clone = $body.clone();
    clone.find('#cbTypingElem').remove();
    sessionStorage.setItem('anuradha_cb_history', clone.html());
  }

  function bindDynamicEvents() {
    // Re-bind form submit handler if restored from session storage
    $('#cbfSubmitBtn').off('click').on('click', function () {
      const name = $('#cbfName').val().trim();
      const phone = $('#cbfPhone').val().trim();
      const product = $('#cbfProduct').val();
      const qty = $('#cbfQty').val().trim() || '1 Container';

      if (!name || !phone) {
        alert('Please enter your Name and WhatsApp/Mobile number.');
        return;
      }

      const msgText = `Hi Anuradha Coirs!%0A*Name:* ${encodeURIComponent(name)}%0A*Mobile:* ${encodeURIComponent(phone)}%0A*Product:* ${encodeURIComponent(product)}%0A*Quantity:* ${encodeURIComponent(qty)}%0A*Source:* Website Chatbot Inquiry`;

      window.open(`https://api.whatsapp.com/send?phone=919944859177&text=${msgText}`, '_blank');
    });
  }

  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  }

  function escapeHtml(text) {
    return $('<div>').text(text).html();
  }
});
