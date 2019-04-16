var env = 'php';
var baseUrlPhp = "http://localhost:5566";
var baseUrlNet = "http://localhost:5000";
var baseUrlMongo = "http://localhost";

var config = {
    "php": {
        "apiUrlProducts": baseUrlPhp + "/ecommerceassignment1_backend/ecommerceassignment2_backend/api/getProductList.php",
        "apiUrlReviews": baseUrlPhp + "/ecommerceassignment1_backend/ecommerceassignment2_backend/api/getReviewList.php",
        "apiUrlAddReview": baseUrlPhp + "/ecommerceassignment1_backend/ecommerceassignment2_backend/api/addReview.php",
        "apiUrlLogin": baseUrlPhp + "/ecommerceassignment1_backend/ecommerceassignment2_backend/api/getUserDetail.php",
        "apiUrlProductDetail": baseUrlPhp + "/ecommerceassignment1_backend/ecommerceassignment2_backend/api/getProductDetail.php",
        "apiUrlSignup": baseUrlPhp + "/ecommerceassignment1_backend/ecommerceassignment2_backend/api/insertUser.php",
        "apiUrlAddCart": baseUrlPhp + "/ecommerceassignment1_backend/ecommerceassignment2_backend/api/addToCart.php",
        "apiUrlGetCartProducts": baseUrlPhp + "/ecommerceassignment1_backend/ecommerceassignment2_backend/api/getCartProducts.php",
        "apiUrlUpdateQuantity": baseUrlPhp + "/ecommerceassignment1_backend/ecommerceassignment2_backend/api/updateQuantity.php",
        "apiUrlRemoveProduct": baseUrlPhp + "/ecommerceassignment1_backend/ecommerceassignment2_backend/api/removeFromCart.php",
        "apiUrlUpdateUser": baseUrlPhp + "/ecommerceassignment1_backend/ecommerceassignment2_backend/api/updateUser.php"
    },
    "net": {
        "apiUrlProducts": baseUrlNet + "/api/Products/getProductList",
        "apiUrlReviews": baseUrlNet + "/ecommerceassignment2_backend/api/getReviewList.php",
        "apiUrlAddReview": baseUrlNet + "/ecommerceassignment2_backend/api/addReview.php",
        "apiUrlLogin": baseUrlNet + "/ecommerceassignment2_backend/api/getUserDetail.php",
        "apiUrlProductDetail": baseUrlNet + "/ecommerceassignment2_backend/api/getProductDetail.php",
        "apiUrlSignup": baseUrlNet + "/ecommerceassignment2_backend/api/insertUser.php",
        "apiUrlAddCart": baseUrlNet + "/ecommerceassignment2_backend/api/addToCart.php",
        "apiUrlGetCartProducts": baseUrlNet + "/ecommerceassignment2_backend/api/getCartProducts.php",
        "apiUrlUpdateQuantity": baseUrlNet + "/ecommerceassignment2_backend/api/updateQuantity.php",
        "apiUrlRemoveProduct": baseUrlNet + "/ecommerceassignment2_backend/api/removeFromCart.php"
    },
    "mongo": {
        "apiUrlProducts": baseUrlMongo + "/ecommerceassignment2_backend/api/getProductList.php",
        "apiUrlReviews": baseUrlMongo + "/ecommerceassignment2_backend/api/getReviewList.php",
        "apiUrlAddReview": baseUrlMongo + "/ecommerceassignment2_backend/api/addReview.php",
        "apiUrlLogin": baseUrlMongo + "/ecommerceassignment2_backend/api/getUserDetail.php",
        "apiUrlProductDetail": baseUrlMongo + "/ecommerceassignment2_backend/api/getProductDetail.php",
        "apiUrlSignup": baseUrlMongo + "/ecommerceassignment2_backend/api/insertUser.php",
        "apiUrlAddCart": baseUrlMongo + "/ecommerceassignment2_backend/api/addToCart.php",
        "apiUrlGetCartProducts": baseUrlMongo + "/ecommerceassignment2_backend/api/getCartProducts.php",
        "apiUrlUpdateQuantity": baseUrlMongo + "/ecommerceassignment2_backend/api/updateQuantity.php",
        "apiUrlRemoveProduct": baseUrlMongo + "/ecommerceassignment2_backend/api/removeFromCart.php"
    },
}

export default config[env];
