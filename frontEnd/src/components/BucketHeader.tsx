import { a, useSpring } from "react-spring";
import { BucketInfo } from "./S3";

export function HeaderRow({
  title,
  children,
}: {
  title: string;
  children: string;
}) {
  const [opacity] = useSpring(() => ({
    opacity: 1,
    from: {
      opacity: 0,
    },
    config: { mass: 5, tension: 350, friction: 40 },
  }));
  return (
    <a.div style={opacity}>
      <div style={{ paddingBottom: 10 }}>
        <div style={{ fontSize: "larger", fontWeight: 600 }}>{title}</div>
        <div>{children}</div>
      </div>
    </a.div>
  );
}

export function BucketHeader({ details }: { details: BucketInfo }) {
  return (
    <div style={{ paddingBottom: 10 }}>
      <HeaderRow title="Bucket Name">{details.Name}</HeaderRow>
      <HeaderRow title="Request ID">{details.$metadata.requestId}</HeaderRow>
    </div>
  );
}
