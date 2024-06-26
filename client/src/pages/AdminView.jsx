import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';

const AdminView = () => {
  const [userData , setUserData] = useState([])
  useEffect(() => {
    const AllUsers = async () => {
      let local = JSON.parse(localStorage.getItem('auth'));
      let token = local?.token;
      try {
        let response = await fetch(
          "http://localhost:8000/api/users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let data = await response.json();
        setUserData(data.data)
      } catch (err) {
        console.error("Token validation error:", err);
      }
    }
    AllUsers();
  }, []);

  const deleteUser = async(id) => {
    let local = JSON.parse(localStorage.getItem('auth'));
    let token = local?.token;
    try {
      let response = await fetch(
        `http://localhost:8000/api/deleteUser?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let data = await response.json();
      // setUserData(data.data)
    } catch (err) {
      console.error("Token validation error:", err);
    }
  }

  return (
    <div className='container mt-5'>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr className='text-center'>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            userData.map((val,i) => {
              return (
                <tr key={val._id} className='text-capitalize text-center'>
                  <td>{i+1}</td>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.phone}</td>
                  <td>{val.city}</td>
                  <td>{val.role}</td>
                  <td>
                    <button className='btn btn-danger' onClick={() => deleteUser(val._id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default AdminView