import { useState } from "react";
import RightShape from "../../../assets/rightShape.png"
import classes from  './playground.module.css';
export const CreatePlayground = ()=>{
    const [playGround, setPlayGround] = useState({
        image: null,
        name: "",
        price: 0,
        governorate: "",
        city: "",
        street: "",
        description: "",
        location: "",
        sportType: "",
      });
      const handleChange = (e) => {
        if (e.target.name == "image") {
          setPlayGround({
            ...playGround,
            image: URL.createObjectURL(e.target.files[0]),
          });
        } else {
          setPlayGround({
            ...playGround,
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
          {playGround.image ? (
            <>
              <label htmlFor="imageInput" className={classes.pickImageBoxLabel}>
                <input
                  type="file"
                  name="image"
                  id="imageInput"
                  className={classes.pickImageBoxInput}
                  onChange={handleChange}
                />

                <img src={playGround.image} className={classes.pickImageBoxImage} alt="choosed Image" />
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
                <input
                  type="number"
                  min="0"
                  onChange={handleChange}
                  name="price"
                />
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
                <label htmlFor="Description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  cols="50"
                  onChange={handleChange}
                  defaultValue=""
                />
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
    )
}