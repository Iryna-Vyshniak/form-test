export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  specialtyEn: string;
  rank: string;
  photo: string;
  experience: string;
  education: string;
  schedule: string;
  phone: string;
  specializations: string[];
  available: boolean;
  rating: number;
}
