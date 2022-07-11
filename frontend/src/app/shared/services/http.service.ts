import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudHttpService {

  constructor(private http: HttpClient) { }

  get(url: string, queryParams?: any): Observable<any> {
    let parameters = this.getQueryParams(queryParams);
    let headers = new HttpHeaders();
    let options: any = { params: parameters, headers: headers };
    console.log(parameters, options);

    let redRequest = this.http.get<any>(url, options);
    return redRequest;

  }

  post(url: string, body?: any, queryParams?: any): Observable<any> {
    let headers = new HttpHeaders();
    let parameters = this.getQueryParams(queryParams);
    let options = { params: parameters, headers: headers };
    let postRequest = this.http.post<any>(url, body, options);
    return postRequest
  }

  delete(url: string, queryParams?: any): Observable<any> {
    let parameters = this.getQueryParams(queryParams);
    let headers = new HttpHeaders();
    let options = { body: parameters, headers: headers };
    let deleteRequest = this.http.delete<any>(url, options);
    return deleteRequest

  }
  put(url: string, body?: any, queryParams?: any): Observable<any> {
    let headers = new HttpHeaders();
    let parameters = this.getQueryParams(queryParams);
    let options = { params: parameters, headers: headers };
    let postRequest = this.http.put<any>(url, body, options);
    return postRequest
  }

  fileUpload(url: string, fileData: any, docType?: string): Observable<any> {
    // const formData: FormData = new FormData();
    // formData.append('doc', fileData, fileData.name);
    // formData.append('docType', docType);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data')
    let options = { headers: headers };
    let imageUpload = this.http.post<any>(url, fileData, options);
    return imageUpload;
  }

  getQueryParams(queryParams: any) {
    let parameters = new HttpParams;
    if (queryParams) {
      for (let key in queryParams) {
        parameters = parameters.append(key.toString(), queryParams[key]);
      }
    }
    return parameters;
  }
}