 import axios from 'axios';
import React, { useEffect, useState } from 'react';
const AssignRole = () => {

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);  
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState('');
  

  useEffect(() => {
    axios.get('https://localhost:7252/api/Role/GetAllRole')
      .then((res) => {
        setRoles(res.data);
      });   
  }, []);
  useEffect(() => {
    axios.get('https://localhost:7252/api/User/GetAll')
      .then((res) => setUsers(res.data));
  }, []);

  const AssignRole = () => {
    if (!selectedUserId || !selectedRoleId) {
      alert('Please select both user and role.');
      return;
    }

    axios.post('https://localhost:7252/api/UserRole/AddUserRole', {
      userId: selectedUserId,
      roleId: selectedRoleId
    })
    .then(() => {
      alert('Role assigned successfully!');
      // 🔁 Clear selections after success
      setSelectedUserId('');
      setSelectedRoleId('');
    })
     
  };


  return (
    <div style={{maxWidth: '400px',margin: '40px auto',padding: '30px',backgroundColor: '#f2f5f9',borderRadius: '10px',boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',fontFamily: 'Arial, sans-serif'}}>
      <h3 style={{textAlign: 'center', marginBottom: '25px', color: '#333' }}>Assign Role</h3>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label htmlFor="email" style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Email</label>
          <select
            id="email"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="" disabled>Select Email</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="role" style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Role</label>
          <select
            id="role"
            value={selectedRoleId}
            onChange={(e) => setSelectedRoleId(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="" disabled>Select Role</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

        </div>
        <button type="button"  onClick={AssignRole} style={{ padding: '12px',backgroundColor: '#4CAF50', color: 'white',fontWeight: 'bold',border: 'none',borderRadius: '5px',cursor: 'pointer', transition: 'background 0.3s ease' }}>
          Assign Role
        </button>
      </form>
    </div>
  );
};

export default AssignRole;
