import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AppComponent implements OnInit {
  logs: { time: string; type: string; message: string; details: string }[] = [];
  toasts: string[] = [];

  eventStats = [
    { label: 'Page View', count: 0 },
    { label: 'Button Click', count: 0 },
    { label: 'File Download', count: 0 },
    { label: 'Outbound Link', count: 0 },
    { label: 'Form Submit', count: 0 },
    { label: 'Scroll Depth', count: 0 },
    { label: 'Social Share', count: 0 },
    { label: 'Video Play', count: 0 },
  ];
  eventButtons = [
    {
      title: 'Page View',
      desc: 'Send a pageview event',
      icon: 'fas fa-file',
      eventParams: {
        type: 'pageview',
        config: {
          page_path: '/test-page',
          page_title: 'Test Page',
        },
      },
    },
    {
      title: 'Button Click',
      desc: 'Track button click event',
      icon: 'fas fa-mouse-pointer',
      eventParams: {
        type: 'event',
        eventName: 'button_click',
        eventParams: {
          event_category: 'engagement',
          event_label: 'Test Button',
        },
      },
    },
    {
      title: 'File Download',
      desc: 'Track file download',
      icon: 'fas fa-download',
      eventParams: {
        type: 'event',
        eventName: 'file_download',
        eventParams: {
          event_category: 'downloads',
          event_label: 'sample.pdf',
        },
      },
    },
    {
      title: 'Outbound Link',
      desc: 'Track external link click',
      icon: 'fas fa-external-link-alt',
      eventParams: {
        type: 'event',
        eventName: 'outbound_click',
        eventParams: {
          event_category: 'outbound',
          event_label: 'https://external.com',
          transport_type: 'beacon',
        },
      },
    },
    {
      title: 'Form Submit',
      desc: 'Track form submission',
      icon: 'fas fa-envelope',
      eventParams: {
        type: 'event',
        eventName: 'form_submit',
        eventParams: {
          event_category: 'forms',
          event_label: 'Contact Form',
        },
      },
    },
    {
      title: 'Scroll Depth',
      desc: 'Track scroll to 50%',
      icon: 'fas fa-arrow-down',
      eventParams: {
        type: 'event',
        eventName: 'scroll_depth',
        eventParams: {
          event_category: 'engagement',
          event_label: '50%',
        },
      },
    },
    {
      title: 'Social Share',
      desc: 'Track social media share',
      icon: 'fas fa-share-alt',
      eventParams: {
        type: 'event',
        eventName: 'social_share',
        eventParams: {
          event_category: 'social',
          event_label: 'facebook',
          method: 'share_button',
        },
      },
    },
    {
      title: 'Video Play',
      desc: 'Track video play event',
      icon: 'fas fa-play',
      eventParams: {
        type: 'event',
        eventName: 'video_play',
        eventParams: {
          event_category: 'media',
          event_label: 'Promo Video',
        },
      },
    },
  ];

  ngOnInit() {}

  formatEventPreview(event: any): string {
    if (event.eventParams.type === 'pageview') {
      return `gtag('config', 'G-XXXXXXXXXX', ${JSON.stringify(
        event.eventParams.config,
        null,
        2
      )})`;
    } else {
      return `gtag('event', '${event.eventParams.eventName}', ${JSON.stringify(
        event.eventParams.eventParams,
        null,
        2
      )})`;
    }
  }

  triggerEvent(event: any) {
    const params = event.eventParams;
    if (params.type === 'pageview') {
      gtag('config', 'G-XXXXXXXXXX', params.config);
    } else {
      gtag('event', params.eventName, params.eventParams);
    }
    // Ensure the event title exactly matches the stat label (e.g., 'Pageviews', 'Clicks', etc.)
    this.incrementStat(event.title);
    this.showToast(`${event.title} event sent`);
    this.pushLog(
      event.title,
      `Sent ${params.eventName || 'pageview'} event`,
      params.type === 'pageview' ? params.config : params.eventParams
    );
  }
  private pushLog(type: string, message: string, details: any) {
    const time = new Date().toLocaleTimeString();
    this.logs.unshift({
      time,
      type,
      message,
      details: JSON.stringify(details, null, 2),
    });
    if (this.logs.length > 50) this.logs.pop();
  }

  clearLogs() {
    this.logs = [];
    this.showToast('Event log cleared');
  }

  private showToast(message: string) {
    this.toasts.push(message);
    setTimeout(() => this.toasts.shift(), 3000);
  }

  private incrementStat(label: string) {
    this.eventStats = this.eventStats.map((stat) => {
      if (stat.label.toLowerCase() === label.toLowerCase()) {
        return { ...stat, count: stat.count + 1 };
      }
      return stat;
    });
  }

  getStatIcon(label: string): string {
    const icons: Record<string, string> = {
      Pageviews: 'fas fa-eye',
      Clicks: 'fas fa-hand-pointer',
      Downloads: 'fas fa-download',
      Outbound: 'fas fa-external-link-alt',
      Forms: 'fas fa-envelope',
      Scrolls: 'fas fa-scroll',
      Shares: 'fas fa-share-square',
      Videos: 'fas fa-video',
    };
    return icons[label] || 'fas fa-chart-bar';
  }
}
