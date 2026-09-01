import { Fragment, useState } from 'react'

import type CardData from '../../types/CardData';

import ProxyForm from './ProxyForm';
import ProxyCanvas from './ProxyCanvas';

export default function ProxyGeneration() {
  const [cardData, setCardData] = useState<CardData>({
    cardName: "",
    manaCost: "",
    illustration: null,
    typeLine: "",
    textBox: "",
    powerToughness: "",
  });

  function handleOnSubmit(newCardData: CardData) {
      setCardData(newCardData);
  }

  return (
    <Fragment>
      <ProxyForm handleOnSubmit={handleOnSubmit} />
      <ProxyCanvas cardData={cardData} />
    </Fragment>
  );
}