declare module '*.css' {
    const classNames: Record<string, string>;
    export default classNames;
}
declare module "*.jpg" {
    const value: any;
    export = value;
}
declare module "\*.svg" {
    import React = require("react");
    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}