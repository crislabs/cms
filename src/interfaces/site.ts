// import { Page } from "./page.interface"

import { Page } from "./page";
import { Type } from "./pet";

export interface Site {
  _id: string
  data: DataSite
  url: string
  pages: Page[]
}

interface DataSite {
  name: string;
  description: string;
  db: DataBase[]
  admin: AdminSite[]
  type: Type
  info: {
    clientId: string
    numberPhone?: number;
    address?: string;
    domain: Domain;
    location?: string;
  },
  images?: {
    icon?: Image
    banner?: Image
    logo?: Image
  }
}

export interface Seo {
  title: string;
  href: string;
  description: string;
  image?: Image
}

export interface Image {
  uid?: string
  src?: string;
  alt?: string;
}
export interface ImageInterface {
  uid?: string
  src: string;
  alt: string;
}


export interface DataBase {
  uid: string
  label: string;
  value: string;
}
export interface AdminSite {
  
  privilege: string;
  sid: string;
}





export interface Tags {
  uid: string;
  text: string;
  href:string;
}

export interface Register {
  uid: string;
  change: string;
  updatedAt: Date;
}
export interface UpdateDate {
  createdAt: Date;
  register: Register[];
}




export interface Timestamps {
  created: number;
  updated?: number;
}
export interface SiteForm {
  _id?: string
  title: string;
  domain: string;
  logo: string;
  icon: string;
  imageSrc: string;
  imageAlt: string;
  numberPhone: number;
  address: string;
  location: string;
  description: string;
  type: string;
  client: string;
}
// export interface ChildrenForm {
//   uid?: string
//   name: string;
//   description: string;
//   imageSrc: string;
//   imageAlt: string;
// }
export interface Domain {
  name: string;
  dlt: string;
}


export interface CreateSite {
  name: String
  type: string
  uid: string
}
export interface UpdateSite {
  id:string
  name: string
  uid: string
}
export interface UpdateSiteDB {
  id:string
  type: string[]
}
export interface ListInput {
  limit: number
  offset: number
}
export interface UpdateSiteImage {
  id:string
  type: string
  images: {
    src: string
    alt: string
  }
  uid: string
}

export interface DeleteManySitesById {
  ids:string[]
}
export interface ConnectionArgs {
  before?: string| null;
  after?: string| null;
  first?: number | null;
  last?: number| null;
}


export interface ListSite {
  page: ConnectionSite
  pageData: PageDataSite
}
export interface ConnectionSite {
  edges: EdgeSite[]
  pageInfo: PageInfoSite
}
export interface EdgeSite {
  cursor: string
  node: Site
}
export interface PageInfoSite {
  startCursor: string
  endCursor: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}
export interface PageDataSite {
  count: number
  limit: number
  offset:number
}
