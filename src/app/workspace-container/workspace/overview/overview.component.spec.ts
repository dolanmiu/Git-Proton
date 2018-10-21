import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { OverviewComponent } from './overview.component';
import { TableModule } from './table/table.module';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let fixture: ComponentFixture<OverviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OverviewComponent],
            imports: [NoopAnimationsModule, TableModule],
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
