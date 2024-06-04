import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./UserAnalytics.css";

function UserAnalytics(props) {
    const { id } = useParams();
    const [emotions, setEmotions] = useState([]);

    useEffect(() => {
        // Fetch the user's emotion data from the backend
        fetch(`http://localhost:4000/api/user/${id}/emotions`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => setEmotions(data))
            .catch((error) => console.error("Error fetching emotions:", error));
    }, [id]);

    return (
        <>
            <Navbar d={props.data} />
            <h1>Analytics for User ID: {id}</h1>
            <div className="analytics-container">
                {/* Display the emotions data here */}
                <ul>
                    {emotions.map((emotion, index) => (
                        <li key={index}>
                            Date: {emotion.date}, Emotion: {emotion.emotion}, Text: {emotion.text}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default UserAnalytics;
