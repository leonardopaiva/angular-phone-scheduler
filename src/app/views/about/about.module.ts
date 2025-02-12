// src/app/views/about/about.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { ListItemComponent } from '../../shared/components/list-item.component';
import { AboutComponent } from './about.component';
import { MatTooltip } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    ListItemComponent,
    MatTooltip
  ]
})
export class AboutModule { }
