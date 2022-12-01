import React, { useEffect, useState } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import './UserManagement.css';
import background from './wp2533041.jpg';
import logo from './AssertAI_Black-05.png';
import ReactPlayer from 'react-player';
import useWebSocket from 'react-use-websocket';
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

const socketUrl = 'ws://localhost:443/';



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

function UserManagement(props) {
	console.log(props);
	const [userData, setUserData] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [userFirstName, setUserFirstName] = useState("");
	const [userLastName, setUserLastName] = useState("");
	const [dronebattery, setdronebattery] = useState("");

	const [userEmail, setUserEmail] = useState("");
	const [userPhone, setUserPhone] = useState("");
	const [userSuperVisor, setUserSuperVisor] = useState("");
	const [userAlertList, setUserAlertList] = useState("");
	const {
		sendMessage,
		sendJsonMessage,
		lastMessage,
		lastJsonMessage,
		readyState,
		getWebSocket,
	  } = useWebSocket(socketUrl, {
		onOpen: () => console.log('opened'),
		//Will attempt to reconnect on all close events, such as server shutting down
		shouldReconnect: (closeEvent) => true,
	  });

	  let {drone_status,drone_battery,drone_current_location,package_id,package_count}=lastJsonMessage;

	  setdronebattery(drone_battery);
	  console.log('a');
	  console.log(lastJsonMessage);
	  console.log('v');
	const openNotification = (msg) => {
		notification.open({
			message: "Add User Alert",
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
	

	const fetchUser = async () => {
		const fetchedUserData = await axios.get(
			"http://localhost:5000/user/getUsers",
		);
		console.log(fetchedUserData.data.data);
		setUserData(fetchedUserData.data.data);
	};

	const deleteUser = async (record) => {
		console.log("Records are ----> ", record);
		await axios
			.delete(`http://localhost:5000/user/deleteUser?id=${record._id}`)
			.then((res) => {
				fetchUser();
			})
			.catch((err) => {
				console.log("Error in deleting the user ", err);
			});
	};
	const addUser = async () => {

		if(userFirstName == ''){
			openNotification('First Name is required')
			return;
		}
		if(userLastName == ''){
			openNotification('Last Name is required')
			return;
		}
		if(userEmail == ''){
			openNotification('Email is required')
			return;
		}
		if(userPhone == ''){
			openNotification('Phone No is required')
			return;
		}
		console.log("Add User is called");

		const addUserData = await axios.post(
			"http://localhost:5000/user/createUser",
			{
				user_first_name: userFirstName,
				user_last_name: userLastName,
				user_email: userEmail,
				user_phone: userPhone,
				user_supervisor: userSuperVisor,
				user_alert_list: userAlertList,
				user_role_id: "6319b6c7a56234e2da27888b",
			},
		);
		console.log(addUserData);
	};

	useEffect(() => {
		fetchUser();
	}, [userData.length]);
	console.log(userData.length);

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
	console.log(userAlertList);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		addUser()
			.then((res) => {
				fetchUser();
			})
			.catch((err) => {
				console.log("error in adding user", err);
			});

		setIsModalOpen(false);
		console.log(userFirstName);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

const data = {"message":"User list",
               "data":[{"product":"2543678914","quantity":"33","location":"7685"},
			           {"product":"2543654234","quantity":"6","location":"B55-54-1"},
					   {"product":"4754394734","quantity":"5","location":"B55-54-2"},
					   {"product":"Empty Bin","quantity":"Empty Bin","location":"B55-55-2"},
					   {"product":"9798454578","quantity":"13","location":"B55-55-1"},
					   {"product":"6578464578","quantity":"110","location":"7686"}
					]};

	const columns = [
		{
			title: "Product",
			dataIndex: "product",
			key: "product",
			// render: (text) => <a>{text}</a>,
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
			key: "quantity",
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
		},
		
	];

	return (
		<div style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", border: "5px solid white" }}>
			<div style={{ padding: "1em" }}>
		         <p style={{fontSize:"40px",color:"white"}}><img src={logo} style={{width:"200px",height:"90px"}}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Warehouse Drone Dashboard</p>
			</div>
			{/* <div
				style={{
					marginRight: "2em",
					display: "flex",
					justifyContent: "flex-end",
				}}>
				<div>
					<Button type="primary" onClick={showModal}>
						Add User
					</Button>
				</div>
			</div> */}
			{/* <div style={{ padding: "2em" }}>
				<Table columns={columns} dataSource={userData} />
			</div> */}
			<div style={{
display: "grid",
gridTemplateColumns: "repeat(2, 1fr)",
gridTemplateRows: "300px 260px",
gridColumnGap: "20px",
gridRowGap: "20px",
margin:"20px"}}>

    <div style={{overflowY:"scroll",color:"white"}}>

    Drone Status : { JSON.stringify(lastJsonMessage)}<br/>
   Drone Battery :{dronebattery}<br/>
	 {/*  Drone Current Location : {lastJsonMessage.drone_current_location}<br/>
	Package Name or Barcode : {lastJsonMessage.package_id}<br/>
	Package Count : {lastJsonMessage.package_count}<br/><br/>  */}
	<Table pagination={false}  columns={columns} dataSource={data.data}/>
	
	</div>
	<div><center><h2><p style={{color:"white"}}> Drone View</p></h2></center><ReactPlayer
            className='react-player fixed-bottom'
            url= 'videos/anpr_trim.mp4'
            width='100%'
            height='100%'
            controls = {true}

          /></div>
	{/* <div style={{justifyContent:"center",textAlign:"center",alignItems:"center"}}>
		<div style={{
display: "grid",
gridTemplateColumns: "repeat(5, 25px)",
gridTemplateRows: "repeat(6, 1fr)",
gridColumnGap: "10px",
gridRowGap: "10px",
marginTop:"50px",
marginLeft:"40%",
color:"white"
		}}
 >
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}>X</div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
	</div> 


	</div>
	<div style={{justifyContent:"center",textAlign:"center",alignItems:"center"}}>
	<div style={{
display: "grid",
gridTemplateColumns: "repeat(6, 25px)",
gridTemplateRows: "repeat(4, 1fr)",
gridColumnGap: "10px",
gridRowGap: "10px",
marginTop:"100px",
marginLeft:"35%",
color:"white"
		}}
 >
<div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}>X</div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
  <div style={{border:"1px solid white"}}></div>
</div>

	</div> */}

</div>
		</div>
	);
}

export default UserManagement;
