export interface BaseSettingsItem {
  key: string;
  type: "text" | "image";
  title: string;
  subtitle: string;
}

export interface TextSettingsItem extends BaseSettingsItem {
  type: "text";
  value: string;
}

export interface ImageSettingsItem extends BaseSettingsItem {
  type: "image";
  value?: string;
  label: string;
}

export type SettingsItem = TextSettingsItem | ImageSettingsItem;
