import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../components/Table/Table.css";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

export const Users = () => {
  const [users, setUsers] = useState([]);
  // Placeholder for currentUser, replace it with your actual authentication logic
  const currentUser = { status: "Approved" };

  function createData(name, phone, birthdate, gender, id) {
    return { name, phone, birthdate, gender, id };
  }

  const makeStyle = (status) => {
    if (status === "Approved") {
      return {
        background: "rgb(145 254 159 / 47%)",
        color: "green",
      };
    } else if (status === "Pending") {
      return {
        background: "#ffadad8f",
        color: "red",
      };
    } else {
      return {
        background: "#59bfff",
        color: "white",
      };
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const db = getFirestore();
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);

      const userData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        userData.push(createData(data.name, data.phone, data.birthdate, data.gender, doc.id));
      });

      setUsers(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleBanClick = (id) => {
    try {
      // قم بتحديث حالة المستخدم بشكل محلي إلى "Banned"
      const updatedUsers = users.map(user =>
        user.id === id ? { ...user, status: "Banned" } : user
      );

      setUsers(updatedUsers);

      console.log("User banned successfully!");
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const handleLogin = () => {
    // Check if the user is banned before allowing login
    if (currentUser && currentUser.status === "Banned") {
      console.log("Login denied. User is banned.");
      // Implement your logic to handle denied login (redirect, show a message, etc.)
    } else {
      // Proceed with your login logic
      console.log("Login allowed. User is not banned.");
    }
  };

  return (
    <div className="MainDash" style={{ width: '95%', justifyContent: 'flex-start' }}>
      <div className="Table">
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "15px",
          }}
        >
          <h3>Users List</h3>
          <button onClick={handleLogin} style={{ border: 0, background: "red", padding: "15px" }}>
            Create User
          </button>
        </div>
        <TableContainer
          component={Paper}
          maxWidth={true}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Birthdate</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="left">{user.phone}</TableCell>
                  <TableCell align="left">{user.birthdate}</TableCell>
                  <TableCell align="left">{user.gender}</TableCell>
                  <TableCell align="left" className="Actions">
                    <button onClick={() => handleBanClick(user.id)}>Ban User</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};