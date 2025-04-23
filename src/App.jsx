import React, { useEffect, useRef, useState } from 'react';

const App = () => {
  const canvasRef = useRef(null);
  const [circle, setCircle] = useState({ x: 200, y: 200 });
  const radius = 50;
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = 'magenta';
    const ctx = canvas.getContext('2d');
    draw(ctx);

    canvas.onmousedown = handleMouseDown;
    canvas.onmousemove = handleMouseMove;
    canvas.onmouseup = handleMouseUp;
    canvas.onmouseleave = handleMouseUp;

    return () => {
      canvas.onmousedown = null;
      canvas.onmousemove = null;
      canvas.onmouseup = null;
      canvas.onmouseleave = null;
    };
  }, [circle, isDragging]);

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'pink';
    ctx.fill();
    ctx.closePath();
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const dx = mouseX - circle.x;
    const dy = mouseY - circle.y;
    if (Math.sqrt(dx * dx + dy * dy) <= radius) {
      setIsDragging(true);
      setOffset({ x: mouseX - circle.x, y: mouseY - circle.y });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const newX = mouseX - offset.x;
    const newY = mouseY - offset.y;
    setCircle({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
};

export default App;
