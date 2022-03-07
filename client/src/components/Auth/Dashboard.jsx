import React from 'react';

import Navbar from './Navbar';
import AdminDashboard from './admin/AdminDashboard';
const Dashboard = ({ user, auth, setUser, setauth }) => {
	console.log(user);

	return (
		<div>
			<Navbar user={user} setUser={setUser} setauth={setauth}></Navbar>

			<div className="dashboard-mid">
				{user.role === 'admin' ? <AdminDashboard></AdminDashboard> : <></>}
			</div>
		</div>
	);
};

export default Dashboard;
