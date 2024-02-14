import { BaseOptions, Component, InitElements, MElement } from "./component";
export interface MaterialboxOptions extends BaseOptions {
    /**
     * Transition in duration in milliseconds.
     * @default 275
     */
    inDuration: number;
    /**
     * Transition out duration in milliseconds.
     * @default 200
     */
    outDuration: number;
    /**
     * Callback function called before materialbox is opened.
     * @default null
     */
    onOpenStart: (el: Element) => void;
    /**
     * Callback function called after materialbox is opened.
     * @default null
     */
    onOpenEnd: (el: Element) => void;
    /**
     * Callback function called before materialbox is closed.
     * @default null
     */
    onCloseStart: (el: Element) => void;
    /**
     * Callback function called after materialbox is closed.
     * @default null
     */
    onCloseEnd: (el: Element) => void;
}
export declare class Materialbox extends Component<MaterialboxOptions> {
    /** If the materialbox overlay is showing. */
    overlayActive: boolean;
    /** If the materialbox is no longer being animated. */
    doneAnimating: boolean;
    /** Caption, if specified. */
    caption: string;
    /** Original width of image. */
    originalWidth: number;
    /** Original height of image. */
    originalHeight: number;
    private originInlineStyles;
    private placeholder;
    private _changedAncestorList;
    private newHeight;
    private newWidth;
    private windowWidth;
    private windowHeight;
    private attrWidth;
    private attrHeight;
    private _overlay;
    private _photoCaption;
    constructor(el: HTMLElement, options: Partial<MaterialboxOptions>);
    static get defaults(): MaterialboxOptions;
    /**
     * Initializes instance of MaterialBox.
     * @param el HTML element.
     * @param options Component options.
     */
    static init(el: HTMLElement, options?: Partial<MaterialboxOptions>): Materialbox;
    /**
     * Initializes instances of MaterialBox.
     * @param els HTML elements.
     * @param options Component options.
     */
    static init(els: InitElements<MElement>, options?: Partial<MaterialboxOptions>): Materialbox[];
    static getInstance(el: HTMLElement): Materialbox;
    destroy(): void;
    _setupEventHandlers(): void;
    _removeEventHandlers(): void;
    _handleMaterialboxClick: () => void;
    _handleWindowScroll: () => void;
    _handleWindowResize: () => void;
    _handleWindowEscape: (e: KeyboardEvent) => void;
    _makeAncestorsOverflowVisible(): void;
    private _offset;
    _animateImageIn(): void;
    _animateImageOut(): void;
    _updateVars(): void;
    /**
     * Open materialbox.
     */
    open: () => void;
    /**
     * Close materialbox.
     */
    close: () => void;
}
//# sourceMappingURL=materialbox.d.ts.map