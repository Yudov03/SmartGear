import { useNavigate } from "react-router-dom";
import "../App.css";

function WelcomePage () {
    const navigate = useNavigate();
    return (
        <>
            <div className="mt-[10px] ml-[50px] mr-[50px] h-[100px] flex items-center justify-between p-4 rounded-lg">
                <div className="flex items-center w-[290px] h-[100px] bg-[#4FD1C5] rounded-[10px] p-4">
                    <div className ="ml-[20px]">
                        <img alt="SmartGear logo" className="mr-2" height="70" src="/Gear.svg" width="70"/>
                    </div>
                    <div className ="mr-[20px] ml-[15px]">
                        <span className="text-[26px] text-[white] font-[Arial] font-[950]">
                            SMARTGEAR
                        </span>
                    </div>
                </div>

                <div className="h-[100px] flex items-center space-x-14">
                    <nav className="flex gap-x-[90px]">
                        <a className="text-[26px] text-[black] font-extrabold font-[Arial] no-underline" href="#">Service</a>
                        <a className="text-[26px] text-[black] font-extrabold font-[Arial] no-underline" href="#">Equipment</a>
                        <a className="text-[26px] text-[black] font-extrabold font-[Arial] no-underline" href="#">About us</a>
                        <a className="text-[26px] text-[black] font-extrabold font-[Arial] no-underline" href="#">Blog</a>
                    </nav>

                    
                    <div className="flex ml-[90px] items-center w-[150px] h-[70px] bg-[#4FD1C5] rounded-[10px] justify-center">
                        <a className="text-[26px] font-[800] font-[Arial] text-[white] no-underline" href="#">Sign in</a>
                    </div>
                </div>
            </div>

            {/* Main Hero */}
      <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
        {/* Text block */}
        <div className="absolute top-12 left-12 z-20 space-y-4">
          <h1 className="text-6xl font-bold text-gray-700">
            CREATE YOUR <span className="text-teal-400">GEAR</span><br/>
            BUILD YOUR <span className="text-teal-400">DREAM</span>
          </h1>
          <button
            onClick={() => navigate('/login')}
            className="mt-8 px-8 py-3 bg-teal-400 text-white text-xl rounded-lg"
          >
            Create an account
          </button>
        </div>

        {/* Marquee container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-6xl h-64 overflow-hidden relative">
            {/* Track 1 */}
            <div className="absolute top-0 left-0 w-[200%] h-full flex animate-marquee">
              {[1,2,3,4,5].map(i => (
                <img
                  key={i}
                  src={`/Image${i}.png`}
                  className="w- h object-cover -rotate-27"
                  alt=""
                  style={{width: '100px', height: '100px'}}
                />
              ))}
            </div>
            {/* Track 2 */}
            <div className="absolute bottom-0 left-0 w-[20 flex animate-marquee-reverse">
              {[5,4,3,2,1].map(i => (
                <img
                  key={i}
                  src={`/Image${i}.png`}
                  className="w- h- object-cover -rotate-27"
                  alt=""
                  style={{width: '200px'}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default WelcomePage;