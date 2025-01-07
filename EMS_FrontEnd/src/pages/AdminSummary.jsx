import { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "../components/dashboard/SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null); // State to store the summary data

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        // Fetch the summary data from the server
        const summary = await axios.get(
          "https://employee-management-system-ems-backend.vercel.app/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSummary(summary.data); // Set the summary data in the state
        //setSummary(summary); // Set the summary data in the state
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      }
    };
    fetchSummary(); // Call the fetchSummary function
  }, []);

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    /*
    The AdminSummary component is used to display the summary of different data.
    */
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-purple-700"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-yellow-400"
        />

        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Total Monthly Salary"
          number={summary.totalSalaries}
          color="bg-green-600"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-teal-400"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-blue-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-yellow-300"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
