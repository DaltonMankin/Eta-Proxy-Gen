import { Fragment, useState } from 'react'

import type CardData from '../../types/CardData';

import ProxyForm from './components/ProxyForm/ProxyForm';
import ProxyP5 from './components/ProxyP5/ProxyP5';

export default function ProxyGeneration() {
  const [cardData, setCardData] = useState<CardData>({
    cardName: "",
    manaCost: "",
    illustrationUrl: null,
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
      <ProxyP5 cardData={cardData} />
    </Fragment>
  );
}