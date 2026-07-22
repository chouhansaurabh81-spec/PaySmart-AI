import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullname: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const { data } = await api.get("/profile");
      setUser(data);
    } catch (error) {
      console.log(error);
      alert("Unable to load profile.");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const { data } = await api.put("/profile", user);

      alert(data.message);
      fetchProfile();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Profile update failed.");
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();

    if (
      passwordData.new_password !==
      passwordData.confirm_password
    ) {
      alert("New Password and Confirm Password must match.");
      return;
    }

    try {
      const { data } = await api.put(
        "/change-password",
        passwordData
      );

      alert(data.message);

      localStorage.removeItem("token");

      navigate("/login", { replace: true });

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Password change failed."
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-lg mx-auto space-y-8">

        {/* Profile Card */}

        <form
          onSubmit={handleUpdate}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-center mb-8">
            👤 My Profile
          </h1>

          <div className="space-y-5">

            <div>
              <label className="block font-semibold mb-2">
                Full Name
              </label>

              <input
                type="text"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                value={user.fullname}
                onChange={(e) =>
                  setUser({
                    ...user,
                    fullname: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                value={user.email}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Save Changes
            </button>

          </div>

        </form>

        {/* Password Card */}

        <form
          onSubmit={handleChangePassword}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            🔒 Change Password
          </h2>

          <div className="space-y-5">

            <input
              type="password"
              placeholder="Current Password"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
              value={passwordData.current_password}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  current_password: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
              value={passwordData.new_password}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  new_password: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
              value={passwordData.confirm_password}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirm_password: e.target.value,
                })
              }
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Change Password
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Profile;