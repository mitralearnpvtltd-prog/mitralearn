/**
 * Detects the device type and browser from user agent
 */
export function getDeviceInfo(): string {
  const ua = navigator.userAgent;
  
  // Detect device type
  let device = 'Desktop';
  if (/Mobi|Android/i.test(ua)) {
    device = 'Mobile';
  } else if (/Tablet|iPad/i.test(ua)) {
    device = 'Tablet';
  }
  
  // Detect OS
  let os = 'Unknown';
  if (/Windows/i.test(ua)) {
    os = 'Windows';
  } else if (/Mac OS|Macintosh/i.test(ua)) {
    os = /iPhone|iPad/.test(ua) ? 'iOS' : 'macOS';
  } else if (/Android/i.test(ua)) {
    os = 'Android';
  } else if (/Linux/i.test(ua)) {
    os = 'Linux';
  } else if (/CrOS/i.test(ua)) {
    os = 'ChromeOS';
  }
  
  // Detect browser
  let browser = 'Unknown';
  if (/Edg/i.test(ua)) {
    browser = 'Edge';
  } else if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) {
    browser = 'Chrome';
  } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
    browser = 'Safari';
  } else if (/Firefox/i.test(ua)) {
    browser = 'Firefox';
  } else if (/Opera|OPR/i.test(ua)) {
    browser = 'Opera';
  }
  
  return `${device} • ${os} • ${browser}`;
}

/**
 * Parse device info string into components
 */
export function parseDeviceInfo(deviceInfo: string | null): {
  device: string;
  os: string;
  browser: string;
} {
  if (!deviceInfo) {
    return { device: 'Unknown', os: 'Unknown', browser: 'Unknown' };
  }
  
  const parts = deviceInfo.split(' • ');
  return {
    device: parts[0] || 'Unknown',
    os: parts[1] || 'Unknown',
    browser: parts[2] || 'Unknown',
  };
}

/**
 * Get device icon name based on device type
 */
export function getDeviceIcon(deviceInfo: string | null): 'smartphone' | 'tablet' | 'monitor' {
  if (!deviceInfo) return 'monitor';
  
  const { device } = parseDeviceInfo(deviceInfo);
  
  if (device === 'Mobile') return 'smartphone';
  if (device === 'Tablet') return 'tablet';
  return 'monitor';
}
