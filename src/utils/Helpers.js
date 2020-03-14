export function previousRoute (props, expectedPath){
    const { location:{state} } = props
    
    if(!state || state.prevPath !== expectedPath) return true
    return false
}