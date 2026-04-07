export interface Agent {
  id: string;
  version: string;
  optional?: boolean;
  description?: string;
}

export interface BundleMetadata {
  iconUrl?: string;
  bannerUrl?: string;
  readme?: string;
  installCount: number;
  rating: number;
  reviewCount: number;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  version: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  tags: string[];
  categories: string[];
  visibility: 'public' | 'unlisted' | 'private';
  status: 'draft' | 'pending_review' | 'published' | 'archived';
  agents: Agent[];
  metadata: BundleMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin';
  bundles: string[];
  createdAt: string;
}

export interface Review {
  id: string;
  bundleId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

export interface BundleManifest {
  id: string;
  name: string;
  description: string;
  version: string;
  tags: string[];
  agents: Agent[];
}

export type SortOption = 'popular' | 'newest' | 'rating' | 'name';

export interface BundleFilters {
  search?: string;
  category?: string;
  tag?: string;
  sort?: SortOption;
}
