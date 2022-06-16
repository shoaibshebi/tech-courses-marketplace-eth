import React from "react";

export interface ICourse {
  id: Number | null | undefined;
  type: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  link: string;
  slug: string;
  wsl: string[];
  createdAt: string;
}

export interface IChildrenProp {
  children: React.ReactNode;
}
