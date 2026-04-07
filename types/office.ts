export interface Advisor {
  name: string;
  phone: string;
}

export interface Office {
  id: string;
  name: string;
  type: string;
  area: string;
  borough: string;
  address: string;
  desks: number;
  price_per_desk: number | null;
  amenities: string[];
  available_from: string;
  description: string;
  image_url: string | null;
  advisor: Advisor;
  featured: boolean;
}