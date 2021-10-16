import { Component } from '@angular/core';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assessmentway';

  fname:any;
  lname:any;
  selectedFile:File=null;
  reader = new FileReader();
  data:any[]=[];
  retriveddata:any[]=[];

  constructor(private test:TestService)
  {
    this.test.getData().subscribe(ress=>
      {
        
        this.retriveddata.push(ress['retrievedData'][0]) ;
        
      })
  }





  onFileSelected(event)
  {
    this.selectedFile= <File>event.target.files[0]
        
    this.reader.addEventListener("load",()=>
    {
      console.log("reader",this.reader.result)
    })
    this.reader.readAsDataURL(this.selectedFile);
  }


  submit()
  {
    
    this.data.push({"fname":this.fname,"lname":this.lname,"image":this.reader.result});
    
    this.test.submitData(this.data).subscribe(res=>
      {
        console.log("res",res);
      })
  }
}
