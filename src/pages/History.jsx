import { useState } from "react";
import Greeting from "../components/Greeting";
import Saldo from "../components/Saldo";

const dummyTransactions = [
  { id: 1, amount: 10000, type: "credit", date: "17 Agustus 2023", time: "12:10 WIB", description: "Top Up Saldo" },
  { id: 2, amount: 40000, type: "debit", date: "17 Agustus 2023", time: "13:10 WIB", description: "Pulsa Prabayar" },
  { id: 3, amount: 10000, type: "debit", date: "17 Agustus 2023", time: "14:10 WIB", description: "Listrik Pascabayar" },
  { id: 4, amount: 50000, type: "credit", date: "17 Agustus 2023", time: "15:10 WIB", description: "Top Up Saldo" },
  { id: 5, amount: 50000, type: "credit", date: "17 Agustus 2023", time: "16:10 WIB", description: "Top Up Saldo" },
  { id: 6, amount: 20000, type: "debit", date: "18 Agustus 2023", time: "10:10 WIB", description: "Pembelian Pulsa" },
  { id: 7, amount: 30000, type: "credit", date: "18 Agustus 2023", time: "11:10 WIB", description: "Top Up Saldo" },
];

const TransactionHistory = () => {
  const [offset, setOffset] = useState(0);
  const limit = 5;

  // Data yang akan dirender
  const visibleTransactions = dummyTransactions.slice(0, offset + limit);

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <div className="px-16">
      <div className="w-full flex ">
       
       <div className="w-1/3 p-2">
         <Greeting />
       </div>
      
       <div className="w-2/3 p-2 pl-10 ">
         <Saldo />
       </div>
     </div>
     <div className="w-full  mt-8">
      <h2 className="text-2xl font-bold mb-4">Semua Transaksi</h2>
      <div className="space-y-4">
        {visibleTransactions.map((transaction, index) => (
          <div
            key={`${transaction.id}-${index}`}
            className="flex items-center justify-between border p-4 rounded-md shadow-sm"
          >
            <div>
              <p
                className={`text-lg font-bold ${
                  transaction.type === "credit" ? "text-green-500" : "text-red-500"
                }`}
              >
                {transaction.type === "credit" ? "+" : "-"} Rp.
                {transaction.amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                {transaction.date} • {transaction.time}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-700">
              {transaction.description}
            </p>
          </div>
        ))}
      </div>
      {offset + limit < dummyTransactions.length && (
        <div className="text-center mt-4">
          <button
            onClick={handleShowMore}
            className="text-red-500 font-semibold hover:underline"
          >
            Show more
          </button>
        </div>
      )}
    </div>
    </div>
   
  );
};

export default TransactionHistory;
