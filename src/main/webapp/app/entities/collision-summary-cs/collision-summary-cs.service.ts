import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CollisionSummaryCS } from './collision-summary-cs.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CollisionSummaryCSService {

    private resourceUrl = 'api/collision-summary-cs';
    private resourceSearchUrl = 'api/_search/collision-summary-cs';

    constructor(private http: Http) { }

    create(collisionSummaryCS: CollisionSummaryCS): Observable<CollisionSummaryCS> {
        const copy = this.convert(collisionSummaryCS);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(collisionSummaryCS: CollisionSummaryCS): Observable<CollisionSummaryCS> {
        const copy = this.convert(collisionSummaryCS);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<CollisionSummaryCS> {
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

    private convert(collisionSummaryCS: CollisionSummaryCS): CollisionSummaryCS {
        const copy: CollisionSummaryCS = Object.assign({}, collisionSummaryCS);
        return copy;
    }
}