import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageUploadService } from '../api/image-upload.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [ImageUploadService]
})
export class HomeComponent implements OnInit {
	private req : any;
	public uploader;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private imageUploadService: ImageUploadService,
		public el: ElementRef) { this.uploader = this.imageUploadService.uploader; }

	ngOnInit() {
		// check if service is working
		this.req = this.imageUploadService.checkHomePage().subscribe(result => {
			console.log(result)
		}, err => {
			console.log(err)
		})
	}

	// upload the file to backend
    upload() {
	    let inputEl   : HTMLInputElement = this.el.nativeElement.querySelector('#photo');
	    let fileCount : number = inputEl.files.length;

	    let formData = new FormData();
    
    	if (fileCount > 0) { // a file was selected
        
        	formData.append('photo', inputEl.files.item(0));

        	this.imageUploadService.uploadImage(formData)
        		.subscribe(result => {
                	alert(result.message);
            // if error
            }, (error) => alert(error))
      	}
   	}

	ngOnDestroy(){
		this.req.unsubscribe();
	}
}
