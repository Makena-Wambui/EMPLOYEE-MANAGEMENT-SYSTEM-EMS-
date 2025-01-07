import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

/* The View component fetches and displays the salary history of an employee */

const View = () => {
  const [salaries, setSalaries] = useState(null); // Define a state variable to store the salaries
  const [filteredSalaries, setFilteredSalaries] = useState([]); // Define a state variable to store the filtered salaries
  const [isLoading, setIsLoading] = useState(true); // Define a state variable to track the loading state
  const { id } = useParams(); // Get the id from the URL params
  const { user } = useAuth(); // Get the user object from the auth context

  let sno = 1; // Initialize the serial number

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); // Make a GET request to the /api/salary/:id endpoint
      console.log(response.data);

      if (response.data.success && Array.isArray(response.data.salary)) {
        setFilteredSalaries(response.data.salary); // Set salaries if data exists and is an array
      } else {
        setFilteredSalaries([]); // Fallback to an empty array
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error); // Log the error message
      }
    } finally {
      setIsLoading(false); // Set loading to false after the request is completed
    }
  };

  useEffect(() => {
    fetchSalaries(); // Call the fetchSalaries function to fetch the salaries
  }, []);

  const filterSalaries = (q) => {
    const filteredRecords = salaries.filter((leave) =>
      leave.employeeId.toLocaleLowerCase().includes(q.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  }; // Define a function to filter the salaries

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : filteredSalaries.length === 0 ? (
        <div className="text-gray-800 font-firaCode font-bold">
          No records found
        </div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold py-7">Salary History</h2>
          </div>

          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs bg-gray-50 text-gray-600 uppercase border border-gray-300">
              <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Employee ID</th>
                <th className="px-6 py-3">Salary</th>
                <th className="px-6 py-3">Allowances</th>
                <th className="px-6 py-3">Deductions</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Pay Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalaries.map((salary) => (
                <tr
                  key={salary._id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="px-6 py-3">{sno++}</td>
                  <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                  <td className="px-6 py-3">{salary.basicSalary}</td>
                  <td className="px-6 py-3">{salary.allowances}</td>
                  <td className="px-6 py-3">{salary.deductions}</td>
                  <td className="px-6 py-3">{salary.netSalary}</td>
                  <td className="px-6 py-3">
                    {new Date(salary.payDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default View;
