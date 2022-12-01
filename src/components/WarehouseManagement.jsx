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

function WarehouseManagement(props) {

	const [warehouseData, setWarehouseData] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [warehouseId, setwarehouseId] = useState("");
	const [warehouseName, setwarehouseName] = useState("");
	const [warehouseState, setwarehouseState] = useState("");
	const [warehouseCity, setwarehouseCity] = useState("");
	const [warehousePincode, setwarehousePincode] = useState("");
	const [warehouseLocation, setwarehouseLocation] = useState("");

	const openNotification = (msg) => {
		notification.open({
			message: "Add Warehouse Alert",
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
	

	const fetchWarehouse = async () => {
		const fetchedWarehouseData = await axios.get(
			"http://localhost:5000/warehouse/getWarehouses",
			   {
				headers: {
					userid: '63313f58e56894788d6a63de' //the token is a variable which holds the token
				}
			   });
		console.log(fetchedWarehouseData.data.data);
		setWarehouseData(fetchedWarehouseData.data.data);
	};

	const deleteWarehouse = async (record) => {
		console.log("Records are ----> ", record);
		await axios
			.delete(`http://localhost:5000/warehouse/deleteWarehouse?id=${record._id}`)
			.then((res) => {
				fetchWarehouse();
			})
			.catch((err) => {
				console.log("Error in deleting the warehouse ", err);
			});
	};
	const addWarehouse = async () => {

		if(warehouseId == ''){
			openNotification('Warehouse Id is required')
			return;
		}
		if(warehouseName == ''){
			openNotification('Warehouse Name is required')
			return;
		}
		
		console.log("Add Warehouse is called");

		const addWarehouseData = await axios.post(
			"http://localhost:5000/warehouse/createWarehouse",
			{
				warehouse_id: warehouseId,
				warehouse_name: warehouseName,
				warehouse_state: warehouseState,
				warehouse_city: warehouseCity,
				warehouse_pincode: warehousePincode,
				warehouse_location: warehouseLocation,
			},
		);
		console.log(addWarehouseData);
	};

	useEffect(() => {
		fetchWarehouse();
	}, [warehouseData.length]);
	console.log(warehouseData.length);

	const handleWarehuuseIdChange = (e) => {
		setwarehouseId(e.target.value);
	};
	const handleWarehouseNameChange = (e) => {
		setwarehouseName(e.target.value);
	};
	const handleWarehouseStateChange = (e) => {
		setwarehouseState(e.target.value);
	};
	const handleWarehouseCityChange = (e) => {
		setwarehouseCity(e.target.value);
	};
	const handleWarehousePincodeChange = (e) => {
		setwarehousePincode(e.target.value);
	};

	const handleWarehouseLocationChange = (value) => {
		setwarehouseLocation(value);
	};
	

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		addWarehouse()
			.then((res) => {
				fetchWarehouse();
			})
			.catch((err) => {
				console.log("error in adding warehouse", err);
			});

		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const columns = [
		{
			title: "Warehouse Id",
			dataIndex: "warehouse_id",
			key: "warehouse_id",
			// render: (text) => <a>{text}</a>,
		},
		{
			title: "Warehouse Name",
			dataIndex: "warehouse_name",
			key: "warehouse_name",
		},
		{
			title: "Warehouse State",
			dataIndex: "warehouse_state",
			key: "warehouse_state",
		},
		{
			title: "Warehouse City",
			dataIndex: "warehouse_city",
			key: "warehouse_city",
		},
		{
			title: "Warehouse Pincode",
			key: "warehouse_pincode",
			dataIndex: "warehouse_pincode",
			
		},
		{
			title: "Warehouse Location",
			key: "warehouse_location",
			dataIndex: "warehouse_location",
			
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<a
						href={`editWarehouse/?id=${record._id}`}
						onClick={(e) => {
							// editUser(record);
						}}>
						Edit
					</a>
					<a
						onClick={(e) => {
							deleteWarehouse(record);
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
					Warehouse Management
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
						Add Warehouse
					</Button>
				</div>
			</div>
			<div style={{ padding: "2em" }}>
				<Table columns={columns} dataSource={warehouseData} />
			</div>
			<div>
				<Modal
					title="Add Warehouse"
					open={isModalOpen}
					onOk={handleOk}
					okText="Add"
					okType="submit"
					onCancel={handleCancel}>
					<form
						action="http://localhost:5000/warehouse/createWarehouse"
						method="post"
						onSubmit={handleOk}>
						<label>
							Warehouse Id
			
							<Input
								placeholder="Warehouse Id"
								value={warehouseId}
								onChange={handleWarehuuseIdChange}
							/>
					
						</label>
						<label>
						Warehouse Name
							<Input
								placeholder="Warehouse Name"
								value={warehouseName}
								onChange={handleWarehouseNameChange}
							/>
						</label>
						<label>
							Warehouse State
							<Input
								placeholder="Warehouse State"
								value={warehouseState}
								onChange={handleWarehouseStateChange}
							/>
						</label>
						<label>
						Warehouse City
							<Input
								placeholder="Warehouse City"
								value={warehouseCity}
								onChange={handleWarehouseCityChange}
							/>
						</label>
						<label>
						Warehouse Pincode
							<Input
								placeholder="Warehouse Pincode"
								value={warehousePincode}
								onChange={handleWarehousePincodeChange}
							/>
						</label>
						<label>
						Warehouse Loaction
							<Input
								placeholder="Warehouse Pincode"
								value={warehouseLocation}
								onChange={handleWarehouseLocationChange}
							/>
						</label>
					</form>
				</Modal>
			</div>
		</>
	);
}

export default WarehouseManagement;
