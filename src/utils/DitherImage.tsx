import p5 from 'p5';

export default async function ditherImage(s: p5, img: p5.Image) {
    img.loadPixels();

    for (let i = 0; i < img.pixels.length; i += 4) {
        const r = img.pixels[i]
        const g = img.pixels[i + 1]
        const b = img.pixels[i + 2]

        let bright = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);

        let newColor = s.color(bright);

        img.pixels[i] = s.red(newColor);
        img.pixels[i + 1] = s.green(newColor);
        img.pixels[i + 2] = s.blue(newColor);
        img.pixels[i + 4] = s.alpha(newColor);
    }

    img.updatePixels();
}