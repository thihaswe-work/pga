// let's imagine this file is autogenerated from the backend
// ideally, we want to keep these api related types in sync
// with the backend instead of manually writing them out

export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Meta = {
  page: number;
  total: number;
  totalPages: number;
};

export type User = Entity<{
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "USER";
  teamId: string;
  bio: string;
}>;

export type AuthResponse = {
  jwt: string;
  user: User;
};

export type Team = Entity<{
  name: string;
  description: string;
}>;

export type Discussion = Entity<{
  title: string;
  body: string;
  teamId: string;
  author: User;
}>;

export type Comment = Entity<{
  body: string;
  discussionId: string;
  author: User;
}>;

// types
export type Home = {
  id: number;
  sectionType: string;
  image: string;
  header: string;
  label: string;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Banner = {
  id: number;
  image: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};
export type BlogCategory = {
  id: number;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};
export type Milestone = {
  id: number;
  title: string;
  description: string;
  status: boolean;
  timeline: number;
  link: string;
  image: string;
  icon: string;
  colorCode: string;
  createdAt: string;
  updatedAt: string;
};
export type Blog = {
  id: number;
  title: string;
  blogCategoryId: number;
  description: string;
  image: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CareerCategory = {
  id: number;
  name: string;
  image: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RelatedField = {
  id: number;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Region = {
  id: number;
  name: string;
  image: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};
export type HiringPost = {
  id: number;
  jobId: string;
  position: string;
  description: string;
  jobClose: string;
  requirement: string;
  responsibility: string;
  benefit: string;
  categoryId: number;
  jobTypeId: number;
  locationId: number;
  regionId: number;
  relatedFieldId: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  category: CareerCategory;
  jobType: {
    id: number;
    name: string;
    image: string;
    status: boolean;
    createdAt: string;
    updateAt: string;
  };
  location: {
    id: number;
    name: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
  region: Region;
  relatedField: RelatedField;
};
