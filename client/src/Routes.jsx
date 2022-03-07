import React from "react";
import GameSelection from "./components/GameSelect/GameSelectMain";
import GamePlay from "./components/GamePortal/GamePortalLanding.jsx";
import NotFound from "./components/NotFound.jsx";
import AdminGameLanding from "./components/GamePortal/admin/AdminGameLanding";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ZoomAdmin from "./components/GamePortal/admin/ZoomAdmin";
import Dashboard from "./components/Auth/Dashboard";
import Game from "./components/Auth/Game.jsx";
import UserInfo from "./components/Auth/UserInfo.jsx";
import ClientDashboard from "./components/Auth/client/ClientDashboard";
import ViewGame from "./components/Auth/ViewGame";
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from "./components/Contact";
import {
  BrowserRouter,
  Routes as Router,
  Route,
  Navigate,
} from "react-router-dom";
import AddPoster from "./components/Auth/admin/AddPoster";
const Routes = ({ auth, user, setUser, setauth }) => {
  console.log(auth);
  console.log(user);

  return (
    <div>
      <BrowserRouter>
        {" "}
        <Router>
          <Route path="*" element={<NotFound />} />

					<Route
						path="/games/createSession/:gameid"
						exact
						index
						element={
							auth ? (
								<GameSelection user={user} />
							) : (
								<Navigate replace to="/login" />
							)
						}
					></Route>
          <Route path="/games/viewGame/:gameid" element={ auth ? <ViewGame user={user}></ViewGame>: <Navigate replace to={'/login'}></Navigate>}></Route>

					<Route
						path="/login"
						exact
						element={
							!auth ? <Login></Login> : <Navigate replace to="/dashboard" />
						}
					></Route>
				  <Route
            path="/dashboard"
            exact
            element={
              auth ? (
                user.role === "admin" ? (
                  <Dashboard
                    user={user}
                    setUser={setUser}
                    setauth={setauth}
                    auth={auth}
                  />
                ) : (
                  <ClientDashboard
                    user={user}
                    setUser={setUser}
                    setauth={setauth}
                    auth={auth}
                  ></ClientDashboard>
                )
              ) : (
                <Navigate replace to="/login" />
              )
            }
          ></Route>
		  <Route path='/contact/:user' element={auth && user.role !== 'admin' ?
		  <Contact user={user}></Contact> :
		  <Navigate replace to={`/login`}></Navigate>
		}></Route>
          <Route
          path="/analytics"
          element={
            auth && user.role !== "admin" ? (
              <UserInfo
                user={user}
                setUser={setUser}
                setauth={setauth}
                auth={auth}
              />
            ) : (
              <Navigate replace to={"/dashboard"}></Navigate>
            )
          }
          
        ></Route>
					<Route path="/" element={<Navigate replace to="/dashboard" />} />
					<Route path="/forgotPassword" exact element={<ForgotPassword />} />
					<Route
						path="/resetPassword/:token"
						exact
						element={<ResetPassword />}
					/>
					<Route
						path="/register"
						exact
						element={
							auth && user.role === 'admin' ? (
								<Register />
							) : (
								<Navigate replace to="/dashboard" />
							)
						}
					></Route>
					<Route
						path="/clientView/:id/:hash/:nameHash"
						element={<ZoomAdmin />}
					></Route>
					<Route
						path="/user/:id/:hash/:gameid"
						exact
						element={<GamePlay />}
					></Route>
					<Route
						path="/userInfo/:id"
						exact
						element={
							auth && user.role === 'admin' ? (
								<UserInfo
									user={user}
									setUser={setUser}
									setauth={setauth}
									auth={auth}
								/>
							) : (
								<NotFound></NotFound>
							)
						}
					></Route>

					<Route
						path="/admin/:id/:hash/:gameid"
						element={
							auth ? (
								<AdminGameLanding user={user} />
							) : (
								<Navigate replace to="/dashboard" />
							)
						}
					></Route>
					<Route
						path="/games"
						exact
						element={
							auth ? <Game user={user} /> : <Navigate replace to="/login" />
						}
					></Route>
					<Route path='/addPoster' exact element={ auth && user.role==='admin' ? <AddPoster user={user}></AddPoster> : <NotFound></NotFound>}></Route>
				</Router>
			</BrowserRouter>
		</div>
	);
};

export default Routes;
