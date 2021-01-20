import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';
import firebase from 'firebase';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "469642911432-v7ibjai7rmeetef5if4l9hdohg4qrheo.apps.googleusercontent.com",
        // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: "469642911432-v7ibjai7rmeetef5if4l9hdohg4qrheo.apps.googleusercontent.com",
        webClientId: "469642911432-v7ibjai7rmeetef5if4l9hdohg4qrheo.apps.googleusercontent.com",
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
        }
    }, [response]);

    return (
        <Button
            disabled={!request}
            title="Login"
            onPress={() => {
                promptAsync();
            }}
        />
    );

    
}
