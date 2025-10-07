import React from "react";
import { UserProvider } from "./UserProvider";
// import { PlaceProvider } from "./PlaceProvider";
import { WishListProvider } from "./WishListProvider";
import { CartListProvider } from "./CartListProvider";
import { FarmerProvider } from "./FarmerProvider";
import { SupplierProvider } from "./SupplierProvider";
import AppQueryClientProvider from "./QueryClientProvider";

function AppProvider({ children }) {
  return (
    <AppQueryClientProvider>
      <UserProvider>
        <SupplierProvider>
          <FarmerProvider>
            {/* <PlaceProvider> */}
            <CartListProvider>
              <WishListProvider>{children}</WishListProvider>
            </CartListProvider>
            {/* </PlaceProvider> */}
          </FarmerProvider>
        </SupplierProvider>
      </UserProvider>
    </AppQueryClientProvider>
  );
}

export default AppProvider;
