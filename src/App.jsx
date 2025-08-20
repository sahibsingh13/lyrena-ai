import { useState } from "react"
import Main from "./components/main/Main"
import Sidebar from "./components/sidebar/Sidebar"

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Sidebar 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      <Main 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
    </>
  )
}

export default App