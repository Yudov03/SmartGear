import "../App.css";

function Footer() {
  return (
    <footer className="ml-[100px] px-8 py-4 ">
      <div className="flex items-center">
        <div className="flex flex-[2]">
          <p className="pl-2 text-[#A0AEC0] font-[Arial]">
            @ 2025, Made with <span className="text-red-500">❤️</span> by
            <span className="font-bold text-[#4FD1C5]"> Duy Vo</span>,
            <span className="font-bold text-[#4FD1C5]"> Vy Phan</span>,
            <span className="font-bold text-[#4FD1C5]"> Khoa Do</span> &
            <span className="font-bold text-[#4FD1C5]"> Anh Nguyen</span> for
            helping HCMUT students
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
