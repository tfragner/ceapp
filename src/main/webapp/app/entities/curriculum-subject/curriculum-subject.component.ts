import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { CurriculumSubject } from './curriculum-subject.model';
import { CurriculumSubjectService } from './curriculum-subject.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-curriculum-subject',
    templateUrl: './curriculum-subject.component.html'
})
export class CurriculumSubjectComponent implements OnInit, OnDestroy {
curriculumSubjects: CurriculumSubject[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private curriculumSubjectService: CurriculumSubjectService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.curriculumSubjectService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.curriculumSubjects = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.curriculumSubjectService.query().subscribe(
            (res: ResponseWrapper) => {
                this.curriculumSubjects = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCurriculumSubjects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CurriculumSubject) {
        return item.id;
    }
    registerChangeInCurriculumSubjects() {
        this.eventSubscriber = this.eventManager.subscribe('curriculumSubjectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
