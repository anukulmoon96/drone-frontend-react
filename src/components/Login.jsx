import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import "antd/dist/antd.css";
import {
	Space,
	Table,
	Tag,
	Typography,
	Button,
	Modal,
	Input,
	Select,
} from "antd";
const { Text } = Typography;

function Login(props) {
	console.log(props);
	//email admin@gmail.com
	//passwd admin@123
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleLogin = (e) => {
		if (email === "admin@gmail.com" && password === "admin@123") {
			navigate("/dronedashboard");
		}
	};

	return (
		<>
			<Header />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "50vh",
					marginBottom: "35vh",
				}}>
				<Text type="secondary" style={{ fontSize: "2em" }}>
					Let's Login
				</Text>
				<form
					// action="http://localhost:5000/user/createUser"
					method="post"
					// onSubmit={ handleOk }
					style={{
						border: "1px solid lightblue",
						padding: "2%",
						borderRadius: "4px",
					}}>
					<label>
						Email
						<Input
							placeholder="Enter Your Email"
							value={email}
							onChange={handleEmailChange}
						/>
					</label>
					<label style={{ marginTop: "2%" }}>
						Password
						<Input
							placeholder="Enter Your Password"
							value={password}
							onChange={handlePasswordChange}
						/>
					</label>
					<div style={{ marginTop: "1%" }}>
						<Button type="primary" onClick={handleLogin}>
							Login
						</Button>
					</div>
				</form>
			</div>
			<Footer />
		</>
	);
}

export default Login;
