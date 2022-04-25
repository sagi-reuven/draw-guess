import { useRef, useEffect, useState } from "react";
import axios from "axios";
const Canvas = () => {
  let canvasElement = document.getElementById("canvas");
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight * 0.6;

    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = async ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    let image = new Image();
    image.src = canvasElement.toDataURL();
    const final = image.src;
    try {
      const res = await axios.post(
        "https://draw-guess-sagi-reuven.herokuapp.com/game/inSession",
        {
          final,
        }
      );
      if (res.data === "game not found") {
        alert("Game Finished");
        window.location =
          "https://draw-guess-sagi-reuven.herokuapp.com/game/inSession";
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <canvas
        id="canvas"
        style={styleCanvas}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </>
  );
};

export default Canvas;
const styleCanvas = {
  border: "1px solid black",
};
