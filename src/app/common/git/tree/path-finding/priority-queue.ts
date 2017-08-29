import { PathDataCache } from './path-data-cache';

export class PriorityQueue extends Array<PathDataCache> {

    public push(item: PathDataCache): number {
        const amount = super.push(item);

        this.sort((a, b) => {
            return a.distance > b.distance ? 1 : -1;
        });

        return amount;
    }
}
