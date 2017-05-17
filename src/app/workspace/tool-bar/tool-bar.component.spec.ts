import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdButtonModule, MdMenuModule } from '@angular/material';

import { ToolBarComponent } from './tool-bar.component';

describe('ToolBarComponent', () => {
    let component: ToolBarComponent;
    let fixture: ComponentFixture<ToolBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToolBarComponent],
            imports: [
                MdButtonModule,
                MdMenuModule,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
