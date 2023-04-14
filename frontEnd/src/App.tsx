import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileCard } from "./components/FileCard";
import { BucketInfo, S3Object } from "./components/S3";
import { BucketHeader } from "./components/BucketHeader";
import { a, useTrail } from "react-spring";

function App() {
  const [fileContents, setFileContents] = useState<S3Object[]>([]);
  const [bucketDetails, setBucketDetails] = useState<BucketInfo | null>(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    async function fetchFileList() {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/bucketContents`
      );
      const bucketInfo = result.data as BucketInfo;
      const files = result.data.Contents as S3Object[];
      setBucketDetails(bucketInfo);
      setFileContents(files);
      setloading(false);
    }
    fetchFileList();
  }, []);
  const trail = useTrail(fileContents.length, {
    config: { mass: 10, tension: 1500, friction: 200 },
    opacity: 1,
    x: 0,
    from: { opacity: 0, x: 20 },
  });
  return !loading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        paddingTop: "10vh",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <BucketHeader details={bucketDetails!} />
        {trail.map(({ ...style }, index) => (
          <a.div key={index} style={style}>
            <a.div>
              {
                <FileCard
                  key={fileContents[index].Key}
                  Obj={fileContents[index]}
                />
              }
            </a.div>
          </a.div>
        ))}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
