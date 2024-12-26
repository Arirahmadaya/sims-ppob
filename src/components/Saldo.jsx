import bg from "../assets/Background_Saldo.png";

const Saldo = () => {
  return (
    <div
      className="relative bg-cover bg-center w-full h-40 rounded-md"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 flex flex-col items-start justify-start text-white p-10">
        <h4 className="text-base mb-1">Saldo Anda</h4>
        <h2 className="text-3xl font-bold">Rp 0</h2>
        <h6 className="text-xs mt-[18px]">Lihat Saldo</h6>
      </div>
    </div>
  );
};

export default Saldo;
