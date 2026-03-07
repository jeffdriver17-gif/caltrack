const {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} = React;
const supabaseUrl = 'https://dxatxwpgtcpasxnshkhx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4YXR4d3BndGNwYXN4bnNoa2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNzEyMDgsImV4cCI6MjA4Nzk0NzIwOH0.iT7WZ1J3okxX_KsjfxXJnRp83a61Lo39ngN9lR2SpOw';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
const FOODS = [{
  id: 1,
  name: 'Apple',
  cat: 'Fruits',
  icon: '🍎',
  srv: '1 medium (182g)',
  cal: 95,
  p: 0.5,
  c: 25,
  f: 0.3
}, {
  id: 2,
  name: 'Banana',
  cat: 'Fruits',
  icon: '🍌',
  srv: '1 medium (118g)',
  cal: 105,
  p: 1.3,
  c: 27,
  f: 0.4
}, {
  id: 3,
  name: 'Orange',
  cat: 'Fruits',
  icon: '🍊',
  srv: '1 medium (131g)',
  cal: 62,
  p: 1.2,
  c: 15,
  f: 0.2
}, {
  id: 4,
  name: 'Strawberries',
  cat: 'Fruits',
  icon: '🍓',
  srv: '1 cup (152g)',
  cal: 49,
  p: 1,
  c: 12,
  f: 0.5
}, {
  id: 5,
  name: 'Blueberries',
  cat: 'Fruits',
  icon: '🫐',
  srv: '1 cup (148g)',
  cal: 84,
  p: 1.1,
  c: 21,
  f: 0.5
}, {
  id: 6,
  name: 'Grapes',
  cat: 'Fruits',
  icon: '🍇',
  srv: '1 cup (151g)',
  cal: 104,
  p: 1.1,
  c: 27,
  f: 0.2
}, {
  id: 7,
  name: 'Watermelon',
  cat: 'Fruits',
  icon: '🍉',
  srv: '2 cups (280g)',
  cal: 85,
  p: 1.7,
  c: 21,
  f: 0.4
}, {
  id: 8,
  name: 'Mango',
  cat: 'Fruits',
  icon: '🥭',
  srv: '1 cup (165g)',
  cal: 99,
  p: 1.4,
  c: 25,
  f: 0.6
}, {
  id: 9,
  name: 'Pineapple',
  cat: 'Fruits',
  icon: '🍍',
  srv: '1 cup (165g)',
  cal: 82,
  p: 0.9,
  c: 22,
  f: 0.2
}, {
  id: 10,
  name: 'Peach',
  cat: 'Fruits',
  icon: '🍑',
  srv: '1 medium (150g)',
  cal: 59,
  p: 1.4,
  c: 14,
  f: 0.4
}, {
  id: 11,
  name: 'Pear',
  cat: 'Fruits',
  icon: '🍐',
  srv: '1 medium (178g)',
  cal: 101,
  p: 0.6,
  c: 27,
  f: 0.2
}, {
  id: 12,
  name: 'Avocado',
  cat: 'Fruits',
  icon: '🥑',
  srv: '1/2 medium (68g)',
  cal: 114,
  p: 1.3,
  c: 6,
  f: 10.5
}, {
  id: 13,
  name: 'Cherries',
  cat: 'Fruits',
  icon: '🍒',
  srv: '1 cup (154g)',
  cal: 97,
  p: 1.6,
  c: 25,
  f: 0.3
}, {
  id: 14,
  name: 'Raspberries',
  cat: 'Fruits',
  icon: '🫐',
  srv: '1 cup (123g)',
  cal: 64,
  p: 1.5,
  c: 15,
  f: 0.8
}, {
  id: 15,
  name: 'Kiwi',
  cat: 'Fruits',
  icon: '🥝',
  srv: '1 medium (69g)',
  cal: 42,
  p: 0.8,
  c: 10,
  f: 0.4
}, {
  id: 16,
  name: 'Cantaloupe',
  cat: 'Fruits',
  icon: '🍈',
  srv: '1 cup (160g)',
  cal: 54,
  p: 1.3,
  c: 13,
  f: 0.3
}, {
  id: 20,
  name: 'Broccoli',
  cat: 'Vegetables',
  icon: '🥦',
  srv: '1 cup (91g)',
  cal: 31,
  p: 2.6,
  c: 6,
  f: 0.3
}, {
  id: 21,
  name: 'Spinach',
  cat: 'Vegetables',
  icon: '🥬',
  srv: '1 cup raw (30g)',
  cal: 7,
  p: 0.9,
  c: 1.1,
  f: 0.1
}, {
  id: 22,
  name: 'Carrots',
  cat: 'Vegetables',
  icon: '🥕',
  srv: '1 medium (61g)',
  cal: 25,
  p: 0.6,
  c: 6,
  f: 0.1
}, {
  id: 23,
  name: 'Sweet Potato',
  cat: 'Vegetables',
  icon: '🍠',
  srv: '1 medium (130g)',
  cal: 112,
  p: 2,
  c: 26,
  f: 0.1
}, {
  id: 24,
  name: 'White Potato',
  cat: 'Vegetables',
  icon: '🥔',
  srv: '1 medium (213g)',
  cal: 163,
  p: 4.3,
  c: 37,
  f: 0.2
}, {
  id: 25,
  name: 'Tomato',
  cat: 'Vegetables',
  icon: '🍅',
  srv: '1 medium (123g)',
  cal: 22,
  p: 1.1,
  c: 5,
  f: 0.2
}, {
  id: 26,
  name: 'Cucumber',
  cat: 'Vegetables',
  icon: '🥒',
  srv: '1 cup sliced (119g)',
  cal: 16,
  p: 0.7,
  c: 4,
  f: 0.1
}, {
  id: 27,
  name: 'Bell Pepper',
  cat: 'Vegetables',
  icon: '🫑',
  srv: '1 medium (119g)',
  cal: 31,
  p: 1,
  c: 7,
  f: 0.3
}, {
  id: 28,
  name: 'Romaine Lettuce',
  cat: 'Vegetables',
  icon: '🥗',
  srv: '1 cup (47g)',
  cal: 8,
  p: 0.6,
  c: 1.5,
  f: 0.1
}, {
  id: 29,
  name: 'Mushrooms',
  cat: 'Vegetables',
  icon: '🍄',
  srv: '1 cup (70g)',
  cal: 15,
  p: 2.2,
  c: 2.3,
  f: 0.2
}, {
  id: 30,
  name: 'Onion',
  cat: 'Vegetables',
  icon: '🧅',
  srv: '1 medium (110g)',
  cal: 44,
  p: 1.2,
  c: 10,
  f: 0.1
}, {
  id: 31,
  name: 'Corn',
  cat: 'Vegetables',
  icon: '🌽',
  srv: '1 cup (154g)',
  cal: 132,
  p: 4.9,
  c: 29,
  f: 1.8
}, {
  id: 32,
  name: 'Cauliflower',
  cat: 'Vegetables',
  icon: '🥦',
  srv: '1 cup (107g)',
  cal: 27,
  p: 2.1,
  c: 5,
  f: 0.3
}, {
  id: 33,
  name: 'Kale',
  cat: 'Vegetables',
  icon: '🥬',
  srv: '1 cup raw (67g)',
  cal: 33,
  p: 2.9,
  c: 6,
  f: 0.5
}, {
  id: 34,
  name: 'Zucchini',
  cat: 'Vegetables',
  icon: '🥒',
  srv: '1 cup sliced (124g)',
  cal: 21,
  p: 1.5,
  c: 3.9,
  f: 0.4
}, {
  id: 35,
  name: 'Green Peas',
  cat: 'Vegetables',
  icon: '🫛',
  srv: '1 cup (160g)',
  cal: 134,
  p: 8.6,
  c: 25,
  f: 0.4
}, {
  id: 36,
  name: 'Asparagus',
  cat: 'Vegetables',
  icon: '🥦',
  srv: '1 cup (134g)',
  cal: 27,
  p: 3,
  c: 5,
  f: 0.3
}, {
  id: 37,
  name: 'Green Beans',
  cat: 'Vegetables',
  icon: '🫘',
  srv: '1 cup (110g)',
  cal: 31,
  p: 2,
  c: 7,
  f: 0.2
}, {
  id: 38,
  name: 'Celery',
  cat: 'Vegetables',
  icon: '🥬',
  srv: '1 stalk (40g)',
  cal: 6,
  p: 0.3,
  c: 1.2,
  f: 0.1
}, {
  id: 40,
  name: 'White Rice (cooked)',
  cat: 'Grains',
  icon: '🍚',
  srv: '1 cup (186g)',
  cal: 242,
  p: 4.4,
  c: 53,
  f: 0.4
}, {
  id: 41,
  name: 'Brown Rice (cooked)',
  cat: 'Grains',
  icon: '🍚',
  srv: '1 cup (195g)',
  cal: 216,
  p: 5,
  c: 45,
  f: 1.8
}, {
  id: 42,
  name: 'Oatmeal (cooked)',
  cat: 'Grains',
  icon: '🥣',
  srv: '1 cup (234g)',
  cal: 166,
  p: 5.9,
  c: 28,
  f: 3.6
}, {
  id: 43,
  name: 'Pasta (cooked)',
  cat: 'Grains',
  icon: '🍝',
  srv: '1 cup (140g)',
  cal: 220,
  p: 8.1,
  c: 43,
  f: 1.3
}, {
  id: 44,
  name: 'White Bread',
  cat: 'Grains',
  icon: '🍞',
  srv: '1 slice (25g)',
  cal: 67,
  p: 2,
  c: 13,
  f: 0.8
}, {
  id: 45,
  name: 'Whole Wheat Bread',
  cat: 'Grains',
  icon: '🍞',
  srv: '1 slice (28g)',
  cal: 69,
  p: 3.6,
  c: 12,
  f: 1.1
}, {
  id: 46,
  name: 'Quinoa (cooked)',
  cat: 'Grains',
  icon: '🌾',
  srv: '1 cup (185g)',
  cal: 222,
  p: 8.1,
  c: 39,
  f: 3.6
}, {
  id: 47,
  name: 'Bagel',
  cat: 'Grains',
  icon: '🥯',
  srv: '1 medium (105g)',
  cal: 270,
  p: 11,
  c: 53,
  f: 1.5
}, {
  id: 48,
  name: 'Flour Tortilla',
  cat: 'Grains',
  icon: '🫓',
  srv: '1 medium (45g)',
  cal: 146,
  p: 3.8,
  c: 25,
  f: 3.5
}, {
  id: 49,
  name: 'Corn Tortilla',
  cat: 'Grains',
  icon: '🫓',
  srv: '1 piece (26g)',
  cal: 57,
  p: 1.5,
  c: 12,
  f: 0.7
}, {
  id: 50,
  name: 'Granola',
  cat: 'Grains',
  icon: '🥣',
  srv: '1/2 cup (59g)',
  cal: 250,
  p: 6,
  c: 35,
  f: 9
}, {
  id: 51,
  name: 'Couscous (cooked)',
  cat: 'Grains',
  icon: '🌾',
  srv: '1 cup (157g)',
  cal: 176,
  p: 6,
  c: 36,
  f: 0.3
}, {
  id: 52,
  name: 'Pita Bread',
  cat: 'Grains',
  icon: '🫓',
  srv: '1 piece (60g)',
  cal: 165,
  p: 5.5,
  c: 33,
  f: 1.2
}, {
  id: 53,
  name: 'Sourdough Bread',
  cat: 'Grains',
  icon: '🍞',
  srv: '1 slice (36g)',
  cal: 92,
  p: 3.8,
  c: 18,
  f: 0.7
}, {
  id: 60,
  name: 'Chicken Breast',
  cat: 'Protein',
  icon: '🍗',
  srv: '3 oz grilled (85g)',
  cal: 128,
  p: 26,
  c: 0,
  f: 2.7
}, {
  id: 61,
  name: 'Chicken Thigh',
  cat: 'Protein',
  icon: '🍗',
  srv: '3 oz grilled (85g)',
  cal: 178,
  p: 22,
  c: 0,
  f: 9.5
}, {
  id: 62,
  name: 'Ground Beef 80/20',
  cat: 'Protein',
  icon: '🥩',
  srv: '3 oz cooked (85g)',
  cal: 218,
  p: 22,
  c: 0,
  f: 14
}, {
  id: 63,
  name: 'Ground Beef 90/10',
  cat: 'Protein',
  icon: '🥩',
  srv: '3 oz cooked (85g)',
  cal: 173,
  p: 24,
  c: 0,
  f: 8
}, {
  id: 64,
  name: 'Sirloin Steak',
  cat: 'Protein',
  icon: '🥩',
  srv: '3 oz (85g)',
  cal: 160,
  p: 26,
  c: 0,
  f: 5.4
}, {
  id: 65,
  name: 'Turkey Breast',
  cat: 'Protein',
  icon: '🦃',
  srv: '3 oz (85g)',
  cal: 135,
  p: 26,
  c: 0,
  f: 3
}, {
  id: 66,
  name: 'Salmon (Atlantic)',
  cat: 'Protein',
  icon: '🐟',
  srv: '3 oz (85g)',
  cal: 177,
  p: 17,
  c: 0,
  f: 11
}, {
  id: 67,
  name: 'Tuna (canned, water)',
  cat: 'Protein',
  icon: '🐟',
  srv: '3 oz (85g)',
  cal: 109,
  p: 24,
  c: 0,
  f: 2.5
}, {
  id: 68,
  name: 'Shrimp',
  cat: 'Protein',
  icon: '🦐',
  srv: '3 oz (85g)',
  cal: 84,
  p: 18,
  c: 0,
  f: 0.9
}, {
  id: 69,
  name: 'Tilapia',
  cat: 'Protein',
  icon: '🐟',
  srv: '3 oz (85g)',
  cal: 110,
  p: 22,
  c: 0,
  f: 2.3
}, {
  id: 70,
  name: 'Pork Loin',
  cat: 'Protein',
  icon: '🥩',
  srv: '3 oz (85g)',
  cal: 122,
  p: 22,
  c: 0,
  f: 3.4
}, {
  id: 71,
  name: 'Bacon',
  cat: 'Protein',
  icon: '🥓',
  srv: '2 slices (16g)',
  cal: 87,
  p: 5.9,
  c: 0.1,
  f: 6.9
}, {
  id: 72,
  name: 'Egg (whole)',
  cat: 'Protein',
  icon: '🥚',
  srv: '1 large (50g)',
  cal: 72,
  p: 6.3,
  c: 0.4,
  f: 5
}, {
  id: 73,
  name: 'Egg Whites',
  cat: 'Protein',
  icon: '🥚',
  srv: '1/2 cup (121g)',
  cal: 63,
  p: 13,
  c: 0.9,
  f: 0.2
}, {
  id: 74,
  name: 'Ham',
  cat: 'Protein',
  icon: '🥩',
  srv: '3 oz (85g)',
  cal: 150,
  p: 16,
  c: 3,
  f: 8
}, {
  id: 75,
  name: 'Lamb Chop',
  cat: 'Protein',
  icon: '🥩',
  srv: '3 oz (85g)',
  cal: 200,
  p: 22,
  c: 0,
  f: 12
}, {
  id: 76,
  name: 'Cod Fish',
  cat: 'Protein',
  icon: '🐟',
  srv: '3 oz (85g)',
  cal: 89,
  p: 20,
  c: 0,
  f: 0.7
}, {
  id: 77,
  name: 'Rotisserie Chicken',
  cat: 'Protein',
  icon: '🍗',
  srv: '3 oz (85g)',
  cal: 173,
  p: 22,
  c: 0,
  f: 9
}, {
  id: 80,
  name: 'Black Beans',
  cat: 'Legumes',
  icon: '🫘',
  srv: '1/2 cup cooked (86g)',
  cal: 114,
  p: 7.6,
  c: 20,
  f: 0.5
}, {
  id: 81,
  name: 'Chickpeas',
  cat: 'Legumes',
  icon: '🫘',
  srv: '1/2 cup cooked (82g)',
  cal: 134,
  p: 7.3,
  c: 22,
  f: 2.1
}, {
  id: 82,
  name: 'Lentils',
  cat: 'Legumes',
  icon: '🫘',
  srv: '1/2 cup cooked (99g)',
  cal: 115,
  p: 8.9,
  c: 20,
  f: 0.4
}, {
  id: 83,
  name: 'Kidney Beans',
  cat: 'Legumes',
  icon: '🫘',
  srv: '1/2 cup cooked (89g)',
  cal: 112,
  p: 7.7,
  c: 20,
  f: 0.4
}, {
  id: 84,
  name: 'Edamame',
  cat: 'Legumes',
  icon: '🫘',
  srv: '1/2 cup (78g)',
  cal: 94,
  p: 9.2,
  c: 7.4,
  f: 4
}, {
  id: 85,
  name: 'Tofu (firm)',
  cat: 'Legumes',
  icon: '🫘',
  srv: '3 oz (85g)',
  cal: 70,
  p: 8,
  c: 1.9,
  f: 4
}, {
  id: 86,
  name: 'Tempeh',
  cat: 'Legumes',
  icon: '🫘',
  srv: '3 oz (85g)',
  cal: 160,
  p: 15,
  c: 8,
  f: 9
}, {
  id: 87,
  name: 'Pinto Beans',
  cat: 'Legumes',
  icon: '🫘',
  srv: '1/2 cup cooked (86g)',
  cal: 122,
  p: 7.7,
  c: 22,
  f: 0.5
}, {
  id: 90,
  name: 'Whole Milk',
  cat: 'Dairy',
  icon: '🥛',
  srv: '1 cup (244g)',
  cal: 149,
  p: 8,
  c: 12,
  f: 8
}, {
  id: 91,
  name: 'Skim Milk',
  cat: 'Dairy',
  icon: '🥛',
  srv: '1 cup (244g)',
  cal: 83,
  p: 8.3,
  c: 12,
  f: 0.2
}, {
  id: 92,
  name: 'Greek Yogurt (0%)',
  cat: 'Dairy',
  icon: '🍦',
  srv: '1 cup (245g)',
  cal: 130,
  p: 23,
  c: 9,
  f: 0.7
}, {
  id: 93,
  name: 'Greek Yogurt (2%)',
  cat: 'Dairy',
  icon: '🍦',
  srv: '1 cup (245g)',
  cal: 150,
  p: 20,
  c: 9,
  f: 4
}, {
  id: 94,
  name: 'Cheddar Cheese',
  cat: 'Dairy',
  icon: '🧀',
  srv: '1 oz (28g)',
  cal: 115,
  p: 6.5,
  c: 0.4,
  f: 9.5
}, {
  id: 95,
  name: 'Mozzarella',
  cat: 'Dairy',
  icon: '🧀',
  srv: '1 oz (28g)',
  cal: 85,
  p: 6.3,
  c: 0.6,
  f: 6.3
}, {
  id: 96,
  name: 'Cottage Cheese (1%)',
  cat: 'Dairy',
  icon: '🍦',
  srv: '1/2 cup (113g)',
  cal: 81,
  p: 14,
  c: 3,
  f: 1.2
}, {
  id: 97,
  name: 'Butter',
  cat: 'Dairy',
  icon: '🧈',
  srv: '1 tbsp (14g)',
  cal: 102,
  p: 0.1,
  c: 0,
  f: 11.5
}, {
  id: 98,
  name: 'Cream Cheese',
  cat: 'Dairy',
  icon: '🧀',
  srv: '2 tbsp (29g)',
  cal: 97,
  p: 1.7,
  c: 1.2,
  f: 9.6
}, {
  id: 99,
  name: 'Parmesan',
  cat: 'Dairy',
  icon: '🧀',
  srv: '1 tbsp (5g)',
  cal: 22,
  p: 1.9,
  c: 0.2,
  f: 1.4
}, {
  id: 100,
  name: 'String Cheese',
  cat: 'Dairy',
  icon: '🧀',
  srv: '1 stick (28g)',
  cal: 80,
  p: 6,
  c: 1,
  f: 6
}, {
  id: 110,
  name: 'Almonds',
  cat: 'Nuts & Seeds',
  icon: '🌰',
  srv: '1 oz (28g)',
  cal: 164,
  p: 6,
  c: 6,
  f: 14
}, {
  id: 111,
  name: 'Walnuts',
  cat: 'Nuts & Seeds',
  icon: '🌰',
  srv: '1 oz (28g)',
  cal: 185,
  p: 4.3,
  c: 3.9,
  f: 18.5
}, {
  id: 112,
  name: 'Cashews',
  cat: 'Nuts & Seeds',
  icon: '🌰',
  srv: '1 oz (28g)',
  cal: 157,
  p: 5.2,
  c: 8.6,
  f: 12.4
}, {
  id: 113,
  name: 'Peanuts',
  cat: 'Nuts & Seeds',
  icon: '🥜',
  srv: '1 oz (28g)',
  cal: 161,
  p: 7.3,
  c: 4.6,
  f: 14
}, {
  id: 114,
  name: 'Peanut Butter',
  cat: 'Nuts & Seeds',
  icon: '🥜',
  srv: '2 tbsp (32g)',
  cal: 191,
  p: 7.1,
  c: 7,
  f: 16
}, {
  id: 115,
  name: 'Almond Butter',
  cat: 'Nuts & Seeds',
  icon: '🌰',
  srv: '2 tbsp (32g)',
  cal: 196,
  p: 6.7,
  c: 6,
  f: 18
}, {
  id: 116,
  name: 'Chia Seeds',
  cat: 'Nuts & Seeds',
  icon: '🌱',
  srv: '2 tbsp (20g)',
  cal: 97,
  p: 3.3,
  c: 8.5,
  f: 6.2
}, {
  id: 117,
  name: 'Flaxseeds',
  cat: 'Nuts & Seeds',
  icon: '🌱',
  srv: '2 tbsp (14g)',
  cal: 74,
  p: 2.6,
  c: 4,
  f: 5.9
}, {
  id: 118,
  name: 'Sunflower Seeds',
  cat: 'Nuts & Seeds',
  icon: '🌻',
  srv: '1 oz (28g)',
  cal: 164,
  p: 5.5,
  c: 6.5,
  f: 14
}, {
  id: 119,
  name: 'Mixed Nuts',
  cat: 'Nuts & Seeds',
  icon: '🌰',
  srv: '1 oz (28g)',
  cal: 168,
  p: 5,
  c: 7.2,
  f: 15
}, {
  id: 120,
  name: 'Olive Oil',
  cat: 'Fats & Oils',
  icon: '🫙',
  srv: '1 tbsp (14g)',
  cal: 119,
  p: 0,
  c: 0,
  f: 13.5
}, {
  id: 121,
  name: 'Coconut Oil',
  cat: 'Fats & Oils',
  icon: '🫙',
  srv: '1 tbsp (14g)',
  cal: 121,
  p: 0,
  c: 0,
  f: 13.5
}, {
  id: 122,
  name: 'Mayonnaise',
  cat: 'Fats & Oils',
  icon: '🫙',
  srv: '1 tbsp (14g)',
  cal: 94,
  p: 0.1,
  c: 0.1,
  f: 10.3
}, {
  id: 123,
  name: 'Avocado Oil',
  cat: 'Fats & Oils',
  icon: '🫙',
  srv: '1 tbsp (14g)',
  cal: 124,
  p: 0,
  c: 0,
  f: 14
}, {
  id: 130,
  name: 'Orange Juice',
  cat: 'Beverages',
  icon: '🧃',
  srv: '1 cup (248ml)',
  cal: 112,
  p: 1.7,
  c: 26,
  f: 0.5
}, {
  id: 131,
  name: 'Coffee (black)',
  cat: 'Beverages',
  icon: '☕',
  srv: '1 cup (240ml)',
  cal: 2,
  p: 0.3,
  c: 0,
  f: 0
}, {
  id: 132,
  name: 'Latte (whole milk)',
  cat: 'Beverages',
  icon: '☕',
  srv: '12 oz (360ml)',
  cal: 204,
  p: 12,
  c: 18,
  f: 8
}, {
  id: 133,
  name: 'Sports Drink',
  cat: 'Beverages',
  icon: '🧃',
  srv: '12 oz (355ml)',
  cal: 80,
  p: 0,
  c: 21,
  f: 0
}, {
  id: 134,
  name: 'Protein Shake (whey)',
  cat: 'Beverages',
  icon: '🥤',
  srv: '1 scoop (33g)',
  cal: 120,
  p: 24,
  c: 4,
  f: 2
}, {
  id: 135,
  name: 'Almond Milk (unsweetened)',
  cat: 'Beverages',
  icon: '🥛',
  srv: '1 cup (240ml)',
  cal: 30,
  p: 1,
  c: 1,
  f: 2.5
}, {
  id: 136,
  name: 'Oat Milk',
  cat: 'Beverages',
  icon: '🥛',
  srv: '1 cup (240ml)',
  cal: 120,
  p: 3,
  c: 16,
  f: 5
}, {
  id: 137,
  name: 'Green Tea',
  cat: 'Beverages',
  icon: '🍵',
  srv: '1 cup (240ml)',
  cal: 2,
  p: 0,
  c: 0,
  f: 0
}, {
  id: 138,
  name: 'Apple Juice',
  cat: 'Beverages',
  icon: '🧃',
  srv: '1 cup (248ml)',
  cal: 117,
  p: 0.1,
  c: 29,
  f: 0.3
}, {
  id: 139,
  name: 'Whole Milk Latte',
  cat: 'Beverages',
  icon: '☕',
  srv: '16 oz (480ml)',
  cal: 250,
  p: 14,
  c: 23,
  f: 10
}, {
  id: 140,
  name: 'Potato Chips',
  cat: 'Snacks',
  icon: '🥔',
  srv: '1 oz (28g)',
  cal: 152,
  p: 2,
  c: 15,
  f: 9.8
}, {
  id: 141,
  name: 'Pretzels',
  cat: 'Snacks',
  icon: '🥨',
  srv: '1 oz (28g)',
  cal: 108,
  p: 2.6,
  c: 22,
  f: 0.8
}, {
  id: 142,
  name: 'Popcorn (air-popped)',
  cat: 'Snacks',
  icon: '🍿',
  srv: '3 cups (24g)',
  cal: 93,
  p: 3,
  c: 19,
  f: 1.1
}, {
  id: 143,
  name: 'Dark Chocolate 70%',
  cat: 'Snacks',
  icon: '🍫',
  srv: '1 oz (28g)',
  cal: 170,
  p: 2,
  c: 13,
  f: 12
}, {
  id: 144,
  name: 'Rice Cakes',
  cat: 'Snacks',
  icon: '🍘',
  srv: '2 cakes (18g)',
  cal: 70,
  p: 1.4,
  c: 15,
  f: 0.6
}, {
  id: 145,
  name: 'Crackers (wheat)',
  cat: 'Snacks',
  icon: '🍘',
  srv: '5 crackers (14g)',
  cal: 65,
  p: 1.4,
  c: 11,
  f: 1.8
}, {
  id: 146,
  name: 'Hummus',
  cat: 'Snacks',
  icon: '🫙',
  srv: '2 tbsp (30g)',
  cal: 70,
  p: 2,
  c: 6,
  f: 4.5
}, {
  id: 147,
  name: 'Protein Bar',
  cat: 'Snacks',
  icon: '🍫',
  srv: '1 bar (60g)',
  cal: 200,
  p: 20,
  c: 25,
  f: 5
}, {
  id: 148,
  name: 'Granola Bar',
  cat: 'Snacks',
  icon: '🥜',
  srv: '1 bar (35g)',
  cal: 147,
  p: 2.5,
  c: 24,
  f: 5
}, {
  id: 149,
  name: 'Trail Mix',
  cat: 'Snacks',
  icon: '🌰',
  srv: '1/4 cup (40g)',
  cal: 173,
  p: 4.5,
  c: 17,
  f: 10
}, {
  id: 160,
  name: 'Big Mac',
  cat: 'Fast Food',
  icon: '🍔',
  srv: '1 burger (212g)',
  cal: 550,
  p: 25,
  c: 46,
  f: 30
}, {
  id: 161,
  name: "McDonald's Fries (med)",
  cat: 'Fast Food',
  icon: '🍟',
  srv: '1 serving (117g)',
  cal: 320,
  p: 4.4,
  c: 44,
  f: 15
}, {
  id: 162,
  name: 'Chicken McNuggets (10)',
  cat: 'Fast Food',
  icon: '🍗',
  srv: '10 pieces (165g)',
  cal: 440,
  p: 25,
  c: 27,
  f: 26
}, {
  id: 163,
  name: 'Subway 6" Turkey',
  cat: 'Fast Food',
  icon: '🥪',
  srv: '1 sub (220g)',
  cal: 280,
  p: 18,
  c: 46,
  f: 4.5
}, {
  id: 164,
  name: 'Chipotle Chicken Bowl',
  cat: 'Fast Food',
  icon: '🌯',
  srv: '1 bowl (430g)',
  cal: 655,
  p: 51,
  c: 65,
  f: 18
}, {
  id: 165,
  name: 'Pizza Slice (cheese)',
  cat: 'Fast Food',
  icon: '🍕',
  srv: '1 slice (107g)',
  cal: 272,
  p: 12,
  c: 33,
  f: 10
}, {
  id: 166,
  name: 'Cheeseburger',
  cat: 'Fast Food',
  icon: '🍔',
  srv: '1 burger (113g)',
  cal: 300,
  p: 15,
  c: 33,
  f: 12
}, {
  id: 167,
  name: 'Caesar Salad + Dressing',
  cat: 'Fast Food',
  icon: '🥗',
  srv: '1 salad (300g)',
  cal: 360,
  p: 9,
  c: 20,
  f: 28
}, {
  id: 168,
  name: 'Sushi Salmon Roll (8pc)',
  cat: 'Fast Food',
  icon: '🍱',
  srv: '8 pieces (200g)',
  cal: 304,
  p: 13,
  c: 46,
  f: 7
}, {
  id: 169,
  name: 'Bean & Cheese Burrito',
  cat: 'Fast Food',
  icon: '🌯',
  srv: '1 burrito (174g)',
  cal: 380,
  p: 13,
  c: 58,
  f: 11
}, {
  id: 170,
  name: 'Ketchup',
  cat: 'Condiments',
  icon: '🍅',
  srv: '1 tbsp (17g)',
  cal: 17,
  p: 0.2,
  c: 4.1,
  f: 0
}, {
  id: 171,
  name: 'Mustard',
  cat: 'Condiments',
  icon: '🌭',
  srv: '1 tsp (5g)',
  cal: 3,
  p: 0.2,
  c: 0.3,
  f: 0.2
}, {
  id: 172,
  name: 'BBQ Sauce',
  cat: 'Condiments',
  icon: '🫙',
  srv: '2 tbsp (36g)',
  cal: 52,
  p: 0,
  c: 13,
  f: 0.1
}, {
  id: 173,
  name: 'Ranch Dressing',
  cat: 'Condiments',
  icon: '🫙',
  srv: '2 tbsp (30g)',
  cal: 140,
  p: 0.5,
  c: 1.5,
  f: 14
}, {
  id: 174,
  name: 'Salsa',
  cat: 'Condiments',
  icon: '🍅',
  srv: '2 tbsp (32g)',
  cal: 10,
  p: 0.5,
  c: 2,
  f: 0
}, {
  id: 175,
  name: 'Hot Sauce',
  cat: 'Condiments',
  icon: '🌶️',
  srv: '1 tsp (5g)',
  cal: 1,
  p: 0,
  c: 0.1,
  f: 0
}, {
  id: 176,
  name: 'Soy Sauce',
  cat: 'Condiments',
  icon: '🫙',
  srv: '1 tbsp (16g)',
  cal: 9,
  p: 1.3,
  c: 0.8,
  f: 0.1
}, {
  id: 177,
  name: 'Honey',
  cat: 'Condiments',
  icon: '🍯',
  srv: '1 tbsp (21g)',
  cal: 64,
  p: 0.1,
  c: 17,
  f: 0
}, {
  id: 178,
  name: 'Maple Syrup',
  cat: 'Condiments',
  icon: '🍯',
  srv: '1 tbsp (20g)',
  cal: 52,
  p: 0,
  c: 13.4,
  f: 0
}, {
  id: 179,
  name: 'Guacamole',
  cat: 'Condiments',
  icon: '🥑',
  srv: '2 tbsp (30g)',
  cal: 45,
  p: 0.6,
  c: 3,
  f: 4
}, {
  id: 180,
  name: 'Pancakes (plain)',
  cat: 'Breakfast',
  icon: '🥞',
  srv: '3 medium (120g)',
  cal: 277,
  p: 7.3,
  c: 41,
  f: 9
}, {
  id: 181,
  name: 'Waffle',
  cat: 'Breakfast',
  icon: '🧇',
  srv: '1 waffle (75g)',
  cal: 218,
  p: 5.9,
  c: 25,
  f: 10.6
}, {
  id: 182,
  name: 'Corn Flakes Cereal',
  cat: 'Breakfast',
  icon: '🥣',
  srv: '1 cup (28g)',
  cal: 100,
  p: 2,
  c: 24,
  f: 0.1
}, {
  id: 183,
  name: 'French Toast',
  cat: 'Breakfast',
  icon: '🍞',
  srv: '2 slices (135g)',
  cal: 325,
  p: 12,
  c: 36,
  f: 14
}, {
  id: 184,
  name: 'Croissant',
  cat: 'Breakfast',
  icon: '🥐',
  srv: '1 medium (57g)',
  cal: 231,
  p: 5,
  c: 26,
  f: 12
}, {
  id: 185,
  name: 'English Muffin',
  cat: 'Breakfast',
  icon: '🥯',
  srv: '1 muffin (57g)',
  cal: 134,
  p: 4.4,
  c: 26,
  f: 1
}, {
  id: 186,
  name: 'Scrambled Eggs (2)',
  cat: 'Breakfast',
  icon: '🍳',
  srv: '2 eggs cooked (110g)',
  cal: 182,
  p: 12,
  c: 1.6,
  f: 14
}, {
  id: 187,
  name: 'Breakfast Sausage (2)',
  cat: 'Breakfast',
  icon: '🌭',
  srv: '2 links (45g)',
  cal: 170,
  p: 7,
  c: 1,
  f: 15
}, {
  id: 188,
  name: 'Instant Oatmeal',
  cat: 'Breakfast',
  icon: '🥣',
  srv: '1 packet (28g)',
  cal: 100,
  p: 4,
  c: 19,
  f: 2
}, {
  id: 190,
  name: 'Vanilla Ice Cream',
  cat: 'Desserts',
  icon: '🍦',
  srv: '1/2 cup (66g)',
  cal: 145,
  p: 2.5,
  c: 17,
  f: 7.9
}, {
  id: 191,
  name: 'Chocolate Chip Cookie',
  cat: 'Desserts',
  icon: '🍪',
  srv: '1 medium (16g)',
  cal: 78,
  p: 1,
  c: 10,
  f: 3.7
}, {
  id: 192,
  name: 'Brownie',
  cat: 'Desserts',
  icon: '🍫',
  srv: '1 piece (57g)',
  cal: 232,
  p: 3,
  c: 36,
  f: 10
}, {
  id: 193,
  name: 'Cheesecake',
  cat: 'Desserts',
  icon: '🎂',
  srv: '1 slice (92g)',
  cal: 321,
  p: 5.5,
  c: 26,
  f: 23
}, {
  id: 194,
  name: 'Apple Pie',
  cat: 'Desserts',
  icon: '🥧',
  srv: '1 slice (117g)',
  cal: 296,
  p: 2.7,
  c: 43,
  f: 14
}, {
  id: 195,
  name: 'Glazed Donut',
  cat: 'Desserts',
  icon: '🍩',
  srv: '1 medium (53g)',
  cal: 253,
  p: 2.4,
  c: 37,
  f: 11
}, {
  id: 196,
  name: 'Blueberry Muffin',
  cat: 'Desserts',
  icon: '🧁',
  srv: '1 medium (113g)',
  cal: 426,
  p: 5.5,
  c: 64,
  f: 17
}, {
  id: 197,
  name: 'Chocolate Cake',
  cat: 'Desserts',
  icon: '🎂',
  srv: '1 slice (64g)',
  cal: 236,
  p: 3.3,
  c: 35,
  f: 10
},
// Deli & Lunch Meats
{
  id: 200,
  name: 'Turkey Breast (Oven Roasted)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2-3 slices (56g)',
  cal: 60,
  p: 13,
  c: 1,
  f: 0.5
}, {
  id: 201,
  name: 'Turkey (Honey Roasted)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2-3 slices (56g)',
  cal: 70,
  p: 11,
  c: 3,
  f: 0.5
}, {
  id: 202,
  name: 'Turkey (Smoked)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2-3 slices (56g)',
  cal: 60,
  p: 12,
  c: 1,
  f: 0.5
}, {
  id: 203,
  name: 'Turkey (Peppered)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2-3 slices (56g)',
  cal: 60,
  p: 12,
  c: 1,
  f: 0.5
}, {
  id: 204,
  name: 'Ham (Black Forest)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2-3 slices (56g)',
  cal: 60,
  p: 10,
  c: 2,
  f: 1.5
}, {
  id: 205,
  name: 'Ham (Honey)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2-3 slices (56g)',
  cal: 70,
  p: 10,
  c: 4,
  f: 1.5
}, {
  id: 206,
  name: 'Ham (Smoked)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2-3 slices (56g)',
  cal: 65,
  p: 10,
  c: 1,
  f: 2
}, {
  id: 207,
  name: 'Ham (Virginia)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2-3 slices (56g)',
  cal: 70,
  p: 11,
  c: 2,
  f: 2
}, {
  id: 208,
  name: 'Roast Beef (Deli)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2-3 slices (56g)',
  cal: 70,
  p: 12,
  c: 0,
  f: 2.5
}, {
  id: 209,
  name: 'Chicken Breast (Deli)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2-3 slices (56g)',
  cal: 50,
  p: 11,
  c: 1,
  f: 0.5
}, {
  id: 210,
  name: 'Salami (Genoa)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 5-6 slices (56g)',
  cal: 220,
  p: 12,
  c: 1,
  f: 19
}, {
  id: 211,
  name: 'Salami (Hard)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 5-6 slices (56g)',
  cal: 200,
  p: 12,
  c: 1,
  f: 17
}, {
  id: 212,
  name: 'Salami (Turkey)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 4 slices (56g)',
  cal: 100,
  p: 10,
  c: 1,
  f: 6
}, {
  id: 213,
  name: 'Pepperoni',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 14 slices (56g)',
  cal: 280,
  p: 12,
  c: 1,
  f: 26
}, {
  id: 214,
  name: 'Bologna (Beef)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2 slices (56g)',
  cal: 160,
  p: 7,
  c: 2,
  f: 14
}, {
  id: 215,
  name: 'Bologna (Turkey)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2 slices (56g)',
  cal: 100,
  p: 8,
  c: 3,
  f: 6
}, {
  id: 216,
  name: 'Bologna (Chicken)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2 slices (56g)',
  cal: 110,
  p: 8,
  c: 3,
  f: 7
}, {
  id: 217,
  name: 'Pastrami',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2-3 slices (56g)',
  cal: 70,
  p: 12,
  c: 0.5,
  f: 2
}, {
  id: 218,
  name: 'Corned Beef (Deli)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2-3 slices (56g)',
  cal: 70,
  p: 11,
  c: 0,
  f: 2.5
}, {
  id: 219,
  name: 'Pastrami (Turkey)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2-3 slices (56g)',
  cal: 60,
  p: 12,
  c: 0.5,
  f: 1
}, {
  id: 220,
  name: 'Prosciutto',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '1 oz / 2-3 slices (28g)',
  cal: 70,
  p: 7,
  c: 0,
  f: 4.5
}, {
  id: 221,
  name: 'Mortadella',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2 slices (56g)',
  cal: 170,
  p: 8,
  c: 2,
  f: 14
}, {
  id: 222,
  name: 'Capicola (Capocollo)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '1 oz / 3-4 slices (28g)',
  cal: 80,
  p: 7,
  c: 0,
  f: 5
}, {
  id: 223,
  name: 'Soppressata',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '1 oz / 4-5 slices (28g)',
  cal: 110,
  p: 7,
  c: 0.5,
  f: 9
}, {
  id: 224,
  name: 'Braunschweiger / Liverwurst',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz (56g)',
  cal: 170,
  p: 8,
  c: 2,
  f: 15
}, {
  id: 225,
  name: 'Head Cheese',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2 slices (56g)',
  cal: 100,
  p: 9,
  c: 0,
  f: 7
}, {
  id: 226,
  name: 'Olive Loaf',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2 slices (56g)',
  cal: 130,
  p: 6,
  c: 5,
  f: 10
}, {
  id: 227,
  name: 'Summer Sausage',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 4 slices (56g)',
  cal: 170,
  p: 8,
  c: 1,
  f: 15
}, {
  id: 228,
  name: 'Peppered Salami',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 5 slices (56g)',
  cal: 210,
  p: 12,
  c: 1,
  f: 18
}, {
  id: 229,
  name: 'Roast Chicken (Deli)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2-3 slices (56g)',
  cal: 55,
  p: 11,
  c: 1,
  f: 1
}, {
  id: 230,
  name: 'Pork Roll (Taylor Ham)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2 slices (56g)',
  cal: 130,
  p: 7,
  c: 2,
  f: 11
}, {
  id: 231,
  name: 'Dry Salami',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '1 oz / 4-5 slices (28g)',
  cal: 120,
  p: 7,
  c: 0.5,
  f: 10
}, {
  id: 232,
  name: 'Kielbasa (sliced)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 2 slices (56g)',
  cal: 170,
  p: 8,
  c: 2,
  f: 15
}, {
  id: 233,
  name: 'Chorizo (dry cured)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '1 oz / 4-5 slices (28g)',
  cal: 130,
  p: 7,
  c: 1,
  f: 11
}, {
  id: 234,
  name: 'Andouille Sausage (sliced)',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz (56g)',
  cal: 160,
  p: 8,
  c: 1,
  f: 14
}, {
  id: 235,
  name: 'Chicken Salami',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 4 slices (56g)',
  cal: 100,
  p: 10,
  c: 1,
  f: 6
}, {
  id: 236,
  name: 'Veggie Deli Slices',
  cat: 'Deli Meats',
  icon: '🥪',
  srv: '2 oz / 3 slices (56g)',
  cal: 80,
  p: 9,
  c: 4,
  f: 2
}];
const CATEGORIES = ['All', 'Deli Meats', 'Fruits', 'Vegetables', 'Grains', 'Protein', 'Legumes', 'Dairy', 'Nuts & Seeds', 'Fats & Oils', 'Beverages', 'Snacks', 'Fast Food', 'Condiments', 'Breakfast', 'Desserts'];
const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
const MEAL_ICONS = {
  Breakfast: '☀️',
  Lunch: '🌤️',
  Dinner: '🌙',
  Snacks: '🍎'
};
const DEFAULT_GOALS = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  fat: 65
};
const CAT_BG = {
  Fruits: '#fff7ed',
  Vegetables: '#f0fdf4',
  Grains: '#fefce8',
  Protein: '#fef2f2',
  Legumes: '#f5f3ff',
  Dairy: '#eff6ff',
  'Nuts & Seeds': '#fef3c7',
  'Fats & Oils': '#fefce8',
  Beverages: '#ecfeff',
  Snacks: '#fdf4ff',
  'Fast Food': '#fff7ed',
  Condiments: '#f7fee7',
  Breakfast: '#fffbeb',
  Desserts: '#fdf4ff',
  'Deli Meats': '#fef9ee'
};
function uid() {
  return Math.random().toString(36).slice(2, 10);
}
function todayStr() {
  return new Date().toISOString().split('T')[0];
}
function fmtDate(d) {
  const [y, m, day] = d.split('-').map(Number);
  const dt = new Date(y, m - 1, day);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = Math.round((dt - now) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === -1) return 'Yesterday';
  if (diff === 1) return 'Tomorrow';
  return dt.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}
function addDays(d, n) {
  const [y, m, day] = d.split('-').map(Number);
  const dt = new Date(y, m - 1, day + n);
  return dt.toISOString().split('T')[0];
}
function r1(n) {
  return Math.round(n * 10) / 10;
}
function CircularProgress({
  value,
  max,
  size = 150,
  stroke = 13,
  color = '#10b981',
  children
}) {
  const r2 = (size - stroke) / 2;
  const circ = 2 * Math.PI * r2;
  const pct = Math.min(Math.max(value / max, 0), 1);
  const dash = pct * circ;
  return /*#__PURE__*/React.createElement("div", {
    className: "ring-container",
    style: {
      width: size,
      height: size,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r2,
    fill: "none",
    stroke: "#e5e7eb",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r2,
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: `${dash} ${circ}`,
    style: {
      transition: 'stroke-dasharray 0.5s ease'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "ring-center"
  }, children));
}
const PROFILE_EMOJIS = ['😀', '😎', '🤩', '🥳', '💪', '🏃', '🧘', '🥗', '🍎', '🥦', '🔥', '⚡', '🌟', '🦁', '🐼', '🦊', '🐸', '🦋', '🌈', '🎯'];

// Simple naive hashing function for PIN since we don't have bcrypt in the browser easily
async function hashPin(pin) {
  const msgUint8 = new TextEncoder().encode(pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
function ProfileScreen({
  onSelect
}) {
  const [profiles, setProfiles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [newName, setNewName] = React.useState('');
  const [newEmoji, setNewEmoji] = React.useState('😀');
  const [newPin, setNewPin] = React.useState('');
  const [loginModal, setLoginModal] = React.useState(null); // { id, name, msg }
  const [loginPin, setLoginPin] = React.useState('');
  const nameRef = React.useRef(null);
  useEffect(() => {
    fetchProfiles();
  }, []);
  async function fetchProfiles() {
    setLoading(true);
    const {
      data,
      error
    } = await supabaseClient.from('ct_profiles').select('*').order('created_at', {
      ascending: false
    });
    if (!error && data) {
      setProfiles(data);
    }
    setLoading(false);
  }
  async function createProfile() {
    const name = newName.trim();
    const pin = newPin.trim();
    if (!name || pin.length !== 4) return;
    setLoading(true);
    const hashedPin = await hashPin(pin);
    const p = {
      name,
      emoji: newEmoji,
      pin_hash: hashedPin
    };
    const {
      data,
      error
    } = await supabaseClient.from('ct_profiles').insert([p]).select().single();
    if (error) {
      alert("Error creating profile!");
      setLoading(false);
      return;
    }
    setProfiles([data, ...profiles]);
    setNewName('');
    setNewPin('');
    onSelect(data);
  }
  async function attemptLogin() {
    if (loginPin.length !== 4) return;
    setLoading(true);
    const hashedPin = await hashPin(loginPin);
    const {
      data,
      error
    } = await supabaseClient.from('ct_profiles').select('*').eq('id', loginModal.id).eq('pin_hash', hashedPin).single();
    setLoading(false);
    if (error || !data) {
      setLoginModal({
        ...loginModal,
        msg: 'Incorrect PIN'
      });
      setLoginPin('');
      return;
    }
    onSelect(data);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "profile-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-logo"
  }, "\uD83E\uDD57"), /*#__PURE__*/React.createElement("div", {
    className: "profile-app-name"
  }, "CalTrack"), /*#__PURE__*/React.createElement("div", {
    className: "profile-tagline"
  }, "Your tracked calories, across all devices"), loading && !loginModal && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'white',
      marginBottom: 20
    }
  }, "Loading profiles..."), !loading && /*#__PURE__*/React.createElement("div", {
    className: "profile-card"
  }, profiles.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "profile-card-title"
  }, "\uD83D\uDC4B Sign in to your profile"), /*#__PURE__*/React.createElement("div", {
    className: "profile-list",
    style: {
      maxHeight: '230px',
      overflowY: 'auto'
    }
  }, profiles.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    className: "profile-btn",
    onClick: () => {
      setLoginModal({
        id: p.id,
        name: p.name,
        msg: null
      });
      setLoginPin('');
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-btn-emoji"
  }, p.emoji), /*#__PURE__*/React.createElement("div", {
    className: "profile-btn-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-btn-name"
  }, p.name)), /*#__PURE__*/React.createElement("span", {
    className: "profile-btn-arrow"
  }, "\u203A")))), /*#__PURE__*/React.createElement("div", {
    className: "profile-divider"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-divider-line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "profile-divider-text"
  }, "OR CREATE NEW"), /*#__PURE__*/React.createElement("div", {
    className: "profile-divider-line"
  }))), profiles.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "profile-card-title"
  }, "\u2728 Create your first profile"), /*#__PURE__*/React.createElement("div", {
    className: "profile-new-section"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--subtext)',
      marginBottom: 4
    }
  }, "CHOOSE AN AVATAR"), /*#__PURE__*/React.createElement("div", {
    className: "emoji-grid"
  }, PROFILE_EMOJIS.slice(0, 14).map(e => /*#__PURE__*/React.createElement("button", {
    key: e,
    className: `emoji-option${newEmoji === e ? ' selected' : ''}`,
    onClick: () => setNewEmoji(e)
  }, e))), /*#__PURE__*/React.createElement("input", {
    ref: nameRef,
    className: "profile-name-input",
    type: "text",
    placeholder: "Your name...",
    value: newName,
    onChange: e => setNewName(e.target.value),
    style: {
      background: 'var(--bg)',
      border: '1.5px solid transparent',
      borderRadius: 10,
      padding: '12px 14px',
      fontSize: 16,
      color: 'var(--text)',
      outline: 'none',
      width: '100%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "profile-name-row"
  }, /*#__PURE__*/React.createElement("input", {
    className: "profile-name-input",
    type: "password",
    placeholder: "4-digit PIN",
    maxLength: 4,
    value: newPin,
    onChange: e => setNewPin(e.target.value.replace(/\\D/g, '')),
    onKeyDown: e => e.key === 'Enter' && createProfile(),
    style: {
      background: 'var(--bg)',
      border: '1.5px solid transparent',
      borderRadius: 10,
      padding: '12px 14px',
      fontSize: 16,
      color: 'var(--text)',
      outline: 'none',
      letterSpacing: '2px'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "profile-create-btn",
    onClick: createProfile,
    disabled: !newName.trim() || newPin.length !== 4
  }, "Add \u203A")))), loginModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: () => setLoginModal(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    style: {
      padding: 24
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header",
    style: {
      padding: '0 0 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "modal-title"
  }, "Sign in as ", loginModal.name), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: () => setLoginModal(null)
  }, "\xD7")), loginModal.msg && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--red)',
      fontSize: 14,
      fontWeight: 600,
      marginTop: 10
    }
  }, loginModal.msg), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--subtext)',
      marginBottom: 8
    }
  }, "ENTER 4-DIGIT PIN"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    autoFocus: true,
    maxLength: 4,
    value: loginPin,
    onChange: e => setLoginPin(e.target.value.replace(/\\D/g, '')),
    onKeyDown: e => e.key === 'Enter' && attemptLogin(),
    style: {
      background: 'var(--bg)',
      border: '1.5px solid transparent',
      borderRadius: 10,
      padding: '12px 14px',
      fontSize: 24,
      color: 'var(--text)',
      outline: 'none',
      letterSpacing: '8px',
      width: '100%',
      textAlign: 'center'
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block",
    style: {
      marginTop: 16
    },
    disabled: loginPin.length !== 4 || loading,
    onClick: attemptLogin
  }, loading ? 'Verifying...' : 'Sign In'))));
}
function ProfileGate() {
  const [activeProfile, setActiveProfile] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ct_active') || 'null');
    } catch (e) {
      return null;
    }
  });
  function selectProfile(p) {
    localStorage.setItem('ct_active', JSON.stringify(p));
    setActiveProfile(p);
  }
  function switchProfile() {
    localStorage.removeItem('ct_active');
    setActiveProfile(null);
  }
  if (!activeProfile) return /*#__PURE__*/React.createElement(ProfileScreen, {
    onSelect: selectProfile
  });
  return /*#__PURE__*/React.createElement(App, {
    profileId: activeProfile.id,
    profileName: activeProfile.name,
    profileEmoji: activeProfile.emoji,
    onSwitchProfile: switchProfile
  });
}
function App({
  profileId,
  profileName,
  profileEmoji,
  onSwitchProfile
}) {
  const [tab, setTab] = useState('dashboard');
  const [date, setDate] = useState(todayStr);
  const [log, setLog] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [goals, setGoals] = useState(DEFAULT_GOALS);
  const [water, setWater] = useState({});
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [addModal, setAddModal] = useState(null);
  const [recipeModal, setRecipeModal] = useState(null);
  const [logRecipeModal, setLogRecipeModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [defaultMeal, setDefaultMeal] = useState('Breakfast');
  useEffect(() => {
    async function loadData() {
      setLoadingInitial(true);
      const [logRes, recRes, goalRes, waterRes] = await Promise.all([supabaseClient.from('ct_food_logs').select('*').eq('profile_id', profileId), supabaseClient.from('ct_recipes').select('*').eq('profile_id', profileId), supabaseClient.from('ct_goals').select('*').eq('profile_id', profileId).maybeSingle(), supabaseClient.from('ct_water').select('*').eq('profile_id', profileId)]);
      if (logRes.data) {
        const grouped = logRes.data.reduce((acc, curr) => {
          if (!acc[curr.date]) acc[curr.date] = [];
          acc[curr.date].push({
            ...curr,
            id: curr.id
          });
          return acc;
        }, {});
        setLog(grouped);
      }
      if (recRes.data) {
        setRecipes(recRes.data);
      }
      if (!goalRes.error && goalRes.data) {
        setGoals({
          calories: goalRes.data.calories,
          protein: goalRes.data.protein,
          carbs: goalRes.data.carbs,
          fat: goalRes.data.fat
        });
      }
      if (waterRes.data) {
        const waterMap = waterRes.data.reduce((acc, curr) => {
          acc[curr.date] = curr.glasses;
          return acc;
        }, {});
        setWater(waterMap);
      }
      setLoadingInitial(false);
    }
    loadData();
  }, [profileId]);
  const showToast = useCallback(msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);
  const dayEntries = useMemo(() => log[date] || [], [log, date]);
  const dayTotals = useMemo(() => dayEntries.reduce((a, e) => ({
    cal: a.cal + e.cal,
    p: a.p + e.p,
    c: a.c + e.c,
    f: a.f + e.f
  }), {
    cal: 0,
    p: 0,
    c: 0,
    f: 0
  }), [dayEntries]);
  const waterToday = water[date] || 0;
  async function updateGoals(newGoals) {
    setGoals(newGoals);
    await supabaseClient.from('ct_goals').upsert({
      profile_id: profileId,
      ...newGoals
    });
    showToast('Goals updated!');
  }
  async function updateWater(dateStr, glasses) {
    setWater(prev => ({
      ...prev,
      [dateStr]: glasses
    }));
    await supabaseClient.from('ct_water').upsert({
      profile_id: profileId,
      date: dateStr,
      glasses
    });
  }
  async function addEntry(food, qty, meal) {
    const entry = {
      id: uid(),
      food_id: food.id,
      name: food.name,
      srv: food.srv,
      qty,
      date,
      cal: r1(food.cal * qty),
      p: r1(food.p * qty),
      c: r1(food.c * qty),
      f: r1(food.f * qty),
      meal,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      profile_id: profileId
    };

    // Optimistic UI update
    setLog(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), entry]
    }));
    showToast('Added ' + food.name);

    // Async save to Supabase
    await supabaseClient.from('ct_food_logs').insert([entry]);
  }
  async function removeEntry(id) {
    setLog(prev => ({
      ...prev,
      [date]: (prev[date] || []).filter(e => e.id !== id)
    }));
    await supabaseClient.from('ct_food_logs').delete().eq('id', id);
  }
  async function saveRecipe(recipe) {
    const isUpdate = !!recipe.id;
    const recId = recipe.id || uid();
    const data = {
      ...recipe,
      id: recId,
      profile_id: profileId
    };
    if (isUpdate) {
      setRecipes(prev => prev.map(r => r.id === recId ? data : r));
      showToast('Recipe updated!');
      await supabaseClient.from('ct_recipes').upsert(data);
    } else {
      setRecipes(prev => [...prev, data]);
      showToast('Recipe saved!');
      await supabaseClient.from('ct_recipes').insert([data]);
    }
  }
  async function deleteRecipe(id) {
    setRecipes(prev => prev.filter(r => r.id !== id));
    showToast('Recipe deleted');
    await supabaseClient.from('ct_recipes').delete().eq('id', id);
  }
  async function logRecipe(recipe, qty, meal) {
    const entry = {
      id: uid(),
      food_id: null,
      name: recipe.name + ' (recipe)',
      srv: `${qty} serving${qty !== 1 ? 's' : ''}`,
      qty,
      date,
      cal: r1(recipe.cal * qty),
      p: r1(recipe.p * qty),
      c: r1(recipe.c * qty),
      f: r1(recipe.f * qty),
      meal,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      profile_id: profileId
    };
    setLog(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), entry]
    }));
    showToast('Logged ' + recipe.name);
    await supabaseClient.from('ct_food_logs').insert([entry]);
  }
  function closeAll() {
    setAddModal(null);
    setRecipeModal(null);
    setLogRecipeModal(null);
  }
  if (loadingInitial) {
    return /*#__PURE__*/React.createElement("div", {
      className: "app",
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 48,
        marginBottom: 16
      }
    }, "\uD83E\uDD57"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: 'var(--subtext)'
      }
    }, "Loading your data...")));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, toast && /*#__PURE__*/React.createElement("div", {
    key: toast + Date.now(),
    className: "toast"
  }, toast), /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-inner"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onSwitchProfile,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      lineHeight: 1
    }
  }, profileEmoji), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--subtext)',
      maxWidth: 60,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, profileName)), /*#__PURE__*/React.createElement("div", {
    className: "date-nav"
  }, /*#__PURE__*/React.createElement("button", {
    className: "date-btn",
    onClick: () => setDate(d => addDays(d, -1))
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    className: "date-label",
    onClick: () => setDate(todayStr())
  }, fmtDate(date)), /*#__PURE__*/React.createElement("button", {
    className: "date-btn",
    onClick: () => setDate(d => addDays(d, 1))
  }, "\u203A")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 19,
      fontWeight: 800,
      color: 'var(--green)'
    }
  }, "CalTrack"))), /*#__PURE__*/React.createElement("div", {
    className: "scroll-area"
  }, tab === 'dashboard' && /*#__PURE__*/React.createElement(DashboardTab, {
    date: date,
    entries: dayEntries,
    totals: dayTotals,
    goals: goals,
    waterToday: waterToday,
    setWater: v => {
      const glasses = typeof v === 'function' ? v(water[date] || 0) : v;
      updateWater(date, glasses);
    },
    onAddFood: meal => {
      setDefaultMeal(meal);
      setTab('search');
    },
    onRemove: removeEntry
  }), tab === 'search' && /*#__PURE__*/React.createElement(SearchTab, {
    defaultMeal: defaultMeal,
    onAdd: addEntry
  }), tab === 'recipes' && /*#__PURE__*/React.createElement(RecipesTab, {
    recipes: recipes,
    onNew: () => setRecipeModal({
      mode: 'new',
      recipe: null
    }),
    onView: r => setRecipeModal({
      mode: 'view',
      recipe: r
    }),
    onLog: r => setLogRecipeModal(r)
  }), tab === 'settings' && /*#__PURE__*/React.createElement(SettingsTab, {
    goals: goals,
    setGoals: updateGoals,
    log: log,
    onSwitchProfile: onSwitchProfile,
    profileName: profileName,
    profileEmoji: profileEmoji
  })), /*#__PURE__*/React.createElement("nav", {
    className: "bottom-nav"
  }, [{
    id: 'dashboard',
    icon: '📊',
    label: 'Dashboard'
  }, {
    id: 'search',
    icon: '🔍',
    label: 'Log Food'
  }, {
    id: 'recipes',
    icon: '📖',
    label: 'Recipes'
  }, {
    id: 'settings',
    icon: '⚙️',
    label: 'Goals'
  }].map(n => /*#__PURE__*/React.createElement("button", {
    key: n.id,
    className: `nav-item${tab === n.id ? ' active' : ''}`,
    onClick: () => setTab(n.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-icon"
  }, n.icon), /*#__PURE__*/React.createElement("span", null, n.label)))), addModal && /*#__PURE__*/React.createElement(AddFoodModal, {
    food: addModal.food,
    defaultMeal: addModal.meal || defaultMeal,
    onAdd: (qty, meal) => {
      addEntry(addModal.food, qty, meal);
      closeAll();
    },
    onClose: closeAll
  }), recipeModal && /*#__PURE__*/React.createElement(RecipeModal, {
    mode: recipeModal.mode,
    recipe: recipeModal.recipe,
    onSave: r => {
      saveRecipe(r);
      closeAll();
    },
    onDelete: id => {
      deleteRecipe(id);
      closeAll();
    },
    onLog: r => {
      closeAll();
      setLogRecipeModal(r);
    },
    onClose: closeAll
  }), logRecipeModal && /*#__PURE__*/React.createElement(LogRecipeModal, {
    recipe: logRecipeModal,
    onLog: (qty, meal) => {
      logRecipe(logRecipeModal, qty, meal);
      closeAll();
    },
    onClose: closeAll
  }));
}
function DashboardTab({
  date,
  entries,
  totals,
  goals,
  waterToday,
  setWater,
  onAddFood,
  onRemove
}) {
  const remaining = goals.calories - totals.cal;
  const overGoal = remaining < 0;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(CircularProgress, {
    value: totals.cal,
    max: goals.calories,
    color: overGoal ? '#ef4444' : '#10b981'
  }, /*#__PURE__*/React.createElement("div", {
    className: "ring-cal",
    style: {
      color: overGoal ? '#ef4444' : '#111827'
    }
  }, overGoal ? '+' : '', Math.abs(Math.round(remaining))), /*#__PURE__*/React.createElement("div", {
    className: "ring-label"
  }, overGoal ? 'over goal' : 'remaining')), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--subtext)'
    }
  }, "Goal"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, goals.calories, " cal")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--subtext)'
    }
  }, "Eaten"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--green)'
    }
  }, Math.round(totals.cal), " cal")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "macro-pill pill-p"
  }, "P ", r1(totals.p), "g"), /*#__PURE__*/React.createElement("span", {
    className: "macro-pill pill-c"
  }, "C ", r1(totals.c), "g"), /*#__PURE__*/React.createElement("span", {
    className: "macro-pill pill-f"
  }, "F ", r1(totals.f), "g"))))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      marginBottom: 12
    }
  }, "Macros"), [{
    label: 'Protein',
    val: totals.p,
    goal: goals.protein,
    color: '#3b82f6'
  }, {
    label: 'Carbs',
    val: totals.c,
    goal: goals.carbs,
    color: '#f59e0b'
  }, {
    label: 'Fat',
    val: totals.f,
    goal: goals.fat,
    color: '#ef4444'
  }].map(({
    label,
    val,
    goal,
    color
  }) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--subtext)'
    }
  }, r1(val), "g / ", goal, "g")), /*#__PURE__*/React.createElement("div", {
    className: "progress-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-fill",
    style: {
      width: `${Math.min(val / goal * 100, 100)}%`,
      background: color
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 15
    }
  }, "\uD83D\uDCA7 Water"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--subtext)'
    }
  }, waterToday, "/8 glasses")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, Array.from({
    length: 8
  }, (_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `water-btn${i < waterToday ? ' filled' : ''}`,
    onClick: () => {
      const newGlasses = i < waterToday ? i : i + 1;
      // Workaround to only trigger the setter directly instead of via callback function if we modified the prop interface in DashboardTab
      setWater(newGlasses);
    }
  }, "\uD83D\uDCA7")))), MEALS.map(meal => {
    const me = entries.filter(e => e.meal === meal);
    const mc = me.reduce((s, e) => s + e.cal, 0);
    return /*#__PURE__*/React.createElement("div", {
      key: meal,
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "meal-header"
    }, /*#__PURE__*/React.createElement("span", {
      className: "meal-title"
    }, MEAL_ICONS[meal], " ", meal), mc > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--subtext)'
      }
    }, Math.round(mc), " cal")), me.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--subtext)',
        marginBottom: 4
      }
    }, "Nothing logged yet"), me.map(e => /*#__PURE__*/React.createElement("div", {
      key: e.id,
      className: "log-entry"
    }, /*#__PURE__*/React.createElement("div", {
      className: "log-entry-info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "log-entry-name"
    }, e.name), /*#__PURE__*/React.createElement("div", {
      className: "log-entry-meta"
    }, e.qty !== 1 ? `${e.qty}x · ` : '', "P:", r1(e.p), "g  C:", r1(e.c), "g  F:", r1(e.f), "g")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700
      }
    }, Math.round(e.cal)), /*#__PURE__*/React.createElement("button", {
      className: "delete-btn",
      onClick: () => onRemove(e.id)
    }, "\xD7"))), /*#__PURE__*/React.createElement("button", {
      className: "add-row-btn",
      onClick: () => onAddFood(meal)
    }, "\uFF0B Add food"));
  }));
}
function SearchTab({
  defaultMeal,
  onAdd
}) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(null);
  const results = useMemo(() => {
    let list = FOODS;
    if (cat !== 'All') list = list.filter(f => f.cat === cat);
    if (q) {
      const lq = q.toLowerCase();
      list = list.filter(f => f.name.toLowerCase().includes(lq) || f.cat.toLowerCase().includes(lq));
    }
    return list;
  }, [q, cat]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 12px 0'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "search",
    placeholder: "Search 170+ foods...",
    value: q,
    onChange: e => setQ(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "chips-row",
    style: {
      paddingTop: 8,
      paddingBottom: 8
    }
  }, CATEGORIES.map(c => /*#__PURE__*/React.createElement("div", {
    key: c,
    className: `chip${cat === c ? ' active' : ''}`,
    onClick: () => setCat(c)
  }, c))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, results.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      marginBottom: 8
    }
  }, "\uD83E\uDD37"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14
    }
  }, "No foods found")), results.slice(0, 60).map(food => /*#__PURE__*/React.createElement("div", {
    key: food.id,
    className: "food-item",
    onClick: () => setSelected(food)
  }, /*#__PURE__*/React.createElement("div", {
    className: "food-icon",
    style: {
      background: CAT_BG[food.cat] || '#f9fafb'
    }
  }, /*#__PURE__*/React.createElement("span", null, food.icon)), /*#__PURE__*/React.createElement("div", {
    className: "food-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "food-name"
  }, food.name), /*#__PURE__*/React.createElement("div", {
    className: "food-meta"
  }, food.srv), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "macro-pill pill-p"
  }, "P", food.p, "g"), /*#__PURE__*/React.createElement("span", {
    className: "macro-pill pill-c"
  }, "C", food.c, "g"), /*#__PURE__*/React.createElement("span", {
    className: "macro-pill pill-f"
  }, "F", food.f, "g"))), /*#__PURE__*/React.createElement("div", {
    className: "food-cal"
  }, food.cal)))), selected && /*#__PURE__*/React.createElement(AddFoodModal, {
    food: selected,
    defaultMeal: defaultMeal,
    onAdd: (qty, meal) => {
      onAdd(selected, qty, meal);
      setSelected(null);
    },
    onClose: () => setSelected(null)
  }));
}
function AddFoodModal({
  food,
  defaultMeal,
  onAdd,
  onClose
}) {
  const [qty, setQty] = useState('1');
  const [meal, setMeal] = useState(defaultMeal);
  const q = parseFloat(qty) || 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-handle"
  }), /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "modal-title"
  }, food.icon, " ", food.name), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)',
      borderRadius: 12,
      padding: 12,
      marginBottom: 14,
      display: 'flex',
      justifyContent: 'space-around',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: 'var(--green)'
    }
  }, Math.round(food.cal * q)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--subtext)'
    }
  }, "cal")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: '#3b82f6'
    }
  }, r1(food.p * q), "g"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--subtext)'
    }
  }, "protein")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: '#f59e0b'
    }
  }, r1(food.c * q), "g"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--subtext)'
    }
  }, "carbs")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: '#ef4444'
    }
  }, r1(food.f * q), "g"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--subtext)'
    }
  }, "fat"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--subtext)',
      marginBottom: 12,
      textAlign: 'center'
    }
  }, "1 serving = ", food.srv), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8,
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--subtext)'
    }
  }, "Servings"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: qty,
    min: "0.25",
    step: "0.5",
    onChange: e => setQty(e.target.value),
    style: {
      fontSize: 20,
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 16
    }
  }, ['0.5', '1', '1.5', '2', '3'].map(v => /*#__PURE__*/React.createElement("button", {
    key: v,
    className: `btn btn-sm${qty === v ? ' btn-primary' : ' btn-secondary'}`,
    style: {
      flex: 1
    },
    onClick: () => setQty(v)
  }, v, "x"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10,
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--subtext)'
    }
  }, "Meal"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 16
    }
  }, MEALS.map(m => /*#__PURE__*/React.createElement("button", {
    key: m,
    className: `btn btn-sm${meal === m ? ' btn-primary' : ' btn-secondary'}`,
    onClick: () => setMeal(m)
  }, MEAL_ICONS[m], " ", m))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block",
    onClick: () => {
      if (q > 0) onAdd(q, meal);
    }
  }, "Add to ", meal))));
}
function RecipesTab({
  recipes,
  onNew,
  onView,
  onLog
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 12px 4px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 17
    }
  }, "My Recipes"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: onNew
  }, "\uFF0B New Recipe")), recipes.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "empty-state",
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      marginBottom: 8
    }
  }, "\uD83D\uDCD6"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 6
    }
  }, "No saved recipes"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13
    }
  }, "Create recipes to log them with one tap")), recipes.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    className: "recipe-card",
    onClick: () => onView(r)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "recipe-name"
  }, r.name), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: e => {
      e.stopPropagation();
      onLog(r);
    }
  }, "Log")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--subtext)',
      marginBottom: 8
    }
  }, r.ingredients.length, " ingredient", r.ingredients.length !== 1 ? 's' : '', " \xB7 ", r.servings, " serving", r.servings !== 1 ? 's' : ''), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "macro-pill pill-cal"
  }, Math.round(r.cal), " cal"), /*#__PURE__*/React.createElement("span", {
    className: "macro-pill pill-p"
  }, "P ", r1(r.p), "g"), /*#__PURE__*/React.createElement("span", {
    className: "macro-pill pill-c"
  }, "C ", r1(r.c), "g"), /*#__PURE__*/React.createElement("span", {
    className: "macro-pill pill-f"
  }, "F ", r1(r.f), "g"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--subtext)',
      alignSelf: 'center'
    }
  }, "per serving")))));
}
function RecipeModal({
  mode,
  recipe,
  onSave,
  onDelete,
  onLog,
  onClose
}) {
  const [name, setName] = useState(recipe?.name || '');
  const [servings, setServings] = useState(recipe?.servings || 1);
  const [ingredients, setIngredients] = useState(recipe?.ingredients || []);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [ingQty, setIngQty] = useState({});
  const isView = mode === 'view';
  const totals = useMemo(() => {
    const t = ingredients.reduce((a, i) => ({
      cal: a.cal + i.cal,
      p: a.p + i.p,
      c: a.c + i.c,
      f: a.f + i.f
    }), {
      cal: 0,
      p: 0,
      c: 0,
      f: 0
    });
    const s = Math.max(servings, 1);
    return {
      cal: r1(t.cal / s),
      p: r1(t.p / s),
      c: r1(t.c / s),
      f: r1(t.f / s)
    };
  }, [ingredients, servings]);
  const filteredFoods = useMemo(() => {
    if (!search) return FOODS.slice(0, 25);
    const lq = search.toLowerCase();
    return FOODS.filter(f => f.name.toLowerCase().includes(lq) || f.cat.toLowerCase().includes(lq)).slice(0, 30);
  }, [search]);
  function addIng(food) {
    const qty = parseFloat(ingQty[food.id]) || 1;
    setIngredients(prev => [...prev, {
      foodId: food.id,
      name: food.name,
      icon: food.icon,
      srv: food.srv,
      qty,
      cal: r1(food.cal * qty),
      p: r1(food.p * qty),
      c: r1(food.c * qty),
      f: r1(food.f * qty)
    }]);
    setShowSearch(false);
    setSearch('');
    setIngQty(prev => {
      const n = {
        ...prev
      };
      delete n[food.id];
      return n;
    });
  }
  function removeIng(idx) {
    setIngredients(prev => prev.filter((_, i) => i !== idx));
  }
  const canSave = name.trim() && ingredients.length > 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    style: {
      maxHeight: '92vh'
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-handle"
  }), /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "modal-title"
  }, isView ? '📖 ' + recipe.name : '🍳 Build Recipe'), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, !isView && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-label"
  }, "Recipe name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "e.g. Morning Smoothie Bowl",
    value: name,
    onChange: e => setName(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-label"
  }, "Makes how many servings?"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: servings,
    min: "1",
    step: "0.5",
    onChange: e => setServings(parseFloat(e.target.value) || 1)
  }))), ingredients.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--green-light)',
      borderRadius: 12,
      padding: 12,
      marginBottom: 14,
      display: 'flex',
      justifyContent: 'space-around',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: 'var(--green)'
    }
  }, Math.round(totals.cal)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--green-dark)'
    }
  }, "cal/srv")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: '#3b82f6'
    }
  }, totals.p, "g"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--subtext)'
    }
  }, "protein")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: '#f59e0b'
    }
  }, totals.c, "g"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--subtext)'
    }
  }, "carbs")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: '#ef4444'
    }
  }, totals.f, "g"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--subtext)'
    }
  }, "fat"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      marginBottom: 8
    }
  }, "Ingredients"), ingredients.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--subtext)',
      marginBottom: 8
    }
  }, "No ingredients yet"), ingredients.map((ing, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "log-entry"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, ing.icon || '🍽️'), /*#__PURE__*/React.createElement("div", {
    className: "log-entry-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "log-entry-name"
  }, ing.name), /*#__PURE__*/React.createElement("div", {
    className: "log-entry-meta"
  }, ing.qty !== 1 ? `${ing.qty}x ` : '', "1 serving \xB7 ", Math.round(ing.cal), " cal")), !isView && /*#__PURE__*/React.createElement("button", {
    className: "delete-btn",
    onClick: () => removeIng(i)
  }, "\xD7"))), !isView && !showSearch && /*#__PURE__*/React.createElement("button", {
    className: "add-row-btn",
    onClick: () => setShowSearch(true)
  }, "\uFF0B Add ingredient"), !isView && showSearch && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "search",
    placeholder: "Search ingredient...",
    value: search,
    onChange: e => setSearch(e.target.value),
    autoFocus: true,
    style: {
      marginBottom: 8
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 180,
      overflowY: 'auto',
      borderRadius: 10,
      border: '1.5px solid var(--border)'
    }
  }, filteredFoods.map(food => /*#__PURE__*/React.createElement("div", {
    key: food.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 10px',
      borderBottom: '1px solid var(--bg)',
      background: 'white',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, food.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      cursor: 'pointer'
    },
    onClick: () => addIng(food)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, food.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--subtext)'
    }
  }, food.srv, " \xB7 ", food.cal, " cal")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: ingQty[food.id] || '1',
    min: "0.25",
    step: "0.5",
    onChange: e => setIngQty(prev => ({
      ...prev,
      [food.id]: e.target.value
    })),
    style: {
      width: 44,
      fontSize: 13,
      padding: '4px 6px',
      textAlign: 'center'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => addIng(food)
  }, "+"))))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    style: {
      marginTop: 8,
      width: '100%'
    },
    onClick: () => setShowSearch(false)
  }, "Cancel")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, isView ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block",
    onClick: () => onLog(recipe)
  }, "Log This Recipe"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger btn-block",
    onClick: () => onDelete(recipe.id)
  }, "Delete Recipe")) : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block",
    disabled: !canSave,
    style: {
      opacity: canSave ? 1 : 0.5
    },
    onClick: () => {
      if (canSave) onSave({
        ...(recipe || {}),
        name: name.trim(),
        servings: Math.max(1, servings),
        ingredients,
        ...totals
      });
    }
  }, recipe ? 'Update Recipe' : 'Save Recipe')))));
}
function LogRecipeModal({
  recipe,
  onLog,
  onClose
}) {
  const [qty, setQty] = useState('1');
  const [meal, setMeal] = useState('Lunch');
  const q = parseFloat(qty) || 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-handle"
  }), /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "modal-title"
  }, "\uD83D\uDCD6 ", recipe.name), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)',
      borderRadius: 12,
      padding: 12,
      marginBottom: 14,
      display: 'flex',
      justifyContent: 'space-around',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: 'var(--green)'
    }
  }, Math.round(recipe.cal * q)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--subtext)'
    }
  }, "cal")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: '#3b82f6'
    }
  }, r1(recipe.p * q), "g"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--subtext)'
    }
  }, "protein")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: '#f59e0b'
    }
  }, r1(recipe.c * q), "g"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--subtext)'
    }
  }, "carbs")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: '#ef4444'
    }
  }, r1(recipe.f * q), "g"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--subtext)'
    }
  }, "fat"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--subtext)',
      marginBottom: 8
    }
  }, "Servings"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: qty,
    min: "0.5",
    step: "0.5",
    onChange: e => setQty(e.target.value),
    style: {
      fontSize: 20,
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 16
    }
  }, ['0.5', '1', '1.5', '2'].map(v => /*#__PURE__*/React.createElement("button", {
    key: v,
    className: `btn btn-sm${qty === v ? ' btn-primary' : ' btn-secondary'}`,
    style: {
      flex: 1
    },
    onClick: () => setQty(v)
  }, v, "x"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--subtext)',
      marginBottom: 10
    }
  }, "Meal"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 16
    }
  }, MEALS.map(m => /*#__PURE__*/React.createElement("button", {
    key: m,
    className: `btn btn-sm${meal === m ? ' btn-primary' : ' btn-secondary'}`,
    onClick: () => setMeal(m)
  }, MEAL_ICONS[m], " ", m))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block",
    onClick: () => {
      if (q > 0) onLog(q, meal);
    }
  }, "Add to ", meal))));
}
function SettingsTab({
  goals,
  setGoals,
  log,
  onSwitchProfile,
  profileName,
  profileEmoji
}) {
  const [local, setLocal] = useState({
    ...goals
  });
  const changed = JSON.stringify(local) !== JSON.stringify(goals);
  const allEntries = Object.values(log).flat();
  const totalDays = Object.keys(log).filter(d => log[d].length > 0).length;
  const avgCal = totalDays > 0 ? Math.round(allEntries.reduce((s, e) => s + e.cal, 0) / totalDays) : 0;
  const topFood = allEntries.length > 0 ? Object.entries(allEntries.reduce((a, e) => ({
    ...a,
    [e.name]: (a[e.name] || 0) + 1
  }), {})).sort((a, b) => b[1] - a[1])[0] : null;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      marginBottom: 2
    }
  }, "Daily Goals"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--subtext)',
      marginBottom: 14
    }
  }, "Set your nutrition targets"), [{
    key: 'calories',
    label: 'Calories',
    unit: 'kcal',
    color: 'var(--green)'
  }, {
    key: 'protein',
    label: 'Protein',
    unit: 'g',
    color: '#3b82f6'
  }, {
    key: 'carbs',
    label: 'Carbohydrates',
    unit: 'g',
    color: '#f59e0b'
  }, {
    key: 'fat',
    label: 'Fat',
    unit: 'g',
    color: '#ef4444'
  }].map(({
    key,
    label,
    unit,
    color
  }) => /*#__PURE__*/React.createElement("div", {
    key: key,
    className: "settings-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "settings-label",
    style: {
      color
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--subtext)'
    }
  }, unit, " per day")), /*#__PURE__*/React.createElement("input", {
    className: "settings-input",
    type: "number",
    value: local[key],
    min: "0",
    onChange: e => setLocal(p => ({
      ...p,
      [key]: parseFloat(e.target.value) || 0
    }))
  }))), changed && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block",
    style: {
      marginTop: 12
    },
    onClick: () => setGoals(local)
  }, "Save Goals")), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      marginBottom: 12
    }
  }, "Your Stats"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)',
      borderRadius: 12,
      padding: 12,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      color: 'var(--green)'
    }
  }, totalDays), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--subtext)'
    }
  }, "days logged")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)',
      borderRadius: 12,
      padding: 12,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      color: '#3b82f6'
    }
  }, avgCal || '—'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--subtext)'
    }
  }, "avg cal/day")), topFood && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)',
      borderRadius: 12,
      padding: 12,
      textAlign: 'center',
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: '#f59e0b'
    }
  }, topFood[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--subtext)'
    }
  }, "most logged (", topFood[1], "x)")))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      marginBottom: 10
    }
  }, "Quick Macro Presets"), [{
    label: '🔥 Fat Loss',
    cal: 1600,
    p: 160,
    c: 130,
    f: 55
  }, {
    label: '⚖️ Maintain',
    cal: 2000,
    p: 150,
    c: 220,
    f: 65
  }, {
    label: '💪 Muscle Gain',
    cal: 2600,
    p: 185,
    c: 310,
    f: 75
  }].map(({
    label,
    cal,
    p,
    c,
    f
  }) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 14
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--subtext)'
    }
  }, cal, " cal \xB7 P:", p, "g C:", c, "g F:", f, "g")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: () => {
      const g = {
        calories: cal,
        protein: p,
        carbs: c,
        fat: f
      };
      setLocal(g);
      setGoals(g);
    }
  }, "Use")))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      marginBottom: 8
    }
  }, "\uD83D\uDCF1 Add to iPhone Home Screen"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--subtext)',
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", null, "1. Open ", /*#__PURE__*/React.createElement("strong", null, "caltrack.html"), " in ", /*#__PURE__*/React.createElement("strong", null, "Safari")), /*#__PURE__*/React.createElement("div", null, "2. Tap the ", /*#__PURE__*/React.createElement("strong", null, "Share"), " button (box with arrow \u2191)"), /*#__PURE__*/React.createElement("div", null, "3. Tap ", /*#__PURE__*/React.createElement("strong", null, "\"Add to Home Screen\"")), /*#__PURE__*/React.createElement("div", null, "4. Tap ", /*#__PURE__*/React.createElement("strong", null, "Add")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      padding: 10,
      background: 'var(--green-light)',
      borderRadius: 8,
      color: 'var(--green-dark)'
    }
  }, "\u2705 All your data saves to your device automatically"))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      marginBottom: 4
    }
  }, "\uD83D\uDC64 Current Profile"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 14,
      padding: '12px 14px',
      background: 'var(--bg)',
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 32
    }
  }, profileEmoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16
    }
  }, profileName), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--subtext)'
    }
  }, "Logged in"))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-block",
    onClick: onSwitchProfile
  }, "\uD83D\uDD04 Switch Profile")));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(ProfileGate, null));
