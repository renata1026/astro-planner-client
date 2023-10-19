import React, { useState, useEffect } from "react";
import ProfilePic from "@/assets/default-avatar.svg";
import { API } from "../lib/api-index";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
  const { token, user, setUser } = useOutletContext();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    email: "",
    profileImage: "",
  });

  useEffect(() => {
    setProfileData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      location: user.location || "",
      email: user.email || "",
      profileImage: user.profileImage || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmitProfile(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/users/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          profileImage: profileData.profileImage,
          location: profileData.location,
        }),
      });
      const info = await res.json();

      setUser(info.user);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  function handleImageUpload(e) {
    const image = e.target.files[0];

    if (image.size > 500_000) {
      return alert("Image size is too big");
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData((prevData) => ({
        ...prevData,
        profileImage: reader.result,
      }));
    };
    reader.readAsDataURL(image);
  }

  if (!user.id) {
    return null;
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
              {profileData?.profileImage ? (
                <img
                  src={profileData.profileImage}
                  alt="profile"
                  className="profile-image"
                />
              ) : (
                <img src={ProfilePic} alt="profile" className="profile-image" />
              )}
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
                name="firstName"
                placeholder="Alex"
                value={profileData.firstName}
                onChange={handleInputChange}
                className="full-width-input"
              />
            </div>
            <div className="flex-col">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                placeholder="Michael"
                value={profileData.lastName}
                onChange={handleInputChange}
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
                value={profileData.location}
                onChange={handleInputChange}
                className="full-width-input"
              />
            </div>
            <div className="flex-col">
              <label htmlFor="email-address">Email Address</label>
              <input
                type="email"
                id="email-address"
                name="email"
                placeholder="test@test.com"
                value={profileData.email}
                onChange={handleInputChange}
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
