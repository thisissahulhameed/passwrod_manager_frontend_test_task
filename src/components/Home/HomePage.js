import "./home.css";
import { Link } from "react-router-dom";

// Home Page
const Home = () => {
  return (
    <div className="container">
      <div className="upper">
        <h1>Never Remember Another Password,</h1>
        <h1>We've Got It Handled.</h1>
      </div>
      <div className="lower">
        <div className="buttonContainer">
          {/*New password create page */}
          <Link to="/add-new-password">
            <button className="btn">Add New Password</button>
          </Link>
          {/*Displaying all saved passwords*/}
          <Link to="/show-my-passwords">
            <button className="btn">Show My Passwords</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
