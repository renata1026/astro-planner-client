export const Location = ['NEW_YORK_CITY', 'LOS_ANGELES', 'CHICAGO', 'TORONTO'];

export const hotels = [
  // New York Hotels (Existing)
  {
    name: 'Waldorf-Astoria New York',
    phone: '(212) 872-7000',
    location: '301 Park Avenue, New York, NY 10022',
    pricePerNight: '$500',
  },
  {
    name: 'The Westin New York at Times Square',
    phone: '(212) 201-2700',
    location: '1567 Broadway, New York, NY 10036',
    pricePerNight: '$335',
  },
  {
    name: 'DoubleTree by Hilton New York Downtown',
    phone: '(212) 480-9100',
    location: '8 Stone St, New York, NY 10004',
    pricePerNight: '$231',
  },

  // Los Angeles Hotels
  {
    name: 'The Ritz-Carlton, Los Angeles',
    phone: '(213) 743-8800',
    location: '900 W Olympic Blvd, Los Angeles, CA 90015',
    pricePerNight: '$550',
  },
  {
    name: 'InterContinental Los Angeles Downtown',
    phone: '(213) 688-7777',
    location: '900 Wilshire Blvd, Los Angeles, CA 90017',
    pricePerNight: '$425',
  },
  {
    name: 'Hilton Los Angeles Airport',
    phone: '(310) 410-4000',
    location: '5711 W Century Blvd, Los Angeles, CA 90045',
    pricePerNight: '$199',
  },

  // Chicago Hotels
  {
    name: 'The Langham, Chicago',
    phone: '(312) 923-9988',
    location: '330 N Wabash Ave, Chicago, IL 60611',
    pricePerNight: '$495',
  },
  {
    name: 'The Gwen, a Luxury Collection Hotel, Chicago',
    phone: '(312) 645-1500',
    location: '521 N Rush St, Chicago, IL 60611',
    pricePerNight: '$375',
  },
  {
    name: 'Hyatt Regency Chicago',
    phone: '(312) 565-1234',
    location: '151 E Wacker Dr, Chicago, IL 60601',
    pricePerNight: '$275',
  },

  // Toronto Hotels
  {
    name: 'Fairmont Royal York',
    phone: '(416) 368-2511',
    location: '100 Front St W, Toronto, ON M5J 1E3, Canada',
    pricePerNight: 'CAD $300',
  },
  {
    name: 'The Ritz-Carlton, Toronto',
    phone: '(416) 585-2500',
    location: '181 Wellington St W, Toronto, ON M5V 3G7, Canada',
    pricePerNight: 'CAD $450',
  },
  {
    name: 'InterContinental Toronto Centre',
    phone: '(416) 597-1400',
    location: '225 Front St W, Toronto, ON M5V 2X3, Canada',
    pricePerNight: 'CAD $275',
  },
];

export const flights = [
  {
    airline: 'Delta Air Lines',
    flightNumber: 'DL1234',
    destination: 'New York, NY',
    arrivalAirport: 'John F. Kennedy International Airport (JFK)',
    departureAirport: 'Los Angeles International Airport (LAX)',
    price: 300,
  },
  {
    airline: 'United Airlines',
    flightNumber: 'UA5678',
    destination: 'Los Angeles, CA',
    arrivalAirport: 'Los Angeles International Airport (LAX)',
    departureAirport: "Chicago O'Hare International Airport (ORD)",
    price: 350,
  },
  {
    airline: 'American Airlines',
    flightNumber: 'AA9876',
    destination: 'Chicago, IL',
    arrivalAirport: "O'Hare International Airport (ORD)",
    departureAirport: 'Dallas/Fort Worth International Airport (DFW)',
    price: 280,
  },
  {
    airline: 'Air Canada',
    flightNumber: 'AC3456',
    destination: 'Toronto, ON',
    arrivalAirport: 'Toronto Pearson International Airport (YYZ)',
    departureAirport: 'Denver International Airport (DEN)',
    price: 320,
  },
  {
    airline: 'Southwest Airlines',
    flightNumber: 'WN6543',
    destination: 'New York, NY',
    arrivalAirport: 'LaGuardia Airport (LGA)',
    departureAirport: 'San Francisco International Airport (SFO)',
    price: 330,
  },
  {
    airline: 'JetBlue',
    flightNumber: 'B7890',
    destination: 'Toronto, ON',
    arrivalAirport: 'Billy Bishop Toronto City Airport (YTZ)',
    departureAirport: 'Seattle-Tacoma International Airport (SEA)',
    price: 310,
  },
  {
    airline: 'Alaska Airlines',
    flightNumber: 'AS4321',
    destination: 'Los Angeles, CA',
    arrivalAirport: 'Los Angeles International Airport (LAX)',
    departureAirport: 'Phoenix Sky Harbor International Airport (PHX)',
    price: 290,
  },
  {
    airline: 'WestJet',
    flightNumber: 'WS5678',
    destination: 'New York, NY',
    arrivalAirport: 'John F. Kennedy International Airport (JFK)',
    departureAirport: 'Vancouver International Airport (YVR)',
    price: 280,
  },
  {
    airline: 'Frontier Airlines',
    flightNumber: 'F1234',
    destination: 'Chicago, IL',
    arrivalAirport: "O'Hare International Airport (ORD)",
    departureAirport: 'Miami International Airport (MIA)',
    price: 340,
  },
  {
    airline: 'Spirit Airlines',
    flightNumber: 'NK7890',
    destination: 'Toronto, ON',
    arrivalAirport: 'Toronto Pearson International Airport (YYZ)',
    departureAirport: 'Fort Lauderdale-Hollywood International Airport (FLL)',
    price: 325,
  },
];
export const cars = [
  {
    carRentalAgency: 'Enterprise Rent-A-Car',
    carType: 'Toyota Corolla',
    pickupLocation: '106 W 24th St, New York, NY 10011',
    dropoffLocation: '529 W 42nd St, New York, NY 10036',
  },
  {
    carRentalAgency: 'Avis',
    carType: 'Nissan Sentra',
    pickupLocation: '535 8th Ave, New York, NY 10018',
    dropoffLocation: '101 W 31st St, New York, NY 10001',
  },
  {
    carRentalAgency: 'Budget',
    carType: 'Honda Pilot',
    pickupLocation: '349 W 42nd St, New York, NY 10036',
    dropoffLocation: '337 W 33rd St, New York, NY 10001',
  },
  {
    carRentalAgency: 'National Car Rental',
    carType: 'Hyundai Elantra',
    pickupLocation: '438 W 37th St, New York, NY 10036',
    dropoffLocation: '600 W 42nd St, New York, NY 10036',
  },
  {
    carRentalAgency: 'Hertz',
    carType: 'Ford Focus',
    pickupLocation: 'Los Angeles International Airport (LAX), Los Angeles, CA',
    dropoffLocation: '123 Main St, Los Angeles, CA 90012',
  },
  {
    carRentalAgency: 'Thrifty Car Rental',
    carType: 'Chevrolet Malibu',
    pickupLocation: "Chicago O'Hare International Airport (ORD), Chicago, IL",
    dropoffLocation: '456 W Adams St, Chicago, IL 60661',
  },
  {
    carRentalAgency: 'Enterprise Rent-A-Car',
    carType: 'Kia Optima',
    pickupLocation: 'Toronto Pearson International Airport (YYZ), Toronto, ON',
    dropoffLocation: '789 King St W, Toronto, ON M5V 2V3',
  },
  {
    carRentalAgency: 'Alamo Rent A Car',
    carType: 'Jeep Grand Cherokee',
    pickupLocation: 'Los Angeles Downtown, Los Angeles, CA',
    dropoffLocation: '987 Sunset Blvd, Los Angeles, CA 90012',
  },
  {
    carRentalAgency: 'Budget',
    carType: 'Ford Escape',
    pickupLocation: 'Chicago Midway International Airport (MDW), Chicago, IL',
    dropoffLocation: '567 N Michigan Ave, Chicago, IL 60661',
  },
  {
    carRentalAgency: 'Dollar Rent A Car',
    carType: 'Toyota Camry',
    pickupLocation: 'Toronto Union Station, Toronto, ON',
    dropoffLocation: '456 Queen St E, Toronto, ON M5A 1T2',
  },
];
