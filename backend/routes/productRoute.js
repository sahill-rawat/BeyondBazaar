const express = require('express');
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteReview } = require('../controller/productController');
const { isAuthenticatedUser,authorizedRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/products').get(getAllProduct);
router.route('/products/new').post(isAuthenticatedUser, createProduct);
router.route('/products/:id').put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct).delete(isAuthenticatedUser,  authorizedRoles("admin"), deleteProduct).get(getProductDetails);
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/review/delete').put(isAuthenticatedUser, deleteReview)
module.exports = router;

