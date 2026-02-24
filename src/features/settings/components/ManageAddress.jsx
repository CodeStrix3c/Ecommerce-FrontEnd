import React, { useState } from "react";

const ManageAddress = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Quarat ul Qadir",
      phone: "9876543210",
      address: "House 21, Main Road",
      city: "Srinagar",
      state: "Jammu & Kashmir",
      pincode: "190001",
      default: true,
    },
    {
      id: 2,
      name: "Quarat ul Qadir",
      phone: "9876543210",
      address: "Office Complex, Lal Chowk",
      city: "Srinagar",
      state: "Jammu & Kashmir",
      pincode: "190002",
      default: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = () => {
    const newEntry = {
      id: Date.now(),
      ...newAddress,
      default: false,
    };

    setAddresses([...addresses, newEntry]);

    setNewAddress({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

    setShowForm(false);
  };

  const removeAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const setDefault = (id) => {
    const updated = addresses.map((addr) => ({
      ...addr,
      default: addr.id === id,
    }));
    setAddresses(updated);
  };

  return (
    <div className="min-h-screen px-6 md:px-12 py-8 border border-[var(--color-gray)] rounded-lg ">
      <h2 className="text-2xl font-semibold mb-6 text-[var(--color-black)]">
        Your Addresses
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Add Address Card */}
        <div
          onClick={() => setShowForm(true)}
          className="border-2 border-dashed border-[var(--color-gray)] rounded-md bg-[var(--color-white)] flex items-center justify-center cursor-pointer hover:border-[var(--color-primary)] transition"
        >
          <div className="text-center py-10">
            <div className="text-3xl text-[var(--color-primary)]">+</div>
            <p className="text-sm text-[var(--color-black)] mt-2">
              Add Address
            </p>
          </div>
        </div>

        {/* Address Cards */}
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`relative bg-[var(--color-white)] rounded-md p-4 border shadow-sm ${
              addr.default
                ? "border-2 border-[var(--color-primary)]"
                : "border-[var(--color-gray)]"
            }`}
          >
            {addr.default && (
              <span className="absolute top-2 right-2 text-xs bg-[var(--color-primary)] text-white px-2 py-1 rounded">
                Default
              </span>
            )}

            <h4 className="font-semibold text-sm text-[var(--color-black)]">
              {addr.name}
            </h4>
            <p className="text-sm text-[var(--color-black)]">{addr.address}</p>
            <p className="text-sm text-[var(--color-black)]">
              {addr.city}, {addr.state} - {addr.pincode}
            </p>
            <p className="text-sm text-[var(--color-black)]">
              Phone: {addr.phone}
            </p>

            <div className="mt-3 space-x-3 text-sm">
              <button
                onClick={() => setDefault(addr.id)}
                className="text-[var(--color-primary)] hover:underline"
              >
                Set Default
              </button>
              <button
                onClick={() => removeAddress(addr.id)}
                className="text-[var(--color-error)] hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-[var(--color-overlay)] flex items-center justify-center z-50">
          <div className="bg-[var(--color-white)] w-full max-w-lg rounded-md p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-black)]">
              Add New Address
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" value={newAddress.name} onChange={handleChange} placeholder="Full Name" className="border border-[var(--color-gray)] p-2 rounded" />
              <input name="phone" value={newAddress.phone} onChange={handleChange} placeholder="Phone" className="border border-[var(--color-gray)] p-2 rounded" />
              <input name="address" value={newAddress.address} onChange={handleChange} placeholder="Address" className="border border-[var(--color-gray)] p-2 rounded md:col-span-2" />
              <input name="city" value={newAddress.city} onChange={handleChange} placeholder="City" className="border border-[var(--color-gray)] p-2 rounded" />
              <input name="state" value={newAddress.state} onChange={handleChange} placeholder="State" className="border border-[var(--color-gray)] p-2 rounded" />
              <input name="pincode" value={newAddress.pincode} onChange={handleChange} placeholder="Pincode" className="border border-[var(--color-gray)] p-2 rounded md:col-span-2" />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-[var(--color-gray)] rounded hover:bg-[var(--color-black-hover)]"
              >
                Cancel
              </button>
              <button
                onClick={saveAddress}
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-hover)]"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAddress;