import axios from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';

import { IUser } from '../types/users.types';

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.usersFetching());
    const { data } = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
    dispatch(userSlice.actions.usersFetchingSuccess(data));
  } catch (e: any) {
    dispatch(userSlice.actions.usersFetchingError(e.message));
  }
};

interface UsersState {
  users: IUser[];
  isLoading: boolean;
  error: string | null;
}

const initialState = {
  users: [],
  isLoading: false,
  error: null,
} as UsersState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true;
    },
    usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
      state.isLoading = false;
      state.users = action.payload;
      state.error = null;
    },
    usersFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addUser(state, action: PayloadAction<IUser>) {
      state.users.push(action.payload);
    },
    deleteUser(state, action: PayloadAction<IUser>) {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
    updateUser(state, action: PayloadAction<IUser>) {
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? { ...action.payload } : { ...user },
      );
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
