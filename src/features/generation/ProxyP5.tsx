import { Fragment } from 'react'
import p5 from 'p5';

import useP5js from '../../hooks/useP5js';

import type CardData from '../../types/CardData';
import type Bounds from '../../types/Bounds';

export default function ProxyP5({ cardData }: { cardData: CardData }) {
  const sketch = (s: p5) => {
    s.setup = async () => {
      s.noLoop();
      s.createCanvas(250, 350);
    }

    s.draw = async () => {
      const MARGIN = 8;

      s.background(0);

      await DrawIllustration(s, cardData, MARGIN);
      const cardNameBounds = await DrawCardName(s, cardData, MARGIN);
      await DrawManaCost(s, cardData, MARGIN);
      await DrawTypeLine(s, cardData, MARGIN, cardNameBounds);
      const powerToughnessBounds = await DrawPowerToughness(s, cardData, MARGIN);
      await DrawTextBox(s, cardData, MARGIN, powerToughnessBounds);
    }
  };

  const p5Ref = useP5js(sketch);
  
  return (
    <Fragment>
      <h2>Proxy P5.js</h2>
      <div ref={p5Ref}></div>
    </Fragment>
  );
}

async function DrawIllustration(s: p5, cardData: CardData, MARGIN: number) {
  s.push();
  if (cardData.illustrationUrl && cardData.illustrationUrl.length > 0) {
    s.imageMode(s.CENTER);
    const img = await s.loadImage(cardData.illustrationUrl as string);

    const imgWidth = s.width - (MARGIN * 2);
    const imgHeight = imgWidth * (img.height / img.width);

    const minY = (MARGIN) + (imgHeight / 2);

    const yPos = minY < s.height * (2 / 7)
      ? s.height * (2 / 7)
      : minY;

    s.translate(s.width / 2, yPos);
    s.image(img, 0, 0, imgWidth, imgHeight);
  }
  s.pop();
}

async function DrawCardName(s: p5, cardData: CardData, MARGIN: number) : Promise<Bounds> {
  if (!cardData.cardName || cardData.cardName.length === 0) {
    return { x: 0, y: 0, w: 0, h: 0 };
  }

  s.push();
  s.textSize(24);
  s.rectMode(s.CENTER);
  s.textAlign(s.CENTER, s.CENTER);
  let bounds = s.textBounds(cardData.cardName, 0, 0);
  s.fill(255);
  s.noStroke();
  s.translate(MARGIN + (bounds.w / 2), MARGIN + (bounds.h / 2));
  s.rect(0, 0, bounds.w + MARGIN, bounds.h + MARGIN);
  s.fill(0);
  s.text(cardData.cardName, 0, 0);
  s.pop();
  
  return {
    x: MARGIN + (bounds.w / 2),
    y: MARGIN + (bounds.h / 2),
    w: bounds.w + MARGIN,
    h: bounds.h + MARGIN,
  };
}

async function DrawManaCost(s: p5, cardData: CardData, MARGIN: number) : Promise<Bounds> {
  if (!cardData.manaCost || cardData.manaCost.length === 0) {
    return { x: 0, y: 0, w: 0, h: 0 };
  }

  s.push();
  s.textSize(24);
  s.rectMode(s.CENTER);
  s.textAlign(s.CENTER, s.CENTER);
  let bounds = s.textBounds(cardData.manaCost, 0, 0);
  s.fill(255);
  s.noStroke();
  s.translate(s.width - (MARGIN + (bounds.w / 2)), MARGIN + (bounds.h / 2));
  s.rect(0, 0, bounds.w + MARGIN, bounds.h + MARGIN);  
  s.fill(0);
  s.text(cardData.manaCost, 0, 0);
  s.pop();
  
  return {
    x: s.width - (MARGIN + (bounds.w / 2)),
    y: MARGIN + (bounds.h / 2),
    w: bounds.w + MARGIN,
    h: bounds.h + MARGIN,
  };
}

async function DrawTypeLine(s: p5, cardData: CardData, MARGIN: number, cardNameBounds: Bounds) : Promise<Bounds> {
  if (!cardData.typeLine || cardData.typeLine.length === 0) {
    return { x: 0, y: 0, w: 0, h: 0 };
  }
  
  s.push();
  s.textSize(24);
  s.rectMode(s.CENTER);
  s.textAlign(s.CENTER, s.CENTER);
  let bounds = s.textBounds(cardData.typeLine, 0, 0);
  s.fill(255);
  s.noStroke();
  s.translate(0, cardNameBounds.y + (cardNameBounds.h / 2));
  s.translate(MARGIN + (bounds.w / 2), MARGIN + (bounds.h / 2));
  s.rect(0, 0, bounds.w + MARGIN, bounds.h + MARGIN);
  s.fill(0);
  s.text(cardData.typeLine, 0, 0);
  s.pop();

  return {
    x: MARGIN + (bounds.w / 2),
    y: cardNameBounds.y + (cardNameBounds.h / 2) + MARGIN + (bounds.h / 2),
    w: bounds.w + MARGIN,
    h: bounds.h + MARGIN,
  };
}

async function DrawPowerToughness(s: p5, cardData: CardData, MARGIN: number) : Promise<Bounds> {
  if (!cardData.powerToughness || cardData.powerToughness.length === 0) {
    return { x: 0, y: 0, w: 0, h: 0 };
  }

  s.push();
  s.textSize(24);
  s.rectMode(s.CENTER);
  s.textAlign(s.CENTER, s.CENTER);
  let bounds = s.textBounds(cardData.powerToughness, 0, 0);
  s.fill(255);
  s.noStroke();
  s.translate(s.width - (MARGIN + (bounds.w / 2)), s.height - (MARGIN + (bounds.h / 2)));
  s.rect(0, 0, bounds.w + MARGIN, bounds.h + MARGIN);  
  s.fill(0);
  s.text(cardData.powerToughness, 0, 0);
  s.pop();
  
  return {
    x: s.width - (MARGIN + (bounds.w / 2)),
    y: s.height - (MARGIN + (bounds.h / 2)),
    w: bounds.w + MARGIN,
    h: bounds.h + MARGIN,
  };
}

async function DrawTextBox(s: p5, cardData: CardData, MARGIN: number, powerToughnessBounds: Bounds) : Promise<Bounds> {
  if (!cardData.textBox || cardData.textBox.length === 0) {
    return { x: 0, y: 0, w: 0, h: 0 };
  }

  s.push();
  s.textSize(24);
  s.rectMode(s.CENTER);
  s.textAlign(s.CENTER, s.CENTER);
  let bounds = s.textBounds(cardData.textBox, 0, 0);
  s.fill(255);
  s.noStroke();
  s.translate(s.width / 2, s.height * (11 / 14));
  s.rect(0, 0, bounds.w + MARGIN, bounds.h + MARGIN);  
  s.fill(0);
  s.text(cardData.textBox, 0, 0);
  s.pop();
  
  return {
    x: s.width / 2,
    y: s.height * (11 / 14),
    w: bounds.w + MARGIN,
    h: bounds.h + MARGIN,
  };
}