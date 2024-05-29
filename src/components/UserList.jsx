// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import UserForm from './UserForm';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get('/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const addUser = (user) => {
    axios.post('/users', user)
      .then(response => {
        setUsers([...users, response.data]);
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  const updateUser = (user) => {
    axios.put(`/users/${user.id}`, user)
      .then(response => {
        setUsers(users.map(u => (u.id === user.id ? response.data : u)));
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  const deleteUser = (id) => {
    axios.delete(`/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className="user-list-container">
      <h1>User List</h1>
      <UserForm onSave={selectedUser ? updateUser : addUser} user={selectedUser} />
      <div className="user-grid">
        {users.map(user => (
          <div className="user-card" key={user.id}>
            <div className="user-info">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
            <div className="user-actions">
              <button onClick={() => setSelectedUser(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
