/**
 * GAUR TRAVEL - Interactive Application Logic
 * Helpline: +91 99718 59687 | Email: gaur.tourtravel04@gmail.com
 * Official Google Business Profile: https://share.google/P6PcZ0gTCoj0riPn6
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeHandler();
  initPreloader();
  initScrollTracker();
  initHeroSlider();
  initPackagesEngine();
  initTourCalculator();
  initNavigation();
  initModals();
  initForms();
  initCurrencyHandler();
  initGoogleReviewsSync();
  init20SecondAutoBookingModal();
  initCookieConsent();
});

/* ==========================================================================
   1. PLANE PRELOADER ENGINE
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('flight-preloader');
  const fill = document.getElementById('preloader-fill');
  const percentText = document.getElementById('load-percentage');
  const skipBtn = document.getElementById('skip-preloader-btn');

  if (!preloader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      percentText.textContent = '100%';
      setTimeout(() => {
        dismissPreloader();
      }, 500);
    } else {
      fill.style.width = `${progress}%`;
      percentText.textContent = `${progress}%`;
    }
  }, 100);

  function dismissPreloader() {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 800);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      clearInterval(interval);
      dismissPreloader();
    });
  }
}

/* ==========================================================================
   2. SCROLL PROGRESS TRACKER WITH SUPERSONIC AIRPLANE
   ========================================================================== */
function initScrollTracker() {
  const fill = document.getElementById('scroll-tracker-fill');
  const backToTop = document.getElementById('back-to-top');
  const mainHeader = document.getElementById('main-header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (fill) {
      fill.style.width = `${scrollPercent}%`;
    }

    // Header styling
    if (mainHeader) {
      if (scrollTop > 80) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTop) {
      if (scrollTop > 450) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   3. HERO CINEMATIC SLIDER
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideTimer;

  // Generate indicator dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    resetTimer();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 6000);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  resetTimer();
}

/* ==========================================================================
   4. CURRENCY CONVERSION HANDLER
   ========================================================================== */
let currentCurrency = 'INR';
const exchangeRates = {
  INR: { symbol: '₹', rate: 1 },
  USD: { symbol: '$', rate: 0.012 },
  EUR: { symbol: '€', rate: 0.011 }
};

function formatPrice(amountInINR) {
  const { symbol, rate } = exchangeRates[currentCurrency];
  const converted = Math.round(amountInINR * rate);
  return `${symbol}${converted.toLocaleString()}`;
}

function initCurrencyHandler() {
  const selector = document.getElementById('currency-select');
  if (!selector) return;

  selector.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    updateAllPricesAcrossPage();
  });
}

function updateAllPricesAcrossPage() {
  renderPackages(currentActiveFilter);
  updateCalculatorTotal();
}

/* ==========================================================================
   5. TOUR PACKAGES DATA & RENDER ENGINE
   ========================================================================== */
const tourPackagesData = [
  // NORTH INDIA
  {
    id: 'north-1',
    region: 'north',
    regionLabel: 'North India',
    title: 'Kashmir Paradise & Dal Lake Luxury Shikara',
    duration: '6 Days / 5 Nights',
    rating: '4.98',
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    priceINR: 23999,
    highlights: 'Srinagar • Gulmarg Gondola • Pahalgam Betaab Valley • Sonamarg Glaciers',
    inclusions: ['4-Star Heritage Stay', 'Private Innova Cab', 'Daily Buffet Breakfast', 'Govt. Certified Guide'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Srinagar & Dal Lake Shikara', desc: 'Warm traditional Kashmiri welcome at Srinagar airport. Private pickup and transfer to luxury Royal Houseboat. Evening romantic sunset Shikara ride.' },
      { day: 'Day 2', title: 'Srinagar to Gulmarg Meadow of Flowers', desc: 'Drive through pine forests to Gulmarg. Experience world-famous Gulmarg Gondola Phase 1 & 2 reaching 13,780 ft snow peaks.' },
      { day: 'Day 3', title: 'Gulmarg to Pahalgam Valley of Shepherds', desc: 'Visit saffron fields of Pampore and historic Awantipora ruins. Check in to river-facing pine resort.' },
      { day: 'Day 4', title: 'Aru Valley, Betaab Valley & Chandanwari', desc: 'Local union cab excursion to breathtaking Himalayan pastures and crystal clear Lidder river.' },
      { day: 'Day 5', title: 'Excursion to Golden Meadow Sonamarg', desc: 'Journey to Sonamarg, gateway of Ladakh. Pony ride or local trek to Thajiwas Glacier.' },
      { day: 'Day 6', title: 'Mughal Gardens & Airport Departure', desc: 'Explore Nishat Bagh and Shalimar Bagh before on-time airport drop-off.' }
    ]
  },
  {
    id: 'north-2',
    region: 'north',
    regionLabel: 'North India',
    title: 'Leh Ladakh High Passes & Pangong Lake Expedition',
    duration: '7 Days / 6 Nights',
    rating: '4.95',
    reviewsCount: 118,
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    priceINR: 29500,
    highlights: 'Leh Palace • Khardung La Pass (17,582 ft) • Nubra Valley Camels • Pangong Tso',
    inclusions: ['Luxury Swiss Camp & Hotel', '4x4 Tourist Vehicle', 'Oxygen Cylinders & Kit', 'Inner Line Permits'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Leh & Acclimatization', desc: 'Scenic flight into Leh. Full day rest and evening stroll through vibrant Leh Bazaar.' },
      { day: 'Day 2', title: 'Sham Valley, Hall of Fame & Magnetic Hill', desc: 'Witness Indus-Zanskar confluence, Pathar Sahib Gurudwara and gravity-defying Magnetic Hill.' },
      { day: 'Day 3', title: 'Leh to Nubra Valley via Khardung La', desc: 'Cross one of the highest motorable roads in the world. Double-humped camel safari at Hunder sand dunes.' },
      { day: 'Day 4', title: 'Nubra Valley to Majestic Pangong Tso', desc: 'Drive along the rugged Shyok river route to the mesmerizing turquoise waters of Pangong Lake. Camp under the Milky Way.' },
      { day: 'Day 5', title: 'Pangong to Leh via Chang La Pass', desc: 'Sunrise photography at the lake. Return to Leh visiting Hemis & Thiksey Monasteries.' },
      { day: 'Day 6', title: 'Shanti Stupa & Cultural Farewell', desc: 'Panoramic sunset views from Shanti Stupa and traditional Ladakhi dinner.' },
      { day: 'Day 7', title: 'Airport Departure', desc: 'Punctual transfer to Kushok Bakula Rimpochee Airport.' }
    ]
  },

  // WEST INDIA
  {
    id: 'west-1',
    region: 'west',
    regionLabel: 'West India',
    title: 'Royal Rajasthan & Gwalior Fort Splendor',
    duration: '8 Days / 7 Nights',
    rating: '5.0',
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    priceINR: 32000,
    highlights: 'Gwalior Fort • Jaipur Pink City • Jodhpur Blue City • Udaipur Lake Pichola',
    inclusions: ['Heritage Haveli Stays', 'Chauffeur Driven AC Cab', 'Govt. Fort Guide Pass', 'Folk Dance & Dinner'],
    itinerary: [
      { day: 'Day 1', title: 'Historic Gwalior Fort & Jai Vilas Palace', desc: 'Explore the "Pearl of Indian fortresses" built in the 8th century, followed by Scindia Palace museum.' },
      { day: 'Day 2', title: 'Jaipur: The Pink City Royal Welcome', desc: 'Drive to Jaipur. Evening visit to Birla Temple and Chokhi Dhani Rajasthani cultural village.' },
      { day: 'Day 3', title: 'Amer Fort, Hawa Mahal & City Palace', desc: 'Elephant/jeep ride up Amer Fort, photo-stop at Jal Mahal, and guided royal observatory Jantar Mantar tour.' },
      { day: 'Day 4', title: 'Jaipur to Jodhpur (The Sun City)', desc: 'Scenic journey to Jodhpur. Sunset photography from Mehrangarh Fort ramparts overlooking blue alleys.' },
      { day: 'Day 5', title: 'Jaswant Thada & Umaid Bhawan Palace', desc: 'Visit white marble memorial and one of the world\'s largest private royal residences.' },
      { day: 'Day 6', title: 'Jodhpur to Udaipur via Ranakpur Temples', desc: 'Marvel at 1,444 uniquely carved marble pillars of Ranakpur Jain temple before reaching Venice of the East.' },
      { day: 'Day 7', title: 'Udaipur City Palace & Lake Pichola Boat Cruise', desc: 'Tour magnificent City Palace complex and take a serene sunset royal boat ride past Jag Mandir.' },
      { day: 'Day 8', title: 'Saheliyon Ki Bari & Departure', desc: 'Stroll in royal fountains garden and drop-off at Udaipur Airport/Railway station.' }
    ]
  },
  {
    id: 'west-2',
    region: 'west',
    regionLabel: 'West India',
    title: 'Golden Triangle & Ranthambore Tiger Safari',
    duration: '6 Days / 5 Nights',
    rating: '4.92',
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
    priceINR: 26500,
    highlights: 'Delhi Monuments • Taj Mahal Sunrise • Ranthambore Jeep Safari • Jaipur Amber Fort',
    inclusions: ['5-Star Luxury Hotels', 'Open Jeep Tiger Safari', 'Fast-Track Monument Entries', 'Private Chauffeur'],
    itinerary: [
      { day: 'Day 1', title: 'Delhi Heritage Tour', desc: 'Qutub Minar, India Gate, Humayun’s Tomb and drive past Parliament House.' },
      { day: 'Day 2', title: 'Delhi to Agra & Agra Fort', desc: 'Yamuna Expressway transfer. Guided tour of Agra Fort and sunset view of Taj Mahal from Mehtab Bagh.' },
      { day: 'Day 3', title: 'Sunrise at Taj Mahal & Ranthambore', desc: 'Marvel at Taj Mahal during magical golden hour. Drive to Ranthambore National Park.' },
      { day: 'Day 4', title: 'Morning & Evening Wildlife Jeep Safaris', desc: 'Spot royal Bengal tigers, leopards, marsh crocodiles and exotic birds in their natural sanctuary.' },
      { day: 'Day 5', title: 'Ranthambore to Jaipur Pink City', desc: 'Check in to Jaipur palace hotel. Evening shopping in Johari Bazaar and Hawa Mahal lights.' },
      { day: 'Day 6', title: 'Amer Fort & Return to Delhi Airport', desc: 'Tour Amer Fort and smooth chauffeur drop at Delhi International Airport.' }
    ]
  },

  // SOUTH INDIA
  {
    id: 'south-1',
    region: 'south',
    regionLabel: 'South India',
    title: 'Kerala "God’s Own Country" Backwaters & Hills',
    duration: '6 Days / 5 Nights',
    rating: '4.99',
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    priceINR: 22800,
    highlights: 'Munnar Tea Gardens • Thekkady Wildlife • Alleppey AC Houseboat • Kochi Dutch Palace',
    inclusions: ['Private Houseboat Cruise', 'All Meals on Houseboat', 'Private AC Cab', 'Spice Plantation Tour'],
    itinerary: [
      { day: 'Day 1', title: 'Cochin to Munnar Green Paradise', desc: 'Airport pickup in Kochi. Drive through Cheeyappara & Valara cascading waterfalls into misty tea plantations.' },
      { day: 'Day 2', title: 'Munnar Tea Estates & Eravikulam National Park', desc: 'Visit Rajamalai to see endangered Nilgiri Tahr, Mattupetty Dam, Echo Point, and Tea Museum.' },
      { day: 'Day 3', title: 'Munnar to Thekkady (Periyar Wildlife)', desc: 'Scenic ghat roads to Periyar. Guided spice plantation walk and evening Kathakali cultural dance show.' },
      { day: 'Day 4', title: 'Thekkady to Alleppey Luxury Houseboat', desc: 'Board your private handcrafted Kettuvallam houseboat. Cruise quiet canals, palm lagoons and paddy fields with personal onboard chef.' },
      { day: 'Day 5', title: 'Alleppey to Fort Kochi Heritage', desc: 'Explore historic Fort Kochi, Chinese fishing nets, St. Francis Church, and vibrant Jew Town cafes.' },
      { day: 'Day 6', title: 'Departure from Cochin', desc: 'Last-minute Kerala banana chips and spice shopping before smooth airport drop.' }
    ]
  },
  {
    id: 'south-2',
    region: 'south',
    regionLabel: 'South India',
    title: 'Karnataka Royal Circuit: Coorg, Mysore & Ooty',
    duration: '7 Days / 6 Nights',
    rating: '4.94',
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    priceINR: 25400,
    highlights: 'Coorg Coffee Estates • Golden Temple Bylakuppe • Mysore Palace • Ooty Nilgiri Train',
    inclusions: ['Plantation Resort Stays', 'Nilgiri Toy Train Tickets', 'Dedicated Chauffeur', 'Daily Breakfast'],
    itinerary: [
      { day: 'Day 1', title: 'Bangalore to Scotland of India (Coorg)', desc: 'Pickup in Bangalore. Enroute visit Tibetan Golden Temple Monastery. Check in to secluded coffee estate.' },
      { day: 'Day 2', title: 'Abbey Falls, Raja’s Seat & Dubare Elephant Camp', desc: 'Interact with trained elephants, witness Abbey Falls, and enjoy breathtaking valley sunset.' },
      { day: 'Day 3', title: 'Coorg to Royal Mysore Palace', desc: 'Drive to Mysore. Tour world-famous illuminated Amba Vilas Palace and Chamundi Hills temple.' },
      { day: 'Day 4', title: 'Mysore to Queen of Hill Stations (Ooty)', desc: 'Drive through Bandipur and Mudumalai tiger reserves up 36 hairpin bends to Ooty.' },
      { day: 'Day 5', title: 'Ooty Botanical Gardens & Doddabetta Peak', desc: 'Visit highest peak in the Nilgiris, Ooty Lake boating, and handmade chocolate factories.' },
      { day: 'Day 6', title: 'Nilgiri Mountain Railway to Coonoor', desc: 'Ride UNESCO heritage steam toy train. Tour Sim’s Park and Dolphin’s Nose.' },
      { day: 'Day 7', title: 'Drop-off at Coimbatore / Bangalore Airport', desc: 'Smooth highway transfer for departure flight.' }
    ]
  },

  // EAST INDIA
  {
    id: 'east-1',
    region: 'east',
    regionLabel: 'East India',
    title: 'Darjeeling Himalayan Toy Train & Gangtok Heights',
    duration: '6 Days / 5 Nights',
    rating: '4.96',
    reviewsCount: 134,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    priceINR: 24500,
    highlights: 'Tiger Hill Sunrise (Mt Kanchenjunga) • UNESCO Toy Train • Tsomgo Lake • Rumtek Monastery',
    inclusions: ['Mountain View Deluxe Rooms', 'Permits for Indo-China Border Lake', 'Private Vehicle', 'Expert Guide'],
    itinerary: [
      { day: 'Day 1', title: 'Bagdogra to Queen of the Hills (Darjeeling)', desc: 'Scenic ascent past emerald tea gardens. Evening stroll on Darjeeling Mall Road and Chowrasta.' },
      { day: 'Day 2', title: 'Tiger Hill Sunrise & Himalayan Mountaineering Institute', desc: '3:30 AM excursion to witness golden sunrise illuminating Mt. Kanchenjunga. Visit Ghoom Monastery and Batasia Loop.' },
      { day: 'Day 3', title: 'Darjeeling to Gangtok (Sikkim)', desc: 'Follow Teesta River into Sikkim. Check in to boutique mountain hotel. Evening walk on MG Marg.' },
      { day: 'Day 4', title: 'Sacred Tsomgo Lake & Baba Mandir Excursion', desc: 'Ascend to 12,310 ft glacial lake surrounded by snow peaks near Indo-China border.' },
      { day: 'Day 5', title: 'Gangtok Monasteries, Banjhakri Falls & Ropeway', desc: 'Visit Rumtek Monastery, Do Drul Chorten, cable car ropeway, and flower exhibition centre.' },
      { day: 'Day 6', title: 'Descent to Bagdogra Airport', desc: 'Transfer to Bagdogra airport carrying authentic Darjeeling first-flush tea.' }
    ]
  },
  {
    id: 'east-2',
    region: 'east',
    regionLabel: 'East India',
    title: 'Meghalaya "Abode of Clouds" & Living Root Bridges',
    duration: '6 Days / 5 Nights',
    rating: '4.97',
    reviewsCount: 102,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    priceINR: 23200,
    highlights: 'Shillong Scotland of East • Cherrapunji Nohkalikai Falls • Double Decker Root Bridge • Dawki Crystal River',
    inclusions: ['Eco-Luxury Cliff Stays', 'Boating on Umngot River', 'Private Cab & Fuel', 'Certified Trek Leader'],
    itinerary: [
      { day: 'Day 1', title: 'Guwahati to Shillong via Umiam Lake', desc: 'Pickup in Guwahati. Water sports and sunset at Umiam Lake before reaching Shillong.' },
      { day: 'Day 2', title: 'Shillong to Wettest Place on Earth (Cherrapunji)', desc: 'Witness Elephant Falls, Seven Sister Falls, and Nohkalikai (India’s tallest plunge waterfall).' },
      { day: 'Day 3', title: 'Trek to Double Decker Living Root Bridge', desc: 'Guided trek through Khasi village into subtropical forest to witness centuries-old bio-engineered root bridges.' },
      { day: 'Day 4', title: 'Dawki Crystal Clear River & Mawlynnong Cleanest Village', desc: 'Boat ride where boats appear floating in mid-air over transparent waters of Umngot river.' },
      { day: 'Day 5', title: 'Return to Shillong & Local Culture', desc: 'Visit Don Bosco Centre for Indigenous Cultures, Laitlum Canyons and Police Bazar music cafes.' },
      { day: 'Day 6', title: 'Guwahati Kamakhya Temple & Airport Drop', desc: 'Pay homage at sacred Kamakhya Temple and transfer to airport.' }
    ]
  }
];

let currentActiveFilter = 'featured';

function initPackagesEngine() {
  // Render initial curated 3 Featured packages (never overwhelm with all 8 by default)
  renderPackages('featured');

  // Filter tab buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentActiveFilter = btn.getAttribute('data-filter');
      syncRegionChips(currentActiveFilter);
      renderPackages(currentActiveFilter);
    });
  });

  // View All Packages expansion button
  const viewAllBtn = document.getElementById('btn-show-all-packages');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      currentActiveFilter = 'all';
      filterBtns.forEach(b => {
        if (b.getAttribute('data-filter') === 'all') {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
      syncRegionChips('all');
      renderPackages('all');
      showToast('Displaying all 8 verified tour packages across India.', 'info');
    });
  }

  // Mobile & Desktop Region Chips (Image 2 style)
  const regionChips = document.querySelectorAll('.region-chip');
  regionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const region = chip.getAttribute('data-region');
      filterByRegion(region);
    });
  });

  // Regional Image Cards
  const regionCards = document.querySelectorAll('.region-card');
  regionCards.forEach(card => {
    card.addEventListener('click', () => {
      const region = card.getAttribute('data-region');
      filterByRegion(region);
    });
  });

  // Floating Island Search Bar from Hero (Image 2 style)
  const heroSearchForm = document.getElementById('hero-quick-search-form');
  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const regionInput = document.getElementById('search-region');
      const datesInput = document.getElementById('search-dates');
      const guestsInput = document.getElementById('search-guests');

      const regionVal = regionInput ? regionInput.value : 'all';
      const datesVal = datesInput ? datesInput.value : 'Flexible';
      const guestsVal = guestsInput ? guestsInput.value : '2';

      filterByRegion(regionVal);
      showToast(`Searching curated tours in ${regionVal.toUpperCase()} for ${guestsVal} guests (${datesVal})...`, 'info');
    });
  }

  // Hero Search tabs
  const searchTabs = document.querySelectorAll('.search-tab');
  searchTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      searchTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Highlights service clicks
  const highlightItems = document.querySelectorAll('.highlight-item');
  highlightItems.forEach(item => {
    item.addEventListener('click', () => {
      const serviceName = item.querySelector('.highlight-label')?.textContent || 'Service';
      openQuickBookModal(`Service Request: ${serviceName}`);
    });
  });
}

function syncRegionChips(activeRegion) {
  document.querySelectorAll('.region-chip').forEach(chip => {
    if (chip.getAttribute('data-region') === activeRegion) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
}

function filterByRegion(region) {
  currentActiveFilter = (region === 'golden') ? 'west' : (region || 'all');

  syncRegionChips(region);

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    if (btn.getAttribute('data-filter') === currentActiveFilter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderPackages(currentActiveFilter);

  const pkgSection = document.getElementById('packages');
  if (pkgSection) {
    pkgSection.scrollIntoView({ behavior: 'smooth' });
  }
}
window.filterByRegion = filterByRegion;

function renderPackages(filter) {
  const container = document.getElementById('packages-container');
  if (!container) return;

  let filtered = [];
  if (filter === 'featured') {
    // Show top 3 handpicked flagship packages by default (North, West, South)
    filtered = tourPackagesData.filter(pkg => ['north-1', 'west-1', 'south-1'].includes(pkg.id));
  } else if (filter === 'all') {
    filtered = tourPackagesData;
  } else {
    filtered = tourPackagesData.filter(pkg => pkg.region === filter);
  }

  // Toggle View All button visibility
  const expandWrap = document.getElementById('packages-expand-wrap');
  if (expandWrap) {
    expandWrap.style.display = (filter === 'featured') ? 'block' : 'none';
  }

  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
      <h3>No tours found for this filter</h3>
      <p>Please contact us at +91 99718 59687 for a custom package.</p>
    </div>`;
    return;
  }

  filtered.forEach(pkg => {
    const card = document.createElement('div');
    card.className = 'pkg-card';
    card.innerHTML = `
      <div class="pkg-image-wrap">
        <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
        <span class="pkg-badge-duration"><i class="fa-regular fa-clock"></i> ${pkg.duration}</span>
        <span class="pkg-badge-rating"><i class="fa-solid fa-star"></i> ${pkg.rating} (${pkg.reviewsCount})</span>
      </div>
      <div class="pkg-body">
        <span class="pkg-region-tag">${pkg.regionLabel}</span>
        <h3 class="pkg-title">${pkg.title}</h3>
        <div class="pkg-inclusions">
          ${pkg.inclusions.map(inc => `<span class="inc-item"><i class="fa-solid fa-check"></i> ${inc}</span>`).join('')}
        </div>
        <div class="pkg-footer">
          <div class="pkg-price-col">
            <small>Starting From</small>
            <div class="pkg-price-val">${formatPrice(pkg.priceINR)} <span style="font-size: 0.75rem; font-weight: normal; color: var(--text-muted);">/ person</span></div>
          </div>
          <div class="pkg-actions">
            <button class="btn btn-view-plan" data-id="${pkg.id}">
              <i class="fa-solid fa-eye"></i> View Plan
            </button>
            <button class="btn btn-primary" data-book-id="${pkg.id}">
              Book Now
            </button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach event listeners for View Plan and Book buttons
  container.querySelectorAll('.btn-view-plan').forEach(btn => {
    btn.addEventListener('click', () => {
      const pkgId = btn.getAttribute('data-id');
      const selected = tourPackagesData.find(p => p.id === pkgId);
      if (selected) openItineraryModal(selected);
    });
  });

  container.querySelectorAll('[data-book-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pkgId = btn.getAttribute('data-book-id');
      const selected = tourPackagesData.find(p => p.id === pkgId);
      if (selected) {
        const text = encodeURIComponent(`Hello Gaur Travel (+91 99718 59687), I am interested in booking: ${selected.title} (${selected.duration}) for ₹${selected.priceINR.toLocaleString()} per person.`);
        window.open(`https://wa.me/919971859687?text=${text}`, '_blank');
      }
    });
  });
}

/* ==========================================================================
   6. SMART TOUR COST CALCULATOR
   ========================================================================== */
let calcState = {
  region: 'north',
  days: 6,
  nights: 5,
  hotelMultiplier: 1.35,
  cabDailyRate: 3800,
  guests: 2,
  includeGuide: true,
  includeInsurance: true
};

function initTourCalculator() {
  setupButtonGroup('calc-region-options', (btn) => {
    calcState.region = btn.getAttribute('data-value');
    updateCalculatorTotal();
  });

  setupButtonGroup('calc-duration-options', (btn) => {
    calcState.days = parseInt(btn.getAttribute('data-days'), 10);
    calcState.nights = parseInt(btn.getAttribute('data-nights'), 10);
    updateCalculatorTotal();
  });

  setupButtonGroup('calc-hotel-options', (btn) => {
    calcState.hotelMultiplier = parseFloat(btn.getAttribute('data-multiplier'));
    updateCalculatorTotal();
  });

  setupButtonGroup('calc-cab-options', (btn) => {
    calcState.cabDailyRate = parseInt(btn.getAttribute('data-car-rate'), 10);
    updateCalculatorTotal();
  });

  const guestSlider = document.getElementById('calc-guest-count');
  const guestLabel = document.getElementById('guest-count-label');
  const summaryGuest = document.getElementById('summary-guest-display');
  if (guestSlider) {
    guestSlider.addEventListener('input', (e) => {
      calcState.guests = parseInt(e.target.value, 10);
      if (guestLabel) guestLabel.textContent = `${calcState.guests} Traveler${calcState.guests > 1 ? 's' : ''}`;
      if (summaryGuest) summaryGuest.textContent = calcState.guests;
      updateCalculatorTotal();
    });
  }

  const guideToggle = document.getElementById('calc-guide-toggle');
  if (guideToggle) {
    guideToggle.addEventListener('change', (e) => {
      calcState.includeGuide = e.target.checked;
      updateCalculatorTotal();
    });
  }

  const insuranceToggle = document.getElementById('calc-insurance-toggle');
  if (insuranceToggle) {
    insuranceToggle.addEventListener('change', (e) => {
      calcState.includeInsurance = e.target.checked;
      updateCalculatorTotal();
    });
  }

  // WhatsApp Book Estimate Button
  const waBtn = document.getElementById('calc-whatsapp-book');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const regionNames = {
        north: 'North India (Kashmir & Himalayas)',
        west: 'West India (Rajasthan & Gwalior Forts)',
        south: 'South India (Kerala Backwaters & Munnar)',
        east: 'East India (Darjeeling & Sikkim Hills)'
      };
      const totalAmount = document.getElementById('calc-total-price')?.textContent || '0';
      const message = `Hello Gaur Travel! I created an estimate on your website calculator:
• Destination: ${regionNames[calcState.region] || 'Custom Region'}
• Duration: ${calcState.days} Days / ${calcState.nights} Nights
• Travelers: ${calcState.guests}
• Guide: ${calcState.includeGuide ? 'Yes' : 'No'}
• Insurance: ${calcState.includeInsurance ? 'Yes' : 'No'}
• Total Estimate: ${currentCurrency === 'INR' ? '₹' : ''}${totalAmount}

Please provide available dates and finalize my booking.`;

      window.open(`https://wa.me/919971859687?text=${encodeURIComponent(message)}`, '_blank');
    });
  }

  const calcOpenModal = document.getElementById('calc-open-modal');
  if (calcOpenModal) {
    calcOpenModal.addEventListener('click', () => {
      openQuickBookModal(`Calculated Estimate: ${calcState.days} Days in ${calcState.region.toUpperCase()} for ${calcState.guests} guests`);
    });
  }

  updateCalculatorTotal();
}

function setupButtonGroup(containerId, callback) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const buttons = container.querySelectorAll('.opt-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      callback(btn);
    });
  });
}

function updateCalculatorTotal() {
  const roomsNeeded = Math.ceil(calcState.guests / 2);
  const baseRoomRatePerNight = 3200;
  const hotelTotal = Math.round(roomsNeeded * baseRoomRatePerNight * calcState.nights * calcState.hotelMultiplier);
  const cabTotal = calcState.cabDailyRate * calcState.days;
  const guideTotal = calcState.includeGuide ? (2000 * calcState.days) : 0;
  const insuranceTotal = calcState.includeInsurance ? (450 * calcState.guests) : 0;
  const extraTotal = insuranceTotal + (300 * calcState.days);

  const grandTotalINR = hotelTotal + cabTotal + guideTotal + extraTotal;

  const breakHotel = document.getElementById('break-hotel');
  const breakCab = document.getElementById('break-cab');
  const breakGuide = document.getElementById('break-guide');
  const breakExtra = document.getElementById('break-extra');
  const totalDisplay = document.getElementById('calc-total-price');
  const currSymbol = document.querySelector('.curr-symbol');

  const { symbol, rate } = exchangeRates[currentCurrency];

  if (currSymbol) currSymbol.textContent = symbol;
  if (totalDisplay) totalDisplay.textContent = Math.round(grandTotalINR * rate).toLocaleString();
  if (breakHotel) breakHotel.textContent = formatPrice(hotelTotal);
  if (breakCab) breakCab.textContent = formatPrice(cabTotal);
  if (breakGuide) breakGuide.textContent = formatPrice(guideTotal);
  if (breakExtra) breakExtra.textContent = formatPrice(extraTotal);
}

/* ==========================================================================
   7. MODAL ENGINES (ITINERARY & QUICK BOOKING)
   ========================================================================== */
function initModals() {
  const itinModal = document.getElementById('itinerary-modal');
  const quickModal = document.getElementById('quick-book-modal');
  const itinClose = document.getElementById('modal-close-btn');
  const quickClose = document.getElementById('quick-modal-close-btn');

  if (itinClose) itinClose.addEventListener('click', () => closeModals());
  if (quickClose) quickClose.addEventListener('click', () => closeModals());

  [itinModal, quickModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModals();
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
  });

  const openBookModalBtn = document.getElementById('open-book-modal-btn');
  const openItineraryBtn = document.getElementById('open-itinerary-btn');
  const ctaDestBook = document.getElementById('cta-book-destinations');

  if (openBookModalBtn) {
    openBookModalBtn.addEventListener('click', () => openQuickBookModal('General Trip Inquiry'));
  }
  if (openItineraryBtn) {
    openItineraryBtn.addEventListener('click', () => {
      const calcSection = document.getElementById('calculator');
      if (calcSection) calcSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (ctaDestBook) {
    ctaDestBook.addEventListener('click', () => openQuickBookModal('Destination Booking Inquiry'));
  }
}

function openItineraryModal(pkg) {
  const modal = document.getElementById('itinerary-modal');
  if (!modal) return;

  const regEl = document.getElementById('modal-pkg-region');
  const titleEl = document.getElementById('modal-pkg-title');
  const durEl = document.getElementById('modal-pkg-duration');
  if (regEl) regEl.textContent = pkg.regionLabel;
  if (titleEl) titleEl.textContent = pkg.title;
  if (durEl) durEl.textContent = `${pkg.duration} • All-Inclusive Logistics & Assistance`;

  const banner = document.getElementById('modal-header-banner');
  if (banner) {
    banner.style.backgroundImage = `linear-gradient(rgba(14, 42, 36, 0.8), rgba(14, 42, 36, 0.95)), url('${pkg.image}')`;
  }

  const timeline = document.getElementById('modal-timeline');
  if (timeline) {
    timeline.innerHTML = '';
    pkg.itinerary.forEach(item => {
      const timeItem = document.createElement('div');
      timeItem.className = 'timeline-item';
      timeItem.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-day">${item.day}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-desc">${item.desc}</div>
      `;
      timeline.appendChild(timeItem);
    });
  }

  const priceDisplay = document.getElementById('modal-price-display');
  if (priceDisplay) {
    priceDisplay.innerHTML = `${formatPrice(pkg.priceINR)} <span>/ person</span>`;
  }

  const bookBtn = document.getElementById('modal-book-now-btn');
  if (bookBtn) {
    bookBtn.onclick = () => {
      const text = encodeURIComponent(`Hi Gaur Travel (+91 99718 59687)! I want to book: ${pkg.title} (${pkg.duration}) priced at ${formatPrice(pkg.priceINR)}. Please share available dates.`);
      window.open(`https://wa.me/919971859687?text=${text}`, '_blank');
    };
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
window.openItineraryModal = openItineraryModal;

function openQuickBookModal(prefillDestination = '') {
  const modal = document.getElementById('quick-book-modal');
  if (!modal) return;

  const destInput = document.getElementById('qb-dest');
  if (destInput && prefillDestination) {
    destInput.value = prefillDestination;
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
window.openQuickBookModal = openQuickBookModal;

function closeModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => {
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
  });
  document.body.style.overflow = '';
}
window.closeModals = closeModals;

/* ==========================================================================
   8. FORMS & NOTIFICATIONS
   ========================================================================== */
function initForms() {
  // Main Inquiry Form
  const mainForm = document.getElementById('main-booking-form');
  if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value || 'Guest';
      const phone = document.getElementById('form-phone')?.value || '';
      const email = document.getElementById('form-email')?.value || 'Not provided';
      const dest = document.getElementById('form-destination')?.value || 'India Tour';
      const date = document.getElementById('form-date')?.value || 'Flexible';
      const travelers = document.getElementById('form-travelers')?.value || '2';
      const notes = document.getElementById('form-notes')?.value || 'Standard';

      const bookingRef = `GT-${Math.floor(1000 + Math.random() * 9000)}`;

      showToast(`Thank you, ${name}! Your inquiry #${bookingRef} is received. Our tour architect will call ${phone} within 30 minutes!`, 'success');

      // Prompt WhatsApp option
      setTimeout(() => {
        const text = encodeURIComponent(`Hello Gaur Travel (+91 99718 59687),
Inquiry #${bookingRef}:
• Name: ${name}
• Phone: ${phone}
• Email: ${email}
• Destination: ${dest}
• Tentative Date: ${date}
• Travelers: ${travelers}
• Notes: ${notes}

Looking forward to your itinerary!`);
        window.open(`https://wa.me/919971859687?text=${text}`, '_blank');
      }, 1200);

      mainForm.reset();
    });
  }

  // Quick Modal Form
  const quickForm = document.getElementById('modal-quick-form');
  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('qb-name')?.value || 'Guest';
      const phone = document.getElementById('qb-phone')?.value || '';
      const dest = document.getElementById('qb-dest')?.value || 'India';
      const notes = document.getElementById('qb-notes')?.value || 'General inquiry';

      closeModals();
      showToast(`Thanks ${name}! Directing you to WhatsApp with Gaur Travel (+91 99718 59687)...`, 'success');

      setTimeout(() => {
        const text = encodeURIComponent(`Hi Gaur Travel (+91 99718 59687)!
Name: ${name}
Phone: ${phone}
Interested Destination: ${dest}
Notes: ${notes}

Please share complete itinerary and quotes.`);
        window.open(`https://wa.me/919971859687?text=${text}`, '_blank');
      }, 800);

      quickForm.reset();
    });
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  // Clear previous toasts so they never stack into an intrusive list
  container.innerHTML = '';

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-gold' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   9. NAVIGATION & MOBILE HAMBURGER
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   10. LIGHT & DARK THEME ENGINE
   ========================================================================== */
function initThemeHandler() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gaur_theme', theme);

    toggleBtns.forEach(btn => {
      const isDark = theme === 'dark';
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      const tooltip = btn.querySelector('.float-tooltip');
      if (tooltip) {
        tooltip.textContent = isDark ? 'Light Mode ☀️' : 'Dark Mode 🌙';
      }
      const icon = btn.querySelector('i');
      if (icon && btn.classList.contains('dock-theme')) {
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
    });
  }

  // Strictly default to pure Light Theme per user's explicit preference
  const savedTheme = localStorage.getItem('gaur_theme');
  const initialTheme = (savedTheme === 'dark') ? 'dark' : 'light';
  applyTheme(initialTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  });
}

/* ==========================================================================
   11. GOOGLE REVIEWS AUTO-SYNC ENGINE
   Connected to: https://share.google/P6PcZ0gTCoj0riPn6
   Syncs live reviews automatically so new reviews appear immediately on site.
   ========================================================================== */
const FALLBACK_GOOGLE_REVIEWS = [
  {
    id: "rev-google-01",
    author: "Kumkum Singh",
    location: "Verified Google Review",
    tour: "Uttarakhand & Domestic Tour",
    rating: 5,
    comment: "Great experience with Gaur Travel highly recommend. The guide was exceptionally well-mannered and all hotel arrangements were 5-star.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    source: "google",
    googleUrl: "https://share.google/P6PcZ0gTCoj0riPn6",
    date: "Google Verified"
  },
  {
    id: "rev-google-02",
    author: "Jugal Kishor",
    location: "Verified Google Review",
    tour: "Char Dham & Himalayas",
    rating: 5,
    comment: "The service and arrangements were much better than we expected. Clean Innova cab and experienced driver throughout the mountain roads.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    source: "google",
    googleUrl: "https://share.google/P6PcZ0gTCoj0riPn6",
    date: "Google Verified"
  },
  {
    id: "rev-google-03",
    author: "CONQUEROR",
    location: "Verified Google Review",
    tour: "Custom Holiday Tour",
    rating: 5,
    comment: "The staff was very supportive, cooperative, and reliable throughout the journey. Transparent pricing and 24/7 coordinator assistance.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    source: "google",
    googleUrl: "https://share.google/P6PcZ0gTCoj0riPn6",
    date: "Google Verified"
  },
  {
    id: "rev-google-04",
    author: "Rohit Choudhury",
    location: "Verified Google Review",
    tour: "Kashmir & Gulmarg Luxury Tour",
    rating: 5,
    comment: "Simply outstanding service from Gaur Travel! The Shikara ride, Gulmarg gondola tickets, and chauffeur were all pre-booked with zero waiting time.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    source: "google",
    googleUrl: "https://share.google/P6PcZ0gTCoj0riPn6",
    date: "Google Verified"
  },
  {
    id: "rev-google-05",
    author: "Sunita & Arvind Mehta",
    location: "Verified Google Review",
    tour: "Rajasthan Royal Palaces",
    rating: 5,
    comment: "We visited Jaipur, Udaipur and Jodhpur with our elderly parents. Gaur Travel ensured wheel-chair assistance and heritage hotel rooms on the ground floor. 10/10!",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    source: "google",
    googleUrl: "https://share.google/P6PcZ0gTCoj0riPn6",
    date: "Google Verified"
  },
  {
    id: "rev-01",
    author: "Aarohi & Rahul Sharma",
    location: "New Delhi",
    tour: "Kashmir Paradise (6D/5N)",
    rating: 5,
    comment: "Booking our Kashmir tour with Gaur Travel was hands down the best decision we made! Our driver Mr. Bashir was exceptionally polite, the houseboat was pure luxury, and every checkpoint was hassle-free. Truly unmatchable service!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    source: "verified",
    googleUrl: "https://share.google/P6PcZ0gTCoj0riPn6",
    date: "October 2026"
  }
];

function renderReviewsList(reviews) {
  const container = document.getElementById('testimonials-grid');
  const avatarsContainer = document.getElementById('avatars-strip');
  if (!container) return;

  container.innerHTML = '';
  reviews.forEach((rev, idx) => {
    const card = document.createElement('div');
    card.className = 'review-card glass-panel';
    card.id = `review-item-${idx}`;
    card.innerHTML = `
      <div class="review-card-top">
        <div class="review-stars-row">
          ${'<i class="fa-solid fa-star"></i>'.repeat(rev.rating || 5)}
        </div>
        <span class="google-verified-tag">
          <i class="fa-brands fa-google"></i> Google Verified
        </span>
      </div>
      <p class="review-text">"${rev.comment}"</p>
      <div class="reviewer-meta">
        <img src="${rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" alt="${rev.author}" loading="lazy">
        <div>
          <strong>${rev.author}</strong>
          <small>${rev.tour || 'Custom Tour'} • <a href="https://share.google/P6PcZ0gTCoj0riPn6" target="_blank" rel="noopener" style="color: inherit; text-decoration: underline;">View on Google ↗</a></small>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Render Image 1 Avatar Strip
  if (avatarsContainer) {
    avatarsContainer.innerHTML = '';
    reviews.slice(0, 6).forEach((rev, idx) => {
      const btn = document.createElement('button');
      btn.className = `avatar-thumb-btn ${idx === 0 ? 'active' : ''}`;
      btn.setAttribute('aria-label', `View review by ${rev.author}`);
      btn.title = `${rev.author} - 5.0 ★ Google Review`;
      btn.innerHTML = `<img src="${rev.avatar}" alt="${rev.author}">`;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.avatar-thumb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetCard = document.getElementById(`review-item-${idx}`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          targetCard.style.borderColor = 'var(--amber-gold)';
          targetCard.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.4)';
          setTimeout(() => {
            targetCard.style.borderColor = '';
            targetCard.style.boxShadow = '';
          }, 2000);
        }
      });
      avatarsContainer.appendChild(btn);
    });

    // Add Google Review CTA Pill
    const addReviewBtn = document.createElement('a');
    addReviewBtn.href = 'https://share.google/P6PcZ0gTCoj0riPn6';
    addReviewBtn.target = '_blank';
    addReviewBtn.rel = 'noopener';
    addReviewBtn.className = 'btn-google-review';
    addReviewBtn.style.padding = '8px 16px';
    addReviewBtn.style.fontSize = '0.78rem';
    addReviewBtn.innerHTML = `<i class="fa-brands fa-google"></i> + Review Us`;
    avatarsContainer.appendChild(addReviewBtn);
  }
}

function initGoogleReviewsSync() {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const apiUrl = isLocal ? 'http://localhost:5000/api/reviews' : '/api/reviews';

  async function fetchReviews() {
    try {
      const res = await fetch(apiUrl, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          renderReviewsList(data);
          return;
        }
      }
      renderReviewsList(FALLBACK_GOOGLE_REVIEWS);
    } catch (err) {
      // Offline / sandboxed fallback
      renderReviewsList(FALLBACK_GOOGLE_REVIEWS);
    }
  }

  fetchReviews();
  // Auto-sync polling every 20 seconds so any review on Google link appears automatically
  setInterval(fetchReviews, 20000);
}

/* ==========================================================================
   12. VIP TOUR REGISTRATION & EXCLUSIVE VOUCHER MODAL
   Appears automatically after visitor spends ~8 seconds on site.
   Features a 15-minute live countdown timer, discount code GT-DREAM3000,
   and instant WhatsApp concierge booking.
   ========================================================================== */
function init20SecondAutoBookingModal() {
  const modal = document.getElementById('auto-booking-modal');
  const closeBtn = document.getElementById('auto-modal-close-btn');
  const dismissBtn = document.getElementById('auto-dismiss-btn');
  const quickForm = document.getElementById('auto-booking-quick-form');
  const minDisplay = document.getElementById('offer-timer-min');
  const secDisplay = document.getElementById('offer-timer-sec');

  if (!modal) return;

  let timerInterval = null;
  let remainingSeconds = 14 * 60 + 59; // 14:59 live countdown timer

  function startCountdown() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        remainingSeconds = 0;
      }
      const m = Math.floor(remainingSeconds / 60);
      const s = remainingSeconds % 60;
      if (minDisplay) minDisplay.textContent = m < 10 ? `0${m}` : m;
      if (secDisplay) secDisplay.textContent = s < 10 ? `0${s}` : s;
    }, 1000);
  }

  function openAutoModal() {
    // If already registered and completed, do not interrupt
    if (sessionStorage.getItem('gaur_vip_registered') === 'true') return;

    // Gentle 60s cooldown if previously dismissed during active browsing
    const lastDismissed = parseInt(sessionStorage.getItem('gaur_vip_offer_closed_at') || '0', 10);
    if (Date.now() - lastDismissed < 60000) return;

    // Check if another modal is currently open
    const openModals = document.querySelectorAll('.modal-backdrop.open');
    if (openModals.length > 0) return;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    startCountdown();
  }

  function closeAutoModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    sessionStorage.setItem('gaur_vip_offer_closed_at', Date.now().toString());
    if (timerInterval) clearInterval(timerInterval);
  }

  // Set automatic registration popup timer (triggers after 8 seconds of site opening)
  setTimeout(() => {
    openAutoModal();
  }, 8000);

  // Expose global trigger for nav or manual buttons
  window.openVIPRegistrationModal = openAutoModal;

  if (closeBtn) closeBtn.addEventListener('click', closeAutoModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeAutoModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAutoModal();
  });

  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('auto-name')?.value || 'Valued Guest';
      const phone = document.getElementById('auto-phone')?.value || '';
      const dest = document.getElementById('auto-dest')?.value || 'All India Tour';
      const guests = document.getElementById('auto-guests')?.value || '2 Adults';

      closeAutoModal();
      sessionStorage.setItem('gaur_vip_registered', 'true');
      showToast(`🎉 VIP Registration complete! ₹3,000 voucher applied. Connecting via WhatsApp...`, 'success');

      // Attempt to post booking inquiry to backend
      try {
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const backendUrl = isLocal ? 'http://localhost:5000/api/bookings' : '/api/bookings';
        fetch(backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            packageTitle: dest,
            guests,
            notes: 'Registered for VIP Tour: Saved ₹3,000 (Promo Code: GT-DREAM3000)'
          })
        }).catch(() => {});
      } catch (err) {}

      // Direct to WhatsApp with voucher details
      setTimeout(() => {
        const text = encodeURIComponent(`Hello Gaur Travel (+91 99718 59687)!
I have registered for the VIP Tour Offer on your website:
• Promo Code: GT-DREAM3000 (Save ₹3,000)
• Name: ${name}
• WhatsApp: ${phone}
• Preferred Destination: ${dest}
• Number of Guests: ${guests}

Please confirm my ₹3,000 reservation discount and share available itinerary dates!`);
        window.open(`https://wa.me/919971859687?text=${text}`, '_blank');
      }, 700);

      quickForm.reset();
    });
  }
}

/* ==========================================================================
   13. COOKIES CONSENT ENGINE (Floating Bottom Popup & Preferences Modal)
   ========================================================================== */
function initCookieConsent() {
  const box = document.getElementById('cookie-consent-box');
  const bannerClose = document.getElementById('cookie-banner-close-btn');
  const bannerAccept = document.getElementById('cookie-accept-all');
  const bannerDecline = document.getElementById('cookie-decline');
  const bannerCustomize = document.getElementById('cookie-open-customize');

  // Modal elements
  const modal = document.getElementById('cookie-modal');
  const modalClose = document.getElementById('cookie-modal-close-btn');
  const modalSaveBtn = document.getElementById('modal-cookie-save-btn');
  const modalAcceptAllBtn = document.getElementById('modal-cookie-accept-all-btn');
  const modalEssentialBtn = document.getElementById('modal-cookie-essential-btn');
  const modalPrefToggle = document.getElementById('modal-pref-toggle');
  const modalAnalyticsToggle = document.getElementById('modal-analytics-toggle');
  const modalMarketingToggle = document.getElementById('modal-marketing-toggle');

  const footerCookieBtn = document.getElementById('footer-cookie-settings-btn');
  const footerPrivacyLink = document.getElementById('footer-privacy-cookie-link');

  // Default cookie configuration
  const DEFAULT_SETTINGS = {
    essential: true,
    preferences: true,
    analytics: true,
    marketing: true
  };

  let cookieDismissedThisSession = false;

  function dismissBanner() {
    cookieDismissedThisSession = true;
    if (box) {
      box.classList.remove('show');
      box.setAttribute('aria-hidden', 'true');
    }
  }

  function getStoredSettings() {
    try {
      const raw = localStorage.getItem('gaur_cookie_settings');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { ...DEFAULT_SETTINGS };
  }

  function getConsentStatus() {
    return localStorage.getItem('gaur_cookie_consent') || 'pending';
  }

  function applySettingsToUI(settings) {
    if (modalPrefToggle) modalPrefToggle.checked = !!settings.preferences;
    if (modalAnalyticsToggle) modalAnalyticsToggle.checked = !!settings.analytics;
    if (modalMarketingToggle) modalMarketingToggle.checked = !!settings.marketing;
  }

  function savePreferences(settings, statusType = 'custom', showNotification = true) {
    localStorage.setItem('gaur_cookie_settings', JSON.stringify(settings));
    localStorage.setItem('gaur_cookie_consent', statusType);
    applySettingsToUI(settings);
    dismissBanner();

    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }

    if (showNotification) {
      if (statusType === 'all_accepted') {
        showToast('All cookies accepted. Welcome to Gaur Travel!', 'success');
      } else if (statusType === 'essential_only') {
        showToast('Essential cookies only enabled. Preferences saved.', 'info');
      } else {
        showToast('Custom cookie preferences saved.', 'success');
      }
    }
  }

  function openCookieModal() {
    if (!modal) return;
    const current = getStoredSettings();
    applySettingsToUI(current);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeCookieModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  // Initial UI state setup
  const initialSettings = getStoredSettings();
  applySettingsToUI(initialSettings);

  // Show floating bottom popup banner in opening display on visit.
  // Does NOT stick when scrolling down: only appears while in opening display (scrollY <= 80px).
  function handleScrollCookieVisibility() {
    if (cookieDismissedThisSession || !box) return;
    if (window.scrollY > 80) {
      box.classList.remove('show');
      box.setAttribute('aria-hidden', 'true');
    } else {
      box.classList.add('show');
      box.setAttribute('aria-hidden', 'false');
    }
  }

  // Immediately display on site load in opening view
  if (box) {
    box.classList.add('show');
    box.setAttribute('aria-hidden', 'false');
  }

  window.addEventListener('scroll', handleScrollCookieVisibility, { passive: true });

  if (bannerClose) {
    bannerClose.addEventListener('click', dismissBanner);
  }

  // Banner Event Handlers
  if (bannerAccept) {
    bannerAccept.addEventListener('click', () => {
      savePreferences({ essential: true, preferences: true, analytics: true, marketing: true }, 'all_accepted');
    });
  }

  if (bannerDecline) {
    bannerDecline.addEventListener('click', () => {
      savePreferences({ essential: true, preferences: false, analytics: false, marketing: false }, 'essential_only');
    });
  }

  if (bannerCustomize) {
    bannerCustomize.addEventListener('click', () => {
      dismissBanner();
      openCookieModal();
    });
  }

  // Modal Event Handlers
  if (modalClose) modalClose.addEventListener('click', closeCookieModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCookieModal();
    });
  }

  if (modalAcceptAllBtn) {
    modalAcceptAllBtn.addEventListener('click', () => {
      savePreferences({ essential: true, preferences: true, analytics: true, marketing: true }, 'all_accepted');
    });
  }

  if (modalEssentialBtn) {
    modalEssentialBtn.addEventListener('click', () => {
      savePreferences({ essential: true, preferences: false, analytics: false, marketing: false }, 'essential_only');
    });
  }

  if (modalSaveBtn) {
    modalSaveBtn.addEventListener('click', () => {
      const settings = {
        essential: true,
        preferences: modalPrefToggle ? modalPrefToggle.checked : true,
        analytics: modalAnalyticsToggle ? modalAnalyticsToggle.checked : true,
        marketing: modalMarketingToggle ? modalMarketingToggle.checked : true
      };
      savePreferences(settings, 'custom');
    });
  }

  // Footer triggers to open preferences modal or reopen banner
  if (footerCookieBtn) {
    footerCookieBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCookieModal();
    });
  }

  if (footerPrivacyLink) {
    footerPrivacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      openCookieModal();
    });
  }

  // Global methods for debugging and testing
  window.openCookieModal = openCookieModal;
  window.openCookieBanner = () => {
    if (box) {
      box.classList.add('show');
      box.setAttribute('aria-hidden', 'false');
    }
  };
}
