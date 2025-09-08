import React from "react";
import { UserProvider } from "./UserProvider";
import { PlaceProvider } from "./PlaceProvider";
import { WishListProvider } from "./WishListProvider";
import { CartListProvider } from "./CartListProvider";

function AppProvider({ children }) {
  return (
    <UserProvider>
      <PlaceProvider>
        <CartListProvider>
          <WishListProvider>{children}</WishListProvider>
        </CartListProvider>
      </PlaceProvider>
    </UserProvider>
  );
}

export default AppProvider;
