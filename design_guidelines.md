# ColisVoyageur Design Guidelines

## Design Approach
**Reference-Based Approach** drawing from successful sharing economy platforms:
- **Airbnb**: Trust-building through profiles, ratings, and verification badges
- **BlaBlaCar**: Trip matching and route visualization
- **Uber**: Simplified booking flow and real-time status

**Core Principle**: Build trust between strangers through transparent information, social proof, and professional presentation.

## Typography System
- **Primary Font**: Inter or DM Sans (via Google Fonts CDN)
- **Display/Headers**: Bold (700), sizes 3xl to 5xl for hero, xl to 2xl for section headers
- **Body Text**: Regular (400), size base for forms and descriptions, sm for metadata
- **Buttons/CTAs**: Semibold (600), size base to lg
- **Supporting Info**: Medium (500) for labels and emphasized text

## Layout System
**Spacing Primitives**: Use Tailwind units of 3, 4, 6, 8, 12, 16, 20
- Page padding: px-4 md:px-8 lg:px-16
- Section spacing: py-12 md:py-16 lg:py-20
- Card padding: p-6 md:p-8
- Form field spacing: gap-4 to gap-6

**Grid Structure**:
- Max container width: max-w-7xl
- Trip cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Profile sections: 2-column layout (md:grid-cols-2) for details

**Bilingual Considerations**:
- Implement full RTL support for Arabic using dir="rtl"
- Language toggle prominently in header (top-right)
- Mirror all layouts when in RTL mode

## Component Library

### Navigation
- **Header**: Sticky top navigation with logo (left/right based on language), search bar (center on desktop), language toggle, and user menu
- **Mobile**: Hamburger menu with full-screen overlay
- Include trust indicators in header: "10,000+ successful deliveries" badge

### Hero Section (Landing Page)
- **Large Hero Image**: Traveler with luggage at airport/train station, professional photography style
- **Content Overlay**: 40% width on left (or right for RTL) with semi-transparent backdrop blur
- **Elements**: Bold headline (text-4xl md:text-5xl), supporting tagline, dual CTAs ("Become a Transporter" + "Send a Package")
- Height: min-h-[600px] md:min-h-[700px]

### Trip Cards
- **Structure**: Card with subtle shadow and border, hover lift effect
- **Content Hierarchy**:
  - Route (City A → City B) with large arrow icon - text-xl font-semibold
  - Date and available space - text-sm with icons
  - Transporter mini-profile: avatar (w-10 h-10), name, rating stars (★★★★★)
  - Price badge (prominent, top-right corner) - text-lg font-bold
  - "View Details" button at bottom
- Aspect ratio: Maintain consistent card heights using min-h-[280px]

### Forms (Trip Publishing & Package Request)
- **Multi-step wizard** for complex forms with progress indicator (steps: 1→2→3)
- **Step 1**: Route selection (autocomplete city inputs with dropdown)
- **Step 2**: Details (date picker, weight/volume sliders with live units)
- **Step 3**: Review and confirm with cost preview
- **Input styling**: Generous padding (p-3 md:p-4), clear labels above inputs
- **Validation**: Inline error messages below fields, red accent borders on error

### Search Interface
- **Prominent search bar**: Hero section on search page
- **Filters sidebar** (desktop) or drawer (mobile): destination, date range, max price, transporter ratings
- **Results grid**: Trip cards with sorting options (price, date, rating)
- **Empty state**: Illustration with "No trips found" message and suggestion to create alert

### Cost Calculator Display
- **Real-time breakdown card** showing:
  - Base rate by distance (km/miles display)
  - Weight surcharge with slider visualization
  - Volume multiplier
  - Total with large text (text-3xl font-bold)
- Visual formula representation: Distance + Weight + Volume = Total

### Payment Flow
- **Stripe integration** with clean checkout form
- **Summary panel**: Package details, route, transporter info, final cost
- **Security badges**: "Secured by Stripe", "Payment protected" icons
- **Progress**: "Searching trip → Select → Pay → Confirmed" breadcrumb

### Rating & Review System
- **Two-way rating cards**: Separate cards for rating transporter and sender
- **Star rating** (1-5) with large, tappable stars (h-12 w-12)
- **Comment textarea**: min-h-[120px] with character counter
- **Photo upload**: Optional delivery proof images (max 3)

### User Profiles
- **Hero banner**: Cover photo area (h-48 md:h-64)
- **Avatar**: Large circular photo (w-24 h-24 md:w-32 h-32) overlapping banner
- **Verification badges**: Car license verified, ID verified, phone verified (icon + text)
- **Stats row**: Completed trips | Success rate | Joined date - grid-cols-3 with dividers
- **Tabs navigation**: "About" | "Reviews" | "Trip History"
- **Review cards**: Avatar, name, rating, date, comment text with "Show more" for long reviews
- **Car information** (Transporters only): License plate, vehicle type, with small car icon

### Trust & Safety Elements
- **Verification badges throughout**: Green checkmark icons next to verified information
- **Rating display**: Star icons (filled/outlined) with average score (4.8/5.0) and review count
- **Trust seals**: Footer badges for "Secure payments", "Verified transporters", "24/7 support"

### Mobile Optimization
- **Bottom navigation bar** on mobile: Home | Search | Trips | Messages | Profile
- **Swipeable trip cards** with horizontal scroll on mobile search results
- **Large touch targets**: Minimum h-12 for all interactive elements
- **Collapsible filters**: Drawer from bottom on mobile devices

### Empty States & Loading
- **Illustrations**: Friendly illustrations for empty trip lists, no search results
- **Skeleton screens**: Show loading card shapes matching final content
- **Success confirmations**: Full-screen success with checkmark animation and next steps

## Images
- **Hero image**: Professional photo of traveler at transit location (airport/station) - dimensions 1920x800px
- **Profile avatars**: User photos, circular crop, fallback to initials with gradient background
- **Empty state illustrations**: Custom illustrations for no results, welcome screens
- **Trust badges**: Payment security logos, verification icons (SVG format)
- **Feature icons**: Use Heroicons for consistency (luggage, map-pin, star, shield-check, truck)

## Accessibility
- **Consistent form implementation**: All inputs with proper labels, aria-labels for icon buttons
- **Keyboard navigation**: Full keyboard support for filters, forms, and card selections
- **Focus indicators**: Visible focus rings on all interactive elements
- **Language attribute**: Proper lang attribute switching (ar/fr) for screen readers
- **Alt text**: All images with descriptive alt text in both languages

This design creates a trustworthy, professional platform that balances the utility of package delivery coordination with the experience-focused elements needed to build confidence between strangers.