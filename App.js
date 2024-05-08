import React from 'react';
import Navigator from './src/routes/homeStack';
import useLoadFonts from './src/hooks/useLoadFonts';

// import useLoadFonts from './src/hooks/useLoadFonts';

// SplashScreen.preventAutoHideAsync();


export default function App() {

  const { fontsLoaded, onLayoutRootView } = useLoadFonts();

  if(!fontsLoaded)
    return null;

    return (
        <Navigator 
        onLayout={onLayoutRootView}

        />
      );
    }