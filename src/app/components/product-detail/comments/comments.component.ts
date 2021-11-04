import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductM } from 'src/app/models/product';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { AuthService } from 'src/app/services/auth.service';
import { take, exhaustMap, tap, map } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  loading: boolean = false; 
  public stars: boolean[] = Array(5).fill(false);

  star_rating: number = 0;
  username: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    public datePipe: DatePipe,
    private commentServ: CommentService,
    private authService: AuthService
  ) {
   
    //console.log(this.authService.username);
    //this.authService.username = this.username
    //console.log(this.username);
  }

  product: ProductM;
  prodComments: any[] = [];
  requiredComments: any[] = []

  totalComment: number = 0;

  totalCommentPlus1: number;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.loading = true;
      this.commentServ.getSpecificComments(params["which_prd_comment"]).subscribe(data => {
        this.prodComments = data;
        
        this.requiredComments = this.prodComments.filter((arr: any) => arr.which_prd_comment == this.commentServ.prdId)
        console.log(this.commentServ.prdId);
        this.totalComment = this.requiredComments.length;

        console.log(this.requiredComments);
        
        // this.prodComments = data.comments;
        // console.log(data.comments);

        this.loading = false;
      })
    })
    this.usernameGetter();
    console.log(this.username);
    
    
    
  }
  usernameGetter() {
    this.authService.getUserObs().subscribe(
      user => {
        this.username = user.email.substr(0, user.email.indexOf('@')); //Burada firebase'den dönecek olan stringde @'ten öncesini username'e eşitlemiş oluyoruz.
      }
    )
  }

  // callTpcFunction() {
  //   return this.tpc.SuccessMessage(this.totalComment);
  // }

  commentAttr = {
    commented_by: '',
    comment_text: ''
  }
  public rate(rating: number) {
    console.log('rating', rating);
    this.stars = this.stars.map((_, i) => rating > i);
    this.star_rating = rating;
    console.log('stars', this.stars);
    console.log(this.star_rating);
  }
  createComment() {
    const comment = {
      commented_by: this.username,
      comment_text: this.commentAttr.comment_text,
      comment_date: new Date().getTime(),
      comment_rate: this.star_rating,
      which_prd_comment: this.commentServ.prdId
    };
    this.commentServ.createComment(comment).subscribe(data => {
      console.log(data);
      //this.ngOnInit();
      this.requiredComments.push(data)
      this.commentAttr.comment_text = '';
      this.commentAttr.commented_by = '';
      this.totalComment++;
      
    },
    error => {
      console.log(error);
      
    }
    )
  }

}
// export class TestPageConstants {
//   static SuccessMessage = (totalComment) => { return `Total Comment: ${totalComment}`};
// }

