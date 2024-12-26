import { useState } from "react";
import loginImage from "../assets/Illustrasi_Login.png";
import logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email tidak valid")
        .required("Email wajib diisi"),
      password: Yup.string()
        .min(8, "Password minimal 8 karakter")
        .max(25, "Password maksimal 25 karakter")
        .matches(/^(?=.*\d)/, "Password harus memiliki minimal 1 angka")
        .required("Password wajib diisi"),
    }),
    onSubmit: async (values) => {
      try {
        // Dispatch the login action and handle the response
        await dispatch(loginUser(values)).unwrap();
        toast.success("Login berhasil!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        toast.error(error || "Gagal login! Coba lagi.");
      }
    },
  });

  return (
    <div className="flex h-screen">
      {/* Left Side: Form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-md p-6">
          <div className="flex gap-2 justify-center">
            <img src={logo} alt="Ikon Logo" className="h-8 w-auto" />
            <h2 className="text-2xl font-bold text-center mb-6">SIMS PPOB</h2>
          </div>
          <h2 className="text-3xl font-bold text-center mb-6">
            Masuk atau buat akun untuk memulai
          </h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div className="relative mb-4">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full pl-10 py-2 border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:outline-none ${
                  formik.touched.email && formik.errors.email
                    ? "focus:ring-red-500"
                    : "focus:ring-black"
                }`}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs -mt-4 mb-2">
                {formik.errors.email}
              </p>
            )}

            {/* Password Input */}
            <div className="relative mb-4">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`w-full pl-10 pr-10 py-2 border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:outline-none ${
                  formik.touched.password && formik.errors.password
                    ? "focus:ring-red-500"
                    : "focus:ring-black"
                }`}
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs -mt-4 mb-2">
                {formik.errors.password}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-red-600 transition"
            >
              Masuk
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-gray-600 lg:text-caption-1 text-caption-2">
              Belum punya akun? daftar
              <Link to="/register" className="pl-1 font-semibold text-primary">
                di sini
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="w-1/2">
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-full h-full object-fill"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
