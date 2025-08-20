export interface FormData {
  fuelConsumption: string;
  fuelPrice: string;
  maintenance: string;
  tires: string;
  insurance: string;
  oilChange: string;
  distance: string;
  earnings: string;
  alimentation: string;
  rentalCost: string;
  rentalPeriod: 'daily' | 'weekly' | 'monthly';
  tolls: string;
  accommodation: string;
}

export interface CalculationResults {
  totalFuelCost: number;
  otherExpenses: number;
  totalRentalCost: number;
  alimentationCost: number;
  totalTolls: number;
  totalAccommodation: number;
  totalExpenses: number;
  netProfit: number;
  costPerKm: number;
  breakevenEarnings: number;
  profitMargin: number;
}