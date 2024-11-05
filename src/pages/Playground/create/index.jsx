import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import RightShape from "../../../assets/rightShape.png";
import classes from "./playground.module.css";

const firebaseConfig = {
  apiKey: "AIzaSyCdPXhfGyTxUHiPQDc3_ToZ5vcKF3miNtc",
  authDomain: "wwew-fa4b6.firebaseapp.com",
  projectId: "wwew-fa4b6",
  storageBucket: "wwew-fa4b6.appspot.com",
  messagingSenderId: "66751097136",
  appId: "1:66751097136:web:2d89b8a4cfb72e60be40f5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export const CreatePlayground = () => {
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
    phoneNumber: "", // Added phoneNumber field
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setPlayGround({
        ...playGround,
        image: e.target.files[0],
      });
    } else {
      setPlayGround({
        ...playGround,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    if (!playGround.image) {
      alert("يرجى اختيار الصورة");
      return;
    }

    const imageRef = ref(storage, `images/${playGround.image.name}`);
    await uploadBytes(imageRef, playGround.image);
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(collection(db, "stadiums"), {
      name: playGround.name,
      price: playGround.price,
      governorate: playGround.governorate,
      city: playGround.city,
      street: playGround.street,
      description: playGround.description,
      location: playGround.location,
      sportType: playGround.sportType,
      imageUrl: imageUrl,
      phoneNumber: playGround.phoneNumber, // Added phoneNumber field
    });

    alert("تمت إضافة الملعب بنجاح!");
  };

  return (
    <div className={classes.container}>
      <div className={classes.pickImageBox}>
        {playGround.image ? (
          <label htmlFor="imageInput" className={classes.pickImageBoxLabel}>
            <input
              type="file"
              name="image"
              id="imageInput"
              className={classes.pickImageBoxInput}
              onChange={handleChange}
            />
            <img src={URL.createObjectURL(playGround.image)} className={classes.pickImageBoxImage} alt="صورة مختارة" />
          </label>
        ) : (
          <label htmlFor="imageInput" className={classes.pickImageBoxLabel}>
            <input
              type="file"
              name="image"
              id="imageInput"
              className={classes.pickImageBoxInput}
              onChange={handleChange}
            />
            <h1 className={classes.pickImageBoxH1}>اختر الصورة</h1>
          </label>
        )}
      </div>
      <div className={classes.form}>
        <div className={classes.row}>
          <div className={classes.inputBox}>
            <label htmlFor="name">الاسم</label>
            <input type="text" onChange={handleChange} name="name" />
          </div>
          <div className={classes.inputBox}>
            <label htmlFor="price">السعر</label>
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
            <label htmlFor="mapsLocation">رابط الموقع</label>
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
            <label htmlFor="sportType">نوع الرياضة</label>
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
            <label htmlFor="Description">الوصف</label>
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

        <div className={classes.row}>
          <div className={classes.inputBox}>
            <label htmlFor="phoneNumber">رقم الهاتف</label>
            <input
              type="text"
              placeholder="رقم الهاتف"
              onChange={handleChange}
              name="phoneNumber"
            />
          </div>
        </div>

        <div className={classes.actions}>
          <button onClick={handleSubmit}>إضافة</button>
          
        </div>

        <div className={classes.rightShape}>
          <img src={RightShape} alt="شكل ثابت يميني" />
        </div>
      </div>
    </div>
  );
};

export default CreatePlayground;