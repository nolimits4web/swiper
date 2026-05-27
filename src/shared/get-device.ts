import { getSupport } from './get-support';

export interface SwiperDevice {
  ios: boolean;
  android: boolean;
  os?: 'ios' | 'android';
}

export interface CalcDeviceOptions {
  userAgent?: string;
}

let deviceCached: SwiperDevice | undefined;

function calcDevice({ userAgent }: CalcDeviceOptions = {}): SwiperDevice {
  if (typeof window === 'undefined') return { ios: false, android: false };

  const support = getSupport();
  const platform = navigator.platform;
  const ua = userAgent || navigator.userAgent;
  const device: SwiperDevice = { ios: false, android: false };

  const isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(ua);
  const isIPhoneOrIPod = /(iPhone\sOS|iOS|iPod)/.test(ua);
  const isIPadDirect = /iPad/.test(ua);
  // iPad on iPadOS 13+ reports as MacIntel; distinguish from a real Mac by touch capability.
  const isIPadMasquerade = platform === 'MacIntel' && support.touch && navigator.maxTouchPoints > 1;
  const isIPad = isIPadDirect || isIPadMasquerade;
  const isWindows = platform === 'Win32';

  if (isAndroid && !isWindows) {
    device.os = 'android';
    device.android = true;
  }
  if (isIPad || isIPhoneOrIPod) {
    device.os = 'ios';
    device.ios = true;
  }
  return device;
}

export function getDevice(overrides: CalcDeviceOptions = {}): SwiperDevice {
  if (!deviceCached) deviceCached = calcDevice(overrides);
  return deviceCached;
}
