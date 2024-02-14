import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoute";
import Unauthenticated from "./pages/Unauthenticated";
import Profile from "./pages/private/Profile";

import AuthContext from "./contexts/AuthContext";

function App() {
	return (
		<AuthContext>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<ProtectedRoute />}>
						<Route path="profile" element={<Profile />} />
					</Route>
					<Route path="/" element={<Unauthenticated />}>
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Route>
					<Route index element={<Home />} />
					<Route path="*" element={<PageNotFound />}></Route>
				</Routes>
			</Router>
		</AuthContext>
	);
}

export default App;
