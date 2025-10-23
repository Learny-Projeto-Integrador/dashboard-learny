import Image from "next/image";

type Props = {
    icon?: string;
    text: string;
    color: string;
}

export default function CustomButton({icon, text, color}: Props) {
  return (
    <div
      className={`flex w-full items-center ${icon ? "justify-between pr-6" : "justify-center"} text-wite rounded-md px-3 py-4 hover:cursor-pointer`}
      style={{backgroundColor: color}}
    >
        { icon &&
            <Image
            src={`/icons/${icon}`}
            alt="Close"
            width={30}
            height={30}
            className={`transition-all hover:cursor-pointer hover:scale-110`}
            />
        }
        <span className="font-semibold text-white w-full text-center">{text}</span>
    </div>
  );
}
