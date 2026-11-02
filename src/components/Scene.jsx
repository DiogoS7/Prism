/**
 * Pure-CSS backdrop (styles in index.css) that gives the glass something to blur.
 * Swap it for a photo by giving `.scene` a background-image.
 */
export default function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="sky" />
      <div className="hills" />
      <div className="mullions">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="topfade" />
      <div className="floor" />
      <div className="lamp lamp-a" />
      <div className="lamp lamp-b" />
      <div className="vignette" />
    </div>
  );
}
