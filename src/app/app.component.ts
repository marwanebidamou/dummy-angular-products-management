import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatButtonModule, RouterLink],
  template: `

  <mat-toolbar color="primary">
    <span>Products management</span>
    <span class="spacer"></span>
    <nav>
      <button mat-button routerLink="/products">List of products</button>
      <button mat-button [routerLink]="['products', 'new']">Add a new product</button>
    </nav>
  </mat-toolbar>

  <div class="content">
  <div class="responsive-container">
    <router-outlet></router-outlet>
  </div>
</div>
  `,
  styles: [
    `
    .spacer {
  flex: 1 1 auto;
}

mat-toolbar {
  display: flex;
  justify-content: space-between;
}

.content {
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 64px);
  padding: 16px;
  box-sizing: border-box;
}

.responsive-container {
  width: 100%;
  max-width: 1260px; /* Maximum width of the content */
  padding: 16px;
  background-color: #fff; /* Optional: Background color */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add some shadow */
  border-radius: 8px; /* Optional: Rounded corners */
}

    `
  ],
})
export class AppComponent {
  title = 'product-management';
}
