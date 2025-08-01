export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string | null;
  job: string;
  date: string;
  archived: boolean;
}

export interface UserFilters {
  keyword: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  job: string | null;
  date: string | null;
  archived: boolean | null;
}
