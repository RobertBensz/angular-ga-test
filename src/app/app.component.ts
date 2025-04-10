import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'angular-ga-test';

  sendAnalyticsEvent(): void {
    console.log('sendAnalyticsEvent');
    gtag('event', 'button_click', {
      event_category: 'engagement',
      event_label: 'send_event_button',
      value: 1,
    });
  }

  sendConfigEvent(): void {
    console.log('sendConfigEvent');
    gtag('event', 'page_route', { page_path: 'test' });
  }
}
