type StaticImageData = {
    src: string;
    height: number;
    width: number;
    placeholder?: string;
};

declare module '*.png' {
    const content: StaticImageData;
    export default content;
}

declare module '*.svg' {
    const content: React.FC<React.SVGProps<SVGSVGElement>>;
    export default content;
}

declare module '*.jpg' {
    const content: StaticImageData;
    export default content;
}

declare module '*.jpeg' {
    const content: StaticImageData;
    export default content;
}

declare module '*.gif' {
    const content: StaticImageData;
    export default content;
}

declare module '*.webp' {
    const content: StaticImageData;
    export default content;
}

declare module '*.ico' {
    const content: StaticImageData;
    export default content;
}

declare module '*.svg';
declare module "*.module.css";

declare namespace JSX {
    interface IntrinsicElements {
      "lottie-player": any;
    }
}