import type CardData from '../../types/CardData';

export default function ProxyForm({ handleOnSubmit }: { handleOnSubmit: (cardData: CardData) => void }) {

    function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const newCardData: CardData = {
            cardName: formData.get("cardName")?.toString() || "",
            manaCost: formData.get("manaCost")?.toString() || "",
            illustration: formData.get("illustration")?.valueOf() as File || null,
            typeLine: formData.get("typeLine")?.toString() || "",
            textBox: formData.get("textBox")?.toString() || "",
            powerToughness: formData.get("powerToughness")?.toString() || "",
        }
        
        handleOnSubmit(newCardData);
    }

    return (
        <form onSubmit={onSubmit}>
            <label>
                Card Name: 
                <input type="text" name="cardName" />
            </label>
            <br />
            <label>
                Mana Cost: 
                <input type="text" name="manaCost" />
            </label>
            <br />
            <label>
                Illustration: 
                <input type="file" accept="image/*" name="illustration" />
            </label>
            <br />
            <label>
                Type Line: 
                <input type="text" name="typeLine" />
            </label>
            <br />
            <label>
                Text Box: 
                <textarea name="textBox" rows={8} />
            </label>
            <br />
            <label>
                Power and Toughness: 
                <input type="text" name="powerToughness" />
            </label>
            <br />
            <button type="reset">Reset</button>
            <button type="submit">Generate</button>
        </form>
    );
}