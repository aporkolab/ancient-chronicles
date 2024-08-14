import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sasszemu-ahm-shere',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sasszemu-ahm-shere.component.html',
  styleUrl: './sasszemu-ahm-shere.component.scss'
})
export class SasszemuAhmShereComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
}