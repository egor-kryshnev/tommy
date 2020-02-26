import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onReturn(){
    this.router.navigateByUrl('newtask', { relativeTo: this.route });
  }

  onService(){
    this.router.navigateByUrl('description', { relativeTo: this.route });
  }



}
