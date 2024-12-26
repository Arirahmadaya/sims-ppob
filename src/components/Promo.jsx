import banner1 from "../assets/Banner1.png";
import banner2 from "../assets/Banner2.png";
import banner3 from "../assets/Banner3.png";
import banner4 from "../assets/Banner4.png";
import banner5 from "../assets/Banner5.png";

const Promo = () => {

  const images = [banner1, banner2, banner3, banner4, banner5];

  return (
    <div>
      <h1 className="font-semibold mb-3"> Temukan Promo Menarik</h1>
      <div className="flex gap-2  overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Promo ${index + 1}`}
            className="object-cover rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Promo;
