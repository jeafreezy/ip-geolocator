/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IconProps extends React.SVGProps<SVGSVGElement> {}

export type TIpInfo = {
  status: string;
  continent: string;
  country: string;
  countryCode: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  currency: string;
  isp: string;
  org: string;
  as: string;
  reverse: string;
  mobile: boolean;
  proxy: boolean;
  ip: string;
  cached: boolean;
};
