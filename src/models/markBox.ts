export interface D2 {
  x: number,
  y: number
}

export interface DataSet {
  image: string,
  height: number,
  width: number,
  boxes: CoordBox[]
}
export interface BoundingBox {
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
  type: string,
  value: string,
}

export interface CoordBox {
  id: string,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  type: string,
  value: string,
}

export interface RandomColor {
  r: number;
  g: number;
  b: number;
}