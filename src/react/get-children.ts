import React, { type ReactElement, type ReactNode } from 'react';

type SwiperSlot = 'container-start' | 'container-end' | 'wrapper-start' | 'wrapper-end';

export type ChildWithProps = ReactElement<
  { slot?: string; children?: ReactNode } & Record<string, unknown>
>;

function isReactElement(child: unknown): child is ChildWithProps {
  return (
    typeof child === 'object' &&
    child !== null &&
    'type' in (child as object) &&
    'props' in (child as object)
  );
}

function isChildSwiperSlide(child: unknown): child is ChildWithProps {
  if (!isReactElement(child)) return false;
  const { type } = child;
  if (typeof type !== 'function' && typeof type !== 'object') return false;
  const displayName = (type as { displayName?: string }).displayName;
  return !!displayName && displayName.includes('SwiperSlide');
}

function processChildren(c: ReactNode): ChildWithProps[] {
  const slides: ChildWithProps[] = [];
  React.Children.toArray(c).forEach((child) => {
    if (isChildSwiperSlide(child)) {
      slides.push(child);
    } else if (isReactElement(child) && child.props && child.props.children) {
      processChildren(child.props.children).forEach((slide) => slides.push(slide));
    }
  });
  return slides;
}

export interface GetChildrenResult {
  slides: ChildWithProps[];
  slots: Record<SwiperSlot, ChildWithProps[]>;
}

export function getChildren(c: ReactNode): GetChildrenResult {
  const slides: ChildWithProps[] = [];

  const slots: Record<SwiperSlot, ChildWithProps[]> = {
    'container-start': [],
    'container-end': [],
    'wrapper-start': [],
    'wrapper-end': [],
  };

  React.Children.toArray(c).forEach((child) => {
    if (isChildSwiperSlide(child)) {
      slides.push(child);
    } else if (
      isReactElement(child) &&
      child.props &&
      child.props.slot &&
      (child.props.slot as SwiperSlot) in slots
    ) {
      slots[child.props.slot as SwiperSlot].push(child);
    } else if (isReactElement(child) && child.props && child.props.children) {
      const foundSlides = processChildren(child.props.children);
      if (foundSlides.length > 0) {
        foundSlides.forEach((slide) => slides.push(slide));
      } else {
        slots['container-end'].push(child);
      }
    } else if (isReactElement(child)) {
      slots['container-end'].push(child);
    }
  });

  return { slides, slots };
}
