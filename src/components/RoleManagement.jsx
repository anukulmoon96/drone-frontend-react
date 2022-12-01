import React, { useEffect, useState } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import {
	Form,
	Space,
	Table,
	Tag,
	Typography,
	Button,
	Modal,
	Input,
	Select,
	notification
} from "antd";
import { SmileOutlined } from "@ant-design/icons";

const { Text } = Typography;

const data = [
	{
		key: "1",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		tags: ["nice", "developer"],
	},
	{
		key: "2",
		name: "Jim Green",
		age: 42,
		address: "London No. 1 Lake Park",
		tags: ["loser"],
	},
	{
		key: "3",
		name: "Joe Black",
		age: 32,
		address: "Sidney No. 1 Lake Park",
		tags: ["cool", "teacher"],
	},
];

const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
	children.push(
		<Option key={i.toString(36) + i}>{"userAlertList_" + i}</Option>,
	);
	console.log("childrens are ----> ", children);
}

function RoleManagement(props) {

	const [roleData, setRoleData] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [roleName, setroleName] = useState("");
	

	const openNotification = (msg) => {
		notification.open({
			message: "Add Role Alert",
			description: msg,
			icon: (
				<SmileOutlined
					style={{
						color: "#108ee9",
					}}
				/>
			),
		});
	};
	

	const fetchRole = async () => {
		const fetchedRoleData = await axios.get(
			"http://localhost:5000/role/getRoles",
			   {
				headers: {
					userid: '63313f58e56894788d6a63de' //the token is a variable which holds the token
				}
			   });
		console.log(fetchedRoleData.data.data);
		setRoleData(fetchedRoleData.data.data);
	};

	const deleteRole = async (record) => {
		console.log("Records are ----> ", record);
		await axios
			.delete(`http://localhost:5000/role/deleteRole?id=${record._id}`)
			.then((res) => {
				fetchRole();
			})
			.catch((err) => {
				console.log("Error in deleting the role ", err);
			});
	};
	const addRole = async () => {

		if(roleName == ''){
			openNotification('Role Name is required')
			return;
		}
		

		const addRoleData = await axios.post(
			"http://localhost:5000/role/createRole",
			{
				role_name: roleName,
			},
		);
		console.log(addRoleData);
	};

	useEffect(() => {
		fetchRole();
	}, [roleData.length]);
	console.log(roleData.length);

	const handleRoleNameChange = (e) => {
		setroleName(e.target.value);
	};

	

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		addRole()
			.then((res) => {
				fetchRole();
			})
			.catch((err) => {
				console.log("error in adding role", err);
			});

		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const columns = [
		{
			title: "Role Name",
			dataIndex: "role_name",
			key: "role_name",
			// render: (text) => <a>{text}</a>,
		},
		
		
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<a
						href={`editRole/?id=${record._id}`}
						onClick={(e) => {
							// editUser(record);
						}}>
						Edit
					</a>
					<a
						onClick={(e) => {
							deleteRole(record);
						}}>
						Delete
					</a>
				</Space>
			),
		},
	];

	return (
		<>
			<div style={{ padding: "2em" }}>
				<Text type="secondary" style={{ fontSize: "3em" }}>
					Role Management
				</Text>
			</div>
			<div
				style={{
					marginRight: "2em",
					display: "flex",
					justifyContent: "flex-end",
				}}>
				<div>
					<Button type="primary" onClick={showModal}>
						Add Role
					</Button>
				</div>
			</div>
			<div style={{ padding: "2em" }}>
				<Table columns={columns} dataSource={roleData} />
			</div>
			<div>
				<Modal
					title="Add Role"
					open={isModalOpen}
					onOk={handleOk}
					okText="Add"
					okType="submit"
					onCancel={handleCancel}>
					<form
						action="http://localhost:5000/role/createRole"
						method="post"
						onSubmit={handleOk}>
						<label>
							Role Name
			
							<Input
								placeholder="Warehouse Id"
								value={roleName}
								onChange={handleRoleNameChange}
							/>
					
						</label>
						
					</form>
				</Modal>
			</div>
		</>
	);
}

export default RoleManagement;
