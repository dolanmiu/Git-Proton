// tslint:disable:no-object-mutation
import { PathFinder, PathResult } from './path-finder';
import { PathLanePoint, PathPoint, PointType } from './path-point';

export class Rendered {
    // tslint:disable-next-line:readonly-keyword
    private rows: PathLanePoint[][] = [];
    private readonly fullPaths: PathLanePoint[][] = [];

    private readonly nodesAlreadyAdded: Map<string, PathLanePoint> = new Map<string, PathLanePoint>();

    public addPath(pathResult: PathResult): void {
        const fullPath: PathLanePoint[] = [];
        for (let i = 0; i < pathResult.total.length; i++) {
            const pathPoint = pathResult.total[i];

            if (!this.rows[pathPoint.rowNumber]) {
                this.rows[pathPoint.rowNumber] = [];
            }

            const newPointPath: PathLanePoint = {
                ...pathPoint,
                laneNumber: this.rows[pathPoint.rowNumber].length,
            };

            if (!this.nodesAlreadyAdded.has(newPointPath.sha!)) {
                this.rows[pathPoint.rowNumber].push(newPointPath);
                fullPath.push(newPointPath);
                this.nodesAlreadyAdded.set(newPointPath.sha!, newPointPath);
            } else {
                const oldPoint = this.nodesAlreadyAdded.get(newPointPath.sha!)!;
                fullPath.push(oldPoint);
            }

            const linePath = this.padOutWithLines(pathPoint, pathResult.total[i + 1]);
            fullPath.push(...linePath);
        }

        this.fullPaths.push(fullPath);
    }

    private padOutWithLines(start: PathPoint, end: PathPoint): PathLanePoint[] {
        if (!end) {
            return [];
        }

        const startLine = start.rowNumber + 1;
        const endLine = end.rowNumber - 1;

        if (endLine < startLine) {
            return [];
        }

        const path: PathLanePoint[] = [];

        for (let i = startLine; i <= endLine; i++) {
            if (!this.rows[i]) {
                this.rows[i] = [];
            }

            const newPointPath: PathLanePoint = {
                rowNumber: i,
                type: PointType.LINE,
                laneNumber: this.rows[i].length,
            };

            this.rows[i].push(newPointPath);
            path.push(newPointPath);
        }

        return path;
    }

    public get Rows(): PathPoint[][] {
        return this.rows;
    }

    public get FullPaths(): PathLanePoint[][] {
        return this.fullPaths;
    }
}

export class Graph {
    private readonly paths: PathResult[] = [];
    private readonly connectionMap: Map<string, boolean> = new Map<string, boolean>();

    public static of(commits: GitCommitModel[]): Graph {
        const graph = new Graph();

        for (const commit of commits) {
            const path = PathFinder.find(commits, graph.connectionMap, commit);
            graph.addPath(path);
        }

        return graph;
    }

    public render(): Rendered {
        const rendererd = new Rendered();

        for (const path of this.paths) {
            rendererd.addPath(path);
        }

        console.log(rendererd.FullPaths);

        return rendererd;
    }

    private addPath(path: PathResult): void {
        this.paths.push(path);

        path.total.forEach((pathPoint, i) => {
            // TODO .sha will always be available at this point.
            if (path.total[i + 1]) {
                this.connectionMap.set(`${pathPoint.sha!}-${path.total[i + 1].sha!}`, true);
            }
        });
    }
}
