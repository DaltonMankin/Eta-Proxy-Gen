export default function ProxyForm({ onSubmit }: { onSubmit: (formData: FormData) => void }) {
    return (
        <form action={onSubmit}>
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
                <input type="file" name="illustration" />
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