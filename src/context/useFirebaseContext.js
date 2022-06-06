import { useContext } from "react"
import { FirebaseContext } from "./FirebaseContext"

const useFirebaseContext = () => useContext(FirebaseContext)

export default useFirebaseContext
