export function setupResizeObserver(renderer, camera, container) {
  const resizeObserver = new ResizeObserver(() => {
    // Create the ResizeObserver to detect container size changes
    const { clientWidth, clientHeight } = container;

    // Update renderer size
    renderer.setSize(clientWidth, clientHeight);
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Update the camera aspect ratio
    renderer.setSize(width, height)
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  });

  // Start observing the container
  resizeObserver.observe(container);

  // Optional: return the observer in case you want to disconnect it later
  return resizeObserver;
}
