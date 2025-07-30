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
  keyword: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  job: string;
  date: string;
  archived: boolean;
}
