import { Fragment, useRef, useEffect } from 'react'

import type CardData from '../../types/CardData';

export default function ProxyCanvas({ cardData }: { cardData: CardData }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCard = (context: CanvasRenderingContext2D, cardData: CardData) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = '#000000'
    context.font = "48px serif";
    context.fillText(cardData.cardName, 10, 50);
    context.fillText(cardData.manaCost, 10, 100);
    // context.fillText(cardData.illustration., 10, 150);
    context.fillText(cardData.typeLine, 10, 200);
    context.fillText(cardData.textBox, 10, 250);
    context.fillText(cardData.powerToughness, 10, 300);
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
      <canvas ref={canvasRef} width={400} height={600}></canvas>
      <pre>{ JSON.stringify(cardData, null, 2) }</pre>
    </Fragment>
  );
}