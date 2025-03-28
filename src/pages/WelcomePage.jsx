import "../App.css";

function WelcomePage () {
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

            <div className="relative w-full h-[1000px] bg-gray-100 overflow-hidden">

                {/* Phần chữ */}
                <div className="absolute top-[50px] left-[50px] z-20">
                    <div className="text-[64px] font-bold leading-[0.5]">
                        <p className="text-[#4F4F4F]">
                            CREATE YOUR <span className="text-[#4FD1C5]">GEAR</span>
                        </p>
                        <p className="text-[#4F4F4F]">
                            BUILD YOUR <span className="text-[#4FD1C5]">DREAM</span>
                        </p>
                    </div>

                    <div className="mt-[50px] w-[260px] h-[60px] bg-[#4FD1C5] rounded-[10px] flex items-center justify-center cursor-pointer">
                        <span className="text-[24px] text-[white] font-[Arial] font-[800]">
                            Create an account
                        </span>
                    </div>
                </div>


                <div className="relative w-full h-full">
                    <img
                        src="/public/Image 3.png"
                        className="absolute w-[556px] h-[365px] top-[900px] left-[-150px] rotate-[-27deg] z-10"
                    />
                    
                    
                    <img
                        src="/public/Image 1.png"
                        className="absolute w-[556px] h-[365px] top-[620px] left-[380px] rotate-[-27deg] z-10"
                    />

                    <img
                        src="/public/Image 3.png"
                        className="absolute w-[556px] h-[365px] top-[350px] left-[900px] rotate-[-27deg] z-10"
                    />

                    <img
                        src="/public/Image 1.png"
                        className="absolute w-[556px] h-[365px] top-[82px] left-[1420px] rotate-[-27deg] z-10"
                    />
                    
                    <img
                        src="/public/Image 2.png"
                        className="absolute w-[556px] h-[365px] top-[810px] left-[900px] rotate-[-27deg] z-10"
                    />

                    <img
                        src="/public/Image 6.png"
                        className="absolute w-[556px] h-[365px] top-[530px] left-[1450px] rotate-[-27deg] z-10"
                    />
                </div>

            </div>



        </>
    );
}

export default WelcomePage;
