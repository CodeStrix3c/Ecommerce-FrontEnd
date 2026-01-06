// src/data/orders.js
const orders = [
  {
    orderId: "ORD-123",
    date: "Mon, 1 Jan 2024",
    status: "Delivered",
    statusColor: "text-[var(--color-primary)]",
    refundDetailsLabel: "View Order details",
    amount: "₹999.00",
    products: [
      {
        brand: "Keeto",
        name: "Coco Peats",
        quantity: "1kg",
        image: "assets/images/product-images/Buprofezin/frontimg.png", 
      },
      {
        brand: "Organic Garden",
        name: "Potting Soil Mix",
        quantity: "2kg",
        image: "assets/images/product-images/Carbendazim/frontimg.png",
      },
      {
        brand: "Organic soil",
        name: "Potting Soil Mix",
        quantity: "2kg",
        image: "assets/images/product-images/Acetamiprid/front2.png",
      },
    ],
  },

  {
    orderId: "ORD-456",
    date: "Wed, 10 Jan 2024",
    status: "In Transit",
    statusColor: "text-orange-500",
    refundDetailsLabel: "Track Order",
    amount: "₹1,250.00",
    products: [
      {
        brand: "white rice",
        name: "rajdhani rice",
        quantity: "1 pair",
        image: "assets/images/product-images/Acetamiprid/front2.png",
      },
    ],
  },

  {
    orderId: "ORD-789",
    date: "Wed, 20 june 2024",
    status: "Cancelled",
    statusColor: "text-[var(--color-error)]",
    refundDetailsLabel: "Track Order",
    amount: "₹1,250.00",
    products: [
      {
        brand: "white rice",
        name: "rajdhani rice",
        quantity: "1 pair",
  image: "assets/images/product-images/Deltamethrin/frontimg.png",
      },
    ],
  },
];

export default orders;
