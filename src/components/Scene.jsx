/**
 * Abstract backdrop (styles in index.css): deep slate with a purple glow on the left and an orange glow on the right (the logo colours) and a faint
 * grid, giving the glass something to blur without competing with the data.
 */
export default function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="glow glow-violet" />
      <div className="glow glow-amber" />
      <div className="glow glow-blue" />
      <div className="grid-lines" />
      <div className="vignette" />
    </div>
  );
}
