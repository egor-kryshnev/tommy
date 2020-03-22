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
    this.aPIgetService.getServices(id).subscribe((res: any) => {
      this.services = [];
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
    });
  }

  onReturn() {
    this.router.navigateByUrl('newtask', { relativeTo: this.route });
  }

  onSelectedService(serviceName: string) {
    const serviceSelected = this.services.find(service => {
      return service.value == serviceName;
    });
    this.postReqService.serviceId = serviceSelected.id;
    this.router.navigate(['/categories', serviceSelected.id], { relativeTo: this.route });
  }

  getServicesNames() {
    return this.services.map(service => service.value);
  }
}
