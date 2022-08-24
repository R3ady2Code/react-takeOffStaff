import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { IUser } from '../types/users.types';

import Header from '../components/Logic/Header';
import { fetchUsers } from '../redux/users.slice';

import User from '../components/Logic/User/User';

const Users = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const { users, isLoading, error } = useAppSelector((state) => state.userReducer);

  const [searchValue, setSearchValue] = React.useState('');

  if (!JSON.parse(localStorage.getItem('login') || '{}').userLogin) return <Navigate to="/login" />;

  return (
    <>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="flex items-center justify-center h-screen">
        {error && <p className="text-red-600 font-bold text-3xl">ERROR!!!</p>}
        {isLoading && <p className="text-sky-600 font-bold text-3xl">Идет загрузка...</p>}
        {users && (
          <div className="grid grid-cols-5 gap-3 items-center">
            {users
              ?.filter((user) => user.name.toLowerCase().includes(searchValue))
              .map((user: IUser) => (
                <User key={user.id} {...user} />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Users;
