import React, { useState } from 'react';

function ServiceBooking() {
  const [services] = useState([
    { id: 1, name: 'Tractor Rental', category: 'Farm Machinery', description: 'Rent a tractor for your field work.', price: '₹1500/day' },
    { id: 2, name: 'Crop Advisory', category: 'Advisory Service', description: 'Get expert advice on pest control and crop management.', price: '₹500/session' },
    { id: 3, name: 'Seed Supply', category: 'Input Supply', description: 'Order high-quality seeds delivered to your farm.', price: '₹1200/order' },
    { id: 4, name: 'Storage Facility', category: 'Post-Harvest Service', description: 'Book warehouse space for crop storage.', price: '₹800/ton' },
    { id: 5, name: 'Agri Loan', category: 'Financial Service', description: 'Apply for short-term or long-term farming loans.', price: 'Custom' },
  ]);

  const [bookedServices, setBookedServices] = useState([]);

  const handleBooking = (service) => {
    if (!bookedServices.find((s) => s.id === service.id)) {
      setBookedServices([...bookedServices, service]);
      alert(`✅ "${service.name}" has been booked successfully!`);
    } else {
      alert(`⚠️ You already booked "${service.name}".`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold m-6 text-center text-[var(--color-black)]">Service Booking</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[var(--color-white)] border border-[var(--color-black)] p-4 rounded-2xl shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-bold text-[var(--color-black)]">{service.name}</h3>
            <p className="text-l text-[var(--color-black)] mb-1">{service.category}</p>
            <p className="text-[var(--color-black)] mb-2">{service.description}</p>
            <p className="text-[var(--color-primary)] font-semibold mb-3">Price: {service.price}</p>
            <button
              onClick={() => handleBooking(service)}
              className="bg-[var(--color-primary)] text-[var(--color-white)] px-4 py-2 rounded-lg">
              Book Service
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceBooking;
