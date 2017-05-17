import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchViewModule } from './branch-view/branch-view.module';
import { CommitViewModule } from './commit-view/commit-view.module';
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
                ToolBarModule,
                BranchViewModule,
                CommitViewModule,
                OverviewModule,
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
