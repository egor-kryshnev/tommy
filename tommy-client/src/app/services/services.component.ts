import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApigetService, model1 } from '../apiget.service';
import { PostReqService } from '../post-req.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services: model1[];
  constructor(public aPIgetService: ApigetService, public route: ActivatedRoute, private router: Router, public postReqService: PostReqService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.services = this.aPIgetService.getServices(id);
  }

  onReturn() {
    this.router.navigateByUrl('newtask', { relativeTo: this.route });
  }

  onService(serviceId) {
    this.postReqService.serviceId = serviceId;
    this.router.navigate(['/categories', serviceId], { relativeTo: this.route });
  }



}
