type Props = {
    label: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    transparent?: boolean
}

export default function CustomInput({label, value, onChange, transparent}: Props) {
    return (
        <div className={`
            flex items-center p-4 gap-3 w-full h-14 rounded-md
            ${transparent ? "bg-[rgba(255,255,255,0.3)]" : "border-1 border-zinc-200 rounded-md shadow-[0_0_4px_rgba(150,150,150,0.3)]"}
            `}>
            <span className={`${!transparent && "font-bold text-[#4c4c4c]"}`}>{label}:</span>
            <input 
                className={`w-full p-1 ${transparent ? "text-white" : "text-[#4c4c4c]"} focus:outline-none`} 
                name="user" 
                defaultValue={value}
                onChange={onChange}
                />
          </div>
    );
}