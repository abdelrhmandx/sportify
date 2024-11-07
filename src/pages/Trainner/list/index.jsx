import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../../components/Table/Table.css";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";

export const Trainner = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

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

  const handleReject = async (id) => {
    try {
      // Logic to reject the trainer request (if needed)
      console.log(`Rejected trainer with ID: ${id}`);
    } catch (error) {
      console.error("Error rejecting trainer:", error);
    }
  };

  const handleAccept = async (id) => {
    try {
      console.log("Accepted trainer with ID:", id);
  
      if (!id) {
        console.error("Invalid trainer ID");
        return;
      }
  
       const db = getFirestore();
      const trainerRequestsCollection = collection(db, "trainer_requests");
      const trainerRef = doc(trainerRequestsCollection, id);
  
      // Get the trainer data
      const trainerSnapshot = await getDocs(trainerRequestsCollection);
  
      // Find the specific trainer document in the collection
      const trainerDoc = trainerSnapshot.docs.find(doc => doc.id === id);
  
      if (!trainerDoc || !trainerDoc.exists()) {
        console.error("Trainer not found with ID:", id);
        return;
      }
  
      const trainerData = trainerDoc.data();
  
      // Add the trainer to 'approved_trainers' collection
      const approvedTrainersCollection = collection(db, "approved_trainers");
      await addDoc(approvedTrainersCollection, {
        name: trainerData.name,
        age: trainerData.age,
        address: trainerData.address,
        experience: trainerData.experience,
        profileImage: trainerData.profileImage,
        facebook:trainerData.facebook,
        instagram:trainerData.instagram,
        twitter:trainerData.twitter,
        linkedin:trainerData.linkedin,
        Youtube:trainerData.youtube,
      });
  
      // Remove the trainer from 'trainer_requests'
      await deleteDoc(trainerRef);
  
      console.log(`Accepted trainer with ID: ${id}`);
  
      fetchData(); // Update the displayed data after accepting
    } catch (error) {
      console.error("Error accepting trainer:", error);
    }
  };

  const handleDetailsClick = async (trainer) => {
    setSelectedTrainer(trainer);

    try {
      // Assuming you have a separate API endpoint for fetching trainer details
      const response = await fetch(`your-api-endpoint/${trainer.id}`);
      const data = await response.json();

      // Update selectedTrainer with additional details
      setSelectedTrainer(prevState => ({
        ...prevState,
        address: data.address,
        age: data.age,
        certificatesImages: data.certificatesImages,
        experience: data.experience,
        facebook: data.facebook,
        instagram: data.instagram,
        linkedin: data.linkedin,
        name: data.name,
        number: data.number,
        pdf:data.pdf,
        profileImage: data.profileImage,
        sport: data.sport,
        youtube: data.youtube,
       
        twitter: data.twitter,
        
        
        
       


        
      }));
    } catch (error) {
      console.error("Error fetching trainer details:", error);
    }
  };

  const handleCloseDetails = () => {
    setSelectedTrainer(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const db = getFirestore();
      const trainerRequestsCollection = collection(db, "trainer_requests");
      const querySnapshot = await getDocs(trainerRequestsCollection);

      const newData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        newData.push(createData(data.name, data.address, data.age, data.sport,data.pdf, data.certificatesImages, data.experience, data.number,   data.linkedin, data.youtube, data.instagram, data.twitter, data.facebook, data.status, doc.id, data.certificatesImages, data.idImage, data.profileImage, ));
      });

      setRows(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createData = (name, address, age, sport, pdf, certificatesImages, experience,number,linkedin, youtube,instagram, twitter, facebook,  status, id,  idImage, profileImage, 	) => {
    return { name, address, age, sport, pdf, certificatesImages, experience,number, linkedin, youtube,instagram, twitter, facebook,  status, id,  idImage, profileImage,	 };
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
          <h3>Trainers request</h3>
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
                <TableCell>Address</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>sport</TableCell>
                
                <TableCell>number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Actions</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.age}</TableCell>
                  <TableCell align="left">{row.experience}</TableCell>
                  <TableCell align="left">{row.sport}</TableCell>
                  <TableCell align="left">{row.number}</TableCell>
                  
                  
                  <TableCell align="left">
                    <div style={makeStyle(row.status)}>{row.status}</div>
                  </TableCell>
                  <TableCell align="left" className="Details">
                    <button onClick={() => handleDetailsClick(row)}>Details</button>
                  </TableCell>
                  <TableCell align="left" className="Actions">
                    <button onClick={() => handleAccept(row.id)}>Accept</button>
                    <button onClick={() => handleReject(row.id)}>Reject</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Display details modal */}
      {selectedTrainer && (
        <div className="DetailsModal">
          <h3>Details for {selectedTrainer.name}</h3>
          <p>	Sport: {selectedTrainer.sport}</p>
          <p>	linkedin: {selectedTrainer.linkedin}</p>
          <p>	Youtube: {selectedTrainer.youtube}</p>
          <p>	instagram: {selectedTrainer.instagram}</p>
          <p>	Twitter: {selectedTrainer.twitter}</p>
          <p>	Facebook: {selectedTrainer.facebook}</p>
          <p>	pdf: {selectedTrainer.pdf}</p>
          
          <p>	certificatesImages: {selectedTrainer.certificatesImages}</p>
         

          <img src={selectedTrainer.profileImage} alt="Profile Image" style={{ maxWidth: '15%', height: 'auto' }} />
          {/* Loop through 'certificatesImages' array and display each image */}
          {selectedTrainer.certificatesImages && selectedTrainer.certificatesImages.map((certificate, index) => (
            <img key={index} src={certificate} alt={`Certificate ${index + 1}`} style={{ maxWidth: '15%', height: 'auto' }} />
          ))}
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}
    </div>
  );
};