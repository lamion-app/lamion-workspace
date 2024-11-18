export interface ProfileFull {
  account: AccountDetailed;
}

export interface AccountDetailed {
  id: Id;
  username: string;
  email: string;
  avatar: string | undefined;
}
