import { Fragment, useState } from 'react'

import type CardData from '../../types/CardData';

import ProxyForm from './ProxyForm';
import ProxyCanvas from './ProxyCanvas';

export default function ProxyGeneration() {
  const [formData, setCardData] = useState<CardData | null>(null);

  function handleOnSubmit(formData: FormData) {
      console.log("form data", formData);
      const newCardData: CardData = {
        cardName: formData.get("cardName")?.toString() || "",
        manaCost: formData.get("manaCost")?.toString() || "",
        illustration: formData.get("illustration")?.toString() || "",
        typeLine: formData.get("typeLine")?.toString() || "",
        textBox: formData.get("textBox")?.toString() || "",
        powerToughness: formData.get("powerToughness")?.toString() || "",
      }
      console.log(newCardData);
      setCardData(newCardData);
  }

  return (
    <Fragment>
      <ProxyForm onSubmit={handleOnSubmit} />
      <ProxyCanvas cardData={formData} />
    </Fragment>
  );
}