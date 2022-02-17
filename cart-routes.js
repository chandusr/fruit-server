const express = require("express");
const CartService = require("./cart-service")

class CartRoutes {

  /**
   * Setups the routes for cart related REST api calls
   */ 
  static setup(root) {
    const cartRouter = express.Router();
        /**
     * TODO-2 - need to expose an api that allows a caller to get a list of all fruits in the system
     *  @requirements use the @CartService methods to interact with the fruit inventory
     *  @notes remember all methods are @see async on the FruitService
     */ 
    cartRouter.post('/cart',async(req,res,next)=>{
    //    req body
    //    {
    //     "Apple":2
    // }
      try {
          let responce = await CartService.purchase(req.body);
              res.send(responce)
        } catch (error) {
          next(error);
      }
    });
    root.use(cartRouter);
    }
  }
  
  module.exports = CartRoutes;
  
  