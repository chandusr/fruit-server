const express = require("express");
const FruitService = require("./fruit-service");
const CartService = require("./cart-service")

class FruitRoutes {

  /**
   * Setups the routes for fruit related REST api calls
   */ 
  static setup(root) {
     
    const fruitRouter = express.Router();

    /**
     * TODO-2 - need to expose an api that allows a caller to get a list of all fruits in the system
     *  @requirements use the @FruitService methods to interact with the fruit inventory
     *  @notes remember all methods are @see async on the FruitService
     */ 
     fruitRouter.get('/',(req,res,next)=>{
        FruitService.getAllFruits()
        .then(data=>{
           res.send(data);
        })
       .catch(err=>{
        next(err)
       })
     })
    
    /**
     * TODO-3 - need to expose an api that allows a caller to get a specific fruit in the system
     *  @requirements use the @FruitService methods to interact with the fruit inventory
     *  @requirements take consideration when fruit does not exist
     *  @notes remember all methods are @see async on the FruitService
     */ 
     fruitRouter.get('/:fruit_name',async(req,res,next)=>{
        try {
            let responce = await FruitService.getFruit(req.params.fruit_name);
            if(responce){
                res.send(responce)
            }else{
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            }
          } catch (error) {
            next(error);
        }
     });
     fruitRouter.post('/cart',async(req,res,next)=>{
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
    
     root.use(fruitRouter);
    }
  }
  
  module.exports = FruitRoutes;
  
  