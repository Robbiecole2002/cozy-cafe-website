import { site } from './site';

export type MenuBadge = 'Popular' | 'Vegetarian' | 'Spicy' | 'Deal';

export interface PricedOption {
  label: string;
  price: string;
}

export interface MenuItem {
  name: string;
  description?: string;
  /** Use for a single fixed price. */
  price?: string;
  /** Use instead of `price` when an item has multiple sizes/options. */
  prices?: PricedOption[];
  badges?: MenuBadge[];
}

export interface MenuCategory {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
}

const dealPrice = (slug: string): string => {
  const offer = site.offers.find((o) => o.slug === slug);
  return offer?.badge ?? '';
};

export const menu: MenuCategory[] = [
  {
    id: 'deals',
    title: 'Cozy Special Deals',
    items: [
      { name: 'Full Brekkie Deal', description: 'Full English or Full Scottish breakfast with a can of drink.', price: dealPrice('full-brekkie-deal'), badges: ['Deal'] },
      { name: 'Brunch Deal', description: 'Any panini or wrap with chips, salad and a can of drink.', price: dealPrice('brunch-deal'), badges: ['Deal'] },
      { name: 'Cozy Duo Deal', description: 'Two burgers with sides and drinks — made for sharing.', price: dealPrice('cozy-duo-deal'), badges: ['Deal'] },
    ],
  },
  {
    id: 'all-day-breakfast',
    title: 'All Day Breakfast',
    items: [
      { name: 'Mini Breakfast', price: '£7.40' },
      { name: 'Full Scottish', price: '£10.40' },
      { name: 'Full English', price: '£10.40' },
      { name: 'Turkish Breakfast', description: 'Cheeses, olives, tomato, cucumber, eggs, honey, jam and warm bread.', price: '£13.50', badges: ['Popular'] },
      { name: 'Vegetarian Breakfast', price: '£10.40', badges: ['Vegetarian'] },
      { name: 'Omelette Breakfast', price: '£8.90', badges: ['Vegetarian'] },
      { name: 'Sourdough Snack', price: '£8.50' },
    ],
  },
  {
    id: 'soup',
    title: 'Homemade Soup',
    note: 'Served with sourdough & butter',
    items: [
      { name: 'Lentil', price: '£4.90' },
      { name: 'Minestrone', price: '£4.90' },
    ],
  },
  {
    id: 'sides',
    title: 'Side Orders',
    items: [
      { name: 'Chips', price: '£4.00', badges: ['Vegetarian'] },
      { name: 'Chips & Cheese', price: '£5.50', badges: ['Vegetarian'] },
      { name: 'Chips, Cheese & Curry', price: '£6.50' },
      { name: 'Mozzarella Sticks (6)', price: '£5.50' },
      { name: 'Chicken Nuggets', price: '£6.00' },
      { name: 'Chicken Nuggets & Chips', price: '£8.00' },
      { name: 'Mac Cheese Bites (6)', price: '£5.50' },
      { name: 'Cream Cheese Jalapenos', price: '£5.50' },
      { name: 'Tub of Curry Sauce', price: '£1.20' },
      { name: 'Sauces: Ketchup, Mayo, Brown, BBQ or Sweet Chilli', price: '£0.70' },
      { name: 'Sauces: Garlic Mayo, Chipotle, Ranch, Burger Sauce or Honey & Mustard', price: '£1.00' },
    ],
  },
  {
    id: 'turkish-specials',
    title: 'Turkish Specials',
    items: [
      { name: 'Halloumi & Sucuk Simit', price: '£8.40' },
      { name: 'Halloumi & Roast Mix Peppers Simit', price: '£8.40', badges: ['Vegetarian'] },
      { name: 'Cacik', price: '£4.50' },
      { name: 'Potato Borek', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With cacik & salad', price: '£8.00' }] },
      { name: 'Mince Borek', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With cacik & salad', price: '£8.00' }] },
      { name: 'Spinach Borek', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With cacik & salad', price: '£8.00' }] },
      { name: 'Feta & Spinach Borek', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With cacik & salad', price: '£8.00' }] },
      { name: 'Feta & Spinach Gozleme', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With cacik & salad', price: '£8.00' }] },
      { name: 'Mezze Platter', price: '£9.50' },
      { name: 'Portion of Mezze', price: '£3.90' },
    ],
  },
  {
    id: 'pancakes',
    title: 'Pancakes',
    items: [
      { name: 'Stack of Homemade Pancakes', description: 'Nutella, banana or maple syrup.', price: '£8.50', badges: ['Popular'] },
    ],
  },
  {
    id: 'paninis',
    title: 'Paninis',
    note: 'Plain or with chips & salad',
    items: [
      { name: 'Tuna & Cheese', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With chips & salad', price: '£7.90' }] },
      { name: 'Ham & Cheese', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With chips & salad', price: '£7.90' }] },
      { name: 'Brie, Cranberry & Turkey Rashers', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With chips & salad', price: '£7.90' }] },
      { name: 'Chicken Tikka', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With chips & salad', price: '£7.90' }], badges: ['Popular'] },
      { name: 'Chicken, Turkey Rashers, Cheese & Pesto', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With chips & salad', price: '£7.90' }], badges: ['Popular'] },
      { name: 'Pesto, Mozzarella & Tomato', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With chips & salad', price: '£7.90' }] },
      { name: 'Spinach, Tomato, Black Olives & Brie', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With chips & salad', price: '£7.90' }] },
    ],
  },
  {
    id: 'indian-fusion',
    title: 'Indian Fusion',
    note: 'All £5.95',
    items: [
      { name: 'Chicken Punjabi Samosa (2)', price: '£5.95' },
      { name: 'Veggie Punjabi Samosa (2)', price: '£5.95', badges: ['Vegetarian'] },
      { name: 'Chicken & Egg Omelette Paratha Roll', price: '£5.95' },
      { name: 'Spinach & Egg Paratha Roll', price: '£5.95' },
      { name: 'Cheese & Egg Paratha Roll', price: '£5.95' },
      { name: 'Mushroom & Egg Paratha Roll', price: '£5.95' },
    ],
  },
  {
    id: 'burgers',
    title: 'Burgers',
    note: 'Salad & sauce optional',
    items: [
      { name: 'Qtr Beef Burger', prices: [{ label: 'Burger', price: '£5.50' }, { label: 'With chips', price: '£8.50' }] },
      { name: 'Half Beef Burger', prices: [{ label: 'Burger', price: '£7.50' }, { label: 'With chips', price: '£10.50' }] },
      { name: 'Mexican Burger', prices: [{ label: 'Burger', price: '£7.50' }, { label: 'With chips', price: '£10.50' }], badges: ['Popular'] },
      { name: 'Bacon Burger', prices: [{ label: 'Burger', price: '£7.50' }, { label: 'With chips', price: '£10.50' }] },
      { name: 'Chicken Burger', prices: [{ label: 'Burger', price: '£5.50' }, { label: 'With chips', price: '£8.50' }] },
      { name: 'Spicy Chicken Burger', prices: [{ label: 'Burger', price: '£6.00' }, { label: 'With chips', price: '£9.00' }], badges: ['Popular', 'Spicy'] },
    ],
  },
  {
    id: 'hot-fillet-rolls',
    title: 'Hot Fillet Rolls',
    items: [
      { name: '1 Filling', price: '£2.90' },
      { name: '2 Fillings', price: '£3.90', badges: ['Popular'] },
      { name: '3 Fillings', price: '£4.90' },
    ],
  },
  {
    id: 'wraps',
    title: 'Wraps',
    note: 'Plain or with chips & salad',
    items: [
      { name: 'Falafel', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With chips & salad', price: '£7.90' }], badges: ['Vegetarian'] },
      { name: 'Mexican Chicken', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With chips & salad', price: '£7.90' }], badges: ['Popular'] },
      { name: 'Coronation Chicken', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With chips & salad', price: '£7.90' }] },
      { name: 'Veggie', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With chips & salad', price: '£7.90' }], badges: ['Vegetarian'] },
      { name: 'Chicken Tikka', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With chips & salad', price: '£7.90' }] },
      { name: 'Chicken Cheese', prices: [{ label: 'Plain', price: '£5.60' }, { label: 'With chips & salad', price: '£7.90' }] },
    ],
  },
  {
    id: 'pastas',
    title: 'Pastas',
    items: [
      { name: 'Mac & Cheese', price: '£5.00', badges: ['Vegetarian'] },
      { name: 'Mac & Cheese with Chips', price: '£8.00', badges: ['Vegetarian'] },
    ],
  },
  {
    id: 'baked-potato',
    title: 'Baked Potato',
    items: [
      { name: 'Baked Potato with Butter', price: '£4.50', badges: ['Vegetarian'] },
      { name: 'Baked Potato Roll with 1 Filling', price: '£5.80' },
    ],
  },
  {
    id: 'on-toast',
    title: 'On Toasts',
    items: [
      { name: 'Double Eggs', price: '£5.50', badges: ['Vegetarian'] },
      { name: 'Scrambled Eggs', price: '£5.50', badges: ['Vegetarian'] },
      { name: 'Egg & Turkey Rashers', price: '£6.50' },
      { name: 'Sausage & Turkey Rashers', price: '£6.50' },
      { name: 'Egg, Mushroom & Turkey Rashers', price: '£7.40' },
      { name: 'Avocado & Fried Eggs', price: '£6.50' },
      { name: 'Avocado & Scrambled Eggs', price: '£6.50' },
    ],
  },
  {
    id: 'toasties',
    title: 'Toasties',
    note: 'Served with salad',
    items: [
      { name: '1 Filling', prices: [{ label: 'Toastie', price: '£5.00' }, { label: 'With chips', price: '£8.00' }] },
      { name: '2 Fillings', prices: [{ label: 'Toastie', price: '£5.50' }, { label: 'With chips', price: '£8.50' }] },
      { name: '3 Fillings', prices: [{ label: 'Toastie', price: '£6.00' }, { label: 'With chips', price: '£9.00' }] },
    ],
  },
  {
    id: 'salads',
    title: 'Salads',
    items: [
      { name: 'Falafel Salad', price: '£7.90', badges: ['Vegetarian'] },
      { name: 'Feta Salad', price: '£7.90', badges: ['Vegetarian'] },
      { name: 'Chicken Caesar Salad', price: '£8.90' },
      { name: 'Avocado Salad', description: 'With fried egg.', price: '£8.90' },
    ],
  },
  {
    id: 'kids',
    title: 'Kids Meals',
    note: 'Served with a Fruit Shoot & lollipop — all £5.50',
    items: [
      { name: 'Chicken Nuggets & Chips', price: '£5.50' },
      { name: 'Sausage & Chips', price: '£5.50' },
      { name: 'Sausage, Egg & Chips', price: '£5.50' },
      { name: 'Sausage, Turkey Rashers & Chips', price: '£5.50' },
      { name: 'Fish Fingers & Chips', price: '£5.50' },
      { name: 'Mac & Cheese with Chips', price: '£5.50', badges: ['Vegetarian'] },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    items: [
      { name: 'Carrot Cake', price: '£3.50' },
      { name: 'Eiffel Tower Cake', price: '£3.50' },
      { name: 'Oreo Cake', price: '£3.50' },
      { name: 'Biscoff Cake', price: '£3.50' },
      { name: 'Chocolate Muffin', price: '£3.60' },
      { name: 'Blueberry Muffin', price: '£3.60' },
      { name: 'Caramel Shortbread', price: '£2.90' },
      { name: 'Biscoff Shortbread', price: '£2.90' },
      { name: 'Jam & Coconut Shortbread', price: '£2.90' },
      { name: 'Croissant', description: 'Butter or jam.', price: '£2.90' },
      { name: 'Pain au Chocolat', price: '£2.90' },
      { name: 'Cinnamon Buns', price: '£3.60' },
      { name: 'Fruit Scone', description: 'Butter or jam.', price: '£2.90' },
    ],
  },
  {
    id: 'hot-drinks',
    title: 'Hot Drinks',
    items: [
      { name: 'Turkish Coffee', price: '£4.40' },
      { name: 'Espresso', price: '£2.90' },
      { name: 'Americano', price: '£3.20' },
      { name: 'Double Espresso', price: '£3.40' },
      { name: 'Flat White', price: '£3.40' },
      { name: 'Café Latte', price: '£3.40' },
      { name: 'Cappuccino', price: '£3.40' },
      { name: 'Hot Chocolate', price: '£3.60' },
      { name: 'Macchiato', price: '£3.60' },
      { name: 'Café Mocha', price: '£4.00' },
      { name: 'Irish Cream', description: 'Non-alcoholic.', price: '£4.40' },
      { name: 'Iced Latte', prices: [{ label: 'Regular', price: '£3.60' }, { label: 'Large', price: '£5.00' }] },
      { name: 'Chai Latte', price: '£4.00' },
      { name: 'Single Tea Pot', price: '£2.30' },
      { name: 'Double Tea Pot', price: '£4.60' },
      { name: 'Karak Chai', price: '£3.60' },
      { name: 'Apple Tea', price: '£3.10' },
      { name: 'Turkish Tea', price: '£3.10' },
      { name: 'Herbal Tea Selection', price: '£3.10' },
      { name: 'Ginger & Mint Herbal Tea', price: '£4.60' },
      { name: 'Turmeric & Dry White Lemon Tea', price: '£4.60' },
      { name: 'Syrup Shot', price: '£0.50' },
      { name: 'Oat Milk', price: '£0.50' },
      { name: 'Soya Milk', price: '£0.50' },
    ],
  },
  {
    id: 'drinks',
    title: 'Drinks',
    items: [
      { name: 'Coke', prices: [{ label: 'Can', price: '£1.95' }, { label: '500ml', price: '£2.50' }] },
      { name: 'Diet Coke', prices: [{ label: 'Can', price: '£1.95' }, { label: '500ml', price: '£2.50' }] },
      { name: 'Irn Bru', prices: [{ label: 'Can', price: '£1.95' }, { label: '500ml', price: '£2.50' }] },
      { name: 'Diet Irn Bru', price: '£1.95' },
      { name: 'Fanta Fruit Twist', price: '£1.95' },
      { name: 'Fanta Orange', price: '£1.95' },
      { name: 'Fanta Pineapple & Grapefruit', price: '£1.95' },
      { name: 'Water', price: '£1.75' },
      { name: 'San Pellegrino Sparkling 500ml', price: '£1.95' },
      { name: 'Red Bull', price: '£2.90' },
      { name: 'Volvic Still 500ml', price: '£1.75' },
      { name: 'Coke Zero', price: '£1.95' },
      { name: 'San Pellegrino Orange', price: '£2.20' },
      { name: 'San Pellegrino Lemon', price: '£2.20' },
      { name: 'San Pellegrino Blood Orange', price: '£2.20' },
      { name: 'Ginger Beer', price: '£1.95' },
      { name: 'Lucozade Sport 500ml', price: '£2.50' },
      { name: 'Juice Burst Orange 500ml', price: '£2.50' },
      { name: 'Juice Burst Apple 500ml', price: '£2.50' },
      { name: 'Sprite', price: '£1.95' },
      { name: 'Dr Pepper', price: '£1.95' },
    ],
  },
];

/** Categories featured as cards on the homepage, linking to their /menu anchor. */
export const featuredCategoryIds = ['all-day-breakfast', 'turkish-specials', 'paninis', 'burgers', 'wraps', 'hot-drinks'] as const;
