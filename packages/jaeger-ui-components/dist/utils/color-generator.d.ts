export declare class ColorGenerator {
    colorsHex: string[];
    colorsRgb: [number, number, number][];
    cache: Map<string, number>;
    currentIdx: number;
    constructor(colorsHex?: string[]);
    _getColorIndex(key: string): number;
    /**
     * Will assign a color to an arbitrary key.
     * If the key has been used already, it will
     * use the same color.
     */
    getColorByKey(key: string): string;
    /**
     * Retrieve the RGB values associated with a key. Adds the key and associates
     * it with a color if the key is not recognized.
     * @return {number[]} An array of three ints [0, 255] representing a color.
     */
    getRgbColorByKey(key: string): [number, number, number];
    clear(): void;
}
declare const _default: ColorGenerator;
export default _default;
