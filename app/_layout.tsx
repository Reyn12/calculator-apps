import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colorScheme === 'dark' ? '#090a1a' : '#ffffff'
          }
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="profile" 
          options={{ 
            headerShown: false 
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}
