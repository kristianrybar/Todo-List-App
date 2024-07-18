export const isTodoImportant = (todoImportant: string | boolean) => {
    if (!todoImportant) 
        return false
    if (todoImportant == 'false' || !todoImportant)
        return false
    if (todoImportant == 'true')
        return true
    
    return true
}