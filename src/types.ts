export type role = {
  name: string;
  priority: number;
  member_permissions: string[];
  post_permissions: string[];
};

type comment = {
  writer: string;
  content: string;
};
export type post = {
  src: string;
  caption: string;
  comments: comment[];
};

export type member = {
  name: string,
  role: string,
  status: string
}