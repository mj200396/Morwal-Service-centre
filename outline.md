# Morwal Service Centre - Project Outline

## File Structure

```
/mnt/okcomputer/output/
├── index.html              # Homepage with hero section and service highlights
├── services.html           # Detailed service listings with pricing
├── shop.html              # Spare parts catalog with shopping cart
├── booking.html           # Service appointment booking system
├── about.html             # Company story and team information
├── contact.html           # Contact details and location map
├── main.js                # Core JavaScript functionality
├── resources/             # Local assets directory
│   ├── hero-workshop.jpg  # Generated hero image
│   ├── mechanic-team.jpg  # Workshop team photo
│   ├── service-bay.jpg    # Professional service area
│   ├── spare-parts/       # Product images
│   └── icons/             # Service and UI icons
└── README.md              # Project documentation
```

## Page Breakdown

### 1. index.html - Homepage
**Purpose**: First impression, service overview, trust building
**Sections**:
- Navigation bar with logo and menu
- Hero section with workshop image and tagline
- Service highlights with interactive cards
- Quick booking CTA buttons
- Customer testimonials carousel
- Business statistics (years experience, customers served)
- Footer with contact information

**Interactive Elements**:
- Hero text with typewriter animation
- Service cards with hover effects
- Testimonial slider with auto-play
- Quick booking modal

### 2. services.html - Service Catalog
**Purpose**: Detailed service information and pricing
**Sections**:
- Service category navigation
- Interactive service calculator
- Detailed service descriptions with pricing
- Package deals and comparisons
- Booking integration for each service

**Interactive Elements**:
- Service cost calculator
- Package comparison table
- "Book Now" buttons for each service
- Service duration estimates

### 3. shop.html - Spare Parts Store
**Purpose**: E-commerce functionality for parts sales
**Sections**:
- Product category filters
- Product grid with search functionality
- Shopping cart sidebar
- Product detail modals
- Checkout simulation

**Interactive Elements**:
- Product filtering system
- Add to cart functionality
- Cart management (quantity, remove)
- Price calculator with tax
- Payment method selection

### 4. booking.html - Service Appointment
**Purpose**: Service booking system with form validation
**Sections**:
- Multi-step booking form
- Vehicle selection (Bike/Scooty)
- Brand and model selection
- Service type selection
- Date and time picker
- Contact information form

**Interactive Elements**:
- Progressive form steps
- Real-time availability checking
- WhatsApp integration for confirmations
- Form validation with helpful error messages

### 5. about.html - Company Information
**Purpose**: Build trust and showcase expertise
**Sections**:
- Company story and history
- Team member profiles
- Workshop facilities showcase
- Certifications and achievements
- Customer success stories

### 6. contact.html - Contact Details
**Purpose**: Provide multiple contact methods and location
**Sections**:
- Contact information display
- Interactive Google Maps
- Business hours
- Social media links
- Quick contact form

## Technical Implementation

### Core Libraries Integration
- **Anime.js**: Page transitions and micro-interactions
- **Typed.js**: Dynamic text in hero sections
- **Splide.js**: Image carousels and testimonial sliders
- **ECharts.js**: Service statistics and customer ratings
- **p5.js**: Interactive background effects

### Responsive Design
- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px, 1440px
- Touch-friendly interactions
- Optimized images for different screen densities

### Performance Optimization
- Lazy loading for images
- Minified CSS and JavaScript
- Optimized font loading
- Efficient animation performance

### Accessibility Features
- High contrast color ratios
- Keyboard navigation support
- Screen reader compatibility
- Alternative text for images