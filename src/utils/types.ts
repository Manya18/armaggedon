export interface asterodData {
  id: number;
  date: string;
  units: string[];
  name: string;
  dangerous: boolean;
  size: number;
}

export interface dataNameDia {
  id: number;
  name: string;
  diameter: number;
}

export interface dataApproach {
  date: string;
  distance: string;
  velocity: string;
  orbita: string;
}
