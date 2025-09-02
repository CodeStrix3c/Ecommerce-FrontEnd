import { useState } from 'react';
import { Home, Leaf, SprayCan, FlaskRound, ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ isMobile }) => {
  const tabs = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
      activeColor: 'text-[var(--color-secondary)]',
    },
    {
      name: 'Pesticides',
      path: '/pesticides',
      icon: SprayCan,
      activeColor: 'text-[var(--color-secondary)]',
    },
    {
      name: 'Crops',
      path: '/crops',
      icon: Leaf,
      activeColor: 'text-[var(--color-secondary)]',
      badge: 'NEW',
    },
    {
      name: 'Fertilizers',
      path: '/fertilizers',
      icon: FlaskRound,
      activeColor: 'text-[var(--color-secondary)]',
    },
    {
      name: 'Cart',
      path: '/cart',
      icon: ShoppingCart,
      activeColor: 'text-[var(--color-secondary)]',
    },
  ];

  return (
    <nav
      className={`flex ${
        isMobile
          ? 'fixed bottom-0 z-10 w-full justify-around border-t bg-white py-2 shadow-md'
          : 'items-center gap-8 border-b bg-white px-4'
      }`}
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.name}
          to={tab.path}
          end={tab.path === '/'}
          className={({ isActive }) =>
            `relative flex ${
              !isMobile ? 'flex-row gap-2' : 'flex-col'
            } items-center ${
              isMobile ? 'text-xs' : 'px-3 py-2 text-sm'
            } font-medium transition-colors duration-300 ${
              isMobile
                ? isActive
                  ? 'text-black'
                  : 'text-gray-500 hover:text-black'
                : isActive
                  ? 'border-b-2 border-black text-black'
                  : 'border-b-2 border-transparent text-gray-700 hover:text-black'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {tab.badge && !isMobile && (
                <span className="absolute -top-3 rounded bg-indigo-900 px-2 text-[8px] font-bold text-white">
                  {tab.badge}
                </span>
              )}
              <tab.icon
                className={`${isMobile ? 'h-6 w-6' : 'h-6 w-6'} ${
                  isMobile
                    ? isActive
                      ? tab.activeColor
                      : 'text-gray-400'
                    : tab.activeColor
                }`}
              />
              <span>{tab.name}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
