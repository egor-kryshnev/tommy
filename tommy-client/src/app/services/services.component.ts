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

  services: model1[] = [];
  servicesToDisplay: model1[];
  limit: number = 7;
  constructor(public aPIgetService: ApigetService, public route: ActivatedRoute, private router: Router, public postReqService: PostReqService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.aPIgetService.getServices(id).subscribe((res: any) => {
      // this.services = [];
      let servicesResponse = res.collection_z_networks_to_service.z_networks_to_service;
      servicesResponse.forEach((element: any) => {
        const serviceObject = element.service;
        this.services.push(
          {
            "id": serviceObject["@id"],
            "value": serviceObject["@COMMON_NAME"],
          } as model1
        );
      })
      this.setServicesToDisplay();
    });
  }

  onReturn() {
    this.router.navigateByUrl('newtask', { relativeTo: this.route });
  }

  onService(serviceId) {
    this.postReqService.serviceId = serviceId;
    this.router.navigate(['/categories', serviceId], { relativeTo: this.route });
  }

  showMore() {
    if (this.services.length > this.limit) this.limit = this.services.length;
    this.setServicesToDisplay();
  }

  showLess() {
    this.limit = 7;
    this.setServicesToDisplay();
  }

  setServicesToDisplay() {
    this.servicesToDisplay = [];
    let i = 0;
    for (let service of this.services) {
      if (i < this.limit && i < this.services.length) {
        this.servicesToDisplay.push(service);
        i++;
      } else {
        return;
      }
    }
  }


}
