import p5 from 'p5';

export default async function ditherImage(s: p5, img: p5.Image) {
    img.loadPixels();

    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            const [oldR, oldG, oldB, a] = getRGBAtIndex(img, x, y);

            const bright = (0.2126 * oldR) + (0.7152 * oldG) + (0.0722 * oldB);
            const roundedBrightness = s.round(bright / 255) * 255

            setRGBAtIndex(img, x, y, roundedBrightness, roundedBrightness, roundedBrightness, a)

            const errR = oldR - roundedBrightness;
            const errG = oldG - roundedBrightness;
            const errB = oldB - roundedBrightness;

            distributeError(img, x, y, errR, errG, errB);
        }
    }

    img.updatePixels();
}

function getRGBAtIndex(img: p5.Image, x: number, y: number): [number, number, number, number] {
    const i = 4 * (x + y * img.width);

    const r = img.pixels[i];
    const g = img.pixels[i + 1];
    const b = img.pixels[i + 2];
    const a = img.pixels[i + 3];

    return [r, g, b, a]
}

function setRGBAtIndex(img: p5.Image, x: number, y: number, r: number, g: number, b: number, a: number) {
    const i = 4 * (x + y * img.width);

    img.pixels[i] = r;
    img.pixels[i + 1] = g;
    img.pixels[i + 2] = b;
    img.pixels[i + 3] = a;
}

function distributeError(img: p5.Image, x: number, y: number, errR: number, errG: number, errB: number) {
    // Floyd–Steinberg
    // addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
    // addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
    // addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
    // addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);

    // Atkinson
    addError(img, 1 / 8.0, x + 1, y, errR, errG, errB);
    addError(img, 1 / 8.0, x + 2, y + 1, errR, errG, errB);
    addError(img, 1 / 8.0, x - 1, y + 1, errR, errG, errB);
    addError(img, 1 / 8.0, x, y + 1, errR, errG, errB);
    addError(img, 1 / 8.0, x + 1, y, errR, errG, errB);
    addError(img, 1 / 8.0, x, y + 2, errR, errG, errB);
}

function addError(img: p5.Image, factor: number, x: number, y: number, errR: number, errG: number, errB: number) {
    if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;

    const [r, g, b, a] = getRGBAtIndex(img, x, y);

    const newR = r + errR * factor;
    const newG = g + errG * factor;
    const newB = b + errB * factor;

    setRGBAtIndex(img, x, y, newR, newG, newB, a)
}