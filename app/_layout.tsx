import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function Layout() {
    const router = useRouter();

    useEffect(() => {
      router.replace('/journey-map');
    }, []);

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: '#377771' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
            }}
        />
    );
}
