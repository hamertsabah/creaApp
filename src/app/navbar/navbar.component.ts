import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToolsPrdDetailService } from '../components/product-detail/tools-prd-detail.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private toolsPrdS: ToolsPrdDetailService,
    private commentServ: CommentService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user: any) => {
      this.isAuthenticated = !!user;
    })
  }

  onLogout() {
    this.authService.logout();
  }

  clearIds() {
    this.toolsPrdS.clearIdsFromRoutes();
    this.commentServ.clearPrdId();
  }

}
