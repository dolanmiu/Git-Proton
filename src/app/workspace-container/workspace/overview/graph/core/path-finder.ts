import { PathPoint, PointType } from './path-point';

export interface PathResult {
    readonly start: PathPoint;
    readonly end?: PathPoint;
    readonly intermediate: PathPoint[];
    readonly total: PathPoint[];
}

export class PathFinder {
    public static find(commits: GitCommitModel[], connectionMap: Map<string, boolean>, start: GitCommitModel): PathResult {
        const shaToCommitMap = this.convertToMap(commits);
        const positionMap = this.convertToPositionMap(commits);

        const result = this.findLongestPath(start.sha.current, shaToCommitMap, positionMap, connectionMap);
        console.log(result);

        const end = result[result.length - 1];
        const intermediates = result.slice(1, -1);

        const startPathPoint: PathPoint = {
            sha: start.sha.current,
            rowNumber: positionMap.get(start.sha.current)!,
            type: PointType.NODE,
        };

        const endPathPoint = end
            ? {
                  sha: end,
                  rowNumber: positionMap.get(end)!,
                  type: PointType.NODE,
              }
            : undefined;

        const intermediatePathPoints = intermediates.map<PathPoint>((sha) => ({
            sha: sha,
            rowNumber: positionMap.get(sha)!,
            type: PointType.NODE,
        }));

        return {
            start: startPathPoint,
            end: endPathPoint,
            intermediate: intermediatePathPoints,
            total:
                startPathPoint.sha === endPathPoint.sha // Check case where there is one point in path
                    ? [startPathPoint]
                    : [startPathPoint, ...intermediatePathPoints, ...(endPathPoint ? [endPathPoint] : [])],
        };
    }

    private static convertToMap(commits: GitCommitModel[]): Map<string, GitCommitModel> {
        return commits.reduce<Map<string, GitCommitModel>>((accumulator, current) => {
            accumulator.set(current.sha.current, current);

            return accumulator;
        }, new Map());
    }

    private static convertToPositionMap(commits: GitCommitModel[]): Map<string, number> {
        return commits.reduce<Map<string, number>>((accumulator, current, i) => {
            accumulator.set(current.sha.current, i);

            return accumulator;
        }, new Map());
    }

    private static findLongestPath(
        commitSha: string,
        commitMap: Map<string, GitCommitModel>,
        positionMap: Map<string, number>,
        connectionMap: Map<string, boolean>,
        path: string[] = [commitSha],
    ): string[] {
        const currentCommit = commitMap.get(commitSha)!;

        const paths: string[][] = [path];

        for (const parent of currentCommit.sha.parents) {
            // Check to end path checking when there are no more nodes left
            if (!commitMap.has(parent)) {
                continue;
            }

            // Check to end path checking when adding final element to the path on to an already existing path.
            if (connectionMap.has(`${currentCommit.sha.current}-${parent}`)) {
                continue;
            }

            const currentPath = this.findLongestPath(parent, commitMap, positionMap, connectionMap, [...path, parent]);
            paths.push(currentPath);
        }

        return paths.reduce((currentLongestPath, currentPath) => {
            const lengthOfCurrentPath = this.calculatePathLength(positionMap, currentPath);
            const lengthOfLongestPath = this.calculatePathLength(positionMap, currentLongestPath);

            if (lengthOfCurrentPath === lengthOfLongestPath) {
                // Tries to not only find the longest but most efficient path
                return currentPath.length > currentLongestPath.length ? currentLongestPath : currentPath;
            }

            return lengthOfCurrentPath > lengthOfLongestPath ? currentPath : currentLongestPath;
        }, []);
    }

    private static calculatePathLength(positionMap: Map<string, number>, path: string[]): number {
        const [start] = path;
        const [end] = path.slice().reverse();

        if (!start && !end) {
            // For empty array
            return -1;
        }

        const startPosition = positionMap.get(start)!;
        const endPosition = positionMap.get(end)!;

        const length = endPosition - startPosition;
        return length;
    }
}
