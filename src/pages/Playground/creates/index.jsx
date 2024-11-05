import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { fireDB } from "../../../app/config/firebase";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../../components/Table/Table.css";
import { Loading } from "../../../components/Loading/Loading";

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

        playgroundsData.push({
          id: doc.id,
          name: data.name,
          phone: data.phone,
          imageurl: data.imageUrl ? data.imageUrl[0] : "", 
          location: data.location,
          price: data.price,
         
          stadiumdetails: data.stadiumDetails,
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
          <h3>Playground request</h3>
          
        </div>
        <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Location</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Stadium Details</TableCell>
                <TableCell align="left">Image-url </TableCell>
                <TableCell align="left">Accept stadium</TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {playgrounds.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.price}</TableCell>
                 
                  
                  <TableCell>{row.stadiumdetails}</TableCell>
                  <TableCell>
                    <img src={row.imageurl} alt={row.name} style={{ width: "100px", height: "auto" }} />
                  </TableCell>
                  <TableCell>
                    <button onClick={() => handleAcceptClick(row)}>Accept</button>
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
