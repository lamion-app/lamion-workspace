export const PlatformIcons: Record<string, string> = {
  android: "android",
  ios: "ios",
  backend: "host",
  web: "public",
};

export function computePlatformIcon(platform: string) {
  const keys = Object.keys(PlatformIcons);
  const index = keys.findIndex((x) =>
    platform.toLocaleLowerCase().includes(x.toLocaleLowerCase()),
  );

  if (index == -1) return "public";

  return PlatformIcons[keys[index]];
}
