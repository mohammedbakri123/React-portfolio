// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
// import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import Message from "./Message";
import useUrlPostion from "../hooks/useUrlPostion";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/citiesContext";
import { use } from "react";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emoji, setEmoji] = useState(""); 

  const { lat, lng } = useUrlPostion();

  const { CreateCity , isloading } = useCities();

  const navigator = useNavigate();
  
  useEffect(() => {
    if (!lat || !lng) return;
    setIsLoading(true);
    setErrorMessage("");

    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.countryCode) throw new Error("No country found for the given coordinates");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryCode);
        setEmoji(convertToEmoji(data.countryCode));
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();


    if (!cityName || !country || !date) {
      setErrorMessage("Please fill in all required fields.");
      return;
      
    }

    const newCity = {
      cityName,
      emoji,
      country,
      date: date.toISOString(),
      notes,
      position: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
    };

    
   await CreateCity(newCity);
    navigator("/app");

  }

  // const emoji = country ? convertToEmoji(country) : ""; 

  // const navigate = useNavigate();

  if (errorMessage) 
    return (<Message message={errorMessage} />);

  // show prompt when there's no coordinates
  if (!lat || !lng)
    return (<Message message="Start by clicking the map" />);

  if (isLoading) 
    return (<Spinner/>);

  return (

    <form className={`${styles.form} ${isloading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker id="date" selected={date} onChange={(date) => setDate(date)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={handleSubmit} type="primary">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
