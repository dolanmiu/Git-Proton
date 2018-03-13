import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from 'app/material.module';
import { BottomLeftComponent } from './element/bottom-left/bottom-left.component';
import { BottomRightComponent } from './element/bottom-right/bottom-right.component';
import { DataComponent } from './element/data/data.component';
import { ElementComponent } from './element/element.component';
import { HorizontalComponent } from './element/horizontal/horizontal.component';
import { TopLeftComponent } from './element/top-left/top-left.component';
import { TopRightComponent } from './element/top-right/top-right.component';
import { VerticalComponent } from './element/vertical/vertical.component';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [
                    TableComponent,
                    ElementComponent,
                    BottomRightComponent,
                    VerticalComponent,
                    TopLeftComponent,
                    TopRightComponent,
                    HorizontalComponent,
                    BottomLeftComponent,
                    DataComponent,
                ],
                imports: [MaterialModule],
                providers: [
                    {
                        provide: Store,
                        useValue: {
                            select: () => {
                                return Observable.empty();
                            },
                        },
                    },
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
