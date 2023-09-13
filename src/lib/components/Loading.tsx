export default function LoadingDeye() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div id="loadingDiv" className="loadingdiv flex">
        <div className="w-embed">
          <div className="loaderAnim">
            <svg viewBox="0 0 80 80">
              <rect x="8" y="8" width="64" height="64"></rect>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
