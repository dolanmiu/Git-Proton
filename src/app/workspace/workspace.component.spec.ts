import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { BranchViewModule } from './branch-view/branch-view.module';
import { CommitViewModule } from './commit-view/commit-view.module';
import { FooterModule } from './footer/footer.module';
import { OverviewModule } from './overview/overview.module';
import { ToolBarModule } from './tool-bar/tool-bar.module';
import { WorkspaceComponent } from './workspace.component';

describe('WorkspaceComponent', () => {
    let component: WorkspaceComponent;
    let fixture: ComponentFixture<WorkspaceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WorkspaceComponent],
            imports: [
                RouterTestingModule,
                NoopAnimationsModule,
                ToolBarModule,
                BranchViewModule,
                CommitViewModule,
                OverviewModule,
                FooterModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkspaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
