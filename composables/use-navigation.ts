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
      name: "Features",
      icon: String.fromCodePoint(0xf20e),
      route: "features",
    },
    {
      name: "Activity report",
      icon: String.fromCodePoint(0xe1e6),
      route: "activity",
    },
  );

  return {
    navigationItems,
  };
};
