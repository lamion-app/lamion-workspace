export const useNavigation = () => {
  const navigationItems = Array<NavigationItem>(
    {
      name: "Home",
      icon: "dashboard",
      route: "index",
    },
    {
      name: "Users",
      icon: "face",
      route: "users",
    },
    {
      name: "Events",
      icon: "app_registration",
      route: "events",
    },
    {
      name: "Analytics",
      icon: "analytics",
      route: "analytics",
    },
    {
      name: "Payments",
      icon: "account_balance_wallet",
      route: "payments",
    },
  );

  return {
    navigationItems,
  };
};
