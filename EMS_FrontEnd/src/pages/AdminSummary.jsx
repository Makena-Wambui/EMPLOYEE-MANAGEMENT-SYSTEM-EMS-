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
          number={10}
          color="bg-purple-700"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={5}
          color="bg-yellow-400"
        />

        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number="$5000"
          color="bg-green-600"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={5}
            color="bg-teal-400"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={2}
            color="bg-blue-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={2}
            color="bg-yellow-300"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={1}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
