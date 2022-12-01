import React, { useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, Input, Typography, Select, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";
const { Text } = Typography;

const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
	children.push(
		<Option key={i.toString(36) + i}>{"userAlertList_" + i}</Option>,
	);
	console.log("childrens are ----> ", children);
}

const openNotification = () => {
	notification.open({
		message: "Edit User Alert",
		description: "User Edited Successfully",
		icon: (
			<SmileOutlined
				style={{
					color: "#108ee9",
				}}
			/>
		),
	});
};

function EditUser(props) {
	let navigate = useNavigate();
	const idString = props.navLocation.search;
	const userId = idString.split("").slice(4).join("");

	const [userFirstName, setUserFirstName] = useState("");
	const [userLastName, setUserLastName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPhone, setUserPhone] = useState("");
	const [userSuperVisor, setUserSuperVisor] = useState("");
	const [userAlertList, setUserAlertList] = useState("");

	const getUser = async () => {
		await axios
			.get(`http://localhost:5000/user/getUser?id=${userId}`)
			.then((res) => {
				console.log(res);
				setUserFirstName(res.data.data.user_first_name);
				setUserLastName(res.data.data.user_last_name);
				setUserEmail(res.data.data.user_phone);
				setUserPhone(res.data.data.user_email);
				setUserSuperVisor(res.data.data.user_supervisor);
				setUserAlertList(res.data.data.user_alert_list);
			})
			.catch((err) => {
				console.log("There is an error ", err);
			});
	};
	useEffect(() => {
		getUser();
	}, []);
	console.log(userId);

	const handleFirstNameChange = (e) => {
		setUserFirstName(e.target.value);
	};
	const handleLastNameChange = (e) => {
		setUserLastName(e.target.value);
	};
	const handleEmailChange = (e) => {
		setUserEmail(e.target.value);
	};
	const handlePhoneChange = (e) => {
		setUserPhone(e.target.value);
	};
	const handleSuperVisorChange = (e) => {
		setUserSuperVisor(e.target.value);
	};

	const handleSelectChange = (value) => {
		console.log("Values are --->", value);
		setUserAlertList(value);
	};

	const handleEditUser = async () => {
		await axios
			.patch(`http://localhost:5000/user/editUser?id=${userId}`, {
				user_first_name: userFirstName,
				user_last_name: userLastName,
				user_email: userEmail,
				user_phone: userPhone,
				user_supervisor: userSuperVisor,
				user_alert_list: userAlertList,
				user_role_id: "6319b6c7a56234e2da27888b",
			})
			.then((res) => {
				console.log("The response is ---> ", res);
				// alert( "User Edited SuccessFully" );
				openNotification();
			})
			.catch((err) => {
				console.log("There is an error editing a user", err);
			});
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "1em",
				}}>
				<Text type="secondary" style={{ fontSize: "3em" }}>
					Edit User
				</Text>
				<Button onClick={()=>navigate('/userManagement')} style={{ border: "none" }}>Back to user management</Button>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}>
				<div
					style={{
						padding: "1em",
						border: "1px solid lightblue",
						margin: "5%",
						width: "50%",
					}}>
					<div>
						<label htmlFor="">
							First Name{" "}
							<Input
								placeholder="Basic usage"
								value={userFirstName}
								style={{ marginTop: "1%", marginBottom: "1%" }}
								onChange={handleFirstNameChange}
							/>
						</label>
						<label htmlFor="">
							Last Name{" "}
							<Input
								placeholder="Basic usage"
								value={userLastName}
								style={{ marginTop: "1%", marginBottom: "1%" }}
								onChange={handleLastNameChange}
							/>
						</label>
						<label htmlFor="">
							Email{" "}
							<Input
								placeholder="Basic usage"
								value={userEmail}
								style={{ marginTop: "1%", marginBottom: "1%" }}
								onChange={handleEmailChange}
							/>
						</label>
						<label htmlFor="">
							Phone{" "}
							<Input
								placeholder="Basic usage"
								value={userPhone}
								style={{ marginTop: "1%", marginBottom: "1%" }}
								onChange={handlePhoneChange}
							/>
						</label>
						<label htmlFor="">
							Supervisor{" "}
							<Input
								placeholder="Basic usage"
								value={userSuperVisor}
								style={{ marginTop: "1%", marginBottom: "1%" }}
								onChange={handleSuperVisorChange}
							/>
						</label>
						<label>
							Alert List
							<Select
								mode="multiple"
								allowClear
								style={{
									width: "100%",
								}}
								placeholder="Please select Alert"
								defaultValue={userAlertList}
								onChange={handleSelectChange}>
								{children}
							</Select>
						</label>
					</div>
					<div style={{ marginLeft: "48.5em", marginTop: "1em" }}>
						<Button onClick={handleEditUser}>Edit</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default EditUser;
