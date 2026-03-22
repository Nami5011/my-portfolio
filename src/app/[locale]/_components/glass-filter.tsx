export default function GlassFilter({ id, href }: { id: string; href: string }) {
  return (
    <svg className="hidden">
      <filter id={id} primitiveUnits="objectBoundingBox">
        <feImage x="0" y="0" width="100%" height="100%" result="map" href={href} />
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.1" result="blur" />
        <feDisplacementMap
          id="disp"
          in="blur"
          in2="map"
          scale="0.2"
          xChannelSelector="R"
          yChannelSelector="G"
        ></feDisplacementMap>
      </filter>
    </svg>
  );
}
