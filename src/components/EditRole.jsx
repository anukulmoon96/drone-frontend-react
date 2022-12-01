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
		message: "Edit Role Alert",
		description: "Role Edited Successfully",
		icon: (
			<SmileOutlined
				style={{
					color: "#108ee9",
				}}
			/>
		),
	});
};

function EditRole(props) {
	let navigate = useNavigate();
	const idString = props.navLocation.search;
	const roleId = idString.split("").slice(4).join("");

	const [roleName, setRoleName] = useState("");

	const getRole = async () => {
		await axios
			.get(`http://localhost:5000/role/getRole?id=${roleId}`)
			.then((res) => {
				console.log(res);
				setRoleName(res.data.data.role_name);
			})
			.catch((err) => {
				console.log("There is an error ", err);
			});
	};
	useEffect(() => {
		getRole();
	}, []);
	console.log(roleId);

	const handleRoleNameChange = (e) => {
		setRoleName(e.target.value);
	};


	const handleEditRole = async () => {
		await axios
			.patch(`http://localhost:5000/role/editRole?id=${roleId}`, {
				role_name: roleName,
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
				<Button onClick={()=>navigate('/roleManagement')} style={{ border: "none" }}>Back to role management</Button>
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
							Role Name{" "}
							<Input
								placeholder="Basic usage"
								value={roleName}
								style={{ marginTop: "1%", marginBottom: "1%" }}
								onChange={handleRoleNameChange}
							/>
						</label>
						
						
					</div>
					<div style={{ marginLeft: "48.5em", marginTop: "1em" }}>
						<Button onClick={handleEditRole}>Edit</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default EditRole;
