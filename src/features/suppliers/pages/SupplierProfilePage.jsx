import { useState } from "react";
import Tabs from "../components/Tabs";
import CompanyDetails from "../components/CompanyDetails";
import BusinessStats from "../components/BusinessStats";
import Documents from "../components/Documents";
import BankDetails from "../components/BankDetails";
import InfoCard from "../components/InfoCard";

export default function SupplierProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const supplier = {
    logo: "/assets/images/ziraat.jpeg",
    companyName: "ABC Traders Pvt Ltd",
    industry: "Textiles",
    established: "2012",
    registrationNo: "GSTIN123456789",
    contactPerson: "John Doe",
    email: "abc@traders.com",
    phone: "+91 98765 43210",
    website: "www.abctraders.com",
    address: "Srinagar, Jammu & Kashmir, India",
    status: "Active",
    products: 120,
    totalOrders: 340,
    pendingOrders: 12,
    completedOrders: 328,
    rating: 4.5,
    documents: [
      { name: "Business License", status: "Verified" },
      { name: "GST Certificate", status: "Pending" },
      { name: "PAN Card", status: "Verified" },
    ],
    bank: {
      bankName: "HDFC Bank",
      accountHolder: "ABC Traders Pvt Ltd",
      accountNumber: "XXXXXXXX1234",
      ifsc: "HDFC0001234",
    },
  };

  return (
    <div className="w-full px-4 sm:px-6 md:mt-28 lg:mt-32">
      <InfoCard supplier={supplier} />

      <div className="pt-10">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-2">
          {activeTab === "overview" && (
            <div className="space-y-6 mb-5">
              <CompanyDetails supplier={supplier} />
              <BusinessStats supplier={supplier} />
            </div>
          )}
          {activeTab === "documents" && <Documents supplier={supplier} />}
          {activeTab === "bank" && <BankDetails supplier={supplier} />}
        </div>
      </div>
    </div>
  );
}

