import React from 'react';
import { UserProvider } from './UserProvider';
import { PlaceProvider } from './PlaceProvider';
import { WishListProvider } from './WishListProvider';

function AppProvider({ children }) {
  return (
    <UserProvider>
      <PlaceProvider>
        <WishListProvider>{children}</WishListProvider>
      </PlaceProvider>
    </UserProvider>
  );
}

export default AppProvider;
