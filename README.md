# Gaur Travels - Full-Stack Tourism & Tour Guide Platform

> **"Travel You Dream"** — India's Premier Tour Guide & Comprehensive Tourism Platform.  
> Rebuilt with **React + Vite**, a bright and luxurious color palette, and a dedicated **Node.js / Express** backend.

---

## 🌟 Key Upgrades & Highlights

### 1. 🎨 Brighter, Luxurious & Decent Color Palette
- **Luminous Azure Sky (`#0284c7`) & Royal Emerald (`#059669`)** as primary colors instead of dark shades.
- **Warm Sunrise Amber & Tangerine (`#f59e0b`, `#ea580c`)** for accents and call-to-actions.
- **Airy, clean white canvases (`#ffffff`, `#f8fafc`)** with soft glassmorphism (`backdrop-filter: blur(14px)`).
- Crisp contrast with deep slate headings (`#0f172a`).

### 2. ⚡ Full-Stack Architecture
- **Backend (Express + Node.js):**
  - Runs on `http://localhost:5000`
  - RESTful APIs for Destinations, Packages, Certified Guides, Real Traveler Reviews, Inquiries, and Bookings.
  - Smart Cost Calculator endpoint (`/api/calculate-cost`) with live multi-variable pricing formulas.
  - Persistent file storage in `backend/data/` for bookings, inquiries, and reviews.
  - Auto-generated Reservation IDs (e.g. `GT-4416404`) and direct WhatsApp URLs.
- **Frontend (React 18 + Vite):**
  - Runs on `http://localhost:5174` (or `5173`)
  - Modular component hierarchy with `lucide-react` icons.
  - Dynamic API integration via Vite dev server proxy.

### 3. ✈️ Interactive Delights & Materials
- **Flight Radar & Supersonic Airplane Preloader:** Animated cockpit radar sweep, flight trail, and passenger boarding pass countdown (`GT-777`).
- **Supersonic Jet Scroll Tracker:** Airplane icon gliding across the top progress bar as you scroll down.
- **Confetti Celebrations:** Celebratory confetti animation (`canvas-confetti`) when booking an itinerary.
- **Day-by-Day Journey Modal:** Interactive timeline with detailed day-wise plans and one-click WhatsApp quote generator.
- **Live Traveler Reviews Submission:** Users can submit reviews that persist in the backend database.

### 4. 🗺️ 100% Faithful UI Adaptations from Images
- **Image 1 Match:**
  - "TRAVEL YOU DREAM" header
  - Stylized **DESTINATIONS** ribbon badge
  - 4 regional exploration cards: **West India**, **North India**, **South India**, **East India**
  - 6 iconic highlights badges: **Air Tickets**, **Hotels**, **City Tour**, **Guide**, **Pick & Drop**, **Travel Insurance**
  - Pill-shaped **BOOK NOW ≫** CTA button
  - Footer highlight bar with `www.gaurtravels.in`, phone `+91 99718 59687`, and email `gaur.tourtravel04@gmail.com`
- **Image 2 Match (Audraverse Inspiration):**
  - Bio introducing Team Gaur Travels with the signature phrase `...TRAVEL, ...PASSION, ...LIFESTYLE`
  - Iconic bright blue **"FUN FACTS ABOUT GAUR TRAVELS"** card with animated progress bars:
    - *Govt. Verified Guides:* **100%**
    - *Handpicked Luxury & Heritage Stays:* **100%**
    - *Transparent Pricing:* **100%**
    - *24/7 Roadside & Emergency Support:* **100%**
    - *Customized Itineraries:* **100%**
    - *Delighted Happy Travelers:* **15,000+**
- **Image 3 Match:**
  - Official Email: `gaur.tourtravel04@gmail.com`
  - Contact No.: `+91 99718 59687`

---

## 🚀 How to Run

### Step 1: Start the Backend Server (Terminal 1)
```powershell
node backend/server.js
```
*Backend runs on `http://localhost:5000`*

### Step 2: Start the React Frontend (Terminal 2)
```powershell
npm --prefix frontend run dev
```
*Frontend runs on `http://localhost:5174` (or `5173`)*

---

## 📂 Directory Structure

```
c:\Users\Hardik Dagar\OneDrive\Documents\Gaur Travels\
├── backend/
│   ├── data/
│   │   ├── bookings.json       # Persistent bookings store
│   │   ├── inquiries.json      # Inquiries store
│   │   └── reviews.json        # Traveler reviews store
│   ├── package.json
│   └── server.js               # Express API server
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookingSection.jsx
│   │   │   ├── BookingSuccessModal.jsx
│   │   │   ├── DestinationsSection.jsx
│   │   │   ├── FlightPreloader.jsx
│   │   │   ├── FloatingActions.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── GuidesSpotlight.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── HighlightsSection.jsx
│   │   │   ├── ItineraryModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PackageExplorer.jsx
│   │   │   ├── ReviewsSection.jsx
│   │   │   ├── ScrollPlaneTracker.jsx
│   │   │   ├── StorySection.jsx
│   │   │   ├── TopBar.jsx
│   │   │   └── TourCostCalculator.jsx
│   │   ├── services/
│   │   │   └── api.js          # REST API client
│   │   ├── App.jsx
│   │   ├── index.css           # Bright Aegean Cyan & Emerald design system
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js          # Configured with proxy to port 5000
│
├── package.json
└── README.md
```
