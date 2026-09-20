export type MealCategory = 'Rice Bowls' | 'Wraps & Shawarma' | 'Pasta' | 'Salads' | 'Indian Plates';
export type MenuType = 'Lunch' | 'Dinner';
export type DietType = 'veg' | 'nonveg';
export type PlanDuration = 'weekly' | 'monthly';
export type MealFrequency = 1 | 2;

export interface MenuItem {
  id: string;
  name: string;
  category: MealCategory;
  menuType: MenuType;
  diet: DietType;
  protein: string;
  calories: string;
  carbs: string;
  fats: string;
  description: string;
  image: string;
  isPopular?: boolean;
}

export interface PlanSelection {
  duration: PlanDuration;
  diet: DietType;
  frequency: MealFrequency;
  price: number;
  mealsCount: number;
}

export interface CheckoutData {
  type: 'plan' | 'trial';
  plan?: PlanSelection;
  trialMealName?: string;
  trialMealSlot?: 'Lunch' | 'Dinner';
  price: number;
  customerName: string;
  phone: string;
  address: string;
  locality: string;
  landmark: string;
  dietaryNotes: string;
  startDate: string;
  paymentMethod: 'upi' | 'card' | 'cod' | 'whatsapp';
}
