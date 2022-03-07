import React from 'react';

import Navbar from './Navbar';
import EditUserInfo from './admin/EditUserInfo';
import ViewUserInfo from './client/ViewUserInfo';
const UserInfo = ({ user, auth, setUser, setauth }) => {
	console.log(user);
	//  const user = JSON.parse(sessionStorage.getItem('user'))

	return (
		<div>
			<Navbar user={user} setUser={setUser} setauth={setauth}></Navbar>

			<div className="user-info">
				{user.role === 'admin' ? (
					<EditUserInfo User={user}></EditUserInfo>
				) : (
					<ViewUserInfo user={user}></ViewUserInfo>
				)}
			</div>
		</div>
	);
};

export default UserInfo;
