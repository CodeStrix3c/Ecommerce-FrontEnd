// import { User, Phone, BadgeCheck, Info, Pencil, MapPin, Mail, Factory, Leaf } from "lucide-react";

// export default function InfoCard({ supplier }) {
//   return (

//     <div className="  mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">

//       <div className="flex items-center ">

//         <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3">
//           <img

//             src={supplier.logo}
//             alt="supplier Logo"
//             className="w-full h-full rounded-full border-2 border-gray-300 shadow-lg object-cover transition-transform hover:scale-105"
//           />

//           <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200 cursor-pointer  hover:text-white transition-colors">
//             <Pencil className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-secondary)] group-hover:text-white" />
//           </div>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-32 gap-y-6 px-5 bg-slate-300 justify-centre">
//           <div className="flex items-center gap-2">
//   <User className="w-5 h-5 text-[var(--color-secondary)]" />
//   <label htmlFor="name" className="text-gray-600 font-medium">Name:</label>
//   <input
//     type="text"
//     id="name"
//     name="name"
//     defaultValue={supplier.names}
//     placeholder="Enter name"
//     className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
//   />
// </div>

// <div className="flex items-center gap-2">
//   <Phone className="w-5 h-5 text-[var(--color-secondary)]" />
//   <label htmlFor="contact" className="text-gray-600 font-medium">Contact:</label>
//   <input
//     type="tel"
//     id="contact"
//     name="contact"
//     defaultValue={supplier.contactPerson}
//     placeholder="Enter contact number"
//     className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
//   />
// </div>

// <div className="flex items-center gap-2">
//   <Mail className="w-5 h-5 text-[var(--color-secondary)]" />
//   <label htmlFor="email" className="text-gray-600 font-medium">Email:</label>
//   <input
//     type="email"
//     id="email"
//     name="email"
//     defaultValue={supplier.email}
//     placeholder="Enter your email"
//     className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
//   />
// </div>

// <div className="flex items-center gap-2">
//   <MapPin className="w-5 h-5 text-[var(--color-secondary)]" />
//   <label htmlFor="location" className="text-gray-600 font-medium">Location:</label>
//   <input  
//     type="text"
//     id="location"
//     name="location"
//     defaultValue={supplier.address}
//     placeholder="Enter location"
//     className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
//   />
// </div>

// <div className="flex items-center gap-2">
//   <Factory className="w-5 h-5 text-[var(--color-secondary)]" />
//   <label htmlFor="company" className="text-gray-600 font-medium">Company:</label>
//   <input
//     type="text"
//     id="company"
//     name="company"
//     defaultValue={supplier.companyName}
//     placeholder="Enter company name"
//     className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
//   />
// </div>

// <div className="flex items-center gap-2">
//   <Leaf className="w-5 h-5 text-[var(--color-secondary)]" />
//   <label htmlFor="category" className="text-gray-600 font-medium">Category:</label>
//   <input
//     type="text"
//     id="category"
//     name="category"
//     defaultValue={supplier.category}
//     placeholder="Enter category"
//     className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
//   />
// </div>

//         </div>

//       </div>









//       {/* <div className="mt-4 sm:mt-0 relative group">
//         <span
//           className={`px-5 py-1.5 rounded-full text-sm font-semibold shadow-md flex items-center gap-2 cursor-pointer ${supplier.status === "Active"
//             ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
//             : "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
//             }`}
//         >
//           <BadgeCheck className="w-4 h-4" />
//           {supplier.status}
//           <Info className="w-4 h-4 opacity-70"/>
//         </span>


//         <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-[var(--color-secondary)] text-[var(--color-white)] text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
//           {supplier.status === "Active"
//             ? "Supplier is currently active"
//             : "Supplier is not active"}
//         </div>
//       </div> */}
//     </div>
//   );
// }

 import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Factory,
  Leaf,
  Pencil,
  Package,
} from "lucide-react";

export default function InfoCard({ supplier }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  return (
    
    <div className="bg-[var(--color-white)] p-6 sm:p-8 mt-6 w-full max-w-4xl mx-auto transition-transform hover:scale-[1.01]">
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
    
  
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
      <img
        src={supplier.logo}
        alt="Supplier Logo"
        className="w-full h-full rounded-full border-2 border-[var(--color-black)] shadow-md object-cover transition-transform hover:scale-105"
      />
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--color-white)] rounded-full flex items-center justify-center shadow-md border transition-transform hover:bg-[var(--color-secondary)] hover:scale-110"
      >
        <Pencil className="w-4 h-4 text-[var(--color-black)] transition-colors hover:text-white" />
      </button>
    </div>

    {/* Info Fields */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-5 w-full">
      <Field
        icon={<User className="w-5 h-5 text-[var(--color-secondary)]" />}
        label="Name"
        value={supplier.names}
      />
      <Field
        icon={<Phone className="w-5 h-5 text-[var(--color-secondary)]" />}
        label="Contact"
        value={supplier.contactPerson}
        link={`tel:${supplier.contactPerson}`}
      />
      <Field
        icon={<Mail className="w-5 h-5 text-[var(--color-secondary)]" />}
        label="Email"
        value={supplier.email}
        link={`mailto:${supplier.email}`}
      />
      <Field
        icon={<MapPin className="w-5 h-5 text-[var(--color-secondary)]" />}
        label="Location"
        value={supplier.address}
      />
      <Field
        icon={<Factory className="w-5 h-5 text-[var(--color-secondary)]" />}
        label="Company"
        value={supplier.companyName}
      />
      <Field
        icon={<Leaf className="w-5 h-5 text-[var(--color-secondary)]" />}
        label="Category"
        value={supplier.category}
      />
    </div>
  </div>
</div>

  );
}

function Field({ icon, label, value, link }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-gray-600 font-medium w-20">{label}:</span>
      {link ? (
        <a
          href={link}
          className="text-[var(--color-black)] hover:text-[var(--color-secondary)] transition"
        >
          {value}
        </a>
      ) : (
        <span className="text-[var(--color-black)]">{value}</span>
      )}
    </div>
  );
}
