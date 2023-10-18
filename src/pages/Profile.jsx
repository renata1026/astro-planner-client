import React, { useState, useEffect } from "react";
import ProfilePic from "@/assets/profile-pic.png";
import { API } from "../lib/api-index";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
  const { token, user } = useOutletContext();
  if (!user.id) {
    return <> </>;
  }

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [location, setLocation] = useState(user.location || "");
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || "");
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender || "");
  const [profileImage, setProfileImage] = useState(user.profileImage || "");
  console.log(user);
  async function handleSubmitProfile(e) {
    const isoDOB = new Date(dateOfBirth).toISOString();
    e.preventDefault();
    try {
      // Check if the user already has a profile
      const profileExistsResponse = await fetch(`${API}/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const profileExistsInfo = await profileExistsResponse.json();

      if (profileExistsInfo.success) {
        // The user has a profile, update it
        const res = await fetch(`${API}/users/profile`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            picture: profileImage,
            location,
            dob: isoDOB,
            gender,
          }),
        });

        const info = await res.json();
        console.log(info);
      } else {
        // The user doesn't have a profile, create one
        const createResponse = await fetch(`${API}/users/profile`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: token, // Use the user's ID as userId
            picture: profileImage,
            location,
            dob: isoDOB,
            gender,
          }),
        });
        const createInfo = await createResponse.json();
        console.log(createInfo);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  console.log(typeof profileImage, "stringImage", profileImage);
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
      <form onSubmit={handleSubmitProfile} className="profile-form ">
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
