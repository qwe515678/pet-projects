import svgToPath from 'svg-path-converter';

export default function convertSvgToPath(svgString: string) {
    // Check if the input is an SVG string
    if (!svgString.startsWith('<svg')) {
        return 'Not an SVG';
    }

    // Parse the SVG string to a DOM element
    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgString, 'image/svg+xml').documentElement;

    // Convert the SVG element to a path
    const path = svgToPath(svgElement);

    return path;
}
