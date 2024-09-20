export interface AuthProvider<T> {
  name: string;
  displayedName: string;
  isSupportOauth: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invoke: (...data: any[]) => Promise<void>;
  collectOauthParams?: (query: typeof LocationQuery) => T | null;
  handleOauthResult?: (data: T) => Promise<void>;
}
