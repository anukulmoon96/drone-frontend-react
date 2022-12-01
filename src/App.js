import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./components/Login";
import UserManagement from "./components/UserManagement";
import WarehouseManagement from "./components/WarehouseManagement";
import RoleManagement from "./components/RoleManagement";
import CameraManagement from "./components/CameraManagement";
import EditUser from "./components/EditUser";
import EditRole from "./components/EditRole";
import EditCamera from "./components/EditCamera";

function App(props) {
	const location = useLocation();
	console.log(location);
	return (
		<>
			<Routes>
				<Route exact path="/" element={<Login navLocation={location} />} />
				<Route
					exact
					path="/dronedashboard"
					element={<UserManagement navLocation={location} />}
				/>
				
				<Route
					exact
					path="/warehousemanagement"
					element={<WarehouseManagement navLocation={location} />}
				/>

                  <Route
					exact
					path="/cameraManagement"
					element={<CameraManagement navLocation={location} />}
				/>

                <Route
					exact
					path="/rolemanagement"
					element={<RoleManagement navLocation={location} />}
				/>

				<Route
					exact
					path="/editUser"
					element={<EditUser navLocation={location} />}
				/>

                <Route
					exact
					path="/editRole"
					element={<EditRole navLocation={location} />}
				/>

                <Route
					exact
					path="/editCamera"
					element={<EditCamera navLocation={location} />}
				/>
			</Routes>
		</>
	);
}

export default App;
