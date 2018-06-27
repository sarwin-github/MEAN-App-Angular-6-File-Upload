import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, from, of, range, empty } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const hostUrl  = 'http://localhost:9001'
const endpoint =  hostUrl + '/api';	

@Injectable({
  	providedIn: 'root'
})
export class ImageUploadService {
	public uploader:FileUploader = new FileUploader({url: endpoint, itemAlias: 'photo'});

	constructor(private http: Http) { }

	// get home page for checking route is working
	checkHomePage(): Observable<any>{
		return this.http
		.get(`${endpoint}`)
		.pipe(
			map(res => { 
				return res.json();
			}),
			catchError(this.handleError)
		);
	}

	// upload image and save address to database
	uploadImage(body: any): Observable<any>{
		return this.http
		.post(`${endpoint}`, body)
		.pipe(
			map(res => { 
				return res.json();
			}),
			catchError(this.handleError)
		);
	}

	// get list of image
	getListOfImages(): Observable<any>{
		return this.http
		.get(`${endpoint}/list`)
		.pipe(
			map(res => { 
				return res.json();
			}),
			catchError(this.handleError)
		);
	}

	// error handler
	private handleError(error:any, caught:any): any{
		throw error;
	}

}
