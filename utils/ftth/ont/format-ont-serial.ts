const SERIAL_VENDOR_PREFIX_BY_HEX: Record<string, string> = {
  '414C434C': 'ALCL',
  '48575443': 'HWTC',
  '534D4253': 'SMBS',
  '5445414E': 'TEAN'
};

export function formatOntSerial(serial: string): string {
  if (!serial) {
    return '-';
  }

  const upperSerial = serial.toUpperCase();

  for (const hexPrefix of Object.keys(SERIAL_VENDOR_PREFIX_BY_HEX)) {
    if (upperSerial.startsWith(hexPrefix)) {
      const vendorPrefix = SERIAL_VENDOR_PREFIX_BY_HEX[hexPrefix];
      const serialFormatted = vendorPrefix + serial.slice(hexPrefix.length);
      return serialFormatted.toUpperCase();
    }
  }

  return serial;
}
