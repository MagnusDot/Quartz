export default function guest({next,store}){
    let isLoggedIn = false
    if(!isLoggedIn){
        return next({
            name: 'Login'
        })
    }
 
    return next();
 }