import React from "react";
import "../static/App.css";
import NotFoundLogo from "../static/404.svg";
import Meteor from "../static/meteor.svg";
import Astronaut from "../static/astronaut.svg";
import Spaceship from "../static/spaceship.svg";

function NotFound() {
  return (
    <div className="not-found">
      <div class="mars"></div>
      <img src={NotFoundLogo} alt="NotFoundLogo" class="logo-404" />
      <img src={Meteor} alt="Meteor" class="meteor" />
      <p class="title">Oh no!!</p>
      <p class="subtitle">
        You`ve either misspelling the URL <br /> or requesting a page that's no
        longer here.
      </p>
      {/* <div align="center">
                <a class="btn-back" href="#">Back to previous page</a>
            </div> */}
      <img src={Astronaut} class="astronaut" alt="Astronaut" />
      <img src={Spaceship} class="spaceship" alt="Spaceship" />
    </div>
  );
}

export default NotFound;
