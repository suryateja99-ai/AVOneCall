import { Business, Category, NotificationItem } from '../types';
import HERO_BANNER_IMAGE from '../assets/images/hero_city_services_1791874410067.jpg';
import EMERGENCY_BANNER_IMAGE from '../assets/images/banner_emergency_help_1791874410875.jpg';
import DOCTOR_IMAGE from '../assets/images/doctor_medical_care_1791874409976.jpg';
import RESTAURANT_IMAGE from '../assets/images/restaurant_fine_dining_1791874410396.jpg';

export {
  HERO_BANNER_IMAGE,
  EMERGENCY_BANNER_IMAGE,
  DOCTOR_IMAGE,
  RESTAURANT_IMAGE
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'hospital',
    name: 'Hospital',
    icon: '🏥',
    color: '#E11D48',
    bgColor: '#FFF1F2',
    count: 24,
    subcategories: ['Multi-Speciality', 'Emergency Care', 'Diagnostic Labs', 'Maternity', 'Eye Hospitals', 'Dental Care'],
    isEmergency: true
  },
  {
    id: 'doctor',
    name: 'Doctor',
    icon: '👨‍⚕️',
    color: '#0284C7',
    bgColor: '#F0F9FF',
    count: 38,
    subcategories: ['General Physicians', 'Cardiologists', 'Pediatricians', 'Orthopedic', 'Dermatologists', 'Dentists']
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: '🍴',
    color: '#D97706',
    bgColor: '#FFFBEB',
    count: 52,
    subcategories: ['Family Restaurants', 'Biryani Specialists', 'Pure Veg', 'Cafes & Bakeries', 'Fast Food', 'Catering']
  },
  {
    id: 'hotel',
    name: 'Hotel',
    icon: '🏨',
    color: '#7C3AED',
    bgColor: '#F5F3FF',
    count: 19,
    subcategories: ['Luxury Stays', 'Budget Lodges', 'Banquet Halls', 'Resorts', 'Conference Rooms']
  },
  {
    id: 'education',
    name: 'Education',
    icon: '🎓',
    color: '#059669',
    bgColor: '#ECFDF5',
    count: 31,
    subcategories: ['Schools', 'Junior Colleges', 'Coaching Institutes', 'Computer Training', 'Music & Arts']
  },
  {
    id: 'security',
    name: 'Security',
    icon: '🛡️',
    color: '#475569',
    bgColor: '#F1F5F9',
    count: 16,
    subcategories: ['Security Guards', 'CCTV & Alarm Systems', 'Commercial Bouncers', 'Facility Management']
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: '🏠',
    color: '#EA580C',
    bgColor: '#FFF7ED',
    count: 27,
    subcategories: ['Open Plots', 'Villas & Houses', 'Apartments', 'Commercial Rental', 'Agricultural Lands']
  },
  {
    id: 'automobile',
    name: 'Automobile',
    icon: '🚗',
    color: '#2563EB',
    bgColor: '#EFF6FF',
    count: 34,
    subcategories: ['Car Servicing', 'Bike Repairs', 'Tire & Wheel Alignment', 'Spare Parts', 'EV Charging']
  },
  {
    id: 'beauty',
    name: 'Beauty',
    icon: '💇',
    color: '#DB2777',
    bgColor: '#FDF2F8',
    count: 22,
    subcategories: ['Hair Salons', 'Beauty Parlours', 'Bridal Makeup', 'Spa & Massage', 'Tattoo Studios']
  },
  {
    id: 'home-service',
    name: 'Home Service',
    icon: '🔧',
    color: '#0D9488',
    bgColor: '#F0FDFA',
    count: 45,
    subcategories: ['Electricians', 'Plumbers', 'AC Repair & Service', 'Carpenters', 'Pest Control', 'Painters']
  },
  {
    id: 'jobs',
    name: 'Jobs',
    icon: '💼',
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    count: 18,
    subcategories: ['Office Staff', 'Sales Executives', 'Delivery Partners', 'Skilled Technicians', 'Security Staff']
  },
  {
    id: 'shop',
    name: 'Shop',
    icon: '🛍️',
    color: '#9333EA',
    bgColor: '#FAF5FF',
    count: 64,
    subcategories: ['Supermarkets', 'Electronics & Mobiles', 'Clothing & Sarees', 'Hardware & Sanitary', 'Jewelry']
  }
];

export const INITIAL_BUSINESSES: Business[] = [
  {
    id: 'b-1',
    name: 'City Care Multi-Speciality Hospital',
    category: 'Hospital',
    subCategory: 'Multi-Speciality',
    ownerName: 'Dr. K. Sudhakar Rao',
    phone: '9000000001',
    alternatePhone: '08702441122',
    whatsapp: '9000000001',
    email: 'help@citycarehospital.com',
    state: 'Telangana',
    district: 'Warangal Urban',
    mandal: 'Hanamkonda',
    city: 'Hanamkonda',
    address: 'Near Nakkalagutta Junction, Subedari Main Road, Hanamkonda',
    pinCode: '506001',
    rating: 4.8,
    reviewCount: 245,
    verified: true,
    featured: true,
    isEmergency: true,
    openStatus: 'Open 24/7 (Emergency Active)',
    image: EMERGENCY_BANNER_IMAGE,
    icon: '🏥',
    tags: ['24/7 ICU', 'Trauma Center', 'Cashless Mediclaim', 'Pharmacy Inside', 'Ambulance On-Call'],
    timings: '24 Hours Open',
    description: 'Premier multi-speciality tertiary healthcare center equipped with 150 beds, state-of-the-art ICU, emergency trauma care, robotic laparoscopic surgery, and 24/7 advanced diagnostic laboratory.',
    distanceKm: 1.2,
    reviews: [
      {
        id: 'r-1',
        userName: 'Rajesh Kumar G.',
        rating: 5,
        comment: 'Immediate emergency attention given at 2 AM. Doctors and nursing staff are extremely competent and empathetic.',
        date: '2 days ago',
        verifiedCustomer: true
      },
      {
        id: 'r-2',
        userName: 'Suma Latha',
        rating: 4.5,
        comment: 'Very clean premises with prompt cashless billing assistance. Highly recommended.',
        date: '1 week ago',
        verifiedCustomer: true
      }
    ]
  },
  {
    id: 'b-2',
    name: 'Warangal Family Restaurant & Biryani House',
    category: 'Restaurant',
    subCategory: 'Family Dining',
    ownerName: 'Mohammed Azharuddin',
    phone: '9000000002',
    alternatePhone: '9848022334',
    whatsapp: '9000000002',
    email: 'info@warangalfamilyrestaurant.in',
    state: 'Telangana',
    district: 'Warangal Urban',
    mandal: 'Warangal',
    city: 'Warangal',
    address: 'Beside Kakatiya Medical College Road, Mattewada, Warangal',
    pinCode: '506002',
    rating: 4.5,
    reviewCount: 189,
    verified: true,
    featured: true,
    openStatus: 'Open Now · Closes 11:30 PM',
    image: RESTAURANT_IMAGE,
    icon: '🍴',
    tags: ['Authentic Dum Biryani', 'AC Family Section', 'Home Delivery', 'Valet Parking', 'Party Hall'],
    timings: '11:00 AM – 11:30 PM Daily',
    description: 'Famed local dining landmark serving authentic Hyderabadi Dum Biryani, Tandoori delicacies, North Indian curries, and traditional Telangana spices with spacious family seating.',
    distanceKm: 2.8,
    reviews: [
      {
        id: 'r-3',
        userName: 'Venkatesh Babu',
        rating: 5,
        comment: 'Best mutton biryani and Apollo fish in the entire district. Consistent taste since years!',
        date: '3 days ago',
        verifiedCustomer: true
      }
    ]
  },
  {
    id: 'b-3',
    name: 'Apollo Medical Center & Specialist Clinic',
    category: 'Doctor',
    subCategory: 'Specialist Clinic',
    ownerName: 'Dr. Sarah Jenkins & Dr. P. Srinivas',
    phone: '9000000005',
    alternatePhone: '08702558899',
    whatsapp: '9000000005',
    email: 'care@apollomedicalwarangal.com',
    state: 'Telangana',
    district: 'Warangal Urban',
    mandal: 'Hanamkonda',
    city: 'Hanamkonda',
    address: 'Plot 42, Doctors Colony, Opposite Public Gardens, Hanamkonda',
    pinCode: '506001',
    rating: 4.9,
    reviewCount: 310,
    verified: true,
    featured: true,
    openStatus: 'Open Now · Closes 8:30 PM',
    image: DOCTOR_IMAGE,
    icon: '👨‍⚕️',
    tags: ['Senior Cardiologist', 'Diabetologist', 'Pediatric Specialist', 'Digital ECG', 'Quick Consultation'],
    timings: '9:00 AM – 1:30 PM, 5:00 PM – 8:30 PM',
    description: 'Renowned diagnostic & consultation clinic featuring experienced senior specialists in internal medicine, diabetes management, cardiology, and preventive family health checkups.',
    distanceKm: 0.9,
    reviews: [
      {
        id: 'r-4',
        userName: 'Anand Reddy',
        rating: 5,
        comment: 'Dr. Srinivas takes ample time to explain diagnoses without rushing. Very reassuring approach.',
        date: 'Yesterday',
        verifiedCustomer: true
      }
    ]
  },
  {
    id: 'b-4',
    name: 'AV Security & Facility Services Pvt Ltd',
    category: 'Security',
    subCategory: 'Commercial Security',
    ownerName: 'Capt. A. Vikram Rao (Retd.)',
    phone: '9000000003',
    alternatePhone: '9440188220',
    whatsapp: '9000000003',
    email: 'contact@avsecurityservices.com',
    state: 'Telangana',
    district: 'Hyderabad',
    mandal: 'Madhapur',
    city: 'Telangana',
    address: 'Plot 108, Jubilee Enclave, Hitec City Road, Hyderabad',
    pinCode: '500081',
    rating: 4.7,
    reviewCount: 96,
    verified: true,
    featured: false,
    openStatus: 'Open 24/7 Operations',
    image: HERO_BANNER_IMAGE,
    icon: '🛡️',
    tags: ['Armed & Unarmed Guards', 'CCTV Monitoring', 'Event Security', 'Background Verified', 'PSARA Licensed'],
    timings: '24 Hours Support Office',
    description: 'PSARA licensed security agency providing rigorously trained uniformed guards, executive protection, smart surveillance, and corporate facility management across Telangana & AP.',
    distanceKm: 4.5,
    reviews: [
      {
        id: 'r-5',
        userName: 'Gated Community Secretary',
        rating: 4.8,
        comment: 'Hired AV Security for our 240-flat residential gated community. Punctual, disciplined guards and round-the-clock supervisor patrols.',
        date: '2 weeks ago',
        verifiedCustomer: true
      }
    ]
  },
  {
    id: 'b-5',
    name: 'Home Service Experts & Quick Repair',
    category: 'Home Service',
    subCategory: 'Electricians & Plumbers',
    ownerName: 'B. Maheshwar',
    phone: '9000000004',
    whatsapp: '9000000004',
    email: 'service@homeserviceexperts.in',
    state: 'Telangana',
    district: 'Hyderabad',
    mandal: 'Kukatpally',
    city: 'Hyderabad',
    address: 'Phase 3, KPHB Colony, Near Forum Mall Road, Hyderabad',
    pinCode: '500072',
    rating: 4.6,
    reviewCount: 121,
    verified: true,
    openStatus: 'Open Now · 60 Min Arrival',
    image: HERO_BANNER_IMAGE,
    icon: '🔧',
    tags: ['Certified Electricians', 'Leakage & Plumbing', 'AC Deep Clean', 'Doorstep In 60 Mins', 'Fixed Pricing'],
    timings: '7:30 AM – 9:30 PM Everyday',
    description: 'On-demand verified doorstep technicians for household emergencies, short circuits, water motor failures, split AC servicing, washing machine repair, and carpentry.',
    distanceKm: 3.2,
    reviews: [
      {
        id: 'r-6',
        userName: 'Deepa V.',
        rating: 4.5,
        comment: 'AC stopped cooling during peak noon heat. Electrician arrived within 45 minutes and solved the capacitor issue at a reasonable rate.',
        date: '4 days ago',
        verifiedCustomer: true
      }
    ]
  },
  {
    id: 'b-6',
    name: 'Royal Grand Luxury Hotel & Banquets',
    category: 'Hotel',
    subCategory: 'Luxury Stay',
    ownerName: 'Sanjay Agarwal',
    phone: '9000000006',
    alternatePhone: '08702667788',
    whatsapp: '9000000006',
    email: 'reservations@royalgrandhotel.com',
    state: 'Telangana',
    district: 'Warangal Urban',
    mandal: 'Hanamkonda',
    city: 'Hanamkonda',
    address: 'Near Kazipet Railway Link Road, Hanamkonda',
    pinCode: '506004',
    rating: 4.4,
    reviewCount: 156,
    verified: true,
    openStatus: 'Open 24/7 Front Desk',
    image: RESTAURANT_IMAGE,
    icon: '🏨',
    tags: ['Executive AC Rooms', '500-Pax Banquet Hall', 'Complimentary Breakfast', 'Free High Speed WiFi', 'Airport Pickup'],
    timings: '24/7 Check-in Available',
    description: 'Premier business hotel offering 64 contemporary executive rooms, 2 grand banquet suites for weddings and conferences, 24-hour room service, and tranquil central courtyards.',
    distanceKm: 2.1,
    reviews: [
      {
        id: 'r-7',
        userName: 'Manoj Tiwari',
        rating: 4,
        comment: 'Convenient location close to Kazipet junction. Generous breakfast buffet spread and fast room service.',
        date: '5 days ago',
        verifiedCustomer: true
      }
    ]
  },
  {
    id: 'b-7',
    name: 'Bright Future Academy & Coaching Hub',
    category: 'Education',
    subCategory: 'Coaching Institutes',
    ownerName: 'Prof. Ramesh Chander M.Sc.',
    phone: '9000000007',
    whatsapp: '9000000007',
    email: 'admissions@brightfutureacademy.edu',
    state: 'Telangana',
    district: 'Warangal Urban',
    mandal: 'Warangal',
    city: 'Warangal',
    address: 'Station Road, Near Postal Colony, Warangal',
    pinCode: '506002',
    rating: 4.8,
    reviewCount: 88,
    verified: true,
    openStatus: 'Open Now · Closes 7:00 PM',
    image: HERO_BANNER_IMAGE,
    icon: '🎓',
    tags: ['IIT-JEE & NEET Foundation', 'State Board Coaching', 'Small Batch Size', 'Doubt Clearing Labs', 'Scholarships'],
    timings: '8:00 AM – 7:00 PM',
    description: 'Top-tier coaching institute specializing in competitive engineering and medical entrance exam preparations with experienced IIT/NIT alumni faculty and structured mock test series.',
    distanceKm: 3.5,
    reviews: [
      {
        id: 'r-8',
        userName: 'Kiran Goud',
        rating: 5,
        comment: 'My daughter scored top rank in EAMCET under their mentorship. The study material and faculty personal guidance are exceptional.',
        date: '3 weeks ago',
        verifiedCustomer: true
      }
    ]
  },
  {
    id: 'b-8',
    name: 'Sri Sai Real Estate & Property Consultants',
    category: 'Real Estate',
    subCategory: 'Open Plots & Villas',
    ownerName: 'M. Balakrishna',
    phone: '9000000008',
    whatsapp: '9000000008',
    email: 'info@srisairealestate.com',
    state: 'Telangana',
    district: 'Hyderabad',
    mandal: 'Gachibowli',
    city: 'Hyderabad',
    address: 'Near Financial District Junction, Nanakramguda, Hyderabad',
    pinCode: '500032',
    rating: 4.5,
    reviewCount: 72,
    verified: false,
    openStatus: 'Open Now · Closes 8:00 PM',
    image: HERO_BANNER_IMAGE,
    icon: '🏠',
    tags: ['HMDA Approved Layouts', 'Clear Legal Titles', 'Bank Loan Support', 'Commercial Spaces', 'Resale Plots'],
    timings: '9:30 AM – 8:00 PM',
    description: 'Trusted property consulting firm helping families and investors find verified HMDA & DTCP approved open plots, luxury gated community villas, and high-yield commercial spaces.',
    distanceKm: 5.1,
    reviews: [
      {
        id: 'r-9',
        userName: 'Prashanth K.',
        rating: 4.5,
        comment: 'Helped me find an HMDA approved plot near ORR with completely transparent legal documentation verification.',
        date: '1 month ago',
        verifiedCustomer: true
      }
    ]
  },
  {
    id: 'b-9',
    name: 'SpeedZone Auto Care & Bosch Service',
    category: 'Automobile',
    subCategory: 'Car Servicing',
    ownerName: 'N. Raghunath',
    phone: '9000000009',
    whatsapp: '9000000009',
    email: 'service@speedzoneauto.in',
    state: 'Telangana',
    district: 'Warangal Urban',
    mandal: 'Hanamkonda',
    city: 'Hanamkonda',
    address: 'Hunter Road, Beside Indian Oil Bunk, Hanamkonda',
    pinCode: '506001',
    rating: 4.7,
    reviewCount: 114,
    verified: true,
    openStatus: 'Open Now · Closes 8:00 PM',
    image: HERO_BANNER_IMAGE,
    icon: '🚗',
    tags: ['Computerized Wheel Alignment', 'Engine Diagnostic Scanner', '3M Teflon Coating', 'AC Gas Recharge', 'Original Spares'],
    timings: '8:30 AM – 8:00 PM Mon-Sat',
    description: 'State of the art multi-brand car service workshop with hydraulic lifts, computerized 3D wheel alignment, electronic engine scanning, paint booth, and roadside breakdown towing.',
    distanceKm: 1.8,
    reviews: [
      {
        id: 'r-10',
        userName: 'Dr. Praveen',
        rating: 5,
        comment: 'Serviced my SUV here. Fixed the suspension noise that the showroom dealer could not solve. Very transparent billing.',
        date: '1 week ago',
        verifiedCustomer: true
      }
    ]
  }
];

export const POPULAR_LOCATIONS = [
  'Hanamkonda, Telangana',
  'Warangal, Telangana',
  'Hyderabad, Telangana',
  'Secunderabad, Telangana',
  'Karimnagar, Telangana',
  'Khammam, Telangana',
  'Nizamabad, Telangana',
  'Bengaluru, Karnataka',
  'Vijayawada, Andhra Pradesh',
  'Visakhapatnam, Andhra Pradesh'
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Emergency Helpline 24/7',
    message: 'Need urgent medical, police or ambulance help? Tap the emergency button on home anytime.',
    time: '10m ago',
    unread: true,
    type: 'emergency'
  },
  {
    id: 'n-2',
    title: 'New Verified Listing',
    message: 'Warangal Family Restaurant & Biryani House has updated their catering menu and festival specials.',
    time: '2h ago',
    unread: true,
    type: 'business'
  },
  {
    id: 'n-3',
    title: 'List Your Business for Free',
    message: 'Expand your local reach! Register your store or service in under 2 minutes.',
    time: '1d ago',
    unread: false,
    type: 'system'
  }
];

export const EMERGENCY_NUMBERS = [
  { service: 'Medical Ambulance', number: '108', icon: '🚑', desc: 'Government 24/7 emergency ambulance dispatch' },
  { service: 'Police Control Room', number: '100', icon: '👮', desc: 'Immediate emergency police assistance' },
  { service: 'Fire & Rescue Service', number: '101', icon: '🚒', desc: 'Fire department & rescue operators' },
  { service: 'Women Safety Helpline', number: '1091', icon: '🛡️', desc: 'Toll-free 24-hour women safety cell' },
  { service: 'National Emergency', number: '112', icon: '🚨', desc: 'All-in-one unified emergency number' },
  { service: 'Child Helpline', number: '1098', icon: '👶', desc: 'Care & protection for children in distress' }
];
