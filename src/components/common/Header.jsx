'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

export default function Header({ user = null, cartItemCount = 0 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAccountMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActive = (path) => pathname === path;

  const navigationItems = [
    {
      label: 'Products',
      path: '/products',
      icon: 'ShoppingBagIcon',
      userTypes: ['all'],
    },
    {
      label: 'Mi Cuenta',
      path: user?.accountType === 'distributor' ? '/distributor-dashboard' : '/user-profile',
      icon: 'UserCircleIcon',
      userTypes: ['authenticated'],
      hasDropdown: true,
      dropdownItems: [
        {
          label: 'Perfil',
          path: '/user-profile',
          icon: 'UserIcon',
          userTypes: ['all'],
        },
        {
          label: 'Historial de Pedidos',
          path: '/order-history',
          icon: 'ClipboardDocumentListIcon',
          userTypes: ['all'],
        },
        {
          label: 'Panel de Distribuidor',
          path: '/distributor-dashboard',
          icon: 'ChartBarIcon',
          userTypes: ['distributor'],
        },
      ],
    },
    {
      label: 'Carrito',
      path: '/shopping-cart',
      icon: 'ShoppingCartIcon',
      userTypes: ['all'],
      badge: cartItemCount,
    },
  ];

  const filteredNavItems = navigationItems?.filter((item) => {
    if (item?.userTypes?.includes('all')) return true;
    if (item?.userTypes?.includes('authenticated') && user) return true;
    if (item?.userTypes?.includes('distributor') && user?.accountType === 'distributor') return true;
    return false;
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  return (
    <header className="sticky top-0 z-navigation bg-card border-b border-border shadow-elevation-1 transition-smooth">
      <div className="w-full px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center transition-smooth hover:opacity-80">
            <svg
              width="180"
              height="40"
              viewBox="0 0 180 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 lg:h-10 w-auto"
            >
              <rect x="2" y="2" width="36" height="36" rx="6" fill="var(--color-primary)" />
              <path
                d="M20 10L14 16L20 22M20 18L26 24L20 30"
                stroke="var(--color-primary-foreground)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="48"
                y="26"
                fontFamily="Inter Tight, sans-serif"
                fontSize="18"
                fontWeight="700"
                fill="var(--color-primary)"
              >
                ChemClean
              </text>
              <text
                x="48"
                y="34"
                fontFamily="Source Sans 3, sans-serif"
                fontSize="10"
                fontWeight="400"
                fill="var(--color-text-secondary)"
                letterSpacing="1"
              >
                COMMERCE
              </text>
            </svg>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {filteredNavItems?.map((item) => {
              if (item?.hasDropdown && user) {
                return (
                  <div key={item?.path} className="relative">
                    <button
                      onClick={toggleAccountMenu}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-smooth ${
                        isActive(item?.path) || pathname?.startsWith('/user-') || pathname === '/distributor-dashboard' || pathname === '/order-history'
                          ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={20} />
                      <span>{item?.label}</span>
                      <Icon
                        name="ChevronDownIcon"
                        size={16}
                        className={`transition-smooth ${isAccountMenuOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isAccountMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-dropdown"
                          onClick={() => setIsAccountMenuOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-3 z-dropdown overflow-hidden">
                          {item?.dropdownItems?.filter((dropdownItem) => {
                              if (dropdownItem?.userTypes?.includes('all')) return true;
                              if (dropdownItem?.userTypes?.includes('distributor') && user?.accountType === 'distributor') return true;
                              return false;
                            })?.map((dropdownItem) => (
                              <Link
                                key={dropdownItem?.path}
                                href={dropdownItem?.path}
                                className={`flex items-center space-x-3 px-4 py-3 transition-smooth ${
                                  isActive(dropdownItem?.path)
                                    ? 'bg-accent text-accent-foreground'
                                    : 'text-popover-foreground hover:bg-muted'
                                }`}
                              >
                                <Icon name={dropdownItem?.icon} size={20} />
                                <span className="text-sm font-medium">{dropdownItem?.label}</span>
                              </Link>
                            ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item?.path}
                  href={item?.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-smooth relative ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                  {item?.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {item?.badge > 9 ? '9+' : item?.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {!user ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-border">
                <Link
                  href="/login"
                  className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/user-registration"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97"
                >
                  Registrarse
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-border">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-sm font-semibold text-accent-foreground">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{user?.name}</span>
                    {user?.accountType === 'distributor' && (
                      <span className="text-xs text-muted-foreground font-caption">Distribuidor</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted transition-smooth"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-dropdown lg:hidden"
            onClick={toggleMobileMenu}
          />
          <div className="fixed top-16 right-0 bottom-0 w-80 bg-card border-l border-border shadow-elevation-4 z-dropdown lg:hidden overflow-y-auto">
            <nav className="flex flex-col p-4 space-y-2">
              {filteredNavItems?.map((item) => {
                if (item?.hasDropdown && user) {
                  return (
                    <div key={item?.path} className="space-y-1">
                      <div
                        className={`flex items-center justify-between px-4 py-3 rounded-md font-medium text-sm transition-smooth ${
                          isActive(item?.path) || pathname?.startsWith('/user-') || pathname === '/distributor-dashboard' || pathname === '/order-history'
                            ? 'bg-primary text-primary-foreground' :'text-foreground'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name={item?.icon} size={20} />
                          <span>{item?.label}</span>
                        </div>
                      </div>
                      <div className="ml-4 space-y-1">
                        {item?.dropdownItems?.filter((dropdownItem) => {
                            if (dropdownItem?.userTypes?.includes('all')) return true;
                            if (dropdownItem?.userTypes?.includes('distributor') && user?.accountType === 'distributor') return true;
                            return false;
                          })?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem?.path}
                              href={dropdownItem?.path}
                              className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm transition-smooth ${
                                isActive(dropdownItem?.path)
                                  ? 'bg-accent text-accent-foreground'
                                  : 'text-foreground hover:bg-muted'
                              }`}
                            >
                              <Icon name={dropdownItem?.icon} size={18} />
                              <span>{dropdownItem?.label}</span>
                            </Link>
                          ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item?.path}
                    href={item?.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-md font-medium text-sm transition-smooth ${
                      isActive(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={item?.icon} size={20} />
                      <span>{item?.label}</span>
                    </div>
                    {item?.badge > 0 && (
                      <span className="bg-error text-error-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {item?.badge > 9 ? '9+' : item?.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {!user && (
                <div className="pt-4 mt-4 border-t border-border space-y-2">
                  <Link
                    href="/login"
                    className="block w-full px-4 py-3 text-center text-sm font-medium text-foreground hover:bg-muted rounded-md transition-smooth"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    href="/user-registration"
                    className="block w-full px-4 py-3 text-center bg-primary text-primary-foreground rounded-md text-sm font-medium transition-smooth active:scale-97"
                  >
                    Registrarse
                  </Link>
                </div>
              )}

              {user && (
                <div className="pt-4 mt-4 border-t border-border">
                  <div className="flex items-center space-x-3 px-4 py-3">
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-base font-semibold text-accent-foreground">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{user?.name}</span>
                      {user?.accountType === 'distributor' && (
                        <span className="text-xs text-muted-foreground font-caption">Distribuidor</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}