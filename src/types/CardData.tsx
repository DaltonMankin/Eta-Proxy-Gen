export default interface CardData {
    cardName: string;
    manaCost: string;
    illustrationFile: File | null;
    illustrationUrl: string | null;
    typeLine: string;
    textBox: string;
    powerToughness: string;
}