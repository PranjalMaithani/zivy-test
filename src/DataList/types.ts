export interface GithubUserData {
  login: string;
}

export type GithubUserListData = GithubUserData[];

export interface UseDataListT {
  list: string[];
  loading: boolean;
  infiniteScrollRef: (node?: Element | null | undefined) => void;
}
