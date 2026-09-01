import type CardData from '../../types/CardData';

export default function ProxyCanvas({ cardData }: { cardData: CardData | null }) {
  return (
    <div>
      <h2>Proxy Canvas</h2>
      <pre>{ JSON.stringify(cardData, null, 2) }</pre>
    </div>
  );
}