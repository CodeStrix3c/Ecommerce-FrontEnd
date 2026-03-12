// import React, { useEffect, useState, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import ContentWrapper from "@/components/shared/ContentWrapper";
// import { AddressModal } from "./components/addressModal";
// import { OrderSummary } from "./components/OrderSummary";
// import { Plus } from "lucide-react";

// import { useCountries } from "@/hooks/addresshooks/useCountry";
// import { useStates } from "@/hooks/addresshooks/useState";
// import { useDistricts } from "@/hooks/addresshooks/useDistricts";

// import {
//   useCheckoutShipping,
//   useAddShippingAddress,
//   useUpdateShippingPrices,
//   useGetShippingMethods,
// } from "@/hooks/addresshooks/useaddress";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { shippingAddressSchema } from "../farmer-registration/schemas/addressSchema";
// import { useCreateOrder } from "@/hooks/Orders/useOrders";
// import { usePaymentProviders } from "@/services/User/paymenthooks/getPaymentProviders";

// const AddressPage = () => {
//   const navigate = useNavigate();
//   const checkoutId = localStorage.getItem("checkoutId");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   const [updatedCheckoutData, setUpdatedCheckoutData] = useState(null);
//   const [selectedPayment, setSelectedPayment] = useState(null);

//   // store shipping method id
//   const [selectedShippingMethod, setSelectedShippingMethod] =
//     useState("FreeShip");

//   const hasCalculatedPricesRef = useRef(false);

//   const methods = useForm({
//     resolver: zodResolver(shippingAddressSchema),
//     mode: "onChange",
//   });

//   const { watch, reset } = methods;
//   const selectedCountry = watch("country");
//   const selectedState = watch("state");

//   const {
//     data: checkoutData,
//     isLoading: loadingCheckout,
//     refetch: refetchCheckout,
//   } = useCheckoutShipping(checkoutId);

//   const { data: shippingMethods = [] } = useGetShippingMethods();

//   const { data: paymentMethods = [] } = usePaymentProviders();

//   const { mutateAsync: createOrder, isPending: placingOrder } =
//     useCreateOrder();

//   const { data: countries = [] } = useCountries();
//   const { data: states = [] } = useStates(selectedCountry);
//   const { data: districts = [] } = useDistricts(selectedState);

//   const { mutateAsync: addShipping, isPending } = useAddShippingAddress();

//   const { mutateAsync: updatePrices, isPending: updatingPrices } =
//     useUpdateShippingPrices();

//   const handleAddressSelection = async (
//     userAddressId,
//     methodId = selectedShippingMethod,
//   ) => {
//     try {
//       setSelectedAddressId(userAddressId);

//       const payload = {
//         existingShippingAddressId: userAddressId,
//         selectedShippingMethodName: methodId, // API expects id
//       };

//       const result = await updatePrices({ checkoutId, payload });

//       setUpdatedCheckoutData(result);
//       hasCalculatedPricesRef.current = true;
//     } catch {
//       toast.error("Failed to update tax & shipping");
//     }
//   };

//   const handleShippingMethodChange = async (methodId) => {
//     setSelectedShippingMethod(methodId);

//     if (!selectedAddressId) return;

//     await handleAddressSelection(selectedAddressId, methodId);
//   };

//   useEffect(() => {
//     const addresses =
//       checkoutData?.existingShippingAddresses?.filter(
//         (a) => a.userAddressId !== 0,
//       ) || [];

//     if (
//       addresses.length > 0 &&
//       !selectedAddressId &&
//       !hasCalculatedPricesRef.current
//     ) {
//       handleAddressSelection(addresses[0].userAddressId);
//     }
//   }, [checkoutData]);

//   const onModalSubmit = async (formData) => {
//     try {
//       const shippingForm = {
//         contactName: formData.contactName,
//         phone: formData.phone,
//         addressLine1: formData.addressLine1,
//         addressLine2: formData.addressLine2 || "",
//         stateOrProvinceId: Number(formData.state),
//         districtId: Number(formData.district),
//         countryId: String(formData.country),
//         city: formData.city,
//         zipCode: formData.zipCode,
//         stateOrProvinces: [],
//         districts: [],
//         shipableContries: [],
//       };

//       const payload = {
//         existingShippingAddresses: [],
//         shippingAddressId: 0,
//         billingAddressId: 0,
//         shippingMethod: "",
//         newAddressForm: shippingForm,
//         useShippingAddressAsBillingAddress: true,
//         newBillingAddressForm: shippingForm,
//         orderNote: "",
//         checkoutId,
//       };

//       await addShipping({ checkoutId, payload });

//       const { data: freshCheckout } = await refetchCheckout();

//       const newAddresses =
//         freshCheckout?.existingShippingAddresses?.filter(
//           (a) => a.userAddressId !== 0,
//         ) || [];

//       if (newAddresses.length === 0) {
//         toast.error("Address created but not found in checkout");
//         return;
//       }

//       const newestAddress = newAddresses[newAddresses.length - 1].userAddressId;

//       await handleAddressSelection(newestAddress);

//       toast.success("Address added & tax calculated");

//       setIsModalOpen(false);
//       reset();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to save address");
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!selectedPayment) {
//       toast.error("Please select payment method");
//       return;
//     }

//     if (!selectedAddressId) {
//       toast.error("Please select address");
//       return;
//     }

//     try {
//       await createOrder({ checkoutId });

//       toast.success("Order placed successfully!");
//       navigate("/order");
//     } catch (err) {
//       const message =
//         err?.response?.data?.message ||
//         err?.response?.data ||
//         "Failed to place order";

//       toast.error(message);
//     }
//   };

//   if (loadingCheckout) {
//     return (
//       <ContentWrapper>
//         <div className="min-h-screen flex items-center justify-center">
//           Loading...
//         </div>
//       </ContentWrapper>
//     );
//   }

//   const existingAddresses =
//     checkoutData?.existingShippingAddresses?.filter(
//       (a) => a.userAddressId !== 0,
//     ) || [];

//   const newAddress = checkoutData?.newAddressForm;

//   const displayCheckoutData = updatedCheckoutData || checkoutData;

//   return (
//     <ContentWrapper>
//       <div className="min-h-screen py-8 lg:mt-28 sm:py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
//             <div className="lg:col-span-2">
//               <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
//                 <h2 className="text-lg font-semibold">Shipping Methods</h2>

//                 {shippingMethods
//                   ?.filter((m) => m.isEnabled)
//                   .map((method) => (
//                     <label
//                       key={method.id}
//                       className="flex items-center gap-3 cursor-pointer"
//                     >
//                       <input
//                         type="radio"
//                         name="shippingMethod"
//                         checked={selectedShippingMethod === method.id}
//                         onChange={() => handleShippingMethodChange(method.id)}
//                       />

//                       {method.name}
//                     </label>
//                   ))}

//                 {newAddress && (
//                   <>
//                     <h2 className="text-lg font-semibold">Shipping Address</h2>

//                     <div className="border rounded-xl p-4 bg-gray-50">
//                       <p className="font-semibold">{newAddress.contactName}</p>
//                       <p className="font-semibold">{newAddress.phone}</p>
//                       <p className="font-semibold">{newAddress.addressLine1}</p>
//                       <p className="font-semibold">{newAddress.addressLine2}</p>
//                       <p className="font-semibold">{newAddress.city}</p>
//                       <p className="font-semibold">{newAddress.zipCode}</p>
//                     </div>
//                   </>
//                 )}

//                 <h2 className="text-lg font-semibold">Existing Addresses</h2>

//                 {existingAddresses.map((address) => (
//                   <label
//                     key={address.userAddressId}
//                     className={`border rounded-xl p-4 flex gap-4 cursor-pointer ${
//                       selectedAddressId === address.userAddressId
//                         ? "border-black bg-gray-50"
//                         : "border-gray-200"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       checked={selectedAddressId === address.userAddressId}
//                       onChange={() =>
//                         handleAddressSelection(address.userAddressId)
//                       }
//                     />

//                     <div>
//                       <p className="font-semibold">{address.contactName}</p>
//                       <p>{address.addressLine1}</p>
//                     </div>
//                   </label>
//                 ))}

//                 <button
//                   onClick={() => setIsModalOpen(true)}
//                   className="flex items-center gap-2 text-black"
//                 >
//                   <Plus size={16} /> Add New Address
//                 </button>
//               </div>
//             </div>

//             <div className="lg:sticky lg:top-24 h-fit">
//               <OrderSummary
//                 checkoutData={displayCheckoutData}
//                 isUpdating={updatingPrices}
//                 paymentMethods={paymentMethods}
//                 selectedPayment={selectedPayment}
//                 setSelectedPayment={setSelectedPayment}
//                 onPlaceOrder={handlePlaceOrder}
//                 placingOrder={placingOrder}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <AddressModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           reset();
//         }}
//         methods={methods}
//         onSubmit={onModalSubmit}
//         countries={countries}
//         states={states}
//         districts={districts}
//         isSaving={isPending}
//       />
//     </ContentWrapper>
//   );
// };

// export default AddressPage;

// import React, { useEffect, useState, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import ContentWrapper from "@/components/shared/ContentWrapper";
// import { AddressModal } from "./components/addressModal";
// import { OrderSummary } from "./components/OrderSummary";
// import { Plus } from "lucide-react";

// import { useCountries } from "@/hooks/addresshooks/useCountry";
// import { useStates } from "@/hooks/addresshooks/useState";
// import { useDistricts } from "@/hooks/addresshooks/useDistricts";

// import {
//   useCheckoutShipping,
//   useAddShippingAddress,
//   useUpdateShippingPrices,
//   useGetShippingMethods,
// } from "@/hooks/addresshooks/useaddress";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { shippingAddressSchema } from "../farmer-registration/schemas/addressSchema";
// import { useCreateOrder } from "@/hooks/Orders/useOrders";
// import { usePaymentProviders } from "@/services/User/paymenthooks/getPaymentProviders";

// const AddressPage = () => {
//   const navigate = useNavigate();
//   const checkoutId = localStorage.getItem("checkoutId");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   const [updatedCheckoutData, setUpdatedCheckoutData] = useState(null);
//   const [selectedPayment, setSelectedPayment] = useState(null);

//   // store shipping method id
//   const [selectedShippingMethod, setSelectedShippingMethod] =
//     useState("FreeShip");

//   const hasCalculatedPricesRef = useRef(false);

//   const methods = useForm({
//     resolver: zodResolver(shippingAddressSchema),
//     mode: "onChange",
//   });

//   const { watch, reset } = methods;
//   const selectedCountry = watch("country");
//   const selectedState = watch("state");

//   const {
//     data: checkoutData,
//     isLoading: loadingCheckout,
//     refetch: refetchCheckout,
//   } = useCheckoutShipping(checkoutId);

//   const { data: shippingMethods = [] } = useGetShippingMethods();

//   const { data: paymentMethods = [] } = usePaymentProviders();

//   const { mutateAsync: createOrder, isPending: placingOrder } =
//     useCreateOrder();

//   const { data: countries = [] } = useCountries();
//   const { data: states = [] } = useStates(selectedCountry);
//   const { data: districts = [] } = useDistricts(selectedState);

//   const { mutateAsync: addShipping, isPending } = useAddShippingAddress();

//   const { mutateAsync: updatePrices, isPending: updatingPrices } =
//     useUpdateShippingPrices();

//   const handleAddressSelection = async (
//     userAddressId,
//     methodId = selectedShippingMethod,
//   ) => {
//     try {
//       setSelectedAddressId(userAddressId);

//       const payload = {
//         existingShippingAddressId: userAddressId,
//         selectedShippingMethodName: methodId, // API expects id
//       };

//       const result = await updatePrices({ checkoutId, payload });

//       setUpdatedCheckoutData(result);
//       hasCalculatedPricesRef.current = true;
//     } catch {
//       toast.error("Failed to update tax & shipping");
//     }
//   };

//   const handleShippingMethodChange = async (methodId) => {
//     setSelectedShippingMethod(methodId);

//     if (!selectedAddressId) return;

//     await handleAddressSelection(selectedAddressId, methodId);
//   };

//   useEffect(() => {
//     const addresses =
//       checkoutData?.existingShippingAddresses?.filter(
//         (a) => a.userAddressId !== 0,
//       ) || [];

//     if (
//       addresses.length > 0 &&
//       !selectedAddressId &&
//       !hasCalculatedPricesRef.current
//     ) {
//       handleAddressSelection(addresses[0].userAddressId);
//     }
//   }, [checkoutData]);

//   const onModalSubmit = async (formData) => {
//     try {
//       const shippingForm = {
//         contactName: formData.contactName,
//         phone: formData.phone,
//         addressLine1: formData.addressLine1,
//         addressLine2: formData.addressLine2 || "",
//         stateOrProvinceId: Number(formData.state),
//         districtId: Number(formData.district),
//         countryId: String(formData.country),
//         city: formData.city,
//         zipCode: formData.zipCode,
//         stateOrProvinces: [],
//         districts: [],
//         shipableContries: [],
//       };

//       const payload = {
//         existingShippingAddresses: [],
//         shippingAddressId: 0,
//         billingAddressId: 0,
//         shippingMethod: "",
//         newAddressForm: shippingForm,
//         useShippingAddressAsBillingAddress: true,
//         newBillingAddressForm: shippingForm,
//         orderNote: "",
//         checkoutId,
//       };

//       await addShipping({ checkoutId, payload });

//       const { data: freshCheckout } = await refetchCheckout();

//       const newAddresses =
//         freshCheckout?.existingShippingAddresses?.filter(
//           (a) => a.userAddressId !== 0,
//         ) || [];

//       if (newAddresses.length === 0) {
//         toast.error("Address created but not found in checkout");
//         return;
//       }

//       const newestAddress = newAddresses[newAddresses.length - 1].userAddressId;

//       await handleAddressSelection(newestAddress);

//       toast.success("Address added & tax calculated");

//       setIsModalOpen(false);
//       reset();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to save address");
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!selectedPayment) {
//       toast.error("Please select payment method");
//       return;
//     }

//     if (!selectedAddressId) {
//       toast.error("Please select address");
//       return;
//     }

//     try {
//       await createOrder({ checkoutId });

//       toast.success("Order placed successfully!");
//       navigate("/order");
//     } catch (err) {
//       const message =
//         err?.response?.data?.message ||
//         err?.response?.data ||
//         "Failed to place order";

//       toast.error(message);
//     }
//   };

//   if (loadingCheckout) {
//     return (
//       <ContentWrapper>
//         <div className="min-h-screen flex items-center justify-center">
//           Loading...
//         </div>
//       </ContentWrapper>
//     );
//   }

//   const existingAddresses =
//     checkoutData?.existingShippingAddresses?.filter(
//       (a) => a.userAddressId !== 0,
//     ) || [];

//   const newAddress = checkoutData?.newAddressForm;

//   const displayCheckoutData = updatedCheckoutData || checkoutData;

//   return (
//     <ContentWrapper>
//       <div className="min-h-screen py-8 lg:mt-28 sm:py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
//             <div className="lg:col-span-2">
//               <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
//                 <h2 className="text-lg font-semibold">Shipping Methods</h2>

//                 {shippingMethods
//                   ?.filter((m) => m.isEnabled)
//                   .map((method) => (
//                     <label
//                       key={method.id}
//                       className="flex items-center gap-3 cursor-pointer"
//                     >
//                       <input
//                         type="radio"
//                         name="shippingMethod"
//                         checked={selectedShippingMethod === method.id}
//                         onChange={() => handleShippingMethodChange(method.id)}
//                       />

//                       {method.name}
//                     </label>
//                   ))}

//                 {newAddress && (
//                   <>
//                     <h2 className="text-lg font-semibold">Shipping Address</h2>

//                     <div className="border rounded-xl p-4 bg-gray-50">
//                       <p className="font-semibold">{newAddress.contactName}</p>
//                       <p className="font-semibold">{newAddress.phone}</p>
//                       <p className="font-semibold">{newAddress.addressLine1}</p>
//                       <p className="font-semibold">{newAddress.addressLine2}</p>
//                       <p className="font-semibold">{newAddress.city}</p>
//                       <p className="font-semibold">{newAddress.zipCode}</p>
//                     </div>
//                   </>
//                 )}

//                 <h2 className="text-lg font-semibold">Existing Addresses</h2>

//                 {existingAddresses.map((address) => (
//                   <label
//                     key={address.userAddressId}
//                     className={`border rounded-xl p-4 flex gap-4 cursor-pointer ${
//                       selectedAddressId === address.userAddressId
//                         ? "border-black bg-gray-50"
//                         : "border-gray-200"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       checked={selectedAddressId === address.userAddressId}
//                       onChange={() =>
//                         handleAddressSelection(address.userAddressId)
//                       }
//                     />

//                     <div>
//                       <p className="font-semibold">{address.contactName}</p>
//                       <p>{address.addressLine1}</p>
//                     </div>
//                   </label>
//                 ))}

//                 <button
//                   onClick={() => setIsModalOpen(true)}
//                   className="flex items-center gap-2 text-black"
//                 >
//                   <Plus size={16} /> Add New Address
//                 </button>
//               </div>
//             </div>

//             <div className="lg:sticky lg:top-24 h-fit">
//               <OrderSummary
//                 checkoutData={displayCheckoutData}
//                 isUpdating={updatingPrices}
//                 paymentMethods={paymentMethods}
//                 selectedPayment={selectedPayment}
//                 setSelectedPayment={setSelectedPayment}
//                 onPlaceOrder={handlePlaceOrder}
//                 placingOrder={placingOrder}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <AddressModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           reset();
//         }}
//         methods={methods}
//         onSubmit={onModalSubmit}
//         countries={countries}
//         states={states}
//         districts={districts}
//         isSaving={isPending}
//       />
//     </ContentWrapper>
//   );
// };

// export default AddressPage;

// Fixing this issue

// import React, { useEffect, useState, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import ContentWrapper from "@/components/shared/ContentWrapper";
// import { AddressModal } from "./components/addressModal";
// import { OrderSummary } from "./components/OrderSummary";
// import { Plus } from "lucide-react";

// import { useCountries } from "@/hooks/addresshooks/useCountry";
// import { useStates } from "@/hooks/addresshooks/useState";
// import { useDistricts } from "@/hooks/addresshooks/useDistricts";

// import {
//   useCheckoutShipping,
//   useAddShippingAddress,
//   useUpdateShippingPrices,
// } from "@/hooks/addresshooks/useaddress";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { shippingAddressSchema } from "../farmer-registration/schemas/addressSchema";
// import { useCreateOrder } from "@/hooks/Orders/useOrders";
// import { usePaymentProviders } from "@/services/User/paymenthooks/getPaymentProviders";

// const AddressPage = () => {
//   const navigate = useNavigate();
//   const checkoutId = localStorage.getItem("checkoutId");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   const [updatedCheckoutData, setUpdatedCheckoutData] = useState(null);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [selectedShippingMethod, setSelectedShippingMethod] = useState("");

//   const hasCalculatedPricesRef = useRef(false);

//   const methods = useForm({
//     resolver: zodResolver(shippingAddressSchema),
//     mode: "onChange",
//   });

//   const { watch, reset } = methods;
//   const selectedCountry = watch("country");
//   const selectedState = watch("state");

//   const {
//     data: checkoutData,
//     isLoading: loadingCheckout,
//     refetch: refetchCheckout,
//   } = useCheckoutShipping(checkoutId);

//   const { data: paymentMethods = [] } = usePaymentProviders();
//   const { mutateAsync: createOrder, isPending: placingOrder } =
//     useCreateOrder();

//   const { data: countries = [] } = useCountries();
//   const { data: states = [] } = useStates(selectedCountry);
//   const { data: districts = [] } = useDistricts(selectedState);

//   const { mutateAsync: addShipping, isPending } = useAddShippingAddress();

//   const { mutateAsync: updatePrices, isPending: updatingPrices } =
//     useUpdateShippingPrices();

//   const rootData = updatedCheckoutData || checkoutData;
//   const shippingPrices = rootData?.shippingPrices || [];

//   const existingAddresses =
//     checkoutData?.existingShippingAddresses?.filter(
//       (a) => a.userAddressId !== 0,
//     ) || [];

//   /* ============================
//      CREATE FORM FROM ADDRESS
//   ============================ */

//   const mapAddressToForm = (address) => ({
//     contactName: address.contactName,
//     phone: address.phone,
//     addressLine1: address.addressLine1,
//     addressLine2: address.addressLine2 || "",
//     stateOrProvinceId: Number(address.stateOrProvinceId) || 0,
//     districtId: Number(address.districtId) || 0,
//     countryId: String(address.countryId || "IN"),
//     city: address.cityName,
//     zipCode: address.zipCode,
//     stateOrProvinces: [],
//     districts: [],
//     shipableContries: [],
//   });

//   /* ============================
//      GET SAFE SHIPPING METHOD
//   ============================ */

//   const getShippingMethod = () => {
//     return (
//       selectedShippingMethod ||
//       shippingPrices?.[0]?.name ||
//       updatedCheckoutData?.shippingPrices?.[0]?.name ||
//       checkoutData?.shippingPrices?.[0]?.name ||
//       "Free"
//     );
//   };

//   /* ============================
//      POST SHIPPING
//   ============================ */

//   const callPostShipping = async (addressId) => {
//     try {
//       const selectedAddress = existingAddresses.find(
//         (a) => a.userAddressId === addressId,
//       );

//       if (!selectedAddress) return;

//       const shippingForm = mapAddressToForm(selectedAddress);

//       const payload = {
//         existingShippingAddresses: [],
//         shippingAddressId: 0,
//         billingAddressId: 0,
//         shippingMethod: getShippingMethod(),
//         newAddressForm: shippingForm,
//         useShippingAddressAsBillingAddress: true,
//         newBillingAddressForm: shippingForm,
//         orderNote: "",
//         checkoutId,
//       };

//       await addShipping({ checkoutId, payload });
//     } catch (err) {
//       console.error("Shipping post failed", err);
//     }
//   };

//   /* ============================
//      ADDRESS SELECT
//   ============================ */

//   const handleAddressSelection = async (userAddressId) => {
//     try {
//       setSelectedAddressId(userAddressId);

//       const payload = {
//         existingShippingAddressId: userAddressId,
//         selectedShippingMethodName: getShippingMethod(),
//       };

//       const result = await updatePrices({ checkoutId, payload });

//       setUpdatedCheckoutData(result);
//       hasCalculatedPricesRef.current = true;

//       await callPostShipping(userAddressId);
//     } catch {
//       toast.error("Failed to update tax & shipping");
//     }
//   };

//   /* ============================
//      SHIPPING METHOD CHANGE
//   ============================ */

//   const handleShippingMethodChange = async (methodName) => {
//     setSelectedShippingMethod(methodName);

//     if (!selectedAddressId) return;

//     await handleAddressSelection(selectedAddressId);
//   };

//   /* ============================
//      INITIAL SHIPPING METHOD
//   ============================ */

//   useEffect(() => {
//     if (shippingPrices.length > 0 && !selectedShippingMethod) {
//       setSelectedShippingMethod(shippingPrices[0].name);
//     }
//   }, [shippingPrices, selectedShippingMethod]);

//   /* ============================
//      ADD NEW ADDRESS
//   ============================ */

//   const onModalSubmit = async (formData) => {
//     try {
//       const shippingForm = {
//         contactName: formData.contactName,
//         phone: formData.phone,
//         addressLine1: formData.addressLine1,
//         addressLine2: formData.addressLine2 || "",
//         stateOrProvinceId: Number(formData.state),
//         districtId: Number(formData.district),
//         countryId: String(formData.country),
//         city: formData.city,
//         zipCode: formData.zipCode,
//         stateOrProvinces: [],
//         districts: [],
//         shipableContries: [],
//       };

//       const payload = {
//         existingShippingAddresses: [],
//         shippingAddressId: 0,
//         billingAddressId: 0,
//         shippingMethod: getShippingMethod(),
//         newAddressForm: shippingForm,
//         useShippingAddressAsBillingAddress: true,
//         newBillingAddressForm: shippingForm,
//         orderNote: "",
//         checkoutId,
//       };

//       await addShipping({ checkoutId, payload });

//       const { data: freshCheckout } = await refetchCheckout();

//       const newAddresses =
//         freshCheckout?.existingShippingAddresses?.filter(
//           (a) => a.userAddressId !== 0,
//         ) || [];

//       const newestAddress = newAddresses[newAddresses.length - 1].userAddressId;

//       await handleAddressSelection(newestAddress);

//       toast.success("Address added & tax calculated");

//       setIsModalOpen(false);
//       reset();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to save address");
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!selectedPayment) {
//       toast.error("Please select payment method");
//       return;
//     }

//     if (!selectedAddressId) {
//       toast.error("Please select address");
//       return;
//     }

//     try {
//       await createOrder({ checkoutId });

//       toast.success("Order placed successfully!");
//       navigate("/order");
//     } catch (err) {
//       const message =
//         err?.response?.data?.message ||
//         err?.response?.data ||
//         "Failed to place order";

//       toast.error(message);
//     }
//   };

//   if (loadingCheckout) {
//     return (
//       <ContentWrapper>
//         <div className="min-h-screen flex items-center justify-center">
//           Loading...
//         </div>
//       </ContentWrapper>
//     );
//   }

//   return (
//     <ContentWrapper>
//       <div className="min-h-screen py-8 lg:mt-28 sm:py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
//             <div className="lg:col-span-2">
//               <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
//                 <h2 className="text-lg font-semibold">Shipping Methods</h2>

//                 {shippingPrices.map((method) => (
//                   <label
//                     key={method.name}
//                     className="flex items-center gap-3 cursor-pointer"
//                   >
//                     <input
//                       type="radio"
//                       checked={getShippingMethod() === method.name}
//                       onChange={() => handleShippingMethodChange(method.name)}
//                     />
//                     {method.name} ({method.priceText})
//                   </label>
//                 ))}

//                 <h2 className="text-lg font-semibold">Existing Addresses</h2>

//                 {existingAddresses.map((address) => (
//                   <label
//                     key={address.userAddressId}
//                     className={`border rounded-xl p-4 flex gap-4 cursor-pointer ${
//                       selectedAddressId === address.userAddressId
//                         ? "border-black bg-gray-50"
//                         : "border-gray-200"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       checked={selectedAddressId === address.userAddressId}
//                       onChange={() =>
//                         handleAddressSelection(address.userAddressId)
//                       }
//                     />

//                     <div>
//                       <p className="font-semibold">{address.contactName}</p>
//                       <p>{address.addressLine1}</p>
//                     </div>
//                   </label>
//                 ))}

//                 <button
//                   onClick={() => setIsModalOpen(true)}
//                   className="flex items-center gap-2 text-black"
//                 >
//                   <Plus size={16} /> Add New Address
//                 </button>
//               </div>
//             </div>

//             <div className="lg:sticky lg:top-24 h-fit">
//               <OrderSummary
//                 checkoutData={rootData}
//                 isUpdating={updatingPrices}
//                 paymentMethods={paymentMethods}
//                 selectedPayment={selectedPayment}
//                 setSelectedPayment={setSelectedPayment}
//                 onPlaceOrder={handlePlaceOrder}
//                 placingOrder={placingOrder}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <AddressModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           reset();
//         }}
//         methods={methods}
//         onSubmit={onModalSubmit}
//         countries={countries}
//         states={states}
//         districts={districts}
//         isSaving={isPending}
//       />
//     </ContentWrapper>
//   );
// };

// export default AddressPage;

// new issues

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { AddressModal } from "./components/addressModal";
import { OrderSummary } from "./components/OrderSummary";
import { Plus } from "lucide-react";

import { useCountries } from "@/hooks/addresshooks/useCountry";
import { useStates } from "@/hooks/addresshooks/useState";
import { useDistricts } from "@/hooks/addresshooks/useDistricts";

import {
  useCheckoutShipping,
  useAddShippingAddress,
  useUpdateShippingPrices,
  useAddAddress,
} from "@/hooks/addresshooks/useaddress";

import { zodResolver } from "@hookform/resolvers/zod";
import { shippingAddressSchema } from "../farmer-registration/schemas/addressSchema";
import { useCreateOrder } from "@/hooks/Orders/useOrders";
import { usePaymentProviders } from "@/services/User/paymenthooks/getPaymentProviders";

const AddressPage = () => {
  const navigate = useNavigate();
  const checkoutId = localStorage.getItem("checkoutId");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [updatedCheckoutData, setUpdatedCheckoutData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [addressList, setAddressList] = useState([]);

  const methods = useForm({
    resolver: zodResolver(shippingAddressSchema),
    mode: "onChange",
  });

  const { watch, reset } = methods;
  const selectedCountry = watch("country");
  const selectedState = watch("state");

  const {
    data: checkoutData,
    isLoading: loadingCheckout,
    refetch: refetchCheckout,
  } = useCheckoutShipping(checkoutId);

  const { data: paymentMethods = [] } = usePaymentProviders();
  const { mutateAsync: createOrder, isPending: placingOrder } =
    useCreateOrder();
  const { mutateAsync: createAddress } = useAddAddress();

  const { data: countries = [] } = useCountries();
  const { data: states = [] } = useStates(selectedCountry);
  const { data: districts = [] } = useDistricts(selectedState);

  const { mutateAsync: addShipping } = useAddShippingAddress();
  const { mutateAsync: updatePrices, isPending: updatingPrices } =
    useUpdateShippingPrices();

  const rootData = updatedCheckoutData || checkoutData;
  const shippingPrices = rootData?.shippingPrices || [];

  /* ---------------- INITIALIZE ADDRESS LIST ---------------- */

  useEffect(() => {
    if (checkoutData?.existingShippingAddresses) {
      const filtered =
        checkoutData.existingShippingAddresses.filter(
          (a) => a.userAddressId !== 0,
        ) || [];

      setAddressList(filtered);
    }
  }, [checkoutData]);

  /* ---------------- SHIPPING METHOD ---------------- */

  const getShippingMethod = () => {
    return (
      selectedShippingMethod ||
      shippingPrices?.[0]?.name ||
      checkoutData?.shippingPrices?.[0]?.name ||
      "Free"
    );
  };

  /* ---------------- POST SHIPPING ---------------- */

  const callPostShipping = async (addressId, isNew = false) => {
    try {
      const payload = {
        existingShippingAddresses: [],
        shippingAddressId: isNew ? 0 : addressId,
        billingAddressId: 0,
        shippingMethod: getShippingMethod(),
        newAddressForm: null,
        useShippingAddressAsBillingAddress: true,
        newBillingAddressForm: null,
        orderNote: "",
        checkoutId,
      };

      await addShipping({ checkoutId, payload });
    } catch (err) {
      console.error("Shipping post failed", err);
    }
  };

  /* ---------------- ADDRESS SELECT ---------------- */

  const handleAddressSelection = async (userAddressId) => {
    try {
      setSelectedAddressId(userAddressId);

      const payload = {
        existingShippingAddressId: userAddressId,
        // selectedShippingMethodName: getShippingMethod(),
      };

      const result = await updatePrices({ checkoutId, payload });

      setUpdatedCheckoutData(result);

      await callPostShipping(userAddressId, false);
    } catch {
      toast.error("Failed to update tax & shipping");
    }
  };

  /* ---------------- SHIPPING METHOD CHANGE ---------------- */

  const handleShippingMethodChange = async (methodName) => {
    setSelectedShippingMethod(methodName);

    if (!selectedAddressId) return;

    await handleAddressSelection(selectedAddressId);
  };

  /* ---------------- INITIAL METHOD ---------------- */

  useEffect(() => {
    if (shippingPrices.length > 0 && !selectedShippingMethod) {
      setSelectedShippingMethod(shippingPrices[0].name);
    }
  }, [shippingPrices]);

  /* ---------------- ADD NEW ADDRESS ---------------- */

  const onModalSubmit = async (formData) => {
    try {
      const payload = {
        contactName: formData.contactName,
        phone: formData.phone,
        addressLine1: formData.addressLine1,
        districtId: Number(formData.district),
        zipCode: formData.zipCode,
        stateOrProvinceId: Number(formData.state),
        cityName: formData.city,
        countryId: String(formData.country),
      };

      /* 1️⃣ CREATE ADDRESS */
      await createAddress(payload);

      /* 2️⃣ REFETCH CHECKOUT */
      const { data: freshCheckout } = await refetchCheckout();

      const newAddresses =
        freshCheckout?.existingShippingAddresses?.filter(
          (a) => a.userAddressId !== 0,
        ) || [];

      setAddressList(newAddresses);

      /* 3️⃣ GET NEW ADDRESS */
      const newestAddress = newAddresses[newAddresses.length - 1];

      if (newestAddress) {
        /* 4️⃣ SELECT ADDRESS (same logic as existing) */
        await handleAddressSelection(newestAddress.userAddressId);
      }

      toast.success("Address added successfully");

      setIsModalOpen(false);
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save address");
    }
  };

  /* ---------------- PLACE ORDER ---------------- */

  const handlePlaceOrder = async () => {
    if (!selectedPayment) {
      toast.error("Please select payment method");
      return;
    }

    if (!selectedAddressId) {
      toast.error("Please select address");
      return;
    }

    try {
      await createOrder({ checkoutId });

      toast.success("Order placed successfully!");
      navigate("/order");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Failed to place order";

      toast.error(message);
    }
  };

  if (loadingCheckout) {
    return (
      <ContentWrapper>
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper>
      <div className="min-h-screen py-8 lg:mt-28 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                <h2 className="text-lg font-semibold">Shipping Methods</h2>

                {shippingPrices.map((method) => (
                  <label key={method.name} className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={getShippingMethod() === method.name}
                      onChange={() => handleShippingMethodChange(method.name)}
                    />
                    {method.name} ({method.priceText})
                  </label>
                ))}

                <h2 className="text-lg font-semibold">Existing Addresses</h2>

                {addressList.map((address) => (
                  <label
                    key={address.userAddressId}
                    className={`border rounded-xl p-4 flex gap-4 ${
                      selectedAddressId === address.userAddressId
                        ? "border-black bg-gray-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedAddressId === address.userAddressId}
                      onChange={() =>
                        handleAddressSelection(address.userAddressId)
                      }
                    />

                    <div>
                      <p className="font-semibold">{address.contactName}</p>
                      <p className="font-semibold">{address.phone}</p>
                      <p>{address.addressLine1}</p>
                    </div>
                  </label>
                ))}

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 text-black"
                >
                  <Plus size={16} /> Add New Address
                </button>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 h-fit">
              <OrderSummary
                checkoutData={rootData}
                isUpdating={updatingPrices}
                paymentMethods={paymentMethods}
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                onPlaceOrder={handlePlaceOrder}
                placingOrder={placingOrder}
              />
            </div>
          </div>
        </div>
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          reset();
        }}
        methods={methods}
        onSubmit={onModalSubmit}
        countries={countries}
        states={states}
        districts={districts}
      />
    </ContentWrapper>
  );
};

export default AddressPage;
