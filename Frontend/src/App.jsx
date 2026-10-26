import React, { useState, useEffect } from 'react';
import FlightPreloader from './components/FlightPreloader';
import ScrollPlaneTracker from './components/ScrollPlaneTracker';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DestinationsSection from './components/DestinationsSection';
import HighlightsSection from './components/HighlightsSection';
import PackageExplorer from './components/PackageExplorer';
import TourCostCalculator from './components/TourCostCalculator';
import StorySection from './components/StorySection';
import GuidesSpotlight from './components/GuidesSpotlight';
import ReviewsSection from './components/ReviewsSection';
import MobileTrustHub from './components/MobileTrustHub';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ItineraryModal from './components/ItineraryModal';
import BookingSuccessModal from './components/BookingSuccessModal';

import {
  fetchDestinations,
  fetchPackages,
  fetchGuides,
  fetchReviews
} from './services/api';

const CURRENCY_RATES = {
  INR: { symbol: '₹', rate: 1 },
  USD: { symbol: '$', rate: 0.012 },
  EUR: { symbol: '€', rate: 0.011 }
};

export default function App() {
  const [currency, setCurrency] = useState('INR');
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // Modals state
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Load backend data
  useEffect(() => {
    async function loadData() {
      try {
        const [distsData, pkgsData, guidesData, revsData] = await Promise.all([
          fetchDestinations(),
          fetchPackages('all'),
          fetchGuides(),
          fetchReviews()
        ]);
        setDestinations(distsData);
        setPackages(pkgsData);
        setGuides(guidesData);
        setReviews(revsData);
      } catch (err) {
        console.error('Failed to load initial backend data:', err);
      }
    }
    loadData();
  }, []);

  // Update packages when filter changes
  const handleFilterChange = async (region) => {
    setActiveFilter(region);
    try {
      const data = await fetchPackages(region);
      setPackages(data);
    } catch (err) {
      console.error('Filter error:', err);
    }
  };

  const handleSelectRegion = (regionId) => {
    handleFilterChange(regionId);
    const packagesEl = document.getElementById('packages');
    if (packagesEl) {
      packagesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchTours = (region) => {
    handleFilterChange(region === 'any' ? 'all' : region);
    const packagesEl = document.getElementById('packages');
    if (packagesEl) {
      packagesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewPlan = (pkg) => {
    setSelectedPackage(pkg);
    setIsItineraryOpen(true);
  };

  const handleBookTour = (pkg) => {
    const text = `Hello Gaur Travel (+91 99718 59687)!
I am interested in booking:
• Tour: ${pkg.title}
• Duration: ${pkg.duration}
• Price: ₹${pkg.priceINR.toLocaleString()} / person

Please share itinerary details & available departure slots.`;

    window.open(`https://wa.me/919971859687?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleBookingConfirmed = (result) => {
    setBookingResult(result);
    setIsSuccessOpen(true);
  };

  const handleNewReview = (newRev) => {
    setReviews([newRev, ...reviews]);
  };

  const formatPrice = (inrAmount) => {
    if (!inrAmount) return '';
    const { symbol, rate } = CURRENCY_RATES[currency];
    const converted = Math.round(inrAmount * rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="gaur-travels-app">
      {/* Flight Radar & Supersonic Airplane Preloader */}
      <FlightPreloader />

      {/* Supersonic Plane Tracker on Top Scrollbar */}
      <ScrollPlaneTracker />

      {/* Top Contact Bar (+91 99718 59687) */}
      <TopBar currency={currency} onCurrencyChange={setCurrency} />

      {/* Main Navigation */}
      <Navbar
        onOpenBookModal={() => scrollToSection('contact')}
        onScrollToSection={scrollToSection}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Hero Section */}
      <HeroSection onSearchTours={handleSearchTours} />

      {/* "TRAVEL YOU DREAM" 4 Regional Cards (Image 1) */}
      <DestinationsSection
        destinations={destinations}
        onSelectRegion={handleSelectRegion}
        onBookNow={() => scrollToSection('contact')}
      />

      {/* 6 Highlights Badges (Image 1) */}
      <HighlightsSection
        onSelectService={(serviceName) => {
          scrollToSection('contact');
        }}
      />

      {/* Tour Packages Catalog */}
      <PackageExplorer
        packages={packages}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        currency={currency}
        formatPrice={formatPrice}
        onViewPlan={handleViewPlan}
        onBookTour={handleBookTour}
      />

      {/* Smart Tour Cost Calculator */}
      <TourCostCalculator
        formatPrice={formatPrice}
        currency={currency}
      />

      {/* Desktop Trust Sections (Tablets, Laptops, Computers >= 768px) */}
      <div className="desktop-trust-sections">
        {/* Story & Fun Facts Card (Image 2 - Audraverse) */}
        <StorySection />

        {/* Certified Tour Guides */}
        <GuidesSpotlight guides={guides} />

        {/* Traveler Testimonials & Live Review Submission */}
        <ReviewsSection
          reviews={reviews}
          onNewReviewAdded={handleNewReview}
        />
      </div>

      {/* Mobile Collapsible Trust & Insights Accordion Hub (< 768px) */}
      <MobileTrustHub
        guides={guides}
        reviews={reviews}
        onNewReviewAdded={handleNewReview}
      />

      {/* Custom Itinerary & Booking Form */}
      <BookingSection onBookingConfirmed={handleBookingConfirmed} />

      {/* Footer with Image 1 Bottom Bar (+91 99718 59687 & gaur.tourtravel04@gmail.com) */}
      <Footer onSelectRegion={handleSelectRegion} />

      {/* Floating WhatsApp Desk & Quick Dial */}
      <FloatingActions />

      {/* Day-by-Day Itinerary Modal */}
      <ItineraryModal
        pkg={selectedPackage}
        isOpen={isItineraryOpen}
        onClose={() => setIsItineraryOpen(false)}
        formatPrice={formatPrice}
      />

      {/* Confetti Booking Voucher Modal */}
      <BookingSuccessModal
        bookingResult={bookingResult}
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </div>
  );
}
