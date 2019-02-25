export interface PathPoint {
    readonly sha?: string;
    readonly rowNumber: number;
    readonly type: PointType;
}

export interface PathLanePoint extends PathPoint {
    readonly laneNumber: number;
}

export interface PathLinePoint extends PathLanePoint {
    readonly startPoint: PathPoint;
    readonly endPoint: PathPoint;
}

export enum PointType {
    LINE = 'LINE',
    NODE = 'NODE',
}
