import pbb from "../assets/PBB.png";
import listrik from "../assets/Listrik.png";
import pulsa from "../assets/Pulsa.png";
import pdam from "../assets/PDAM.png";
import pgn from "../assets/PGN.png";
import tv from "../assets/Televisi.png";
import musik from "../assets/Musik.png";
import vg from "../assets/Game.png";
import vm from "../assets/Voucher_Makanan.png";
import kurban from "../assets/Kurban.png";
import zakat from "../assets/Zakat.png";
import paket from "../assets/Paket_Data.png";

const Others = () => {
  const items = [
    {
      src: pbb,
      title: "PBB",
    },
    {
      src: listrik,
      title: "Listrik",
    },
    {
      src: pulsa,
      title: "Pulsa",
    },
    {
      src: pdam,
      title: "PDAM",
    },
    {
      src: pgn,
      title: "PGN",
    },
    {
      src: tv,
      title: "TV Langganan",
    },
    {
      src: musik,
      title: "Musik",
    },
    {
      src: vg,
      title: "Voucher Game",
    },
    {
      src: vm,
      title: "Voucher Makanan",
    },
    {
      src: kurban,
      title: "Kurban",
    },
    {
      src: zakat,
      title: "Zakat",
    },
    {
      src: paket,
      title: "Paket Data",
    },
  ];

  return (
    <div>
      <div className="flex gap-7 items-center">
        {items.map((item, index) => (
          <div key={index} className="max-w-20 h-32 ">
            <div className="w-full flex justify-center">
              <img src={item.src} alt={item.title} className="w-16 h-16" />
            </div>

            <h2 className="text-sm mt-2 text-center">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Others;
