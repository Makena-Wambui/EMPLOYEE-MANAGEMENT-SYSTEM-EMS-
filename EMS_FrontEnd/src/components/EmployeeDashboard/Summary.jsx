import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

/* The SummaryCard component is responsible for rendering a summary card in the employee dashboard. */
const SummaryCard = () => {
  const { user } = useAuth(); // Get the user object from the auth context.
  return (
    // Design the SummaryCard component
    <div className="p-6">
      <div className="bg-white p-4 rounded flex">
        <div
          className={`text-3xl flex justify-center items-center bg-teal-900 text-white px-4`}
        >
          <FaUser />
        </div>
        <div className="pl-4 py-1">
          <p className="text-lg font-semibold">Welcome Back</p>
          <p className="text-xl font-bold">{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
