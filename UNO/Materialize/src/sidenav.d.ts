import { Component, BaseOptions, InitElements, MElement, Openable } from "./component";
export interface SidenavOptions extends BaseOptions {
    /**
     * Side of screen on which Sidenav appears.
     * @default 'left'
     */
    edge: 'left' | 'right';
    /**
     * Allow swipe gestures to open/close Sidenav.
     * @default true
     */
    draggable: boolean;
    /**
     * Width of the area where you can start dragging.
     * @default '10px'
     */
    dragTargetWidth: string;
    /**
     * Length in ms of enter transition.
     * @default 250
     */
    inDuration: number;
    /**
     * Length in ms of exit transition.
     * @default 200
     */
    outDuration: number;
    /**
     * Prevent page from scrolling while sidenav is open.
     * @default true
     */
    preventScrolling: boolean;
    /**
     * Function called when sidenav starts entering.
     */
    onOpenStart: (elem: HTMLElement) => void;
    /**
     * Function called when sidenav finishes entering.
     */
    onOpenEnd: (elem: HTMLElement) => void;
    /**
     * Function called when sidenav starts exiting.
     */
    onCloseStart: (elem: HTMLElement) => void;
    /**
     * Function called when sidenav finishes exiting.
     */
    onCloseEnd: (elem: HTMLElement) => void;
}
export declare class Sidenav extends Component<SidenavOptions> implements Openable {
    id: string;
    /** Describes open/close state of Sidenav. */
    isOpen: boolean;
    /** Describes if sidenav is fixed. */
    isFixed: boolean;
    /** Describes if Sidenav is being dragged. */
    isDragged: boolean;
    lastWindowWidth: number;
    lastWindowHeight: number;
    static _sidenavs: Sidenav[];
    private _overlay;
    dragTarget: Element;
    private _startingXpos;
    private _xPos;
    private _time;
    private _width;
    private _initialScrollTop;
    private _verticallyScrolling;
    private deltaX;
    private velocityX;
    private percentOpen;
    constructor(el: HTMLElement, options: Partial<SidenavOptions>);
    static get defaults(): SidenavOptions;
    /**
     * Initializes instance of Sidenav.
     * @param el HTML element.
     * @param options Component options.
     */
    static init(el: HTMLElement, options?: Partial<SidenavOptions>): Sidenav;
    /**
     * Initializes instances of Sidenav.
     * @param els HTML elements.
     * @param options Component options.
     */
    static init(els: InitElements<MElement>, options?: Partial<SidenavOptions>): Sidenav[];
    static getInstance(el: HTMLElement): Sidenav;
    destroy(): void;
    _createOverlay(): void;
    _setupEventHandlers(): void;
    _removeEventHandlers(): void;
    _handleTriggerClick(e: any): void;
    _startDrag(e: any): void;
    _dragMoveUpdate(e: any): void;
    _handleDragTargetDrag: (e: any) => void;
    _handleDragTargetRelease: () => void;
    _handleCloseDrag: (e: any) => void;
    _handleCloseRelease: () => void;
    _handleCloseTriggerClick: (e: any) => void;
    _handleWindowResize: () => void;
    _setupClasses(): void;
    _removeClasses(): void;
    _setupFixed(): void;
    _isCurrentlyFixed(): boolean;
    _createDragTarget(): void;
    _preventBodyScrolling(): void;
    _enableBodyScrolling(): void;
    /**
     * Opens Sidenav.
     */
    open: () => void;
    /**
     * Closes Sidenav.
     */
    close: () => void;
    _animateIn(): void;
    _animateSidenavIn(): void;
    _animateOverlayIn(): void;
    _animateOut(): void;
    _animateSidenavOut(): void;
    _animateOverlayOut(): void;
}
//# sourceMappingURL=sidenav.d.ts.map