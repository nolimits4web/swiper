# Swiper React (WIP)

- [Installation](#installation)
- [Usage](#usage)
- [`Swiper` props](#swiper-props)
- [`SwiperSlide` props](#swiperslide-props)
- [Slots](#slots)
- [Virtual Slides](#virtual-slides)
- [TypeScript Definitions](#typescript-definitions)

## Installation

Install "next" version of Swiper:

```
npm i swiper@next
```

## Usage

`swiper/react` exports 2 components `Swiper` and `SwiperSlide`.

```jsx
import { Swiper, SwiperSlide } from 'swiper/react';

export default () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
  );
};
```

By default Swiper React uses core version of Swiper (without any additional components). If you want to use Navitation, Pagination and other, you have to install them first:

```jsx
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
  );
};
```

Note, Swiper react component will create required elements for Navigation, Pagination and Scrollbar if you pass these params without specifying its elements (e.g. without `navigation.nextEl`, `pagination.el`, etc.)

## `Swiper` props

`Swiper` React component receive all [Swiper parameters](https://swiperjs.com/api/#parameters) as component props, plus some extra props:

| Name       | Type               | Default | Description                            |
| ---------- | ------------------ | ------- | -------------------------------------- |
| tag        | `string`           | `'div'` | Main Swiper container HTML element tag |
| wrapperTag | `string`           | `'div'` | Swiper wrapper HTML element tag        |
| onSwiper   | (`swiper`) => void |         | Callback that receives Swiper instance |

Also it supports all [Swiper events](https://swiperjs.com/api/#events) in `onEventname` format. For example `slideChange` event becomes `onSlideChange` prop:

```jsx
<Swiper
  onSlideChange={() => {/*...*/}}
  onReachEnd={() => {/*...*/}}
  ...
>
```

## `SwiperSlides` props

| Name | Type      | Default | Description                                       |
| ---- | --------- | ------- | ------------------------------------------------- |
| tag  | `string`  | `'div'` | Swiper Slide HTML element tag                     |
| zoom | `boolean` | `false` | Enables additional wrapper required for zoom mode |

## Slots

Swiper React uses "slots" for content distribution. There are 4 slots available

- `container-start` - element will be added to the beginning of swiper-container
- `container-end` (default) - element will be added to the end of swiper-container
- `wrapper-start` - element will be added to the beginning of swiper-wrapper
- `wrapper-end` - element will be added to the end of swiper-wrapper

For example:

```jsx
<Swiper>
  <SwiperSlide>Slide 1</SwiperSlide>
  <SwiperSlide>Slide 2</SwiperSlide>
  <span slot="container-start">Container Start</span>
  <span slot="container-end">Container End</span>
  <span slot="wrapper-start">Wrapper Start</span>
  <span slot="wrapper-end">Wrapper End</span>
</Swiper>
```

Will be rendered as:

```html
<div class="swiper-container">
  <span slot="container-start">Container Start</span>
  <div class="swiper-wrapper">
    <span slot="wrapper-start">Wrapper Start</span>
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <span slot="wrapper-end">Wrapper End</span>
  </div>
  <span slot="container-end">Container End</span>
</div>
```

## Virtual Slides

Virtual Slides rendering here is fully handled by React and not required anything except setting `virtual:true` property:

```jsx
import { Swiper, SwiperSlide } from 'swiper/react';

export default () => {
  // Create array with 1000 slides
  const slides = Array.from({ length: 1000 }).map((el, index) => `Slide ${index + 1}`);

  return (
    <Swiper spaceBetween={50} slidesPerView={3} virtual>
      {slides.map((slideContent) => {
        <SwiperSlide key={slideContent}>{slideContent}</SwiperSlide>;
      })}
    </Swiper>
  );
};
```

## TypeScript Definitions

Swiper v6 is fully typed, it exports `Swiper` and `SwiperOptions` types:

```js
import { SwiperOptions } from 'swiper';

const swiperParams: SwiperOptions = {
  slidesPerView: 3,
  spaceBetween: 50,
};
export default () => {
  return <Swiper {...swiperParams}></Swiper>;
};
```

## Found Issue?

If you have found any issues or bugs with it, [open issue in Swiper repository](https://github.com/nolimits4web/swiper/issues/new)
