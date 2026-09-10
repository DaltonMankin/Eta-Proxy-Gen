import { Fragment } from 'react'
import p5 from 'p5';

import useP5js from '../../hooks/useP5js';

import type CardData from '../../types/CardData';

export default function ProxyP5({ cardData }: { cardData: CardData }) {
  const sketch = (s: p5) => {
    s.setup = () => {
      s.createCanvas(250, 350);
    }

    s.draw = () => {
      s.background(255);
      s.fill(0);
      s.textSize(24);
      s.text(cardData.cardName, 5, 25);
      s.text(cardData.manaCost, 225, 25);
      s.text(cardData.typeLine, 5, 240);
      s.text(cardData.textBox, 5, 260);
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