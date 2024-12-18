import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div className="bg-teal-600 text-white h-12 flex items-center justify-between px-5">
      <p>Welcome {user.name}</p>
      <button className="px-4 py-1 bg-teal-700 hover:bg-teal-900">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
