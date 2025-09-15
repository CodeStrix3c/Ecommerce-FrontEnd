export default function FarmLocation({ farmer }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Farm Location</h3>
      <p className="mb-4">{farmer.location}</p>
      <iframe
        title="Farm Location"
        className="w-full h-64 rounded-xl shadow-md"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.212933158934!2d75.85772511504253!3d26.8466933831588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db41f3c3b6f45%3A0x5e26dc8d8fba0e6d!2sAgriculture%20Farm!5e0!3m2!1sen!2sin!4v1635596612935!5m2!1sen!2sin"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}
