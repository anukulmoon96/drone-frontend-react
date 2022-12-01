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
		message: "Edit Camera Alert",
		description: "Camera Edited Successfully",
		icon: (
			<SmileOutlined
				style={{
					color: "#108ee9",
				}}
			/>
		),
	});
};

function EditCamera(props) {
	let navigate = useNavigate();
	const idString = props.navLocation.search;
	const cameraId = idString.split("").slice(4).join("");
	const [warehouseData,setWarehouseData] = useState([]);

	const [cameraName, setCameraName] = useState("");
	const [cameraIp, setcameraIp] = useState("");
	const [cameraUsername, setcameraUsername] = useState("");
	const [cameraPassword, setcameraPassword] = useState("");
	const [cameraPort, setcameraPort] = useState("");
	const [cameraManufacturer, setcameraManufacturer] = useState("");
	const [warehouseId, setwarehouseId] = useState("");
	const [productCode, setproductCode] = useState("");

	useEffect(() => {
   
		axios.get("http://localhost:5000/get_all_warehouses").then((data)=>{
				setWarehouseData(data.data.data);
			});
	
		},[]);

	const getCamera = async () => {
		await axios
			.get(`http://localhost:5000/camera/getCamera?id=${cameraId}`)
			.then((res) => {
				console.log(res);
				setCameraName(res.data.data.camera_name);
				setcameraIp(res.data.data.camera_ip);
				setcameraUsername(res.data.data.camera_username);
				setcameraPassword(res.data.data.camera_password);
				setcameraPort(res.data.data.camera_port);
				setcameraManufacturer(res.data.data.camera_manufacturer);
				setwarehouseId(res.data.data.warehouse_id);
				setproductCode(res.data.data.product_code);

			})
			.catch((err) => {
				console.log("There is an error ", err);
			});
	};
	useEffect(() => {
		getCamera();
	}, []);
	console.log(cameraId);

	const handleCameraNameChange = (e) => {
		setCameraName(e.target.value);
	};

	const handlecameraIpChange = (e) => {
		setcameraIp(e.target.value);
	};

	const handlecameraUsernameChange = (e) => {
		setcameraUsername(e.target.value);
	};

	const handlecameraPasswordChange = (e) => {
		setcameraPassword(e.target.value);
	};

	const handlecameraPortChange = (e) => {
		setcameraPort(e.target.value);
	};

	const handleccameraManufacturerChange = (e) => {
		setcameraManufacturer(e.target.value);
	};

	const handlewarehouseIdChange = (e) => {
		setwarehouseId(e.target.value);
	};

	const handleproductCodeChange = (e) => {
		setproductCode(e.target.value);
	};



	const handleEditCamera = async () => {
		await axios
			.patch(`http://localhost:5000/camera/editCamera?id=${cameraId}`, {
			   camera_name: cameraName,
			   camera_ip: cameraIp,
			   camera_username: cameraUsername,
			   camera_password: cameraPassword,
			   camera_port: cameraPort,
			   camera_manufacturer: cameraManufacturer,
			   warehouse_id: warehouseId,
			   product_code: productCode

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
					Edit Camera
				</Text>
				<Button onClick={()=>navigate('/cameraManagement')} style={{ border: "none" }}>Back to camera management</Button>
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
							Camera Name{" "}
							<Input
								placeholder="Basic usage"
								value={cameraName}
								style={{ marginTop: "1%", marginBottom: "1%" }}
								onChange={handleCameraNameChange}
							/>
						</label>

						<label>
						Camera Ip
							<Input
								placeholder="Camera Ip"
								value={cameraIp}
								onChange={handlecameraIpChange}
							/>
						</label>

						<label>
						Camera Username  
							<Input
								placeholder="Camera Username"
								value={cameraUsername}
								onChange={handlecameraUsernameChange}
							/>
						</label>

						<label>
						Camera Password
							<Input
								placeholder="Camera Password"
								value={cameraPassword}
								onChange={handlecameraPasswordChange}
							/>
						</label>
						
						<label>
						Camera Port
							<Input
								placeholder="Camera Port"
								value={cameraPort}
								onChange={handlecameraPortChange}
							/>
						</label>

						<label>
						Camera Manufacturer
							<Input
								placeholder="Camera Manufacturer"
								value={cameraManufacturer}
								onChange={handleccameraManufacturerChange}
							/>
						</label>

						<label>
				  Warehouse Name
				  <br/>
				    <select onChange={handlewarehouseIdChange} style={{width:"100%"}}>
					<option value disabled>Select Warehouse</option>
						{warehouseData && warehouseData.map((item)=>{
                         return <option value={item._id}>{item.warehouse_name}</option>;
						})}
                    </select>
						</label>

						<label>
				Product Code
							<Input
								placeholder="Product Code"
								value={productCode}
								onChange={handleproductCodeChange}
							/>
						</label>
						
					</div>
					<div style={{ marginLeft: "48.5em", marginTop: "1em" }}>
						<Button onClick={handleEditCamera}>Edit</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default EditCamera;
