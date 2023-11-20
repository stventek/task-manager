import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./_components/map"), {
  ssr: false,
});

export default function Map() {
  return (
    <div>
      <DynamicMap />
    </div>
  );
}
