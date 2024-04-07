import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Admin.css";
function Admin(props) {
	const users = [
		{ id: 1, name: "Patient 1" },
		{ id: 2, name: "Patient 2" },
		// Add more users as needed
	];
	return (
		<>
			<Navbar d={props.data} />
			<h1>Choose a Patient:</h1>
			<div className="admin-container">
				<div className="admin-content">
					<ul className="user-list">
						{users.map((user) => (
							<li key={user.id}>
								<Link to={`/dashboard/${user.id}`} className="user-link">
									{user.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}

export default Admin;