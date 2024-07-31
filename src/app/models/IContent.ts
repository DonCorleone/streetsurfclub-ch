import {SafeUrl} from "@angular/platform-browser";

export interface IContent {
  amountReplies: string;
  author: string;
  date: Date;
  id: string;
  title: string;
  lead: string;
  content: string;
  headerImg: SafeUrl;
}
