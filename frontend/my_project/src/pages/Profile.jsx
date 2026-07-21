import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);

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

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-xl p-8 w-[450px]">

        <h1 className="text-3xl font-bold text-center mb-8">
          👤 My Profile
        </h1>

        <div className="space-y-6">

          <div>
            <label className="font-semibold">Full Name</label>

            <input
              className="w-full border p-3 rounded-lg mt-2"
              value={user.fullname}
              readOnly
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>

            <input
              className="w-full border p-3 rounded-lg mt-2"
              value={user.email}
              readOnly
            />
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;