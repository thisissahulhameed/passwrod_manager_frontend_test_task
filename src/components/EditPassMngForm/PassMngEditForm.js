import "./password_mng_edit_form.css";
import { useState } from "react";
import axios from "axios";

//Displaying a edit form for updating the username and password
//Accepting the props
//editPassword--which password manager to edit
//setOpenEditForm--opening and closing the modal of edit form
//fetchPasswordMngs--for getting the all password managers from backend
const PassMngEditForm = ({
  editPassword,
  setOpenEditForm,
  fetchPasswordMngs,
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //Creating a put request to server for updating the password manager
  const handleSubmit = async (e) => {
    console.log(userName, password);
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/updatePassMng/${editPassword._id}`,
        {
          userName,
          password,
        }
      );
      setOpenEditForm(false);
      fetchPasswordMngs();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="edit-form-container">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="uesrName">User Name</label>
        <input
          type="text"
          id="uesrName"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        I
        <p className="password-info">
          The Current username and password for{" "}
          <b>{editPassword.websiteName}</b> is {editPassword.userName} and{" "}
          {editPassword.password}
        </p>
        <button type="submit" className="btn update-btn">
          Update My Passowrd
        </button>
        <button
          className="btn cancel-btn"
          onClick={() => {
            setOpenEditForm(false);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PassMngEditForm;
