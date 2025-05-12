type ErrorType = (new (message: string) => Error & { name: string });
type ModifierKey = 'ctrl' | 'alt' | 'shift' | 'meta' | 'control' | 'windows' | 'command' | 'search';
type RegularKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' | 'f9' | 'f10' | 'f11' | 'f12' | 'escape' | 'enter' | 'tab' | 'backspace' | 'delete' | 'insert' | 'home' | 'end' | 'pageup' | 'pagedown' | 'arrowup' | 'arrowdown' | 'arrowleft' | 'arrowright' | 'space' | 'plus' | 'minus' | 'equal' | 'bracketleft' | 'bracketright' | 'backslash' | 'semicolon' | 'quote' | 'comma' | 'period' | 'slash';
type Shortcut = `${ModifierKey}+${RegularKey}` | `${ModifierKey}+${ModifierKey}+${RegularKey}` | `${ModifierKey}+${ModifierKey}+${ModifierKey}+${RegularKey}`
type StringRecord<T> = Record<string, T>;

type ID = string & { readonly __brand: unique symbol };

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

type HTMLTag = keyof HTMLElementTagNameMap;

type HTMLElementOf<T extends HTMLTag> = HTMLElementTagNameMap[T];
type SVGElementOf<T extends keyof SVGElementTagNameMap> = SVGElementTagNameMap[T];
type MathMLElementOf<T extends keyof MathMLElementTagNameMap> = MathMLElementTagNameMap[T];

// This type extracts the tag name of an element type
type HTMLElementTagNameOf<T extends HTMLElement> = {
  [K in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[K] extends T ? K : never;
}[keyof HTMLElementTagNameMap];
type SVGElementTagNameOf<T extends SVGElement> = {
  [K in keyof SVGElementTagNameMap]: SVGElementTagNameMap[K] extends T ? K : never;
}[keyof SVGElementTagNameMap];
type MathMLElementTagNameOf<T extends MathMLElement> = {
  [K in keyof MathMLElementTagNameMap]: MathMLElementTagNameMap[K] extends T ? K : never;
}[keyof MathMLElementTagNameMap];

type InputTypeMap = {
  text: string;
  number: number;
  email: string;
  checkbox: boolean;
  date: string;
  color: string;
  password: string;
  // extend if you want
};

type AnyFunc = (...args: any[]) => any;

/** Returns the resulting type(s) of the function(s) given */
type CallbackResult<T extends AnyFunc | readonly AnyFunc[]> = 
  T extends AnyFunc ? ReturnType<T> : 
  T extends readonly [...infer R] ? R extends AnyFunc[] ? { [K in keyof R]: ReturnType<T[K]> } : never : never;

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

interface EventEmitter {
  // Register a listener for a specific event, inferred from event name
  on<T extends string, P extends any[]>(event: T, callback: (...args: P) => void): void;

  // Remove a listener for a specific event
  off<T extends string, P extends any[]>(event: T, callback: (...args: P) => void): void;

  // Emit an event with specific parameters
  emit<T extends string, P extends any[]>(event: T, ...params: P): void;
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
type ElementNode = {
  /** The tag name of the element */
  tag: HTMLTag;
  class?: string;
  text?: string;
  html?: string;
  style?: Record<string, string>,
  children?: ElementNode[] | ElementNode,
  [key: string]: string | Record<string, string> | ElementNode[] | ElementNode | undefined;
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