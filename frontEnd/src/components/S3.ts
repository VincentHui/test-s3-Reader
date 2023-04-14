export interface S3Object {
  Key?: string;
  LastModified?: Date;
  ETag?: string;
  Size?: number;
  StorageClass?: string;
  Owner?: {
    DisplayName?: string;
    ID?: string;
  };
}

export interface BucketInfo {
  Name: string;
  $metadata: { requestId: string };
  Contents: S3Object[];
}
