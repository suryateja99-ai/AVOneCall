export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedCustomer?: boolean;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  ownerName: string;
  phone: string;
  alternatePhone?: string;
  whatsapp?: string;
  email?: string;
  state: string;
  district: string;
  mandal: string;
  city: string;
  address: string;
  pinCode?: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured?: boolean;
  isEmergency?: boolean;
  openStatus: string;
  image: string;
  icon: string;
  tags: string[];
  timings: string;
  description: string;
  reviews: Review[];
  distanceKm?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  count: number;
  subcategories: string[];
  isEmergency?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'system' | 'business' | 'emergency';
}

export interface UserProfile {
  isLoggedIn: boolean;
  name: string;
  phone: string;
  email?: string;
  city: string;
  avatar?: string;
}
