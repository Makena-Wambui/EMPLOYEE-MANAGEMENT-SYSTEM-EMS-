import { useAuth } from "../../context/authContext";

{
  /* Navbar component */
}
const Navbar = () => {
  const { user, logout } = useAuth(); // Get user and logout function from auth context
  return (
    <div className="bg-teal-600 text-white h-12 flex items-center justify-between px-5">
      <p>Welcome {user.name}</p>
      <button
        className="px-4 py-1 bg-teal-700 hover:bg-teal-900"
        onClick={logout} // Call logout function on click
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
