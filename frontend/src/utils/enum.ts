export function parseEnumValue<T extends Record<string, string | number>>(
  enumObj: T,
  value: string,
): T[keyof T] | undefined {
  return Object.values(enumObj).includes(value as T[keyof T])
    ? (value as T[keyof T])
    : undefined;
}
