export interface Experience {
  id: string;
  title: string;
  description: string;
  category: string;
  country: string;
  city: string;
  price: number;
  duration: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  tags: string[];
  difficulty?: 'facil' | 'moderado' | 'dificil';
  featured: boolean;
}
