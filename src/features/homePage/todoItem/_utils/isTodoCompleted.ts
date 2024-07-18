export const isTodoCompleted = (todoCompleted: string | boolean) => {
    if (!todoCompleted) 
        return false
    if (todoCompleted == 'false' || !todoCompleted)
        return false
    if (todoCompleted == 'true')
        return true
    
    return true
}