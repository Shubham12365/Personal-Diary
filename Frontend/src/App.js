import React, { useReducer } from "react";

import LoginForm from "./Components/Login/LoginForm";
import Patient from "./Components/Patient";
import { Route, Routes, useNavigate } from "react-router-dom";
import logo from "./logo.svg";

import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import { useState } from "react";
import Complete from "./Components/Complete";

function App() {
	const navigate = useNavigate();
	const [css, setCss] = useState(false);
	const [adcss, setadCss] = useState(false);
	const [wtcss, setWtCss] = useState(false);
	const [use, setUse] = useState();
	const settle = (cust) => {
		setUse(cust);
		if (cust.role === 1) {
			setadCss(true);
		} else if (cust.role === 1) {
			setCss(true);
		} else {
			setWtCss(true);
		}
	};

	const x = () => {
		setCss(false);
		setadCss(false);
		setWtCss(false);
	};

	return (
		<div>
			<Routes>
				<Route path="/" element={<LoginForm fun={settle} />} />
				<Route
					path="/s8JcN7Q0kD3gT1fH4zYb/"
					element={<Complete data={{ adcss, x }} />}
				/>
			</Routes>
		</div>
	);
}

export default App;