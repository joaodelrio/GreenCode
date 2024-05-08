import { useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { Sora_100Thin, Sora_400Regular, Sora_600SemiBold, Sora_700Bold } from '@expo-google-fonts/sora';

const useLoadFonts = () => {
    const [fontsLoaded] = useFonts({
        'Sora_Thin': Sora_100Thin,   
        'Sora_Regular': Sora_400Regular,   
        'Sora_Semibold': Sora_600SemiBold,
        'Sora_Bold': Sora_700Bold,
      });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    return { fontsLoaded, onLayoutRootView };
}

export default useLoadFonts;