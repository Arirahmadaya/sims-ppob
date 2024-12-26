import Greeting from "../components/Greeting";
import Others from "../components/Others";
import Promo from "../components/Promo";
import Saldo from "../components/Saldo";

const Home = () => {
  return (
    <div >
     
      <div className="w-full flex px-16">
       
        <div className="w-1/3 p-2">
          <Greeting />
        </div>
       
        <div className="w-2/3 p-2 pl-10 ">
          <Saldo />
        </div>
      </div>

      {/* Bagian bawah dengan Others dan Promo */}
      <div className="mt-8 px-16">
        <Others />
      </div>
      <div className="mt-4 pl-16">
        <Promo />
      </div>
    </div>
  );
};

export default Home;
