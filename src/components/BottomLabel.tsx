import { useVersion } from '~hooks/useVersion';
import './BottomLabel.css';

export function BottomLabel() {
  const version = useVersion({ prefixed: true });

  return (
    <h3 className="bottom-label">
      {version}
      <div className="dot" />
      movie-web
    </h3>
  );
}
