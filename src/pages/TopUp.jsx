import { useState } from "react";

import Greeting from "../components/Greeting";
import Saldo from "../components/Saldo";
const TopUp = () => {
  const [amount, setAmount] = useState("");

  const presetAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

  const handlePresetClick = (value) => {
    setAmount(value);
  };

  const handleInputChange = (e) => {
    setAmount(e.target.value.replace(/[^0-9]/g, "")); // Hanya angka yang diizinkan
  };

  const handleSubmit = () => {
    if (!amount || amount <= 0) {
      alert("Silakan masukkan nominal yang valid.");
      return;
    }
    alert(
      `Top Up berhasil dengan nominal Rp${parseInt(amount).toLocaleString()}`
    );
  };

  return (
    <div className=" px-16">
      <div className="w-full flex ">
        <div className="w-1/3 p-2">
          <Greeting />
        </div>

        <div className="w-2/3 p-2 pl-10 ">
          <Saldo />
        </div>
      </div>

      <div className="w-full mt-10">
        <h1 className="text-xl font-semibold mb-4">Silahkan masukan</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Nominal Top Up
        </h2>
      </div>
      <div className="w-full ">
        <div className="flex items-center space-x-4">
          <div className="relative w-1/2">
            <input
              type="text"
              value={amount}
              onChange={handleInputChange}
              placeholder="Masukkan nominal Top Up"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
            />

            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className={`w-full px-4 py-2 rounded-md text-white font-semibold ${
                  amount
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!amount}
              >
                Top Up
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {presetAmounts.map((value) => (
              <button
                key={value}
                onClick={() => handlePresetClick(value)}
                className={`px-4 py-2 border rounded-md shadow-sm text-base font-medium ${
                  value === parseInt(amount)
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Rp{value.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
