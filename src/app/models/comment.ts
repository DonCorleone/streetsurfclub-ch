export interface BloggerComment {
  kind: 'blogger#comment';
  status: string;
  id: string;
  inReplyTo?: {
    id: string;
  };
  post: {
    id: string;
  };
  blog: {
    id: string;
  };
  published: string; // datetime
  updated: string;  // datetime
  selfLink: string;
  content: string;
  author: {
    id: string;
    displayName: string;
    url: string;
    image: {
      url: string;
    };
  };
}
