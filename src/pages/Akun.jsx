import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/slices/profileSlice";
import { logout } from "../redux/slices/authSlice";
import defaultUserImage from "../assets/Profile_Photo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserIcon, AtSymbolIcon, PencilIcon } from "@heroicons/react/24/solid";

const Akun = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.profile.user); // Data pengguna dari Redux
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Loading state untuk simpan
  const [formValues, setFormValues] = useState({
    email: user?.email || "",
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
  });
  const [showModal, setShowModal] = useState(false); // State untuk modal konfirmasi

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!formValues.firstName.trim() || !formValues.lastName.trim()) {
      toast.error("Nama depan dan nama belakang tidak boleh kosong.");
      return;
    }

    setIsSaving(true);
    try {
      await dispatch(
        updateProfile({
          first_name: formValues.firstName.trim(),
          last_name: formValues.lastName.trim(),
        })
      ).unwrap();
      toast.success("Profil berhasil diperbarui!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error || "Gagal memperbarui profil. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    toast.info("Berhasil logout.");
    setShowModal(false);

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleProfilePictureUpdate = () => {
    toast.info("Fitur ubah foto profil belum tersedia.");
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {/* Foto Profil */}
      <div className="relative">
        <img
          src={user?.profile_image || defaultUserImage}
          alt="Foto Profil"
          className="w-28 h-28 rounded-full border-2 border-gray-300"
        />
        <button
          className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow"
          onClick={handleProfilePictureUpdate}
        >
          <PencilIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Nama Pengguna */}
      <h2 className="font-bold text-2xl mt-4">{`${formValues.firstName} ${formValues.lastName}`}</h2>

      {/* Form */}
      <div className="w-full max-w-md mt-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="relative rounded-sm">
            <AtSymbolIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`mt-1  pl-10 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                isEditing ? "" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nama Depan
          </label>
          <div className="relative rounded-sm">
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="firstName"
              value={formValues.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`mt-1  pl-10 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                isEditing ? "" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Nama Belakang
          </label>
          <div className="relative rounded-sm">
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`mt-1 py-2  pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                isEditing ? "" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {/* Tombol Aksi */}
        {isEditing ? (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full py-2 rounded-md transition ${
              isSaving
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {isSaving ? "Menyimpan..." : "Simpan"}
          </button>
        ) : (
          <div>
            <button
              onClick={handleEdit}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            >
              Edit Profil
            </button>

            <button
              onClick={handleLogout}
              className="mt-4 w-full max-w-md border border-red-500 text-red-500 py-2 rounded-md hover:bg-red-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Modal Logout */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white py-6 px-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Konfirmasi Logout</h3>
            <hr />
            <p className="text-sm text-gray-600 mt-2">
              Apakah Anda yakin ingin logout?
            </p>
            <div className="flex justify-end mt-6 gap-2 ">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 rounded-full border-black border py-1 bg-gray-500 text-sm text-white  hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                onClick={confirmLogout}
                className="px-3 py-2 bg-red-500 border-black border  text-sm text-white rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Akun;
