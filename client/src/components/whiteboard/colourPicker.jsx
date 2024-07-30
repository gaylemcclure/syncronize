import { useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const ColourPicker = ({ setColorWidth }) => {
  const [color, setColor] = useColor("hex", "#121212");
  useEffect(() => {
    setColorWidth(color);
  }, [color]);

  return window.innerWidth < 550 ? (
    <ColorPicker
      width='200px'
      height='200px'
      color={color}
      onChange={setColor}
      hideHSB
      hideHEX
      dark
    />
  ) : (
    <ColorPicker
      width='200px'
      height='200px'
      color={color}
      onChange={setColor}
      hideHSB
      dark
    />
  );
};
export default ColourPicker;
