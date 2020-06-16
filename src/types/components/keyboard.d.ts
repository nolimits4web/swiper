export interface KeyboardMethods {
  /**
   * Whether the keyboard control is enabled
   */
  enabled: boolean;

  /**
   * Enable keyboard control
   */
  enable(): void;

  /**
   * Disable keyboard control
   */
  disable(): void;
}

export interface KeyboardEvents {}

export interface KeyboardOptions {
  /**
   * Set to true to enable keyboard contro
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * When enabled it will control sliders that are currently in viewport
   *
   * @default true
   */
  onlyInViewport?: boolean;
  /**
   * When enabled it will enable keyboard navigation by Page Up and Page Down keys
   *
   * @default true
   */
  pageUpDown?: boolean;
}
