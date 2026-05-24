/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  description?: string;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
  iconName: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
}

export interface ContactMessage {
  id?: number;
  name: string;
  phone: string;
  message: string;
  createdAt?: string;
}

// CMS Types
export interface Post {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface Navigation {
  id: number;
  name: string;
  slug: string;
  priority: number;
}

export interface Settings {
  logo?: string;
  logo_url?: string;
  site_name: string;
  tagline: string;
}
