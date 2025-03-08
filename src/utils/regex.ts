/**
 * Regular expression to validate an IPv4 address.
 *
 * This regex matches an IPv4 address in the format `x.x.x.x` where `x` is a number between 0 and 255.
 * Each octet is validated to ensure it is within the valid range.
 *
 * Examples of valid IP addresses:
 * - 192.168.1.1
 * - 255.255.255.255
 * - 0.0.0.0
 *
 * Examples of invalid IP addresses:
 * - 256.256.256.256 (out of range)
 * - 192.168.1 (missing octet)
 * - 192.168.1.1.1 (extra octet)
 */
export const IP_ADDRESS_REGEX =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
