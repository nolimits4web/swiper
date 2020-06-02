export interface HistoryMethods {}

export interface HistoryEvents {}

export interface HistoryOptions {
  /**
   * Works in addition to hashnav or history to replace current url state with the
   * new one instead of adding it to history
   *
   * @default false
   */
  replaceState?: boolean;

  /**
   * Url key for slides
   *
   * @default 'slides'
   */
  key?: string;
}
