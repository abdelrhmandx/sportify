import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";  // Add initializeApp import for Firebase initialization
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const firebaseConfig = {
  // Your Firebase configuration details here
  apiKey: "AIzaSyCdPXhfGyTxUHiPQDc3_ToZ5vcKF3miNtc",
  authDomain: "wwew-fa4b6.firebaseapp.com",
  projectId: "wwew-fa4b6",
  storageBucket: "wwew-fa4b6.appspot.com",
  messagingSenderId: "66751097136",
  appId: "1:66751097136:web:2d89b8a4cfb72e60be40f5"
};

const app = initializeApp(firebaseConfig); // Initialize Firebase app
const db = getFirestore(app); // Get Firestore instance from Firebase app

export const Swap = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productsCollection = collection(db, "products");
      const querySnapshot = await getDocs(productsCollection);

      const productsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        productsData.push({
          id: doc.id,
          name: data.name,
          phone: data.phone,
          imageUrls: data.imageUrls ? data.imageUrls[0] : "",
          address: data.address,
          description: data.description,
        });
      });

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const rows = products.map((product, index) => ({
    name: product.name,
    address: product.address,
    description: product.description,
    imageUrls: product.imageUrls,
    phone: product.phone,
  }));

  return (
    <div className="MainDash" style={{ width: '95%', justifyContent: 'flex-start' }}>
      <div className="Table">
        <div className="row" style={{ display: "flex", justifyContent: "space-around", padding: "15px" }}>
          <h3>Swap Request</h3>
        </div>
        <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">
                    <img src={row.imageUrls} alt={row.name} style={{ width: "100px", height: "auto" }} />
                  </TableCell>
                  <TableCell align="left">{row.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
