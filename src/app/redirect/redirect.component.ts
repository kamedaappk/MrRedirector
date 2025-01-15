import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { incrementRedirectCount } from '../store/urls.action';
import { selectUrlById } from '../store/url.selector';

@Component({
  selector: 'app-redirect',
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss'
})
export class RedirectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    const number = +this.route.snapshot.paramMap.get('number')!;
    // console the number
    console.log("The url",number); 
    this.store.dispatch(incrementRedirectCount({ id: number }));

    this.store.select(selectUrlById(number)).subscribe((url) => {
      console.log("The url", url);
      if (url) {
        window.location.href = url.link;
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}
