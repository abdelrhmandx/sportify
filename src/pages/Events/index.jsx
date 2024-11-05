import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

export const Events = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleDetailsClick = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAcceptClick = async (selectedEvent) => {
    try {
      if (!selectedEvent) {
        console.error("No event selected");
        return;
      }

      const db = getFirestore();
      const newEventsCollection = collection(db, "accepted_events");

      // Ensure all required fields are defined, set default values if necessary
      const { date = "", ...eventData } = selectedEvent;
      const status = "accepted";

      // Add selected event to the new collection
      await addDoc(newEventsCollection, { ...eventData, date, status });

      // Delete selected event from the original collection
      await deleteDoc(doc(db, "events", selectedEvent.id));

      // Close the modal
      setOpenModal(false);

      // Optionally, you can update the UI without refetching data
      setRows(rows.filter(event => event.id !== selectedEvent.id));
    } catch (error) {
      console.error("Error accepting event:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const db = getFirestore();
      const eventsCollection = collection(db, "events");
      const querySnapshot = await getDocs(eventsCollection);
  
      const newData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        newData.push({
          id: doc.id,
          name: data.eventName,
          phoneNumber: data.phoneNumber,
          insurance: data.insurance !== undefined ? (data.insurance ? "available" : "unavailable") : "unavailable",
          haveBike: data.haveBike !== undefined ? (data.haveBike ? "available" : "unavailable") : "unavailable",
          fee: data.fee !== undefined ? (data.fee ? "available" : "unavailable") : "unavailable",
          eventType: data.eventType,
      
          distance: data.distance,
          description: data.description,
          ageRangeFrom: data.ageRangeFrom,
          ageRangeTo: data.ageRangeTo,
          status: data.status,
          images: data.images,
        });
      });
  
      setRows(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
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
          <h3>Events Request</h3>
        </div>
        <TableContainer
          component={Paper}
          maxWidth={true}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Event Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Insurance</TableCell>
                <TableCell>Have Bike</TableCell>
                <TableCell>Fee</TableCell>
                <TableCell>Event Type</TableCell>
                <TableCell>Age Range From</TableCell>
                <TableCell> Age Range To</TableCell>
                
             
                <TableCell>View Images</TableCell>
                <TableCell>Accept Event</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.phoneNumber}</TableCell>
                  <TableCell align="left">{row.insurance}</TableCell>
                  <TableCell align="left">{row.haveBike}</TableCell>
                  <TableCell align="left">{row.fee}</TableCell>
                  <TableCell align="left">{row.eventType}</TableCell>
                  <TableCell align="left">{row.ageRangeFrom}</TableCell>
                  <TableCell align="left">{row.ageRangeTo}</TableCell>
                  
               
                  <TableCell align="left" className="ViewImages">
                    <Button onClick={() => handleDetailsClick(row)}>View Images</Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button onClick={() => handleAcceptClick(row)}>Accept</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <div className="ImagesModal" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
          <h3 id="image-modal-title">Images for {selectedEvent && selectedEvent.name}</h3>
          {selectedEvent && selectedEvent.images && selectedEvent.images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} style={{ maxWidth: '300px', marginBottom: '10px' }} />
          ))}
          <Button onClick={handleCloseModal}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};
