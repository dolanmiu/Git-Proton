// tslint:disable:no-any
import { BehaviorSubject, Observable } from 'rxjs';

export class MockStore {
    private readonly selectStreams: Map<Function, BehaviorSubject<any>>;

    constructor() {
        this.selectStreams = new Map();
    }

    public dispatch(_: any): void {}

    public select(selector: Function): Observable<any> {
        const subject$ = this.selectStreams.get(selector);

        return subject$.asObservable();
    }

    public getSubjectFromSelector<T>(selector: Function): BehaviorSubject<T> {
        if (!this.selectStreams.has(selector)) {
            this.selectStreams.set(selector, new BehaviorSubject(undefined));
        }

        return this.selectStreams.get(selector);
    }
}
