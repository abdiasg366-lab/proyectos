export interface CoupleConfig {
  recipientName: string;
  senderName: string;
  customMessage?: string;
  specialDate: string;
}

export interface ReasonItem {
  id: number;
  title: string;
  description: string;
  category: 'personalidad' | 'momentos' | 'futuro' | 'detalles';
  icon: string;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  category: string;
  tag: string;
  iconName: string;
  redeemed: boolean;
  redeemedAt?: string;
}

export interface FlowerNote {
  id: number;
  name: string;
  meaning: string;
  note: string;
  color: string;
}
