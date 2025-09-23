import React from "react";
import { UserProvider } from "./UserProvider";
import { PlaceProvider } from "./PlaceProvider";
import { WishListProvider } from "./WishListProvider";
import { CartListProvider } from "./CartListProvider";
import { FarmerProvider } from "./FarmerProvider";

function AppProvider({ children }) {
  return (
    <UserProvider>
      <FarmerProvider>
        <PlaceProvider>
          <CartListProvider>
            <WishListProvider>{children}</WishListProvider>
          </CartListProvider>
        </PlaceProvider>
      </FarmerProvider>
    </UserProvider>
  );
}

export default AppProvider;
