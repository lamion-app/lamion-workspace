export interface BaseSettingsItem {
  key: string;
  type: "text" | "image";
  title: string;
  subtitle: string;
}

export interface TextSettingsItem extends BaseSettingsItem {
  type: "text";
  value: string;
  onUpdate: (value: string, item: TextSettingsItem) => void;
}

export interface ImageSettingsItem extends BaseSettingsItem {
  type: "image";
  value?: string;
  label: string;
  onUpdate: (value: File, item: ImageSettingsItem) => void;
  onDelete: (item: ImageSettingsItem) => void;
}

export type SettingsItem = TextSettingsItem | ImageSettingsItem;
