import React, { useState, useEffect } from 'react';
import { User, UserCreatedEvent, UserUpdatedEvent, UserDeletedEvent, UserSelectedEvent } from './types';
import { eventBus } from './eventBus';
import ErrorBoundary from './ErrorBoundary';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    // Initial mock data
    setUsers([
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ]);
  }, []);

  const handleCreateUser = () => {
    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
    };

    setUsers([...users, user]);
    setNewUser({ name: '', email: '' });

    // Emit user created event
    const event: UserCreatedEvent = {
      type: 'user.created',
      user,
    };
    eventBus.emit('user.created', event);
  };

  const handleUpdateUser = (user: User) => {
    const updatedUsers = users.map(u => u.id === user.id ? user : u);
    setUsers(updatedUsers);

    // Emit user updated event
    const event: UserUpdatedEvent = {
      type: 'user.updated',
      user,
    };
    eventBus.emit('user.updated', event);
  };

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    if (selectedUser?.id === userId) {
      setSelectedUser(null);
    }

    // Emit user deleted event
    const event: UserDeletedEvent = {
      type: 'user.deleted',
      userId,
    };
    eventBus.emit('user.deleted', event);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);

    // Emit user selected event
    const event: UserSelectedEvent = {
      type: 'user.selected',
      user,
    };
    eventBus.emit('user.selected', event);
  };

  return (
    <ErrorBoundary>
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}>
        <h2>User Management</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>Add New User</h3>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            style={{ marginRight: '10px' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            style={{ marginRight: '10px' }}
          />
          <button onClick={handleCreateUser}>Add User</button>
        </div>

        <div>
          <h3>User List</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {users.map(user => (
              <li key={user.id} style={{ padding: '10px', border: '1px solid #eee', marginBottom: '5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{user.name}</strong> - {user.email}
                  </div>
                  <div>
                    <button onClick={() => handleSelectUser(user)} style={{ marginRight: '5px' }}>
                      Select
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {selectedUser && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #007bff' }}>
            <h3>Edit User</h3>
            <input
              type="text"
              value={selectedUser.name}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              style={{ marginRight: '10px' }}
            />
            <input
              type="email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              style={{ marginRight: '10px' }}
            />
            <button onClick={() => handleUpdateUser(selectedUser)}>
              Update
            </button>
            <button onClick={() => setSelectedUser(null)} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default UserManagement;