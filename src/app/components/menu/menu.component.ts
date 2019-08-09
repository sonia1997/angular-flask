import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isHidden: boolean = true;
  public imagePath;
  imgURL: any;
  public message: string;
  url='';
  constructor() { }

  ngOnInit() {
  }
  
  onSubmit(){
    this.isHidden = false;
  } 
  
 /* interface FileReaderEventTarget extends EventTarget {
    result:string
}*/
 
	  
	uploadFile(files) {
		console.log(files);
    if (files.length === 0)
      return;
  
	
 
     
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
   /* if ($event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL($event.target.files[0]); // read file as data url
	  
	  //reader.onload = ($event: Event & { target: { result: string } }) => {this.url = $event.target.result;}

      reader.onload = ($event) => { // called once readAsDataURL is completed
        this.url = $event.target.result;
      }
    }*/
  
}
