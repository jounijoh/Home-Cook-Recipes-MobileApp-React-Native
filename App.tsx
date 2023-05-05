import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTab } from "./components/BottomTab";
import { createTheme, ThemeProvider } from "@rneui/themed";




const theme = createTheme({
  lightColors: {
    primary: "#e1f5e7",
  },
  darkColors: {
    primary: "#507c66",
  },
  mode: "dark",
  screenContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default function App() {




  return (
   
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <BottomTab />
        </NavigationContainer>
      </ThemeProvider>
  
  );
}
