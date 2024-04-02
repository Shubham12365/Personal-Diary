import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteContainer from "../Components/NoteContainer/NoteContainer";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import terms from "./Login/terms";

import Navbar from "./Navbar/Navbar";

import "./Patient.css";

const App = (props) => {
	const [notes, setNotes] = useState(
		JSON.parse(localStorage.getItem("notes-app")) || []
	);

	const addNote = (color) => {
		const tempNotes = [...notes];

		tempNotes.push({
			id: Date.now() + "" + Math.floor(Math.random() * 78),
			text: "",
			time: Date.now(),
			color,
		});
		setNotes(tempNotes);
	};

	const deleteNote = (id) => {
		const tempNotes = [...notes];

		const index = tempNotes.findIndex((item) => item.id === id);
		if (index < 0) return;

		tempNotes.splice(index, 1);
		setNotes(tempNotes);
	};

	const updateText = (text, id) => {
		const tempNotes = [...notes];

		const index = tempNotes.findIndex((item) => item.id === id);
		if (index < 0) return;

		tempNotes[index].text = text;
		setNotes(tempNotes);
	};

	useEffect(() => {
		localStorage.setItem("notes-app", JSON.stringify(notes));
	}, [notes]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios({
					method: "post",
					url: "http://localhost:4000/api/notes",
					data: notes,
				});
				// Request succeeded, you can handle success here if needed
			} catch (error) {
				console.error("Error sending notes to server:", error);
				// Handle error
			}
		};

		fetchData();
	}, [notes]);

	return (
		<div className="App">
			<Sidebar addNote={addNote} />
			<NoteContainer
				notes={notes}
				deleteNote={deleteNote}
				updateText={updateText}
			/>
		</div>
	);
};

export default App;