import { useWindowManager } from '../WindowManager/WindowManager';
import Window from './Window';

export default function WindowsLayer() {
  const { windows } = useWindowManager();

  return (
    <>
      {windows.map((w) => (
        <Window key={w.id} id={w.id} />
      ))}
    </>
  );
}