import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { fireDB } from "../../../app/config/firebase";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "../../../components/Table/Table.css";

const Playground = () => {
  const navigate = useNavigate();
  const [playgrounds, setPlaygrounds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const db = getFirestore();
      const playgroundsCollection = collection(db, "stadiums");
      const querySnapshot = await getDocs(playgroundsCollection);

      const playgroundsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Convert Firestore Timestamps to JavaScript Date objects if needed
        // Example: const opentime = data.opentime?.toDate();
        // Example: const closetime = data.closetime?.toDate();

        playgroundsData.push({
          id: doc.id,
          name: data.name,
          phone: data.phone,
          imageurl: data.imageUrl ? data.imageUrl[0] : "", // Assuming imageUrl is an array of URLs
          location: data.location,
          price: data.price,
          availabletimeslots: data.availableTimeSlots,
          closetime: data.closeTime,
          opentime: data.openTime,
          lockers: data.lockers,
          stadiumdetails: data.details,
        });
      });

      setPlaygrounds(playgroundsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAcceptClick = (row) => {
    console.log("Accept Event for:", row);
    // Perform accept action here
  };

  return (
    <div className="MainDash" style={{ width: "95%", justifyContent: "flex-start" }}>
      <div className="Table">
        <div className="row" style={{ display: "flex", justifyContent: "space-around", padding: "15px" }}>
          <h3>Playground List</h3>
          <button
            style={{ border: 0, background: "red", padding: "15px" }}
            onClick={() => {
              navigate("/dashboard/playground/create");
            }}
          >
            Create Playground
          </button>
          <button
            style={{ border: 0, background: "red", padding: "15px" }}
            onClick={() => {
              navigate("/dashboard/playground/creates");
            }}
          >
            Playground request
          </button>
        </div>
        <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Location</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Open Time</TableCell>
                <TableCell align="left">Close Time</TableCell>
                <TableCell align="left">Lockers</TableCell>
                <TableCell align="left">Stadium Details</TableCell>
                <TableCell align="left">Image-url</TableCell>
        
              </TableRow>
            </TableHead>
            <TableBody>
              {playgrounds.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.opentime}</TableCell>
                  <TableCell>{row.closetime}</TableCell>
                  <TableCell>{row.lockers}</TableCell>
                  <TableCell>{row.stadiumdetails}</TableCell>
                  <TableCell>
                    <img src={row.imageurl} alt={row.name} style={{ width: "100px", height: "auto" }} />
                  </TableCell>
                  <TableCell>
        
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

export default Playground;
