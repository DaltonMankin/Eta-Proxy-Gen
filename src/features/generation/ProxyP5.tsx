import { Fragment } from 'react'
import p5 from 'p5';

import useP5js from '../../hooks/useP5js';

import type CardData from '../../types/CardData';

export default function ProxyP5({ cardData }: { cardData: CardData }) {
  const sketch = (s: p5) => {
    s.setup = async () => {
      s.noLoop();
      s.createCanvas(250, 350);
    }

    s.draw = async () => {
      const MARGIN = 4;

      s.background(255);

      if (cardData.illustrationUrl) {
        const img = await s.loadImage(cardData.illustrationUrl as string);
        s.image(img, MARGIN * 2, MARGIN * 2, 250 - (MARGIN * 4), (250 - (MARGIN * 4)) * (img.height / img.width));
      }

      s.textSize(24);
      s.textAlign(s.LEFT, s.TOP);
      let cardNameBounds = s.fontBounds(cardData.cardName, 0, 0);
      s.fill(255);
      s.noStroke();
      s.rect(MARGIN, MARGIN, cardNameBounds.w + MARGIN, cardNameBounds.h + (MARGIN / 2));
      s.fill(0);
      s.text(cardData.cardName, MARGIN + MARGIN - (MARGIN / 2), MARGIN + (MARGIN / 2));

      s.textSize(24);
      s.textAlign(s.LEFT, s.TOP);
      let manaCostBounds = s.fontBounds(cardData.manaCost, 0, 0);
      s.fill(255);
      s.noStroke();
      s.rect(s.width - (manaCostBounds.w + MARGIN + MARGIN), MARGIN, manaCostBounds.w + MARGIN, manaCostBounds.h + (MARGIN / 2));
      s.fill(0);
      s.text(cardData.manaCost, s.width - (manaCostBounds.w + MARGIN + MARGIN - (MARGIN / 2)), MARGIN + (MARGIN / 2));

      s.textSize(24);
      s.textAlign(s.LEFT, s.TOP);
      s.text(cardData.typeLine, 5, 240);

      s.textSize(24);
      s.text(cardData.textBox, 5, 260);

      s.textSize(24);
      s.text(cardData.powerToughness, 200, 345);
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