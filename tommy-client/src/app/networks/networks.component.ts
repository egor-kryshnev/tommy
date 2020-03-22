import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApigetService, model1 } from '../apiget.service';
import { PostReqService } from '../post-req.service';


@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.css']
})
export class NetworksComponent implements OnInit {

  networks: model1[];
  constructor(private router: Router, private route: ActivatedRoute, public aPIgetService: ApigetService, public postReqService: PostReqService) { }

  ngOnInit() {
    this.aPIgetService.getNetworks().subscribe((res: any) => {
      this.networks = [];
      const networksResponse = res.collection_nr.nr;
      networksResponse.forEach((networkObject: any) => {
        this.networks.push(
          {
            "id": networkObject["@id"],
            "value": networkObject["@COMMON_NAME"]
          } as model1
        );
      })
    });
  }

  onReturn() {
    this.router.navigateByUrl('', { relativeTo: this.route });
  }

  onSelectedNetwork(networkName: string) {
    const networkSelected = this.networks.find(network => {
      return network.value == networkName;
    });
    this.postReqService.networkId = networkSelected.id;
    this.router.navigate(['/services', networkSelected.id], { relativeTo: this.route });
  }

  getNetworksNames() {
    return this.networks.map(network => network.value);
  }
}
