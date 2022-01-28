import styles from "../styles/Home.module.css"; 
import { UserButton, useUser } from "@clerk/nextjs"; 

export default function Home() { 
  const { firstName } = useUser(); 
  return ( 
    <> 
      <header className={styles.header}> 
        <div>Todo app</div> 
        <UserButton /> 
      </header> 
      <main> 
        <div className={styles.container}> 
          {firstName ? `Welcome ${firstName}!` : "Welcome!"} 
        </div> 
      </main> 
    </> 
  ); 
}