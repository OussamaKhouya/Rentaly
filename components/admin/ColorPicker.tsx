import { HexColorInput, HexColorPicker } from "react-colorful";
import { useState } from "react";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value = "#000000", onPickerChange }: Props) => {
  // Ensure value is a valid hex color or default to black
  const safeColor = value && /^#[0-9A-Fa-f]{6}$/.test(value) ? value : "#000000";
  
  return (
    <div className="relative">
      <div className="flex flex-row items-center">
        <p>#</p>
        <HexColorInput
          color={safeColor}
          onChange={onPickerChange}
          className="hex-input"
        />
      </div>
      <HexColorPicker color={safeColor} onChange={onPickerChange} />
    </div>
  );
};

export default ColorPicker;
