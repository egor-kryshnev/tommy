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
  networksToDisplay: model1[];
  limit: number = 7;
  constructor(private router: Router, private route: ActivatedRoute, public aPIgetService: ApigetService, public postReqService: PostReqService) { }

  ngOnInit() {
    this.aPIgetService.getNetworks().subscribe((res: any) => {
      this.networks = [];
      const networksResponse = res.collection_nr.nr;
      networksResponse.forEach((networkObject: any) => {
        console.log(networkObject);
        this.networks.push(
          {
            "id": networkObject["@id"],
            "value": networkObject["@COMMON_NAME"]
          } as model1
        );
      })
      this.setNetworksToDisplay();
    });
  }

  onReturn() {
    this.router.navigateByUrl('', { relativeTo: this.route });
  }

  onSelectedNetwork(id: string) {
    // this.network
    this.postReqService.networkId = id;
    this.router.navigate(['/services', id], { relativeTo: this.route });

  }

  setNetworksToDisplay() {
    this.networksToDisplay = [];
    let i = 0;
    for (let network of this.networks) {
      if (i < this.limit && i < this.networks.length) {
        this.networksToDisplay.push(network);
        i++;
      } else {
        return;
      }
    }
  }

  showMore() {
    if (this.networks.length > this.limit) this.limit = this.networks.length;
    this.setNetworksToDisplay();
    console.log(this.networksToDisplay);
  }

  showLess() {
    this.limit = 7;
    this.setNetworksToDisplay();
    console.log(this.networksToDisplay);
  }

}
