import { useSelector } from "react-redux";
import defaultUserImage from "../assets/Profile_Photo.png";

const Greeting = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <p>Memuat data pengguna...</p>;

  return (
    <div>
      <img
        src={user?.profile_image || defaultUserImage}
        alt="Foto Profil"
        className="w-28 h-28 rounded-full"
      />
      <p>Selamat Datang</p>
      <h2 className="font-bold text-xl">
        {user ? `${user.first_name} ${user.last_name}` : "Pengguna"}
      </h2>
    </div>
  );
};

export default Greeting;
