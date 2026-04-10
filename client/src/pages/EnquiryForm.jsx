import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBook,
  FaGraduationCap,
  FaClock,
  FaStickyNote,
} from "react-icons/fa";

export default function EnquiryForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    course: "",
    qualification: "",
    preferredTiming: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/enquiries",
        formData
      );

      navigate("/success", {
        state: {
          enquiryId: res.data.enquiry.enquiryId,
          name: res.data.enquiry.fullName,
        },
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        
        <h1 className="text-2xl font-bold text-purple-700 text-center mb-2">
          Vedanta Tech Academy Enquiry Form
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Please fill your details before counselling.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div className="flex items-center border rounded-lg px-3">
            <FaUser className="text-purple-500 mr-2" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full py-2 focus:outline-none"
            />
          </div>

          {/* Mobile */}
          <div className="flex items-center border rounded-lg px-3">
            <FaPhone className="text-purple-500 mr-2" />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full py-2 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3">
            <FaEnvelope className="text-purple-500 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-2 focus:outline-none"
            />
          </div>

          {/* Course */}
          <div className="flex items-center border rounded-lg px-3">
            <FaBook className="text-purple-500 mr-2" />
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full py-2 bg-transparent focus:outline-none"
            >
              <option value="">Select Interested Course</option>
              <option value="Web Development">Web Development</option>
              <option value="DSA">DSA</option>
              <option value="C++">C++</option>
              <option value="Java">JAVA</option>
              <option value="Python">Python</option>
            </select>
          </div>

          {/* Qualification */}
          <div className="flex items-center border rounded-lg px-3">
            <FaGraduationCap className="text-purple-500 mr-2" />
            <input
              type="text"
              name="qualification"
              placeholder="Qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full py-2 focus:outline-none"
            />
          </div>

          {/* Timing */}
          <div className="flex items-center border rounded-lg px-3">
            <FaClock className="text-purple-500 mr-2" />
            <select
              name="preferredTiming"
              value={formData.preferredTiming}
              onChange={handleChange}
              className="w-full py-2 bg-transparent focus:outline-none"
            >
              <option value="">Preferred Timing</option>
              <option value="Morning">Morning Shift</option>
              <option value="Evening">Evening Shift</option>
            </select>
          </div>

          {/* Notes */}
          <div className="flex items-start border rounded-lg px-3">
            <FaStickyNote className="text-purple-500 mr-2 mt-2" />
            <textarea
              name="notes"
              placeholder="Additional Notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full py-2 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>

        </form>
      </div>
    </div>
  );
}