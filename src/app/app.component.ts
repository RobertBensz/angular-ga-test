import { Component } from '@angular/core';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  // sendPageView(): void {
  //   gtag('config', 'G-XXXXXXXXXX', { page_path: '/test-dashboard' });
  //   console.log('Pageview sent');
  // }

  trackButtonClick(): void {
    gtag('event', 'button_click', {
      event_category: 'engagement',
      event_label: 'Test Button',
    });
  }

  trackDownload(fileName: string): void {
    gtag('event', 'file_download', {
      event_category: 'downloads',
      event_label: fileName,
    });
  }

  trackOutboundLink(url: string): void {
    gtag('event', 'click', {
      event_category: 'outbound',
      event_label: url,
      transport_type: 'beacon',
    });
  }

  trackFormSubmit(event: Event): void {
    event.preventDefault();
    gtag('event', 'form_submit', {
      event_category: 'forms',
      event_label: 'Email Signup',
    });
  }

  trackScrollDepth(): void {
    gtag('event', 'scroll_depth', {
      event_category: 'engagement',
      event_label: '50%',
    });
  }

  trackSocial(network: string): void {
    gtag('event', 'share', {
      method: network,
      content_type: 'button',
      item_id: 'test-share',
    });
  }

  trackVideoEvent(): void {
    gtag('event', 'video_play', {
      event_category: 'media',
      event_label: 'Intro Video',
    });
  }
}
