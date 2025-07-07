import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  const handleLogout = () => {
    logout();
    const modal = document.getElementById(
      "logout_modal"
    ) as HTMLDialogElement | null;
    modal?.close(); // Close the modal after logout
  };

  const openModal = () => {
    const modal = document.getElementById(
      "logout_modal"
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <header
          className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
        backdrop-blur-lg"
        >
          <div className="container mx-auto px-4 h-16">
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center gap-8">
                <Link
                  to="/"
                  className="flex items-center gap-2.5 hover:opacity-80 transition-all"
                >
                  <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <h1 className="text-lg font-bold">Chat App</h1>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={"/settings"}
                  className="btn btn-sm gap-2 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>

                {authUser && (
                  <>
                    <Link to={"/profile"} className="btn btn-sm gap-2">
                      <User className="size-5" />
                      <span className="hidden sm:inline">Profile</span>
                    </Link>

                    {/* ✅ DaisyUI dialog modal trigger */}
                    <button
                      className="flex gap-2 items-center btn btn-sm"
                      onClick={openModal}
                    >
                      <LogOut className="size-5" />
                      <span className="hidden sm:inline">Logout</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* ✅ DaisyUI <dialog> modal */}
      <dialog id="logout_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Logout</h3>
          <p className="py-4">Are you sure you want to logout?</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn btn-sm">Cancel</button>
              <button
                type="button"
                className="btn btn-sm btn-error"
                onClick={handleLogout}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Navbar;
