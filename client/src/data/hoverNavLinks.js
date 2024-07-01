export default (userIn, title) => {
    return ({
        "Home": {
        },
        "About": {
        },
        "Designs": {
            "my designs": userIn == "guest" ? '/login' : `/${userIn}/designs/me`,
            "new design": userIn == "guest" ? '/login' : `/${userIn}/designs/new`,
            "friends designs": userIn == "guest" ? '/login' : `/${userIn}/designs/friends`,
            "all designs": `/${userIn}/designs`
        },
        "Articles": {
            "my articles": userIn == "guest" ? '/login' : `/${userIn}/articles/me`,
            "new article": userIn == "guest" ? '/login' : `/${userIn}/articles/new`,
            "friends articles": userIn == "guest" ? '/login' : `/${userIn}/articles/friends`,
            "all articles": `/${userIn}/articles`
        },
        "Settings": userIn === "guest" ? {
            "sign up": "/signup",   
            "login": "/login"
        } :
        {
            "profile": `/${userIn}/info`,
            "exit": "/exit"
        },
        "Products": {
            "all products": `/${userIn}/products`,
            "my cart": userIn == "guest" ? '/login' : `/${userIn}/products/cart`         
        }
    })[title]
}
