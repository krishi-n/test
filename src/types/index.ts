export type BundleAgent = {
  id: string;
  version?: string;
  versionSpec?: string;
  optional?: boolean;
  description?: string;
};

export type Bundle = {
  id: string;
  name: string;
  description?: string;
  version?: string;
  tags?: string[];
  categories?: string[];
  agents?: BundleAgent[];
  authorName?: string;
  createdAt?: any;
  updatedAt?: any;
};
