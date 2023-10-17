import React, { useState } from "react";
import ProfilePic from "@/assets/profile-pic.png";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your form submission logic here
  };

  function handleImageUpload(e) {
    const image = e.target.files[0];
    console.log(image.size);
    if (image.size > 500_000) {
      return alert("Image size is too big");
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      console.log(reader.result);
    };
    reader.readAsDataURL(image);
  }

  return (
    <div className="profile-page flex-col">
      <form onSubmit={handleSubmit} className="profile-form ">
        <div className="profile-title-container">
          <h2 className="profile-title">Account Setting</h2>
          <h3 className="profile-subheading">My profile</h3>
        </div>
        <div className="profile-container">
          <div className="profile-image-container">
            <div className="image-container flex">
              <img src={profileImage} alt="profile" className="profile-image" />
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleImageUpload}
                className="full-width-input"
              />
              <label htmlFor="file-upload" className="file-upload-button">
                Upload Image
              </label>
            </div>
            <p>Your uploaded image:</p>
          </div>
          <div className="name ">
            <div className="flex-col">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                name="first-name"
                placeholder="Alex"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="full-width-input"
              />
            </div>
            <div className="flex-col">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                placeholder="Mechael"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="full-width-input"
              />
            </div>
          </div>
          <div className="location ">
            <div className="flex-col">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="New York"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="full-width-input"
              />
            </div>
            <div className="flex-col">
              <label htmlFor="date-of-birth">Date Of Birth</label>
              <input
                type="date"
                id="date-of-birth"
                name="date-of-birth"
                placeholder="07.12.1997"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="full-width-input"
              />
            </div>
          </div>
          <div className="email ">
            <div className="flex-col">
              <label htmlFor="email-address">Email Address</label>
              <input
                type="email"
                id="email-address"
                name="email-address"
                placeholder="em@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="full-width-input"
              />
            </div>
            <div className="flex-col">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                id="gender"
                name="gender"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="full-width-input"
              />
            </div>
          </div>
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
