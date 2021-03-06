import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CeappInstituteModule } from './institute/institute.module';
import { CeappCurriculumModule } from './curriculum/curriculum.module';
import { CeappSubjectModule } from './subject/subject.module';
import { CeappIdealPlanModule } from './ideal-plan/ideal-plan.module';
import { CeappIdealPlanEntriesModule } from './ideal-plan-entries/ideal-plan-entries.module';
import { CeappCurriculumSubjectModule } from './curriculum-subject/curriculum-subject.module';
import { CeappLvaModule } from './lva/lva.module';
import { CeappAppointmentModule } from './appointment/appointment.module';
import { CeappCurriculumSemesterModule } from './curriculum-semester/curriculum-semester.module';
import { CeappCollisionLevelOneModule } from './collision-level-one/collision-level-one.module';
import { CeappCollisionLevelTwoModule } from './collision-level-two/collision-level-two.module';
import { CeappCollisionLevelThreeModule } from './collision-level-three/collision-level-three.module';
import { CeappCollisionLevelFourModule } from './collision-level-four/collision-level-four.module';
import { CeappCollisionLevelFiveModule } from './collision-level-five/collision-level-five.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CeappInstituteModule,
        CeappCurriculumModule,
        CeappSubjectModule,
        CeappIdealPlanModule,
        CeappIdealPlanEntriesModule,
        CeappCurriculumSubjectModule,
        CeappLvaModule,
        CeappAppointmentModule,
        CeappCurriculumSemesterModule,
        CeappCollisionLevelOneModule,
        CeappCollisionLevelTwoModule,
        CeappCollisionLevelThreeModule,
        CeappCollisionLevelFourModule,
        CeappCollisionLevelFiveModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CeappEntityModule {}
