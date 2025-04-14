/* eslint-disable no-var */
interface Node {
  /**
   * Returns the parent element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/parentElement)
   * 
   * @deprecated
   * @migrate Use {@link Node.getParent} instead
   */
  readonly parentElement: HTMLElement | null;
}

interface Document {
  /**
   * Returns the HTTP cookies that apply to the Document. If there are no cookies or cookies can't be applied to this resource, the empty string will be returned.
   *
   * Can be set, to add a new cookie to the element's set of HTTP cookies.
   *
   * If the contents are sandboxed into a unique origin (e.g. in an iframe with the sandbox attribute), a "SecurityError" DOMException will be thrown on getting and setting.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/cookie)
   * @deprecated
   * @migrate {@link Cookie}
   */
  cookie: string;

  /**
   * @deprecated
   * @migrate {@link document.ready}
   */
  addEventListener(type: "DOMContentLoaded", listener: (this: Document, ev: Event) => any, options?: boolean | AddEventListenerOptions): void
}

interface Window {
  /** 
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/innerHeight) 
   * @deprecated
   * @migrate {@link window.height}
   */
  readonly innerHeight: number;
  /** 
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/innerWidth) 
   * @deprecated
   * @migrate {@link window.width}
   */
  readonly innerWidth: number;
}

/** 
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/localStorage) 
 * @deprecated
 * @migrate {@link LocalStorage}
 */
declare var localStorage: Storage;

/** 
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/sessionStorage) 
 * @deprecated
 * @migrate {@link SessionStorage}
 */
declare var sessionStorage: Storage;