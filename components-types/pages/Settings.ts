export interface SettingsFull {
  title: string;
  description?: string;
  tokens: Array<AccessKeyDto>;
}

export interface AccessKeyDto {
  id: number;
  title: string;
  created_at: string;
}
