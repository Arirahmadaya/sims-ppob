//src/pages/Register.jsx
import { useState } from "react";
import loginImage from "../assets/Illustrasi_Login.png";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
// import { validateEmail } from "../utils/validateEmail.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast,  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../api.js";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const sendRegistrationData = async (data) => {
    const payload = {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
    };
    console.log("Payload yang dikirim:", payload);

    try {
      const response = await api.post("/registration", payload);

      if (response.status === 200 || response.status === 201) {
        toast.success("Registrasi berhasil!", {
          position: "top-right", // Gunakan string
        });
      } else {
        toast.error(response.data.message || "Terjadi kesalahan. Coba lagi!", {
          position: "top-right", // Gunakan string
        });
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Terjadi kesalahan server.";
      toast.error(message, { position: "top-right" });
    }
  };

  // Schema validasi Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    firstName: Yup.string()
      .min(2, "Nama depan minimal 2 karakter")
      .required("Nama depan wajib diisi"),
    lastName: Yup.string()
      .min(2, "Nama belakang minimal 2 karakter")
      .required("Nama belakang wajib diisi"),
    password: Yup.string()
      .min(8, "Password minimal 8 karakter")
      .required("Password wajib diisi")

      .max(25, "Password maksimal 25 karakter")
      
      .matches(
        /^(?=.*\d)/,
        "Password harus memiliki minimal 1 angka"
      ),
      

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password harus sama")
      .required("Konfirmasi password wajib diisi"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendRegistrationData(values);
    },
  });

  return (
    <div className="flex h-screen">
      {/* Bagian kiri: Form */}
      <div className="w-1/2 flex items-center justify-center ">
        <div className="max-w-md p-6">
          <div className="flex gap-2 justify-center">
            <img src={logo} alt="Ikon Logo" className="h-8 w-auto" />
            <h2 className="text-2xl font-bold text-center mb-6">SIMS PPOB</h2>
          </div>
          <h2 className="text-3xl font-bold text-center mb-6">
            Lengkapi data untuk membuat akun
          </h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Input Email */}
            <div className="relative mb-4">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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

            {/* Input Nama Depan */}
            <div className="relative mb-4">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="firstName"
                placeholder="Nama Depan"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className={`w-full pl-10 py-2 border ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:outline-none ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "focus:ring-red-500"
                    : "focus:ring-black"
                }`}
              />
            </div>
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 text-xs -mt-4 mb-2">
                {formik.errors.firstName}
              </p>
            )}

            {/* Input Nama Belakang */}
            <div className="relative mb-4">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="lastName"
                placeholder="Nama Belakang"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className={`w-full pl-10 py-2 border ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:outline-none ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "focus:ring-red-500"
                    : "focus:ring-black"
                }`}
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500 text-xs -mt-4 mb-2">
                {formik.errors.lastName}
              </p>
            )}

            {/* Input Password */}
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

            {/* Input Konfirmasi Password */}
            <div className="relative mb-4">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Konfirmasi Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={`w-full pl-10 pr-10 py-2 border ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:ring-2 focus:outline-none ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "focus:ring-red-500"
                    : "focus:ring-black"
                }`}
              />
              <div
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </div>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-xs -mt-4 mb-2">
                  {formik.errors.confirmPassword}
                </p>
              )}

            {/* Tombol Register */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-red-600 transition"
            >
              Register
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-gray-600 lg:text-caption-1 text-caption-2">
              Sudah memiliki akun? login
              <Link to="/login" className="pl-1 font-semibold text-primary">
                di sini
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bagian kanan: Gambar */}
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

export default Register;
