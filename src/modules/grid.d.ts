export interface GridMethods {}

export interface GridEvents {}

export interface GridOptions {
  /**
   * Number of slides rows, for multirow layout
   *
   * @default 1
   */
  rows?: number;

  /**
   * Can be `'column'` or `'row'`. Defines how slides should fill rows, by column or by row
   *
   * @note if used with loop mode make sure number of slides is even specified in loop mode requirements, or enable `loopAddBlankSlides` parameter
   *
   * @default 'column'
   */
  fill?: 'row' | 'column';
}
