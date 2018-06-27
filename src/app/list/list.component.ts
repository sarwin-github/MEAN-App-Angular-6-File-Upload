import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageUploadService } from '../api/image-upload.service';


@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
	providers: [ImageUploadService]
})
export class ListComponent implements OnInit {
	private req : any;
	result : any;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private imageUploadService: ImageUploadService) { }

	ngOnInit() {
		this.req = this.imageUploadService.getListOfImages().subscribe(result => {
			this.result = result;

			console.log(this.result)
		});
	}

	ngOnDestroy(){
		this.req.unsubscribe();
	}

}
