import { Component, OnInit, Input } from '@angular/core';
import { ToolsItem } from 'src/app/models/tools-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() tools: ToolsItem[];

  

  constructor() { }

  ngOnInit(): void {
  }

  

}
