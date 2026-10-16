/**
 * GAUR TRAVELS - Interactive Application Logic
 * Helpline: +91 99718 59687 | Email: gaur.tourtravel04@gmail.com
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initScrollTracker();
  initHeroSlider();
  initPackagesEngine();
  initTourCalculator();
  initNavigation();
  initModals();
  initForms();
  initCurrencyHandler();
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
  // Re-render packages
  renderPackages(currentActiveFilter);
  // Re-calculate cost calculator
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

let currentActiveFilter = 'all';

function initPackagesEngine() {
  const container = document.getElementById('packages-container');
  const filterBtns = document.querySelectorAll('.filter-btn');

  renderPackages('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentActiveFilter = btn.getAttribute('data-filter');
      renderPackages(currentActiveFilter);
    });
  });

  // Clicking Image 1 Destination cards filters packages automatically
  const regionCards = document.querySelectorAll('.region-card');
  regionCards.forEach(card => {
    card.addEventListener('click', () => {
      const region = card.getAttribute('data-region');
      const targetFilterBtn = document.querySelector(`.filter-btn[data-filter="${region}"]`);
      if (targetFilterBtn) {
        targetFilterBtn.click();
      }
      const packagesSection = document.getElementById('packages');
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Search Engine Submit from Hero
  const heroSearchForm = document.getElementById('hero-quick-search-form');
  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const region = document.getElementById('search-region').value;
      const targetBtn = document.querySelector(`.filter-btn[data-filter="${region}"]`) || document.querySelector('.filter-btn[data-filter="all"]');
      if (targetBtn) targetBtn.click();
      const packagesSection = document.getElementById('packages');
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth' });
      }
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
      const serviceName = item.querySelector('.highlight-label').textContent;
      openQuickBookModal(`Service Request: ${serviceName}`);
    });
  });
}

function renderPackages(filter) {
  const container = document.getElementById('packages-container');
  if (!container) return;

  const filtered = filter === 'all' 
    ? tourPackagesData 
    : tourPackagesData.filter(pkg => pkg.region === filter);

  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">
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
        <p class="pkg-highlights-snippet">${pkg.highlights}</p>
        <div class="pkg-footer">
          <div class="pkg-price-col">
            <small>Starting From</small>
            <div class="pkg-price-val">${formatPrice(pkg.priceINR)} <span style="font-size: 0.75rem; font-weight: normal; color: #64748b;">/ person</span></div>
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
        const text = encodeURIComponent(`Hello Gaur Travels (+91 99718 59687), I am interested in booking: ${selected.title} (${selected.duration}) for ₹${selected.priceINR.toLocaleString()} per person.`);
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
  // Region buttons
  setupButtonGroup('calc-region-options', (btn) => {
    calcState.region = btn.getAttribute('data-value');
    updateCalculatorTotal();
  });

  // Duration buttons
  setupButtonGroup('calc-duration-options', (btn) => {
    calcState.days = parseInt(btn.getAttribute('data-days'), 10);
    calcState.nights = parseInt(btn.getAttribute('data-nights'), 10);
    updateCalculatorTotal();
  });

  // Hotel multiplier
  setupButtonGroup('calc-hotel-options', (btn) => {
    calcState.hotelMultiplier = parseFloat(btn.getAttribute('data-multiplier'));
    updateCalculatorTotal();
  });

  // Cab options
  setupButtonGroup('calc-cab-options', (btn) => {
    calcState.cabDailyRate = parseInt(btn.getAttribute('data-car-rate'), 10);
    updateCalculatorTotal();
  });

  // Guest slider
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

  // Toggles
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
      const totalAmount = document.getElementById('calc-total-price').textContent;
      const message = `Hello Gaur Travels! I created an estimate on your website calculator:
• Destination: ${regionNames[calcState.region]}
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
  // Base daily rate per room (2 guests per room)
  const roomsNeeded = Math.ceil(calcState.guests / 2);
  const baseRoomRatePerNight = 3200;
  const hotelTotal = Math.round(roomsNeeded * baseRoomRatePerNight * calcState.nights * calcState.hotelMultiplier);

  // Cab total
  const cabTotal = calcState.cabDailyRate * calcState.days;

  // Guide total
  const guideTotal = calcState.includeGuide ? (2000 * calcState.days) : 0;

  // Insurance & tolls
  const insuranceTotal = calcState.includeInsurance ? (450 * calcState.guests) : 0;
  const extraTotal = insuranceTotal + (300 * calcState.days); // State taxes/toll fee

  const grandTotalINR = hotelTotal + cabTotal + guideTotal + extraTotal;

  // Render Breakdown
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

  if (itinClose) {
    itinClose.addEventListener('click', () => closeModals());
  }
  if (quickClose) {
    quickClose.addEventListener('click', () => closeModals());
  }

  [itinModal, quickModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModals();
      });
    }
  });

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
  });

  // Header quick buttons
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

  document.getElementById('modal-pkg-region').textContent = pkg.regionLabel;
  document.getElementById('modal-pkg-title').textContent = pkg.title;
  document.getElementById('modal-pkg-duration').textContent = `${pkg.duration} • All-Inclusive Logistics & Assistance`;

  const banner = document.getElementById('modal-header-banner');
  if (banner) {
    banner.style.backgroundImage = `linear-gradient(rgba(14, 42, 36, 0.8), rgba(14, 42, 36, 0.95)), url('${pkg.image}')`;
  }

  const timeline = document.getElementById('modal-timeline');
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

  const priceDisplay = document.getElementById('modal-price-display');
  if (priceDisplay) {
    priceDisplay.innerHTML = `${formatPrice(pkg.priceINR)} <span>/ person</span>`;
  }

  // Set WhatsApp button
  const bookBtn = document.getElementById('modal-book-now-btn');
  if (bookBtn) {
    bookBtn.onclick = () => {
      const text = encodeURIComponent(`Hi Gaur Travels (+91 99718 59687)! I want to book: ${pkg.title} (${pkg.duration}) priced at ${formatPrice(pkg.priceINR)}. Please share available dates.`);
      window.open(`https://wa.me/919971859687?text=${text}`, '_blank');
    };
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

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

function closeModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => {
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
  });
  document.body.style.overflow = '';
}

/* ==========================================================================
   8. FORMS & NOTIFICATIONS
   ========================================================================== */
function initForms() {
  // Main Inquiry Form
  const mainForm = document.getElementById('main-booking-form');
  if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const phone = document.getElementById('form-phone').value;
      const email = document.getElementById('form-email').value || 'Not provided';
      const dest = document.getElementById('form-destination').value;
      const date = document.getElementById('form-date').value || 'Flexible';
      const travelers = document.getElementById('form-travelers').value;
      const notes = document.getElementById('form-notes').value || 'Standard';

      const bookingRef = `GT-${Math.floor(1000 + Math.random() * 9000)}`;

      showToast(`Thank you, ${name}! Your inquiry #${bookingRef} is received. Our tour architect will call ${phone} within 30 minutes!`, 'success');

      // Prompt WhatsApp option
      setTimeout(() => {
        const text = encodeURIComponent(`Hello Gaur Travels (+91 99718 59687),
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
      const name = document.getElementById('qb-name').value;
      const phone = document.getElementById('qb-phone').value;
      const dest = document.getElementById('qb-dest').value;
      const notes = document.getElementById('qb-notes').value || 'General inquiry';

      closeModals();
      showToast(`Thanks ${name}! Directing you to WhatsApp with Gaur Travels (+91 99718 59687)...`, 'success');

      setTimeout(() => {
        const text = encodeURIComponent(`Hi Gaur Travels (+91 99718 59687)!
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

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-gold' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
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
