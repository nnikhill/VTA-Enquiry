import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/enquiries`);
      setEnquiries(res.data.enquiries);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${apiUrl}/api/enquiries/${id}/status`, {
        status,
      });
      fetchEnquiries();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const total = enquiries.length;
  const pending = enquiries.filter((e) => e.status === "Pending").length;
  const done = enquiries.filter((e) => e.status === "Done").length;
  const incomplete = enquiries.filter((e) => e.status === "Incomplete").length;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 p-4 overflow-hidden">

      {/* 🔮 Background Vectors */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white opacity-20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          VTA Admin Dashboard
        </h1>

        {/* 📊 Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">

          <div className="bg-white rounded-xl p-4 shadow flex items-center gap-3">
            <FaUsers className="text-purple-600 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Total</p>
              <h2 className="font-bold text-lg">{total}</h2>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow flex items-center gap-3">
            <FaClock className="text-yellow-500 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <h2 className="font-bold text-lg">{pending}</h2>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow flex items-center gap-3">
            <FaCheckCircle className="text-green-500 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Done</p>
              <h2 className="font-bold text-lg">{done}</h2>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow flex items-center gap-3">
            <FaExclamationCircle className="text-red-500 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Incomplete</p>
              <h2 className="font-bold text-lg">{incomplete}</h2>
            </div>
          </div>

        </div>

        {/* 📋 Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-purple-100 text-purple-700">
              <tr>
                <th className="p-3">Enquiry ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Course</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {enquiries.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-purple-50 transition"
                >
                  <td className="p-3 font-medium">{item.enquiryId}</td>
                  <td className="p-3">{item.fullName}</td>
                  <td className="p-3">{item.mobile}</td>
                  <td className="p-3">{item.course}</td>

                  {/* Status */}
                  <td className="p-3">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateStatus(item._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded-lg text-white text-xs font-semibold
                        ${
                          item.status === "Pending"
                            ? "bg-yellow-500"
                            : item.status === "Done"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Done">Done</option>
                      <option value="Incomplete">Incomplete</option>
                    </select>
                  </td>

                  <td className="p-3">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}