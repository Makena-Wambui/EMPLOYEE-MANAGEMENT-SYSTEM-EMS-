import { Link } from "react-router-dom";

// This component is responsible for rendering the list of leaves.

const List = () => {
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Status"
          className="px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <Link
          to="/employee-dashboard/add-leave"
          className="bg-blue-600 text-white px-4 py-1 rounded-lg"
        >
          Add New Leave
        </Link>
      </div>
    </div>
  );
};

export default List;
