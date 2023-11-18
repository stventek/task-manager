import dynamic from "next/dynamic";

const DynamicSections = dynamic(() => import("./_components/sections"), {
  ssr: false,
});

export default function Board() {
  return <DynamicSections />;
}
