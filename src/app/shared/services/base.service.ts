import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {

  protected backendUrl = environment.urlAPI;
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // apiKey: this.API_KEY
    })
  };

  protected httpOptionsMultipart = {
    headers: new HttpHeaders({
     // 'Content-Type': 'multipart/form-data',
      // apiKey: this.API_KEY
    })
  };


  constructor(
    private httpClient: HttpClient,
  ) {}


  protected baseGet<T>(endpoint: string): Observable<T> {
    return this.httpClient.get<T>(
      `${this.backendUrl}/${this.sanitizeEndpoint(endpoint)}`,
      this.httpOptions
    ).pipe(take(1));

  }

  protected baseGetBlob<Blob>(endpoint: string): Observable<HttpResponse<Blob>> {
    return this.httpClient.get<Blob>(
      `${this.backendUrl}/${this.sanitizeEndpoint(endpoint)}`,
      {
        observe: 'response',
        responseType: 'blob' as 'json'
      }

    ).pipe(take(1));

  }


  protected basePost<T>(endpoint: string, data: any): Observable<T> {
   return this.httpClient.post<T>(
        `${this.backendUrl}/${this.sanitizeEndpoint(endpoint)}`,
        data,
        this.httpOptions
      ).pipe(take(1));
  }

  protected basePostMultiPart<T>(endpoint: string, data: any): Observable<T> {
    return this.httpClient.post<T>(
         `${this.backendUrl}/${this.sanitizeEndpoint(endpoint)}`,
         data,
         this.httpOptionsMultipart
       ).pipe(take(1));
   }

  protected baseDelete<T>(endpoint: string): Observable<T> {
    return this.httpClient.delete<T>(
          `${this.backendUrl}/${this.sanitizeEndpoint(endpoint)}`,
          this.httpOptions
        ).pipe(take(1));
  }

  protected basePut<T>(endpoint: string, data: any): Observable<T> {
    return  this.httpClient.put<T>(
          `${this.backendUrl}/${this.sanitizeEndpoint(endpoint)}`,
          data,
          this.httpOptions
        ).pipe(take(1));
  }


  private sanitizeEndpoint(endpoint: string): string {
    return endpoint.trim().replace(/^\//, '');
  }


}

