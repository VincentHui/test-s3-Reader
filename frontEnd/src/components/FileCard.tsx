import axios from "axios";
import { S3Object } from "./S3";
import { useState } from "react";

function FileCardRow({
  title,
  children,
}: {
  title: string;
  children: React.ReactElement | string | number;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ fontWeight: 600 }}>{title}</div>
      <div>{children}</div>
    </div>
  );
}

export function FileCard({
  Obj: { Key, Size, LastModified, StorageClass },
}: {
  Obj: S3Object;
}) {
  return (
    <div
      style={{
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
      }}
    >
      <div style={{ fontSize: "larger", fontWeight: 600, paddingBottom: 10 }}>
        {Key}
      </div>

      <FileCardRow title="Size">{Size!}</FileCardRow>
      <FileCardRow title="Modified">
        {LastModified?.toLocaleString()!}
      </FileCardRow>
      <FileCardRow title="Storage Class">{StorageClass!}</FileCardRow>

      <button
        style={{ marginTop: 10 }}
        onClick={async () => {
          const presignedUrl = await axios.get(
            `${process.env.REACT_APP_API_URL}/downloadLink`,
            {
              params: { key: Key },
            }
          );
          const response = await axios.get(presignedUrl.data, {
            responseType: "blob",
          });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", Key!);
          link.click();
          // no need to append link as child to body.
          setTimeout(() => window.URL.revokeObjectURL(url), 0);
        }}
      >
        Download
      </button>
    </div>
  );
}
