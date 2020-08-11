import { Component, OnInit } from '@angular/core';
import { PostReqService } from '../post-req.service'
import { ApigetService } from '../../apiget.service'

@Component({
  selector: 'app-knowledge-article',
  templateUrl: './knowledge-article.component.html',
  styleUrls: ['./knowledge-article.component.css']
})
export class KnowledgeArticleComponent implements OnInit {
  knowledgeArticle: string = "";

  constructor(
    private postReqService: PostReqService,
    private apiGetService: ApigetService,
  ) { }




  ngOnInit(): void {
    let categoryId;
    try {
      categoryId = this.postReqService.isIncident ? this.postReqService.categoryId.split(":")[1] : this.postReqService.categoryId;
    } catch (e) {
      categoryId = this.postReqService.categoryId;
    }
    this.apiGetService.getCategoryDescription(categoryId).subscribe((res: any) => {
      console.log(res);
      this.knowledgeArticle = res.collection_pcat.pcat.description;
    })

  }

}
