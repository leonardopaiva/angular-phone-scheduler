import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatDrawerMode } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    HeaderComponent,
		FooterComponent
],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

	sideNavMode:MatDrawerMode = <MatDrawerMode>'over';
	sideNavOpen = false;

}
