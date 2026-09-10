import { Fragment, useRef, useEffect } from 'react'

import type CardData from '../../types/CardData';

export default function ProxyCanvas({ cardData }: { cardData: CardData }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCard = (context: CanvasRenderingContext2D, cardData: CardData) => {
    if (cardData.illustration) {
      const reader = new FileReader();
      reader.readAsDataURL(cardData.illustration as File);

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          context.fillStyle = '#000000'
          context.font = "24px serif";
          context.strokeRect(0, 0, context.canvas.width, context.canvas.height);
          context.drawImage(img, 5, 30, 240, 240 * (img.height / img.width));
          context.fillText(cardData.cardName, 5, 25);
          context.fillText(cardData.manaCost, 225, 25);
          context.fillText(cardData.typeLine, 5, 240);
          context.fillText(cardData.textBox, 5, 260);
          context.fillText(cardData.powerToughness, 200, 345);
        }
      };
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    drawCard(context, cardData);
  }, [drawCard, cardData]);

  return (
    <Fragment>
      <h2>Proxy Canvas</h2>
      <canvas ref={canvasRef} width={250} height={350}></canvas>
    </Fragment>
  );
}