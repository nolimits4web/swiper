export default function slideToLoop(
  index = 0,
  speed = this.params.speed,
  runCallbacks = true,
  internal,
) {
  if (typeof index === 'string') {
    /**
     * The `index` argument converted from `string` to `number`.
     * @type {number}
     */
    const indexAsNumber = parseInt(index, 10);

    /**
     * Determines whether the `index` argument is a valid `number`
     * after being converted from the `string` type.
     * @type {boolean}
     */
    const isValidNumber = isFinite(indexAsNumber);

    if (!isValidNumber) {
      throw new Error(
        `The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`,
      );
    }

    // Knowing that the converted `index` is a valid number,
    // we can update the original argument's value.
    index = indexAsNumber;
  }

  const swiper = this;
  let newIndex = index;
  if (swiper.params.loop) {
    newIndex += swiper.loopedSlides;
  }

  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}
