import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./common/navbar/navbar.component";
import { JukeboxComponent } from "./common/jukebox/jukebox.component";
import { CopyrightBarComponent } from "./common/copyright-bar/copyright-bar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, NavbarComponent, FormsModule, CopyrightBarComponent, CommonModule, JukeboxComponent]
})
export class AppComponent {
  title = 'ancient-chronicles';
}
