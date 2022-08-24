import React from 'react';

import { useActions } from '../../../redux/hooks';
import { IUser } from '../../../types/users.types';

import Button from '../../UI/Button';
import Modal from './Modal';

const User: React.FC<IUser> = (user) => {
  const [showModal, setShowModal] = React.useState(false);

  const { deleteUser } = useActions();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const removeUser = (e: Event, user: IUser) => {
    e.stopPropagation();
    console.log(111);
    deleteUser(user);
  };

  return (
    <>
      <div
        className="border rounded bg-slate-200 hover:bg-slate-300 transition-all shadow-sm flex items-center p-2 cursor-pointer"
        onClick={openModal}>
        <h3 className="m-[auto]">{user.name}</h3>
        <Button
          title="X"
          onClick={(e) => removeUser(e, user)}
          classes="bg-red-500 text-sm text-white px-2 ml-2"
        />
      </div>
      {showModal && <Modal user={user} closeModal={closeModal} creating={false} />}
    </>
  );
};

export default User;
