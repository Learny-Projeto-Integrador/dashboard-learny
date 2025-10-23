import Image from "next/image";

type Props = {
  icon: string;
  text: string;
  isNavbarOpen: boolean;
  onClick?: () => void;
};

export default function BtnNavbar({
  icon,
  text,
  isNavbarOpen,
  onClick,
}: Props) {
  return (
    <button
      className={`flex items-center hover:cursor-pointer ${
        isNavbarOpen ?
        "border-1 border-zinc-200 rounded-md p-2 shadow-[0_0_4px_rgba(150,150,150,0.4)] hover:shadow-[0_0_6px_rgba(100,100,100,0.6)]" : "justify-center"
      }`}
      onClick={onClick}
    >
      <div
        className={`flex items-center p-1 rounded-md transition text-sm ${
          isNavbarOpen ? "gap-3" : "justify-center"
        }`}
      >
        {
          <Image
            src={`/icons/${icon}`}
            alt="Close"
            width={24}
            height={24}
            className={`transition-all ${
              !isNavbarOpen && "hover:cursor-pointer hover:scale-110"
            }`}
          />
        }
        <span className="font-bold">{isNavbarOpen && text}</span>
      </div>
    </button>
  );
}
