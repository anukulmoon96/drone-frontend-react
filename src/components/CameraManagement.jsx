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


function CameraManagement(props) {

	const [warehouseData,setWarehouseData] = useState([]);

	const [cameraData, setCameraData] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [cameraName, setcameraName] = useState("");
	const [cameraIp, setcameraIp] = useState("");
	const [cameraUsername, setcameraUsername] = useState("");
	const [cameraPassword, setcameraPassword] = useState("");
	const [cameraPort, setcameraPort] = useState("");
	const [cameraManufacturer, setcameraManufacturer] = useState("");
	const [warehouseId, setwarehouseId] = useState("");
	const [productCode, setproductCode] = useState("");
	
	const openNotification = (msg) => {
		notification.open({
			message: "Add Camera Alert",
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
	

	const fetchCamera = async () => {
		const fetchedCameraData = await axios.get(
			"http://localhost:5000/camera/getCameras",
			   {
				headers: {
					userid: '63313f58e56894788d6a63de' //the token is a variable which holds the token
				}
			   });
		console.log(fetchedCameraData.data.data);
		setCameraData(fetchedCameraData.data.data);
	};

	useEffect(() => {
   
	axios.get("http://localhost:5000/get_all_warehouses").then((data)=>{
			setWarehouseData(data.data.data);
		});

	},[]);


	const deleteCamera = async (record) => {
		console.log("Records are ----> ", record);
		await axios
			.delete(`http://localhost:5000/camera/deleteCamera?id=${record._id}`)
			.then((res) => {
				fetchCamera();
			})
			.catch((err) => {
				console.log("Error in deleting the camera ", err);
			});
	};
	const addCamera = async () => {

		if(cameraName == ''){
			openNotification('Camera name is required')
			return;
		}
		if(cameraIp == ''){
			openNotification('Camera ip is required')
			return;
		}
		
		console.log("Add Camera is called");

		const addcameraData = await axios.post(
			"http://localhost:5000/camera/createCamera",
			{
				camera_name: cameraName,
				camera_ip: cameraIp,
				camera_username: cameraUsername,
				camera_password: cameraPassword,
				camera_port: cameraPort,
				camera_manufacturer: cameraManufacturer,
				warehouse_id:warehouseId,
				product_code:productCode
			},
		);

		console.log('hj');
		console.log(addcameraData);
		console.log('jj');
	};

	useEffect(() => {
		fetchCamera();
	}, [cameraData.length]);
	console.log(cameraData.length);

	const handleCameraNameChange = (e) => {
		setcameraName(e.target.value);
	};
	const handleCameraIpChange = (e) => {
		setcameraIp(e.target.value);
	};
	const handleCameraUsernameChange = (e) => {
		setcameraUsername(e.target.value);
	};
	const handleCameraPasswordChange = (e) => {
		setcameraPassword(e.target.value);
	};
	const handleCameraPortChange = (e) => {
		setcameraPort(e.target.value);
	};

	const handleCameraManufacturerChange = (e) => {
		setcameraManufacturer(e.target.value);
	};

	const handleWarehouseIdChange = (e) => {
		console.log('tt');
		console.log(e.target.value);
		console.log('ti');
		setwarehouseId(e.target.value);
	};

	const handleProductCodeChange = (e) => {
		setproductCode(e.target.value);
	};
	

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		addCamera()
			.then((res) => {
				fetchCamera();
			})
			.catch((err) => {
				console.log("error in adding camera", err);
			});

		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const columns = [
		{
			title: "Camera Name",
			dataIndex: "camera_name",
			key: "camera_name",
			// render: (text) => <a>{text}</a>,
		},
		{
			title: "Camera Ip",
			dataIndex: "camera_ip",
			key: "camera_ip",
		},
		{
			title: "Camera Username",
			dataIndex: "camera_username",
			key: "camera_username",
		},
		{
			title: "Camera Password",
			dataIndex: "camera_password",
			key: "camera_password",
		},
		{
			title: "Camera Port",
			key: "camera_port",
			dataIndex: "camera_port",
			
		},
		{
			title: "Camera Manufacturer",
			key: "camera_manufacturer",
			dataIndex: "camera_manufacturer",
			
		},
		{
			title: "Warehouse Name",
			key: "warehouse_id",
			render: (item,record) =>  axios.get(`http://localhost:5000/get_warehouses_by_id?id=${record.warehouse_id}`).warehouse_name,
			
		},
		{
			title: "Product Code",
			key: "product_code",
			dataIndex:"product_code"
			
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<a
						href={`editCamera/?id=${record._id}`}
						onClick={(e) => {
							// editUser(record);
						}}>
						Edit
					</a>
					<a
						onClick={(e) => {
							deleteCamera(record);
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
					Camera Management
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
						Add Camera
					</Button>
				</div>
			</div>
			<div style={{ padding: "2em" }}>
				<Table columns={columns} dataSource={cameraData} />
			</div>
			<div>
				<Modal
					title="Add Camara"
					open={isModalOpen}
					onOk={handleOk}
					okText="Add"
					okType="submit"
					onCancel={handleCancel}>
					<form
						action="http://localhost:5000/camera/createCamera"
						method="post"
						onSubmit={handleOk}>
							
						<label>
							Camera Name
			
							<Input
								placeholder="Camera Name"
								value={cameraName}
								onChange={handleCameraNameChange}
							/>
					
						</label>
						<label>
						Camera Ip
							<Input
								placeholder="Camera Ip"
								value={cameraIp}
								onChange={handleCameraIpChange}
							/>
						</label>
						<label>
						Camera Username  
							<Input
								placeholder="Camera Username"
								value={cameraUsername}
								onChange={handleCameraUsernameChange}
							/>
						</label>
						<label>
						Camera Password
							<Input
								placeholder="Camera Password"
								value={cameraPassword}
								onChange={handleCameraPasswordChange}
							/>
						</label>
						<label>
						Camera Port
							<Input
								placeholder="Camera Port"
								value={cameraPort}
								onChange={handleCameraPortChange}
							/>
						</label>
						<label>
						Camera Manufacturer
							<Input
								placeholder="Camera Manufacturer"
								value={cameraManufacturer}
								onChange={handleCameraManufacturerChange}
							/>
						</label>
			
						<label>
				  Warehouse Name
				  <br/>
				    <select onChange={handleWarehouseIdChange} style={{width:"100%"}}>
					<option value disabled>Select Warehouse</option>
						{warehouseData && warehouseData.map((item)=>{
                         return <option value={item._id}>{item.warehouse_name}</option>;
						})}
                    </select>
						</label>
						<br/>
				<label>
				Product Code
							<Input
								placeholder="Product Code"
								value={productCode}
								onChange={handleProductCodeChange}
							/>
						</label>
					</form>
				</Modal>
			</div>
		</>
	);
}

export default CameraManagement;
