import React from "react";
import { useSearchParams } from "react-router-dom";

import SettingsSidebar from "./components/SettingsSidebar";
import PasswordSettings from "./components/PasswordSettings";
import AppearanceSettings from "./components/AppearanceSettings";
import ManageAddress from "./components/ManageAddress";
import MyReviews from "./components/MyReviews";
import MyOrder from "./components/MyOrder";
import HelpCenter from "./components/HelpCenter";

const SettingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const active = searchParams.get("tab") || "addresses";

  const setActive = (tab) => {
    setSearchParams({ tab });
  };

  const renderContent = () => {
    switch (active) {

           case "addresses":
        return <ManageAddress />;
      case "password":
        return <PasswordSettings />;
      case "appearance":
        return <AppearanceSettings />;
 
      case "reviews":
        return <MyReviews />;
      case "help-center":
        return <HelpCenter />;
      default:
        return <PasswordSettings />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-32 px-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="flex gap-6">
        <SettingsSidebar active={active} setActive={setActive} />
        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  );
};

export default SettingsPage;