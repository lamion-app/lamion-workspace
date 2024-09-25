export const useNavigation = () => {
  const navigationItems = Array<NavigationItem>(
    {
      name: "Dashboard",
      icon: String.fromCodePoint(0xf190),
      route: "index",
    },
    {
      name: "Users",
      icon: String.fromCodePoint(0xe87c),
      route: "users",
    },
    {
      name: "Functions",
      icon: String.fromCodePoint(0xf20e),
      route: "functions",
    },
    {
      name: "Analytics",
      icon: String.fromCodePoint(0xef3e),
      route: "analytics",
    },
    {
      name: "Payments",
      icon: String.fromCodePoint(0xe850),
      route: "payments",
    },
  );

  return {
    navigationItems,
  };
};