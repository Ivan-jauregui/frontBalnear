import { Component } from '@angular/core';
import { Hero } from "../../components/hero/hero";
import { QuickFilters } from "../../components/quick-filters/quick-filters";
import { FeaturedResortList } from "../../components/featured-resort-list/featured-resort-list";
import { OwnerCta } from "../../components/owner-cta/owner-cta";

@Component({
  selector: 'home',
  imports: [Hero, QuickFilters, FeaturedResortList, OwnerCta],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
