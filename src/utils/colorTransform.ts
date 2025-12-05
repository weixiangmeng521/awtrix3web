import type { RBGDataType } from "@/hooks/useColorPickerModal";

export function decimalToHexColor(num: number): string {
  return "#" + num.toString(16).padStart(6, "0").toUpperCase();
}

export function hexColorToDecimal(hex: string): number {
  return parseInt(hex.replace("#", ""), 16);
}

export function decimalToRGB(num: number) {
  return {
    r: (num >> 16) & 0xff,
    g: (num >> 8) & 0xff,
    b: num & 0xff
  };
}

export function rgbToInt(obj:RBGDataType): number {
  return (obj.r << 16) | (obj.g << 8) | obj.b;
}