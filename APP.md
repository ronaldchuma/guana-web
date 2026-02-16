# Guana App Overview

## What It Is

Guana is a ride-sharing platform for Costa Rica. Drivers publish routes between towns, beaches, and cities. Passengers search, book, and share the ride. Think BlaBlaCar, but built specifically for Costa Rica's travel culture — surf trips, beach hops, and cross-country routes.

## Target Audience

- Locals traveling between cities and beach towns
- Expats living in Costa Rica
- Tourists and digital nomads exploring the country
- Surfers, hikers, and adventure travelers
- Anyone who wants to save on transport costs or reduce their footprint

## Geographic Focus

- **Country:** Costa Rica only (all locations validated within CR borders)
- **Key corridors:** San Jose ↔ beach towns (Jaco, Tamarindo, Santa Teresa, Nosara, Dominical, Playa Hermosa)
- **Emphasis:** Coastal routes, surf destinations, adventure travel

## User Types

### Passengers
- Search trips by origin, destination, date, and seat count
- Filter by departure time, price, vehicle type, 4x4, surfboard space
- Sort by: earliest departure, cheapest, nearest origin/destination, best rating
- Book seats with optional message to driver
- Chat with drivers before and during trips
- Rate drivers after trips

### Drivers
- Publish trips via a multi-step wizard:
  1. Set origin and destination (with map)
  2. Choose route (recommended, highway, road, tolls/no tolls)
  3. Add stopover cities (up to 5) for more visibility
  4. Pick date and departure time
  5. Set available seats
  6. Set price per seat
  7. Select vehicle
- Manage bookings (approve/reject passenger requests)
- Start and end trips (can start 15 min before departure)
- Manage their vehicles (brand, model, year, color, features, photos)

## Vehicle Types

- Sedan (Sedán)
- SUV
- Pickup
- Van

Special flags: 4x4, surfboard space

## Key Features

### Core
- **Trip search & booking** — search, filter, sort, book seats
- **Trip publishing** — multi-step wizard with route selection and stopovers
- **In-app messaging** — thread per trip between driver and passenger
- **Ratings & reviews** — mutual ratings after trip completion
- **Inbox** — notifications, offers, support, updates

### Trust & Safety
- **Email verification** — required to publish or book
- **Phone verification** — optional, adds trust badge
- **Identity verification** — ID document upload (coming soon)
- **Travel preferences** — conversation style, music, pets, smoking
- **Profile completion** — progressive profile building

### Trip Management
- **Draft saving** — incomplete trips saved automatically
- **Edit restrictions** — can't raise price if passengers confirmed
- **Cancellation** — with reason selection
- **Live tracking** — real-time driver location during active trip
- **Digital receipts** — after trip completion

## User Journey

### Sign Up Flow
1. Welcome screen (hero image, "Every road leads to a new story")
2. Enter email
3. Create password (strength indicator, requirements shown)
4. Check your email (animated envelope screen)
5. Click confirmation link in email
6. Return to app → verified

### Onboarding (after email verification)
1. Email verified success screen (auto-advances after 3s)
2. Welcome carousel (3 pages):
   - "Find your ride" — search trips
   - "Offer a ride" — publish routes
   - "Travel together" — community & trust
3. Enter name (first + last)
4. Add profile photo (camera or library, skippable)
5. Success: "Welcome, [Name]! Your account is ready."

### Core Loop
1. **Browse/search** trips on home screen
2. **Book** a trip → driver approves
3. **Chat** with driver about details
4. **Travel** together
5. **Rate** the experience

## Travel Preferences

Users can set preferences that other users see:

| Category | Options |
|----------|---------|
| Conversation | Loves to chat, Chats when there's a vibe, Prefers quiet, No preference |
| Music | Any music, Soft music, No music, No preference |
| Pets | Loves pets, Small pets OK, No pets, No preference |
| Smoking | Smoking OK, Outside only, No smoking, No preference |

## Pricing

- Drivers set their own price per seat (in Costa Rican Colones)
- Payment is arranged directly between driver and passenger
- Guana does not process payments (no in-app payments yet)
- SINPE Mobile (Costa Rican instant payment) is referenced as a common method

## App Status

- iOS app (Swift/SwiftUI, iOS 17+)
- Backend: Supabase (auth, database, storage)
- Pre-launch / beta stage
- Not yet on the App Store
