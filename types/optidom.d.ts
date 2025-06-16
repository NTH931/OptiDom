//! Errors
type FunctDynamic<T extends abstract new (...args: any) => any> = (new (...params: ConstructorParameters<T>) => InstanceType<T>);

type ErrorType<T extends abstract new (...args: any) => any> = (new (...params: ConstructorParameters<T>) => InstanceType<T> & { name: string });
type NamedErrorType = (new (name: string, message: string) => Parameters<typeof OptiDOM.CustomError> & { name: string })

//! Shortcuts
type ModifierKey = 'ctrl' | 'alt' | 'shift' | 'meta' | 'control' | 'windows' | 'command' | 'search';
type RegularKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' | 'f9' | 'f10' | 'f11' | 'f12' | 'escape' | 'enter' | 'tab' | 'backspace' | 'delete' | 'insert' | 'home' | 'end' | 'pageup' | 'pagedown' | 'arrowup' | 'arrowdown' | 'arrowleft' | 'arrowright' | 'space' | 'plus' | 'minus' | 'equal' | 'bracketleft' | 'bracketright' | 'backslash' | 'semicolon' | 'quote' | 'comma' | 'period' | 'slash';
type Shortcut = `${ModifierKey}+${RegularKey}` | `${ModifierKey}+${ModifierKey}+${RegularKey}` | `${ModifierKey}+${ModifierKey}+${ModifierKey}+${RegularKey}`
type KeyboardEventKey = ModifierKey | RegularKey;

//! Utility Types
type StringRecord<T> = Record<string, T>;

type APIRule = "Disabled" | "Check" | "Enabled"

type placeholder = any;

type GetterKeys<T> = {
  [K in keyof T]-?: T[K] extends Function ? never : (
    { -readonly [P in K]: T[K] } extends { [P in K]: T[K] } ? K : never
  )
}[keyof T];

type SetterKeys<T> = {
  [K in keyof T]-?: T[K] extends Function ? never : (
    { -readonly [P in K]: T[P] } extends { [P in K]: T[P] } ? K : never
  )
}[keyof T];

type AccessorKeys<T> = GetterKeys<T> | SetterKeys<T>;

type Class<T> = abstract new (...args: any[]) => T;

type ShortcutEventInit = Omit<KeyboardEventInit, "altKey" | "ctrlKey" | "shiftKey" | "metaKey" | "key">

const ANSI_CODES = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fgBlack: "\x1b[30m",
  fgRed: "\x1b[31m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgBlue: "\x1b[34m",
  fgMagenta: "\x1b[35m",
  fgCyan: "\x1b[36m",
  fgWhite: "\x1b[37m",

  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
} as const;

type ConsoleStyle = keyof typeof ANSI_CODES;

type ID = string & { readonly __brand: unique symbol };

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

type HTMLTag = keyof HTMLElementTagNameMap | keyof HTMLElementDeprecatedTagNameMap;

type HTMLElementOf<T extends string> = 
  T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] :
  T extends keyof HTMLElementDeprecatedTagNameMap ? HTMLElementDeprecatedTagNameMap[T] :
  HTMLElement;

type SVGElementOf<T extends keyof SVGElementTagNameMap> = 
  SVGElementTagNameMap[T];

type MathMLElementOf<T extends keyof MathMLElementTagNameMap> = 
  MathMLElementTagNameMap[T];

// Extract tag name from element type for HTMLElement
type HTMLElementTagNameOf<T extends HTMLElement> = {
  [K in keyof HTMLElementTagNameMap | keyof HTMLElementDeprecatedTagNameMap]: 
    K extends keyof HTMLElementTagNameMap
      ? HTMLElementTagNameMap[K] extends T ? K : never
      : K extends keyof HTMLElementDeprecatedTagNameMap
        ? HTMLElementDeprecatedTagNameMap[K] extends T ? K : never
        : never
}[keyof HTMLElementTagNameMap | keyof HTMLElementDeprecatedTagNameMap];

// Extract tag name from element type for SVGElement
type SVGElementTagNameOf<T extends SVGElement> = {
  [K in keyof SVGElementTagNameMap]: SVGElementTagNameMap[K] extends T ? K : never;
}[keyof SVGElementTagNameMap];

// Extract tag name from element type for MathMLElement
type MathMLElementTagNameOf<T extends MathMLElement> = {
  [K in keyof MathMLElementTagNameMap]: MathMLElementTagNameMap[K] extends T ? K : never;
}[keyof MathMLElementTagNameMap];

/** Returns the resulting type(s) of the function(s) given */
type CallbackResult<T extends ((...args: any[]) => any) | readonly ((...args: any[]) => any)[]> = 
  T extends ((...args: any[]) => any) ? ReturnType<T> : 
  T extends readonly [...infer R] ? R extends ((...args: any[]) => any)[] ? { [K in keyof R]: ReturnType<T[K]> } : never : never;

type EventMapOf<T> =
  T extends HTMLVideoElement ? HTMLVideoElementEventMap :
  T extends HTMLMediaElement ? HTMLMediaElementEventMap :
  T extends HTMLBodyElement ? HTMLBodyElementEventMap :
  T extends HTMLFrameSetElement ? HTMLFrameSetElementEventMap :
  T extends HTMLElement ? HTMLElementEventMap :

  T extends SVGSVGElement ? SVGSVGElementEventMap :
  T extends SVGElement ? SVGElementEventMap :

  T extends ShadowRoot ? ShadowRootEventMap :
  T extends Document ? DocumentEventMap :
  T extends Window & typeof globalThis ? WindowEventMap :

  T extends Worker ? WorkerEventMap :
  T extends ServiceWorker ? ServiceWorkerEventMap :
  T extends ServiceWorkerRegistration ? ServiceWorkerRegistrationEventMap :
  T extends ServiceWorkerContainer ? ServiceWorkerContainerEventMap :

  T extends RTCPeerConnection ? RTCPeerConnectionEventMap :
  T extends RTCDataChannel ? RTCDataChannelEventMap :
  T extends RTCDTMFSender ? RTCDTMFSenderEventMap :
  T extends RTCDtlsTransport ? RTCDtlsTransportEventMap :
  T extends RTCIceTransport ? RTCIceTransportEventMap :
  T extends RTCSctpTransport ? RTCSctpTransportEventMap :

  T extends AudioScheduledSourceNode ? AudioScheduledSourceNodeEventMap :
  T extends AudioWorkletNode ? AudioWorkletNodeEventMap :
  T extends ScriptProcessorNode ? ScriptProcessorNodeEventMap :
  T extends BaseAudioContext ? BaseAudioContextEventMap :
  T extends OfflineAudioContext ? OfflineAudioContextEventMap :

  T extends AudioDecoder ? AudioDecoderEventMap :
  T extends AudioEncoder ? AudioEncoderEventMap :
  T extends VideoDecoder ? VideoDecoderEventMap :
  T extends VideoEncoder ? VideoEncoderEventMap :

  T extends FontFaceSet ? FontFaceSetEventMap :
  T extends PaymentRequest ? PaymentRequestEventMap :
  T extends PaymentResponse ? PaymentResponseEventMap :

  T extends MediaDevices ? MediaDevicesEventMap :
  T extends MediaStream ? MediaStreamEventMap :
  T extends MediaStreamTrack ? MediaStreamTrackEventMap :
  T extends MediaRecorder ? MediaRecorderEventMap :
  T extends MediaSource ? MediaSourceEventMap :

  T extends MessagePort ? MessagePortEventMap :
  T extends MessageEventTarget<any> ? MessageEventTargetEventMap :
  T extends BroadcastChannel ? BroadcastChannelEventMap :
  T extends WebSocket ? WebSocketEventMap :

  T extends NavigationHistoryEntry ? NavigationHistoryEntryEventMap :
  T extends Notification ? NotificationEventMap :

  T extends Performance ? PerformanceEventMap :
  T extends VisualViewport ? VisualViewportEventMap :
  T extends ScreenOrientation ? ScreenOrientationEventMap :
  T extends RemotePlayback ? RemotePlaybackEventMap :
  T extends WakeLockSentinel ? WakeLockSentinelEventMap :

  T extends TextTrackCue ? TextTrackCueEventMap :
  T extends TextTrack ? TextTrackEventMap :
  T extends TextTrackList ? TextTrackListEventMap :

  T extends SpeechSynthesisUtterance ? SpeechSynthesisUtteranceEventMap :
  T extends SpeechSynthesis ? SpeechSynthesisEventMap :

  T extends MathMLElement ? MathMLElementEventMap :

  T extends IDBOpenDBRequest ? IDBOpenDBRequestEventMap :
  T extends IDBDatabase ? IDBDatabaseEventMap :
  T extends IDBTransaction ? IDBTransactionEventMap :
  T extends IDBRequest ? IDBRequestEventMap :

  T extends XMLHttpRequest ? XMLHttpRequestEventMap :
  T extends XMLHttpRequestEventTarget ? XMLHttpRequestEventTargetEventMap :

  T extends FileReader ? FileReaderEventMap :
  T extends MediaQueryList ? MediaQueryListEventMap :
  T extends EventSource ? EventSourceEventMap :
  T extends PermissionStatus ? PermissionStatusEventMap :

  T extends Animation ? AnimationEventMap :

  T extends MIDIAccess ? MIDIAccessEventMap :
  T extends MIDIInput ? MIDIInputEventMap :
  T extends MIDIPort ? MIDIPortEventMap :

  T extends SourceBufferList ? SourceBufferListEventMap :
  T extends SourceBuffer ? SourceBufferEventMap :

  T extends AbortSignal ? AbortSignalEventMap :

  T extends OffscreenCanvas ? OffscreenCanvasEventMap :

  T extends Element ? ElementEventMap :
  T extends GlobalEventHandlers ? GlobalEventHandlersEventMap :
  T extends WindowEventHandlers ? WindowEventHandlersEventMap :
  T extends AbstractWorker ? AbstractWorkerEventMap :

  GlobalEventHandlersEventMap; // fallback


//! Interfaces

interface OptiDOMConfig {
  globalSelector?: boolean,
  apiRules?: APIRule | {
    storage?: APIRule,
    geolocation?: APIRule,
    history?: APIRule,
    navigator?: APIRule,
    [api: string]: APIRule
  },
  disableDeprecated?: "JSBase" | "OptiDOMReplaced" | "All",
  allowDOMWrite?: boolean,
  denyBrowsers?: boolean,
  htmlOnly?: boolean,
  useFetchCORS?: boolean,
  [key: string]: OptiDOMConfig[typeof key]
}


/**
 * @optidom
 * @deprecated
 */
interface HTMLElementCascade {
  element: keyof HTMLElementTagNameMap;
  id?: string;
  className?: string | string[];
  children?: HTMLElementCascade[] | HTMLElementCascade;
  [key: string]: any
}

interface EventEmitter<M extends Record<string, (...args: any[]) => void>> {
  // Register a listener, narrow the event map by extending it
  on<T extends string, P extends (...args: any[]) => void>(
    event: T,
    callback: P
  ): asserts this is EventEmitter<M & Record<T, P>>;

  // Remove a listener for a known event
  off<T extends keyof M>(
    event: T
  ): asserts this is EventEmitter<Omit<M, T>>;

  // Remove a listener for unknown event
  off<T extends string>(event: T): void;

  // Emit a known event
  emit<T extends keyof M>(event: T, ...params: Parameters<M[T]>): void;

  // Emit an unknown event (fallback)
  emit<T extends string>(event: T, ...params: any[]): void;
}

/* New Classes */
/**
 * @optidom
 */
type HTMLAttrs = {
  text?: string,
  html?: string,
  id?: string;
  class?: string | string[];
  style?: { [key: string]: string };
  [key: string]: any 
};

/**
 * @optidom
 */
interface OptiDOMFeature {
  enable(): void;
  disable(): void;
  [key: `_${string}`]: any;
}

/**
 * @optidom
 */
type ElementProps<T extends HTMLTag> = Partial<
  Pick<
    HTMLElementOf<T>,
    keyof HTMLElementOf<T> extends string ? keyof HTMLElementOf<T> : never
  >
>;

/**
 * @optidom
 */
type ElementNode = {
  tag: HTMLTag;
  class?: string;
  text?: string;
  html?: string;
  style?: Record<string, string | number>;
  children?: ElementNode | ElementNode[];
  [key: string]: 
    | string 
    | number
    | Style
    | ElementNode
    | ElementNode[]
    | undefined;
};

/**
 * @optidom
 */
interface HTMLElementCreator {
  el(tag: keyof HTMLElementTagNameMap, attrs?: HTMLAttrs): HTMLElementCreator;
  container(tag: keyof HTMLElementTagNameMap, attrs?: HTMLAttrs): HTMLElementCreator;
  up(): HTMLElementCreator;
  append(element: HTMLElement): void;
  get element(): HTMLElement;
}

const enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT"
}