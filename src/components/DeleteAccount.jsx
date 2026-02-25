import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuthStore from "../context/useAuthStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DeleteAccount = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors,setErrors] = useState({email:"",password:""});

  const handleDeleteAccount = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const nextErrors = { email: "", password: "" };

    if (!trimmedEmail) nextErrors.email = "Email is required";
    if (!trimmedPassword) nextErrors.password = "Password is required";
    if (nextErrors.email || nextErrors.password) {
      setErrors(nextErrors);
      toast.error("Email and password are required");
      return;
    }
    setErrors({ email: "", password: "" });

    try {
      setIsDeleting(true);
      const request = await fetch(`${API_BASE_URL}/deleteAccount`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      const response = await request.json();
      if (!request.ok) {
        toast.error(response?.message || "Failed to delete account");
        return;
      }

      toast.success(response?.message || "Account deleted successfully");
      localStorage.removeItem("JWT");
      logout();
      navigate("/get-started");
    } catch (error) {
      console.log(error);
      toast.error("Server is unavailable. Please try again later.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="mt-4 grid gap-3">
      <h2 className="text-lg font-semibold text-gray-900 lg:text-xl">
        Danger Zone
      </h2>
      <p className="text-sm text-gray-600">
        This action is permanent. Once your account is deleted, all associated
        data will be removed and cannot be recovered.
      </p>

      <div className="rounded-lg border border-red-200 bg-red-50 p-4 sm:p-6">
        <div className="mb-4 grid gap-1">
          <p className="text-lg font-semibold text-red-800">Delete Account</p>
          <p className="text-sm text-red-700">
            Permanently remove your account and profile information.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid w-full gap-1">
              <label className="text-sm font-medium text-gray-700">
                Confirm Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder="Enter your email to confirm"
                className="w-full rounded-lg border border-gray-300 outline-none px-3 py-2"
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="grid w-full gap-1">
              <label className="text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-red-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 border-t border-red-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="mt-1 cursor-pointer"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
              />
              <span>
                I understand this action is permanent and cannot be undone.
              </span>
            </label>
            <button
              type="button"
              disabled={!isConfirmed || isDeleting}
              onClick={handleDeleteAccount}
              className="w-full cursor-pointer rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 sm:w-auto disabled:cursor-not-allowed disabled:bg-red-400"
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteAccount;
