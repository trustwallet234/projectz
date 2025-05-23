export interface CardData {
  id?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface EncryptedCard {
  id: string;
  userId: string;
  encryptedData: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}