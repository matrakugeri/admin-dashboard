import {
  getState,
  patchState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import { User } from '../../pages/admin-dashboard/models/user.model';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { UsersService } from './users.service';

export interface UserParams {
  limit: number;
  start: number;
  keyword: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: 'male' | 'female' | null;
  job: string | null;
  date: string | null;
  archived: boolean;
}

export interface UsersState {
  data: User[];
  total: number;
  loading: boolean;
  loaded: boolean;
  error: string | null;
  params: UserParams;
}

export interface UsersResponse {
  total: number;
  data: User[];
}

const initialState: UsersState = {
  data: [],
  total: 0,
  loading: false,
  loaded: false,
  error: null,
  params: {
    limit: 10,
    start: 0,
    keyword: null,
    firstName: null,
    lastName: null,
    gender: null,
    job: null,
    date: null,
    archived: false,
  },
};
export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, usersService = inject(UsersService)) => ({
    state: (): UsersState => {
      return getState(store);
    },
    load: rxMethod<Partial<UserParams>>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((params: Partial<UserParams>) => {
          const newParams = { ...getState(store).params, ...params };
          console.log(newParams);
          return usersService.getUsers(newParams).pipe(
            tap({
              next: (response) => {
                patchState(store, {
                  data: response.data,
                  total: response.total,
                  loaded: true,
                  loading: false,
                  error: null,
                  params: newParams,
                });
              },
            }),
            catchError((err) => {
              console.log(err);
              patchState(store, {
                error: err,
                loading: false,
                loaded: false,
              });
              return EMPTY;
            })
          );
        })
      )
    ),
  }))
);
