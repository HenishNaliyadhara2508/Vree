import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const MaterialProgessBar = observer(({name, value, onChange }) => {
  const values = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
  const evenValues = values.filter((val) => Number.isInteger(val * 10) && (val * 10) % 2 === 0);

  // Convert value to index
  const valueIndex = values.indexOf(value);
  const [selectedIndex, setSelectedIndex] = useState(valueIndex !== -1 ? valueIndex : 2);
  const [hover, setHover] = useState(false); // Hover state for label

  useEffect(() => {
    setSelectedIndex(valueIndex !== -1 ? valueIndex : 2);
  }, [value]);

  const setSelected = (index) => {
    setSelectedIndex(index);
    if (onChange) {
      onChange(values[index]);
    }
  };

  const decreaseValue = () => {
    if (selectedIndex > 0) setSelected(selectedIndex - 1);
  };

  const increaseValue = () => {
    if (selectedIndex < values.length - 1) setSelected(selectedIndex + 1);
  };

  return (
    <div className="flex">
        <div className="text-white text-lg ms-5 mt-5 me-10">{name}</div>
    <div className="flex flex-col items-center w-full flex-grow gap-4 mt-10 px-2">
      <div className="relative flex items-center w-full max-w-lg">
        <div className="absolute left-0 right-0 h-1 bg-gray-500 rounded-full" />
        <div
          className="absolute h-1 bg-[#A673FF] rounded-full transition-all duration-300"
          style={{
            left: "0%",
            width: `${(selectedIndex / (values.length - 1)) * 100}%`,
          }}
        />
        {values.map((val, index) => (
          <div key={val} className="relative flex items-center w-full">
            {index > 0 && (
              <div
                className="absolute h-1 cursor-pointer transition bg-transparent hover:bg-[#A673FF]/50"
                style={{ left: "0%", width: "50%" }}
                onClick={() => setSelected(index)}
              />
            )}
            {evenValues.includes(val) && (
              <button
                className="w-2 h-2 rounded-full transition bg-[#A673FF]"
                onClick={() => setSelected(index)}
              />
            )}
            {index === selectedIndex && (
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-sm text-[#A673FF] font-semibold transition-all duration-300 z-10"
                style={{ left: `${(index / (values.length - 1)) * 100}%` }}
              >
                <div
                  className="relative flex items-center rounded-full transition-all duration-300"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  {hover && index > 0 && (
                    <button
                      className="text-[#A673FF] font-bold border p-1 rounded-full border-[#A673FF] bg-[#ffffff]"
                      onClick={decreaseValue}
                    >
                      ➖
                    </button>
                  )}
                  <span className="border border-[#A673FF] px-4 rounded-full p-1 py-2 bg-[#4c0080] relative z-10 hover:bg-[#ffffff]">
                    {val}
                  </span>
                  {hover && index < values.length - 1 && (
                    <button
                      className="text-[#A673FF] font-bold border p-1 rounded-full border-[#A673FF] bg-[#ffffff]"
                      onClick={increaseValue}
                    >
                      ➕
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
});

export default MaterialProgessBar;

