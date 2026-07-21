import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const response = await api.get("/profile");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const response = await api.put("/profile", user);

      alert(response.data.message);

      fetchProfile();
    } catch (error) {
      console.log(error);
      alert("Failed to update profile");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-xl rounded-xl p-8 w-[450px]"
      >

        <h1 className="text-3xl font-bold text-center mb-8">
          👤 My Profile
        </h1>

        <div className="space-y-6">

          <div>
            <label className="font-semibold">
              Full Name
            </label>

            <input
              type="text"
              value={user.fullname}
              onChange={(e) =>
                setUser({
                  ...user,
                  fullname: e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg mt-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
          >
            Save Changes
          </button>

        </div>

      </form>

    </div>
  );
}

export default Profile;