import { useState } from 'react';
import { WindowManagerProvider } from './os/WindowManager/WindowManager';
import Desktop from './os/Desktop/Desktop';
import BootScreen from './os/BootScreen/BootScreen';

function App() {
  const [booted, setBooted] = useState(
    () => sessionStorage.getItem('arcnalos-booted') === 'true'
  );

  const handleBootComplete = () => {
    sessionStorage.setItem('arcnalos-booted', 'true');
    setBooted(true);
  };

  if (!booted) {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  return (
    <WindowManagerProvider>
      <Desktop />
    </WindowManagerProvider>
  );
}

export default App;