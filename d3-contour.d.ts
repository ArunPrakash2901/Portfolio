declare module 'd3-contour' {
  export type ContourPoint = [number, number];
  export type ContourRing = ContourPoint[];
  export type ContourPolygon = ContourRing[];
  export type ContourCoordinates = ContourPolygon[];

  export interface ContourMultiPolygon {
    type: 'MultiPolygon';
    value: number;
    coordinates: ContourCoordinates;
  }

  export interface ContourGenerator {
    (values: Iterable<number>): ContourMultiPolygon[];
    size(size: [number, number]): this;
    thresholds(thresholds: Iterable<number> | number): this;
  }

  export function contours(): ContourGenerator;
}
