import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GraphModule } from './graph/graph.module';
import { OverviewComponent } from './overview.component';
import { TableModule } from './table/table.module';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let fixture: ComponentFixture<OverviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OverviewComponent],
            imports: [NoopAnimationsModule, TableModule, GraphModule],
            providers: [
                {
                    provide: Store,
                    useValue: {
                        select: () => {
                            return Observable.never();
                        },
                    },
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
