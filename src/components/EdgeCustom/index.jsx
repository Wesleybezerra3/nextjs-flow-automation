import React from "react";

const DottedEdge = ({ id, sourceX, sourceY, targetX, targetY, color }) => {
  const distanceX = targetX - sourceX;
  const distanceY = targetY - sourceY;
  const totalDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2); // Calcula a distância total entre os nós

  // Calcula o número de esferas com base na distância total
  const numDots = Math.max(0, Math.floor(totalDistance / 20)); // Pelo menos 5 esferas, aumenta com a distância
  const dots = [];

  for (let i = 0; i <= numDots; i++) {
    const x = sourceX + (distanceX / numDots) * i;
    const y = sourceY + (distanceY / numDots) * i;

    dots.push(
      <circle
        key={`${id}-dot-${i}`}
        cx={x}
        cy={y}
        r={5} // Raio da esfera
        fill={'#ccc'} // Usa a cor passada como propriedade
      />
    );
  }

  return <svg style={{ position: "absolute", overflow: "visible" }}>{dots}</svg>;
};

export default DottedEdge;