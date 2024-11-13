export interface Project {
  readonly id: Id;
  readonly title: string;
  readonly description: string;
}

export enum SelectedProjectState {
  LOADING,
  ERROR,
  NOT_FOUND,
  READY,
}
