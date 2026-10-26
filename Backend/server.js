import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Persistent Data Storage Directory
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

function readJSON(file, defaultData = []) {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const content = fs.readFileSync(file, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return defaultData;
  }
}

function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error writing to ${file}:`, err);
  }
}

// ==========================================
// SEED PACKAGES & DESTINATIONS DATA
// ==========================================
const DESTINATIONS = [
  {
    id: 'west',
    name: 'West India',
    tagline: 'Royal Forts & Desert Horizons',
    theme: 'amber',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80',
    spots: ['Gwalior Fort', 'Jaipur Pink City', 'Udaipur City Palace', 'Jodhpur Blue City', 'Rann of Kutch'],
    packagesCount: 14,
    badge: 'Royal Heritage'
  },
  {
    id: 'north',
    name: 'North India',
    tagline: 'Snowy Peaks & Serene Valleys',
    theme: 'sky',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    spots: ['Kashmir Dal Lake', 'Gulmarg Gondola', 'Leh Ladakh', 'Pahalgam', 'Manali Solang Valley'],
    packagesCount: 18,
    badge: 'Snow & Valleys'
  },
  {
    id: 'south',
    name: 'South India',
    tagline: 'Emerald Backwaters & Spice Hills',
    theme: 'emerald',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80',
    spots: ['Alleppey Houseboats', 'Munnar Tea Gardens', 'Thekkady Periyar', 'Ooty Nilgiri', 'Coorg'],
    packagesCount: 16,
    badge: 'Backwaters & Greenery'
  },
  {
    id: 'east',
    name: 'East India',
    tagline: 'Misty Mountains & Living Roots',
    theme: 'teal',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    spots: ['Darjeeling Toy Train', 'Tiger Hill Sunrise', 'Gangtok Tsomgo Lake', 'Meghalaya Living Bridges', 'Shillong'],
    packagesCount: 12,
    badge: 'Cloud Forests & Peaks'
  }
];

const PACKAGES = [
  {
    id: 'gt-pkg-01',
    region: 'north',
    title: 'Kashmir Paradise & Dal Lake Luxury Shikara',
    duration: '6 Days / 5 Nights',
    rating: 4.98,
    reviews: 168,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85',
    priceINR: 23999,
    tag: 'Bestseller',
    highlights: 'Srinagar • Gulmarg Gondola Phase 1 & 2 • Pahalgam Betaab Valley • Sonamarg Glacier',
    inclusions: ['4-Star Heritage Stay', 'Private AC Innova Crysta', 'Daily Buffet Breakfast & Dinner', 'Govt. Certified Guide', 'Dal Lake Shikara Ride'],
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar & Dal Lake Shikara', desc: 'Warm traditional Kashmiri welcome at Srinagar airport. Private pickup and transfer to luxury Royal Houseboat. Sunset Shikara ride with kehwa tea.' },
      { day: 2, title: 'Srinagar to Gulmarg Meadow of Flowers', desc: 'Scenic ascent through pine groves. Experience world-famous Gulmarg Gondola reaching 13,780 ft snow peaks with panoramic Himalayan views.' },
      { day: 3, title: 'Gulmarg to Pahalgam Valley of Shepherds', desc: 'Visit saffron fields of Pampore and historic Awantipora ruins. Check in to riverfront resort along Lidder river.' },
      { day: 4, title: 'Aru Valley, Betaab Valley & Chandanwari', desc: 'Excursion through pristine alpine pastures, lush cedar forests and crystal streams.' },
      { day: 5, title: 'Excursion to Golden Meadow Sonamarg', desc: 'Journey to Sonamarg, gateway of Ladakh. Pony ride or local trek to Thajiwas Glacier.' },
      { day: 6, title: 'Mughal Gardens & Airport Departure', desc: 'Tour Nishat Bagh and Shalimar Bagh before smooth on-time transfer to Srinagar Airport.' }
    ]
  },
  {
    id: 'gt-pkg-02',
    region: 'north',
    title: 'Leh Ladakh High Passes & Pangong Lake Expedition',
    duration: '7 Days / 6 Nights',
    rating: 4.95,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=85',
    priceINR: 29500,
    tag: 'Adventure',
    highlights: 'Khardung La (17,582 ft) • Nubra Valley Sand Dunes • Double Humped Camels • Pangong Tso Lake',
    inclusions: ['Luxury Swiss Glamping', 'Dedicated 4x4 Tourist Vehicle', 'Oxygen Kit & Med Assistance', 'Inner Line Travel Permits'],
    itinerary: [
      { day: 1, title: 'Leh Arrival & Acclimatization', desc: 'Restful welcome in high altitude Leh with warm tea and light evening bazaar visit.' },
      { day: 2, title: 'Indus-Zanskar Confluence & Magnetic Hill', desc: 'Witness two rivers meeting, visit Pathar Sahib Gurudwara and Hall of Fame museum.' },
      { day: 3, title: 'Leh to Nubra Valley via Khardung La Pass', desc: 'Conquer the legendary pass and ride Bactrian camels on Hunder silver dunes.' },
      { day: 4, title: 'Nubra Valley to Turquoise Pangong Lake', desc: 'Follow the rugged Shyok river gorge into the breathtaking 134 km long border lake. Stargazing camp.' },
      { day: 5, title: 'Pangong to Leh via Chang La Pass', desc: 'Sunrise photography by crystal water, visiting Thiksey and Hemis monasteries.' },
      { day: 6, title: 'Shanti Stupa & Cultural Night', desc: 'Sunset prayer flags and panoramic views over Leh valley.' },
      { day: 7, title: 'Departure from Leh', desc: 'Airport transfer with lifelong Himalayan memories.' }
    ]
  },
  {
    id: 'gt-pkg-03',
    region: 'west',
    title: 'Royal Rajasthan & Gwalior Fort Grandeur',
    duration: '8 Days / 7 Nights',
    rating: 5.0,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=85',
    priceINR: 32000,
    tag: 'Royal Heritage',
    highlights: 'Gwalior Fort • Jaipur Amer Palace • Jodhpur Mehrangarh • Udaipur Lake Pichola',
    inclusions: ['Heritage Haveli Palace Stays', 'Chauffeur Driven AC Cab', 'Govt. Fort Historian Pass', 'Folk Dance & Royal Feast'],
    itinerary: [
      { day: 1, title: 'Historic Gwalior Fort & Jai Vilas Palace', desc: 'Explore the "Pearl of Indian fortresses" built in 8th century, followed by Scindia Palace museum.' },
      { day: 2, title: 'Jaipur: The Pink City Royal Welcome', desc: 'Drive to Jaipur. Evening visit to Birla Temple and Chokhi Dhani Rajasthani cultural village.' },
      { day: 3, title: 'Amer Fort, Hawa Mahal & City Palace', desc: 'Jeep ride up Amer Fort, photo-stop at Jal Mahal, and guided royal observatory Jantar Mantar tour.' },
      { day: 4, title: 'Jaipur to Jodhpur (The Sun City)', desc: 'Scenic journey to Jodhpur. Sunset photography from Mehrangarh Fort ramparts overlooking blue alleys.' },
      { day: 5, title: 'Jaswant Thada & Umaid Bhawan Palace', desc: 'Visit white marble memorial and one of the world\'s largest private royal residences.' },
      { day: 6, title: 'Jodhpur to Udaipur via Ranakpur Temples', desc: 'Marvel at 1,444 uniquely carved marble pillars of Ranakpur Jain temple before reaching Venice of the East.' },
      { day: 7, title: 'Udaipur City Palace & Lake Pichola Boat Cruise', desc: 'Tour magnificent City Palace complex and take a serene sunset royal boat ride past Jag Mandir.' },
      { day: 8, title: 'Saheliyon Ki Bari & Departure', desc: 'Stroll in royal fountains garden and drop-off at Udaipur Airport/Railway station.' }
    ]
  },
  {
    id: 'gt-pkg-04',
    region: 'west',
    title: 'Golden Triangle & Ranthambore Tiger Safari',
    duration: '6 Days / 5 Nights',
    rating: 4.93,
    reviews: 114,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=85',
    priceINR: 26500,
    tag: 'Wildlife & Heritage',
    highlights: 'Delhi Qutub Minar • Taj Mahal Sunrise • Ranthambore Tiger Jeep Safari • Jaipur Forts',
    inclusions: ['5-Star Luxury Hotels', 'Open Jeep Tiger Safari', 'Fast-Track Monument Entries', 'Private Chauffeur'],
    itinerary: [
      { day: 1, title: 'Delhi Heritage Tour', desc: 'Qutub Minar, India Gate, Humayun’s Tomb and drive past Parliament House.' },
      { day: 2, title: 'Delhi to Agra & Agra Fort', desc: 'Yamuna Expressway transfer. Guided tour of Agra Fort and sunset view of Taj Mahal from Mehtab Bagh.' },
      { day: 3, title: 'Sunrise at Taj Mahal & Ranthambore', desc: 'Marvel at Taj Mahal during magical golden hour. Drive to Ranthambore National Park.' },
      { day: 4, title: 'Morning & Evening Wildlife Jeep Safaris', desc: 'Spot royal Bengal tigers, leopards, marsh crocodiles and exotic birds in their natural sanctuary.' },
      { day: 5, title: 'Ranthambore to Jaipur Pink City', desc: 'Check in to Jaipur palace hotel. Evening shopping in Johari Bazaar and Hawa Mahal lights.' },
      { day: 6, title: 'Amer Fort & Return to Delhi Airport', desc: 'Tour Amer Fort and smooth chauffeur drop at Delhi International Airport.' }
    ]
  },
  {
    id: 'gt-pkg-05',
    region: 'south',
    title: 'Kerala "God’s Own Country" Backwaters & Hills',
    duration: '6 Days / 5 Nights',
    rating: 4.99,
    reviews: 248,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=85',
    priceINR: 22800,
    tag: 'Bestseller',
    highlights: 'Munnar Tea Plantations • Thekkady Wildlife • Alleppey Luxury Houseboat • Fort Kochi',
    inclusions: ['Private Houseboat Cruise', 'All Meals on Houseboat', 'Private AC Vehicle & Driver', 'Spice Garden Tour', 'Kathakali Show'],
    itinerary: [
      { day: 1, title: 'Cochin to Munnar Green Paradise', desc: 'Airport pickup in Kochi. Drive through Cheeyappara & Valara cascading waterfalls into misty tea plantations.' },
      { day: 2, title: 'Munnar Tea Estates & Eravikulam National Park', desc: 'Visit Rajamalai to see endangered Nilgiri Tahr, Mattupetty Dam, Echo Point, and Tea Museum.' },
      { day: 3, title: 'Munnar to Thekkady (Periyar Wildlife)', desc: 'Scenic ghat roads to Periyar. Guided spice plantation walk and evening Kathakali cultural dance show.' },
      { day: 4, title: 'Thekkady to Alleppey Luxury Houseboat', desc: 'Board your private handcrafted Kettuvallam houseboat. Cruise quiet canals, palm lagoons and paddy fields with personal onboard chef.' },
      { day: 5, title: 'Alleppey to Fort Kochi Heritage', desc: 'Explore historic Fort Kochi, Chinese fishing nets, St. Francis Church, and vibrant Jew Town cafes.' },
      { day: 6, title: 'Departure from Cochin', desc: 'Last-minute Kerala banana chips and spice shopping before smooth airport drop.' }
    ]
  },
  {
    id: 'gt-pkg-06',
    region: 'south',
    title: 'Karnataka Royal Circuit: Coorg, Mysore & Ooty',
    duration: '7 Days / 6 Nights',
    rating: 4.94,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=85',
    priceINR: 25400,
    tag: 'Hill & Heritage',
    highlights: 'Coorg Coffee Estates • Bylakuppe Golden Temple • Mysore Illuminated Palace • Ooty Nilgiri Toy Train',
    inclusions: ['Coffee Plantation Stays', 'Toy Train Tickets', 'Dedicated Chauffeur Cab', 'Daily Breakfast'],
    itinerary: [
      { day: 1, title: 'Bangalore to Coorg Coffee Country', desc: 'Scenic drive from Bangalore, en-route visit to Namdroling Monastery.' },
      { day: 2, title: 'Abbey Falls & Dubare Elephant Sanctuary', desc: 'Gentle river walk, elephant camp, and panoramic sunset at Raja’s Seat.' },
      { day: 3, title: 'Coorg to Mysore Royal Palace', desc: 'Tour magnificent Mysore Palace and vibrant Devaraja fruit and flower market.' },
      { day: 4, title: 'Mysore to Ooty via Bandipur Tiger Reserve', desc: 'Ascend Nilgiri hills through lush reserve forests.' },
      { day: 5, title: 'Ooty Lake & Doddabetta Mountain Peak', desc: 'Visit botanical gardens and highest viewpoint in Tamil Nadu.' },
      { day: 6, title: 'Nilgiri Heritage Mountain Railway', desc: 'Historic steam train ride down to Coonoor tea gardens.' },
      { day: 7, title: 'Departure', desc: 'Drop-off at Coimbatore or Bangalore airport.' }
    ]
  },
  {
    id: 'gt-pkg-07',
    region: 'east',
    title: 'Darjeeling Himalayan Toy Train & Gangtok Heights',
    duration: '6 Days / 5 Nights',
    rating: 4.96,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=85',
    priceINR: 24500,
    tag: 'Scenic Magic',
    highlights: 'Tiger Hill Sunrise (Mt Kanchenjunga) • UNESCO Steam Toy Train • Sacred Tsomgo Lake • Rumtek Monastery',
    inclusions: ['Mountain Deluxe Hotels', 'Sikkim Border Permits', 'Private Tourist Cab', 'Certified Himalayan Guide'],
    itinerary: [
      { day: 1, title: 'Bagdogra to Queen of the Hills (Darjeeling)', desc: 'Scenic ascent past emerald tea gardens. Evening stroll on Darjeeling Mall Road and Chowrasta.' },
      { day: 2, title: 'Tiger Hill Sunrise & Himalayan Mountaineering Institute', desc: '3:30 AM excursion to witness golden sunrise illuminating Mt. Kanchenjunga. Visit Ghoom Monastery and Batasia Loop.' },
      { day: 3, title: 'Darjeeling to Gangtok (Sikkim)', desc: 'Follow Teesta River into Sikkim. Check in to boutique mountain hotel. Evening walk on MG Marg.' },
      { day: 4, title: 'Sacred Tsomgo Lake & Baba Mandir Excursion', desc: 'Ascend to 12,310 ft glacial lake surrounded by snow peaks near Indo-China border.' },
      { day: 5, title: 'Gangtok Monasteries, Banjhakri Falls & Ropeway', desc: 'Visit Rumtek Monastery, Do Drul Chorten, cable car ropeway, and flower exhibition centre.' },
      { day: 6, title: 'Descent to Bagdogra Airport', desc: 'Transfer to Bagdogra airport carrying authentic Darjeeling first-flush tea.' }
    ]
  },
  {
    id: 'gt-pkg-08',
    region: 'east',
    title: 'Meghalaya "Abode of Clouds" & Living Root Bridges',
    duration: '6 Days / 5 Nights',
    rating: 4.97,
    reviews: 118,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85',
    priceINR: 23200,
    tag: 'Nature Wonder',
    highlights: 'Shillong Umiam Lake • Cherrapunji Nohkalikai Falls • Double Decker Living Root Bridge • Dawki Crystal River',
    inclusions: ['Eco-Luxury Cliff Stays', 'Clear Water Boating in Dawki', 'Private AC Cab & Driver', 'Khasi Trek Guide'],
    itinerary: [
      { day: 1, title: 'Guwahati to Shillong via Umiam Lake', desc: 'Pickup in Guwahati. Water sports and sunset at Umiam Lake before reaching Shillong.' },
      { day: 2, title: 'Shillong to Wettest Place on Earth (Cherrapunji)', desc: 'Witness Elephant Falls, Seven Sister Falls, and Nohkalikai (India’s tallest plunge waterfall).' },
      { day: 3, title: 'Trek to Double Decker Living Root Bridge', desc: 'Guided trek through Khasi village into subtropical forest to witness centuries-old bio-engineered root bridges.' },
      { day: 4, title: 'Dawki Crystal Clear River & Mawlynnong Cleanest Village', desc: 'Boat ride where boats appear floating in mid-air over transparent waters of Umngot river.' },
      { day: 5, title: 'Return to Shillong & Local Culture', desc: 'Visit Don Bosco Centre for Indigenous Cultures, Laitlum Canyons and Police Bazar music cafes.' },
      { day: 6, title: 'Guwahati Kamakhya Temple & Airport Drop', desc: 'Pay homage at sacred Kamakhya Temple and transfer to airport.' }
    ]
  }
];

const GUIDES = [
  {
    id: 'g-01',
    name: 'Vikramaditya Rathore',
    region: 'Rajasthan & Gwalior',
    experience: '12 Years',
    rating: 4.98,
    toursCount: 340,
    languages: ['English', 'Hindi', 'French'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Historian specialized in Rajput fort architecture, Scindia dynasty history, and royal folklore.'
  },
  {
    id: 'g-02',
    name: 'Farooq Ahmad Mir',
    region: 'Kashmir Valley & Ladakh',
    experience: '14 Years',
    rating: 5.0,
    toursCount: 420,
    languages: ['English', 'Hindi', 'Kashmiri'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'High-altitude trek leader and cultural curator for Gulmarg, Dal Lake Shikara history, and Zanskar passes.'
  },
  {
    id: 'g-03',
    name: 'Ananya Menon',
    region: 'Kerala & Nilgiris',
    experience: '9 Years',
    rating: 4.96,
    toursCount: 290,
    languages: ['English', 'Malayalam', 'German'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Botanist and heritage conservationist specializing in Alleppey backwater ecology, spices, and Kathakali.'
  },
  {
    id: 'g-04',
    name: 'Tenzing Lepcha',
    region: 'Darjeeling & North East',
    experience: '11 Years',
    rating: 4.99,
    toursCount: 275,
    languages: ['English', 'Nepali', 'Hindi'],
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    bio: 'Himalayan mountaineering expert, Darjeeling tea connoisseur, and Buddhist monastery guide.'
  }
];

const INITIAL_REVIEWS = [
  {
    id: 'rev-01',
    author: 'Aarohi & Rahul Sharma',
    location: 'New Delhi',
    tour: 'Kashmir Paradise (6D/5N)',
    rating: 5,
    comment: 'Booking our Kashmir tour with Gaur Travel was hands down the best decision we made! Our driver Mr. Bashir was exceptionally polite, the houseboat was pure luxury, and every checkpoint was hassle-free. Truly unmatchable service!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    date: 'October 2026'
  },
  {
    id: 'rev-02',
    author: 'Marcus & Elena Weber',
    location: 'Munich, Germany',
    tour: 'Rajasthan & Gwalior (8D/7N)',
    rating: 5,
    comment: 'The Rajasthan Royal Heritage itinerary curated by Gaur Travel felt like a royal fairy tale. Private sunrise tour of Mehrangarh Fort, seamless transfers, and transparent pricing. Superb team!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: 'September 2026'
  },
  {
    id: 'rev-03',
    author: 'Priya & Sameer Kulkarni',
    location: 'Pune',
    tour: 'Kerala Backwaters & Munnar (6D/5N)',
    rating: 5,
    comment: 'Their 24/7 on-call coordinator was always just a phone call away. When our flight into Kochi was delayed, their pickup cab was still waiting for us with bottled water and smiles. Gaur Travel is the gold standard!',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    date: 'October 2026'
  }
];

// Initialize default reviews if empty
if (!fs.existsSync(REVIEWS_FILE)) {
  writeJSON(REVIEWS_FILE, INITIAL_REVIEWS);
}

// ==========================================
// API ROUTES
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    platform: 'Gaur Travel',
    phone: '+91 99718 59687',
    email: 'gaur.tourtravel04@gmail.com',
    message: 'Backend API is fully operational'
  });
});

// Platform Stats
app.get('/api/stats', (req, res) => {
  const bookings = readJSON(BOOKINGS_FILE, []);
  res.json({
    phone: '+91 99718 59687',
    email: 'gaur.tourtravel04@gmail.com',
    verifiedGuides: '100%',
    handpickedStays: '100%',
    transparentPricing: '100%',
    supportAvailability: '24/7',
    happyTravelers: '15,000+',
    totalBookingsRecorded: bookings.length + 1540
  });
});

// Destinations (Image 1 UI)
app.get('/api/destinations', (req, res) => {
  res.json(DESTINATIONS);
});

// Tour Packages
app.get('/api/packages', (req, res) => {
  const { region, search } = req.query;
  let results = [...PACKAGES];

  if (region && region !== 'all') {
    results = results.filter(p => p.region.toLowerCase() === region.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.highlights.toLowerCase().includes(q)
    );
  }

  res.json(results);
});

// Single Package Detail
app.get('/api/packages/:id', (req, res) => {
  const pkg = PACKAGES.find(p => p.id === req.params.id);
  if (!pkg) {
    return res.status(404).json({ error: 'Package not found' });
  }
  res.json(pkg);
});

// Tour Guides
app.get('/api/guides', (req, res) => {
  res.json(GUIDES);
});

// Smart Cost Calculator Engine
app.post('/api/calculate-cost', (req, res) => {
  try {
    const {
      region = 'north',
      days = 6,
      nights = 5,
      hotelTier = 'deluxe', // comfort (1.0), deluxe (1.35), luxury (1.85)
      vehicleType = 'suv', // sedan (2500), suv (3800), tempo (5500)
      guests = 2,
      includeGuide = true,
      includeInsurance = true
    } = req.body;

    const hotelMultipliers = { comfort: 1.0, deluxe: 1.35, luxury: 1.85 };
    const cabRates = { sedan: 2500, suv: 3800, tempo: 5500 };

    const mult = hotelMultipliers[hotelTier] || 1.35;
    const dailyCabRate = cabRates[vehicleType] || 3800;

    const roomsCount = Math.ceil(guests / 2);
    const baseRoomNight = 3200;
    const hotelCost = Math.round(roomsCount * baseRoomNight * nights * mult);

    const cabCost = dailyCabRate * days;
    const guideCost = includeGuide ? (2000 * days) : 0;
    const insuranceCost = includeInsurance ? (450 * guests) : 0;
    const tollsAndTaxes = 300 * days;

    const totalINR = hotelCost + cabCost + guideCost + insuranceCost + tollsAndTaxes;
    const perPersonINR = Math.round(totalINR / guests);

    res.json({
      success: true,
      breakdown: {
        hotelCost,
        cabCost,
        guideCost,
        insuranceCost,
        tollsAndTaxes
      },
      totalINR,
      perPersonINR,
      guests,
      days,
      nights,
      currency: 'INR'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to calculate tour cost' });
  }
});

// Create Booking Request
app.post('/api/bookings', (req, res) => {
  try {
    const {
      name,
      phone,
      email = '',
      packageId,
      packageTitle,
      travelDate,
      guests = 2,
      hotelTier = 'Deluxe 4-Star',
      vehicleType = 'SUV Innova',
      estimatedAmountINR = 0,
      notes = ''
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const bookingRef = `GT-${Date.now().toString().slice(-4)}${Math.floor(100 + Math.random() * 900)}`;

    const newBooking = {
      id: bookingRef,
      createdAt: new Date().toISOString(),
      name,
      phone,
      email,
      packageId,
      packageTitle,
      travelDate,
      guests,
      hotelTier,
      vehicleType,
      estimatedAmountINR,
      notes,
      status: 'Confirmed - Coordinator Assigned'
    };

    const bookings = readJSON(BOOKINGS_FILE, []);
    bookings.unshift(newBooking);
    writeJSON(BOOKINGS_FILE, bookings);

    // Generate direct WhatsApp link for instant booking confirmation
    const waText = encodeURIComponent(`Hello Gaur Travel (+91 99718 59687)!
I have confirmed my booking inquiry:
Booking ID: ${bookingRef}
Name: ${name}
Phone: ${phone}
Package: ${packageTitle || 'Custom Itinerary'}
Date: ${travelDate || 'Flexible'}
Travelers: ${guests}
Please connect with me to finalize arrangements.`);

    res.status(201).json({
      success: true,
      bookingRef,
      message: `Booking ${bookingRef} recorded successfully. Our team will reach you at ${phone} within 30 minutes!`,
      booking: newBooking,
      whatsappUrl: `https://wa.me/919971859687?text=${waText}`
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record booking' });
  }
});

// Inquiries Endpoint
app.post('/api/inquiries', (req, res) => {
  try {
    const { name, phone, email, destination, date, travelers, notes } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const ref = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInq = {
      id: ref,
      createdAt: new Date().toISOString(),
      name,
      phone,
      email,
      destination,
      date,
      travelers,
      notes
    };

    const inquiries = readJSON(INQUIRIES_FILE, []);
    inquiries.unshift(newInq);
    writeJSON(INQUIRIES_FILE, inquiries);

    res.json({
      success: true,
      reference: ref,
      message: 'Inquiry received. A senior travel architect is preparing your customized itinerary.'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record inquiry' });
  }
});

// Reviews
app.get('/api/reviews', (req, res) => {
  const reviews = readJSON(REVIEWS_FILE, INITIAL_REVIEWS);
  res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
  try {
    const { author, location, tour, rating = 5, comment } = req.body;
    if (!author || !comment) {
      return res.status(400).json({ error: 'Author and comment are required' });
    }

    const newRev = {
      id: `rev-${Date.now()}`,
      author,
      location: location || 'India',
      tour: tour || 'Custom Tour',
      rating: Number(rating) || 5,
      comment,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      date: 'Just now'
    };

    const reviews = readJSON(REVIEWS_FILE, INITIAL_REVIEWS);
    reviews.unshift(newRev);
    writeJSON(REVIEWS_FILE, reviews);

    res.status(201).json({ success: true, review: newRev });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save review' });
  }
});

app.listen(PORT, () => {
  console.log(`✈️ Gaur Travel Backend Server running on http://localhost:${PORT}`);
  console.log(`📞 Official Contact: +91 99718 59687 | Email: gaur.tourtravel04@gmail.com`);
});
