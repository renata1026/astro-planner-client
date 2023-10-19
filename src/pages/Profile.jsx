import React, { useState, useEffect } from "react";
import ProfilePic from "@/assets/profile-pic.png";
import { API } from "../lib/api-index";
import { useOutletContext } from "react-router-dom";
import { format } from "date-fns";

const Profile = () => {
  const { token, user } = useOutletContext();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    dateOfBirth: "",
    email: "",
    gender: "",
    profileImage: "",
  });

  // console.log("user", user);
  // console.log(firstName, "firstName");

  useEffect(() => {
    setProfileData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      location: user.location || "",
      dateOfBirth: user.dateOfBirth || "",
      email: user.email || "",
      gender: user.gender || "",
      profileImage: user.picture || "",
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
      // const isoDOB = new Date(profileData.dateOfBirth).toISOString();

      const res = await fetch(`${API}/users/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          picture: profileData.profileImage,
          // location: profileData.location,
          // gender: profileData.gender,
          // dob: isoDOB,
        }),
      });
      const info = await res.json();
      console.log(info);
    } catch (error) {
      console.error("An error occurred:", error);
    }

    // Check if the user already has a profile
    // const profileExistsResponse = await fetch(`${API}/users/profile`, {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    // });
    // const profileExistsInfo = await profileExistsResponse.json();

    //   if (profileExistsInfo.success) {
    //     // The user has a profile, update it
    //     const res = await fetch(`${API}/users/profile`, {
    //       method: "PUT",
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         picture: profileImage,
    //         location,
    //         dob: isoDOB,
    //         gender,
    //       }),
    //     });

    //     const info = await res.json();
    //     console.log(info);
    //   } else {
    //     // The user doesn't have a profile, create one
    //     const createResponse = await fetch(`${API}/users/profile`, {
    //       method: "POST",
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         userId: token, // Use the user's ID as userId
    //         picture: profileImage,
    //         location,
    //         dob: isoDOB,
    //         gender,
    //       }),
    //     });
    //     const createInfo = await createResponse.json();
    //     console.log(createInfo);
    //   }
    // } catch (error) {
    //   console.error("An error occurred:", error);
    // }
  }

  function handleImageUpload(e) {
    const image = e.target.files[0];
    console.log(image.size);
    if (image.size > 500_000) {
      return alert("Image size is too big");
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData((prevData) => ({
        ...prevData,
        profileImage: reader.result,
      }));
      console.log(reader.result);
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
              {profileData.profileImage ? (
                <img
                  src={profileData.profileImage}
                  alt="profile"
                  className="profile-image"
                />
              ) : (
                <div className="profile-image-fallback ">
                  <span className="">
                    {`${profileData.firstName[0]}${profileData.lastName[0]}`.toUpperCase()}
                  </span>
                </div>
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
            {/* <div className="flex-col">
              <label htmlFor="date-of-birth">Date Of Birth</label>
              <input
                type="date"
                id="date-of-birth"
                name="date-of-birth"
                placeholder="07.12.1997"
                value={profileData.dateOfBirth}
                onChange={handleInputChange}
                className="full-width-input"
              />
            </div> */}
          </div>
          <div className="email ">
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
            <div className="flex-col">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                id="gender"
                name="gender"
                placeholder="Gender"
                value={profileData.gender}
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
