import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { IdealPlanEntries } from './ideal-plan-entries.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class IdealPlanEntriesService {

    private resourceUrl = 'api/ideal-plan-entries';
    private resourceSearchUrl = 'api/_search/ideal-plan-entries';

    constructor(private http: Http) { }

    create(idealPlanEntries: IdealPlanEntries): Observable<IdealPlanEntries> {
        const copy = this.convert(idealPlanEntries);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(idealPlanEntries: IdealPlanEntries): Observable<IdealPlanEntries> {
        const copy = this.convert(idealPlanEntries);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<IdealPlanEntries> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(idealPlanEntries: IdealPlanEntries): IdealPlanEntries {
        const copy: IdealPlanEntries = Object.assign({}, idealPlanEntries);
        return copy;
    }
}
