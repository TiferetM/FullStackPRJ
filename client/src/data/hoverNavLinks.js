export default userIn => {
    return {
        "Home": {
        },
        "About": {
        },
        "Designs": {
            "my designs": `/${userIn}/designs/me`,
            "new design": `/${userIn}/designs/new`,
            "friends designs": `/${userIn}/designs/friends`,
            "stared designs": `/${userIn}/designs/stared`,
            "all designs": `/${userIn}/designs/all`
        },
        "Articles": {
            "my articles": `/${userIn}/articles/me`,
            "new article": `/${userIn}/articles/new`,
            "friends articles": `/${userIn}/articles/friends`,
            "stared articles": `/${userIn}/articles/stared`,
            "all articles": `/${userIn}/articles/all`
        },
        "Settings": {
        },
        "Products": {
            "my cart": `/${userIn}/products/cart`,
            "saved products": `/${userIn}/products/saved`,
            "all products": `/${userIn}/products/all`
        }
    }
}
