import { getUniforms } from "@/requests/database";

export const getUniformsByLevel = async (level: string, token: string) => {
 try{
    let result
    switch (level) {
        case 'Primary':
        case 'Secondary':
        case 'Preparatory':
        case 'University':
        case 'Sports':
        case 'Teachers':
            result = await getUniforms(level, token)
            break;
        default:
            result = []
            break
    }
    return result
 }catch(e){
     console.log(e)
     return []
 }
};