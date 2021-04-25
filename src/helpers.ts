export function getRelXY(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
): [x: number, y: number] {
  const currentTargetRect = e.currentTarget.getBoundingClientRect()
  const x = e.pageX - currentTargetRect.left
  const y = e.pageY - currentTargetRect.top
  return [x, y]
}
