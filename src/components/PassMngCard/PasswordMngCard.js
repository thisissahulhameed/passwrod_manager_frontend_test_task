import { useEffect, useState } from "react";
import axios from "axios";
import "./password_mng_card.css";
import PassMngEditForm from "../EditPassMngForm/PassMngEditForm";
import { Link } from "react-router-dom";

//Displaying all the password managers in a card lay out
const PasswordMngCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [myPasswords, setMyPasswords] = useState([]);
  //Boolean for opening the edit form (updating the password manager)
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editPassword, setEditPassword] = useState({});

  //Reading all Password Manager from DB
  const fetchPasswordMngs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getAllPassMng");
      setMyPasswords(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  //Initially fetching password manager for the first render
  useEffect(() => {
    fetchPasswordMngs();
  }, []);

  //Handling the Delete, by creating a Delete request to server for the respected password managers id
  const handleDelete = async (passMngId) => {
    try {
      await axios.delete(`http://localhost:8080/deletePassMng/${passMngId}`);
      fetchPasswordMngs();
    } catch (err) {}
  };

  return (
    <div>
      {openEditForm && (
        <PassMngEditForm
          editPassword={editPassword}
          setOpenEditForm={setOpenEditForm}
          fetchPasswordMngs={fetchPasswordMngs}
        />
      )}
      <Link to="/add-new-password">
        <button className="card-btn add-card-btn">Add New Password</button>
      </Link>
      <button
        onClick={() => setShowPassword(!showPassword)}
        className="card-btn"
      >
        {showPassword ? "Hide Passwords" : "Show Passwords"}
      </button>
      <div className="cards-container">
        {myPasswords.map((myPassword) => {
          return (
            <div key={myPassword._id} className="password-card">
              {/* Logo clear bit for displaying the logo of the website */}
              <img
                src={`https://logo.clearbit.com/${myPassword.websiteUrl}`}
                alt={myPassword.websiteName}
                className="website-logo"
              />
              <div className="credentials">
                <p>{myPassword.userName}</p>
                <p>
                  {showPassword
                    ? myPassword.password
                    : "*".repeat(myPassword.password.length)}
                </p>
              </div>
              <a
                href={`https://www.${myPassword.websiteUrl}`}
                target="_blank"
                rel = "noreferrer"
                className="website-url"
              >
                {myPassword.websiteUrl}
              </a>
              <div className="actions">
                <button className="icon-btn">
                  <i
                    onClick={() => {
                      setEditPassword(myPassword);
                      setOpenEditForm(true);
                    }}
                    className="fas fa-ellipsis-v icon dots-icon"
                  ></i>
                </button>

                <button
                  className="icon-btn"
                  onClick={() => handleDelete(myPassword._id)}
                >
                  <i className="fa-solid fa-trash icon delete-icon"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordMngCard;
