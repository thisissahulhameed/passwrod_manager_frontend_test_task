import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./password_mng_form.css";

//Displaying a form for creating new password managers
const PasswordMngForm = () => {
  //Setting all the need data which get stored in  DB
  const [websiteName, setWebsiteName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const navigate = useNavigate();

  //Creating a post request to server to save the password managager
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/postNewPassMng", {
        websiteName,
        userName,
        password,
        websiteUrl,
      });
      navigate("/show-my-passwords");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <h2 className="">Add New Website </h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input-group">
          <label htmlFor="websiteName">Website Name</label>
          <input
            type="text"
            id="websiteName"
            required
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="uesrName">User Name</label>
          <input
            type="text"
            id="uesrName"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="websiteUrl">Website URL</label>
          <input
            type="text"
            id="websiteUrl"
            required
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
          <small className="small-desc">place exact websike link here*</small>
        </div>
        <button className="btn">Add New Password</button>
      </form>
      <Link to="/show-my-passwords">
        <small className="small-text">
          Not adding new, show existing passwords
        </small>
      </Link>
    </div>
  );
};

export default PasswordMngForm;
