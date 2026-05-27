import type { Slots, VNode } from 'vue';

type VueSlot = 'container-start' | 'container-end' | 'wrapper-start' | 'wrapper-end';

export interface MutableRef<T> {
  value: T;
}

interface ComponentOptionsLegacy {
  tag?: string;
  children?: VNode[];
  Ctor?: unknown;
}

interface VNodeWithLegacy extends VNode {
  componentOptions?: ComponentOptionsLegacy;
}

export interface GetChildrenResult {
  slides: VNodeWithLegacy[];
  slots: Record<VueSlot, VNodeWithLegacy[]>;
}

export function getChildren(
  originalSlots: Slots = {} as Slots,
  slidesRef: MutableRef<VNodeWithLegacy[]>,
  oldSlidesRef: MutableRef<VNodeWithLegacy[]>,
): GetChildrenResult {
  const slides: VNodeWithLegacy[] = [];

  const slots: Record<VueSlot, VNodeWithLegacy[]> = {
    'container-start': [],
    'container-end': [],
    'wrapper-start': [],
    'wrapper-end': [],
  };

  const getSlidesFromElements = (els: unknown, slotName: string): void => {
    if (!Array.isArray(els)) return;
    let effectiveSlot = slotName === 'default' ? 'container-end' : slotName;
    (els as VNodeWithLegacy[]).forEach((vnode) => {
      const isFragment = typeof vnode.type === 'symbol';
      if (isFragment && vnode.children) {
        getSlidesFromElements(vnode.children, effectiveSlot);
        return;
      }
      const typeObj = vnode.type as { name?: string } | null | undefined;
      const legacyTag = vnode.componentOptions?.tag;
      if (
        (typeObj && (typeObj.name === 'SwiperSlide' || typeObj.name === 'AsyncComponentWrapper')) ||
        legacyTag === 'SwiperSlide'
      ) {
        slides.push(vnode);
      } else if ((slots as Record<string, VNodeWithLegacy[] | undefined>)[effectiveSlot]) {
        (slots as Record<string, VNodeWithLegacy[]>)[effectiveSlot]!.push(vnode);
      }
    });
  };

  Object.keys(originalSlots).forEach((slotName) => {
    const slotFn = originalSlots[slotName];
    if (typeof slotFn !== 'function') return;
    const els = slotFn();
    getSlidesFromElements(els, slotName);
  });
  oldSlidesRef.value = slidesRef.value;
  slidesRef.value = slides;

  return { slides, slots };
}
