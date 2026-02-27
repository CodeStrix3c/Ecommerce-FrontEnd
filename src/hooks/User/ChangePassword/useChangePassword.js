import { changePassword } from "@/services/User/ManagePassword/changePassword"
import { useMutation } from "@tanstack/react-query"

 

 export const useChangePassword = () => {
    return useMutation({
        mutationFn: changePassword
    })
}