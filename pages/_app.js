import "../styles/globals.css"; 
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, } from "@clerk/nextjs"; 

function ClerkSupabaseApp({ Component, pageProps }) { 
  return ( 
    <ClerkProvider> 
      <SignedIn> 
        <Component {...pageProps} /> 
      </SignedIn> 
      <SignedOut> 
        <RedirectToSignIn /> 
      </SignedOut> 
    </ClerkProvider>
  ); 
} 

export default ClerkSupabaseApp;