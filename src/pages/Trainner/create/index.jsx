import { useState } from "react";
import RightShape from "../../../assets/rightShape.png";
import classes from "./Trainner.module.css";
export const CreateTrainner = () => {
  const [trainner, setTrainner] = useState({
    image: null,
    name: "",
    date: null,
    governorate: "",
    city: "",
    street: "",
    description: "",
    location: "",
    sportType: "",
    file: null,
  });
  const handleChange = (e) => {
    if (e.target.name == "image") {
      setTrainner({
        ...trainner,
        image: URL.createObjectURL(e.target.files[0]),
      });
    } else if (e.target.name == "file") {
      setTrainner({
        ...trainner,
        file: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setTrainner({
        ...trainner,
        [e.target.name]: e.target.value,
      });
    }
  };
  const submit = () => {
    alert("form submitted");
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.pickImageBox}>
          {trainner.image ? (
            <>
              <label htmlFor="imageInput" className={classes.pickImageBoxLabel}>
                <input
                  type="file"
                  name="image"
                  id="imageInput"
                  className={classes.pickImageBoxInput}
                  onChange={handleChange}
                />

                <img
                  src={trainner.image}
                  className={classes.pickImageBoxImage}
                  alt="choosed Image"
                />
              </label>
            </>
          ) : (
            <>
              <label htmlFor="imageInput" className={classes.pickImageBoxLabel}>
                <input
                  type="file"
                  name="image"
                  id="imageInput"
                  className={classes.pickImageBoxInput}
                  onChange={handleChange}
                />
                <h1 className={classes.pickImageBoxH1}>Pick Image</h1>
              </label>
            </>
          )}
        </div>
        <div className={classes.form}>
          <div className={classes.row}>
            <div className={classes.inputBox}>
              <label htmlFor="name">name</label>
              <input type="text" onChange={handleChange} name="name" />
            </div>
            <div className={classes.inputBox}>
              <label htmlFor="price">price</label>
              <input type="date" onChange={handleChange} name="date" />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.inputBox}>
              <label htmlFor="locationGovernorate">Governorate</label>
              <select
                name="governorate"
                id="governorate"
                onChange={handleChange}
              >
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
              </select>
            </div>
            <div className={classes.inputBox}>
              <label htmlFor="locationCity">City</label>
              <select name="city" id="city" onChange={handleChange}>
                <option value="4"></option>
                <option value="5"></option>
                <option value="6"></option>
              </select>
            </div>
            <div className={classes.inputBox}>
              <label htmlFor="locationStreet">Street</label>
              <select name="street" id="street" onChange={handleChange}>
                <option value="7"></option>
                <option value="8"></option>
                <option value="9"></option>
              </select>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.inputBox}>
              <label htmlFor="mapsLocation">Location Link</label>
              <input
                type="text"
                placeholder="https://google.com"
                onChange={handleChange}
                name="location"
              />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.inputBox}>
              <label htmlFor="sportType">Sport Type</label>
              <input
                type="text"
                placeholder="...."
                onChange={handleChange}
                name="sportType"
              />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.inputBox}>
              <label htmlFor="UploadFile">Upload File</label>
              <input type="file" name="file" onChange={handleChange} />
            </div>
          </div>

          <div className={classes.actions}>
            <button onClick={submit}>Add</button>
            <button>Recent</button>
          </div>

          <div className={classes.rightShape}>
            <img src={RightShape} alt="right static shape" />
          </div>
        </div>
      </div>
    </>
  );
};
