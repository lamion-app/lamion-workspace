export type SettingsItemType = "text" | "image";
export type SettingsSectionType = "items" | "list";

export interface BaseSettingsItem {
  key: string;
  type: SettingsItemType;
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

export interface SettingsSection {
  type: SettingsSectionType;
  title: string;
}

export interface ItemsSection extends SettingsSection {
  type: "items";
  items: Array<SettingsItem>;
}

export interface ListSection extends SettingsSection {
  type: "list";
  key: string;
  items: Array<never>;
}
