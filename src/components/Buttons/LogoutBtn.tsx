import logout from "../../assets/logout.svg";

export default function LogoutBtn() {
  const handleLogout = () => {
    localStorage.removeItem("email");
    window.dispatchEvent(new Event("logout"));
    window.location.href = "/";
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="p-2 rounded-full bg-red-500 hover:bg-red-600 hover:shadow-lg hover:scale-110 transition duration-300 ease-in-out"
      title="Logout"
    >
      <img src={logout} alt="Logout" className="w-5 h-5" />
    </button>
  );
}
