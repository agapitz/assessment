

import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class OrganizationInterceptor {
    private cacheResponse = new Map<string, HttpResponse<any>>();
    private cacheRequest = new Map<string, HttpRequest<any>>();

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.method !== 'POST' || req.url.includes('clear-cache')) {
            return next.handle(req);
        }

        const cachedResponse = this.cacheResponse.get(req.urlWithParams);
        if (cachedResponse) {
            return of(cachedResponse.clone());
        }
        console.log("cache reequest")
        this.cacheRequest.set(req.urlWithParams, req.clone());
        console.log("5 sec pause request")
        const request = this.cacheRequest.get(req.urlWithParams)
        return next.handle((request) ? request : req).pipe(delay(5000),
            tap(event => {
                console.log("done")
                if (event instanceof HttpResponse) {
                    console.log(req.urlWithParams)
                    console.log("event", req)
                    this.cacheResponse.set(req.urlWithParams, event.clone());
                }
            })
        );
    }

    clearCache() {
        this.cacheResponse.clear();
        this.cacheRequest.clear();
    }
}