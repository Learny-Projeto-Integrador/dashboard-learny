import { useState } from "react";

export default function GradientSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`
        w-13 h-7 rounded-full p-1 transition-all duration-300
        flex items-center
        ${enabled 
          ? "bg-gradient-to-r from-[#d96172] to-[#81c0e8]" 
          : "bg-gradient-to-r from-[#417f99] to-[#7c4856]"
        }
      `}
    >
      <div
        className={`
          w-4.5 h-4.5 bg-white rounded-full shadow-md transform transition-all duration-300
          ${enabled ? "translate-x-6" : "translate-x-0"}
        `}
      />
    </button>
  );
}
