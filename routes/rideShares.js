const express = require("express");
const router = express.Router();
const {rideShareSchema} = require("../joiSchema");
const AppError = require("../utilities/AppError");
const asyncCatcher = require("../utilities/asyncCatcher");
const RideShare = require("../models/rideShare");
const { isAuthenticated,isCreator,validateRideShare } = require("../middleware/middleware");
const rideShare = require("../models/rideShare");


// RENDERING OUR INDEX ROUTE--------------------------

router.get("/", asyncCatcher(async (req, res) => {
    const rideShares = await RideShare.find({});
    console.log(rideShares)
    res.render('rideShare/index', {rideShares});
    })
    ); 
// RENDER NEW FORM---------------------------------------
    router.get('/new', isAuthenticated, (req, res) => {
        res.render('rideShare/new');
    });
// CREATE A NEW RideShare FROM THE SHOW ROUTE---------------
    router.post('/',
    isAuthenticated,
    validateRideShare, asyncCatcher(async (req, res) => {
        const rideShare = new rideShare(req.body.rideShare);
        rideShare.submittedBy = req.user._id;
        await rideShare.save();
        req.flash("success", "New Rideshare was sucessfully added");
        res.redirect(`/rideShares/${rideShare.id}`);
    })
    );

 // render EJS SHOW --------------------------
     
    router.get('/:id', asyncCatcher(async (req, res, next) => {
        const {id} = req.params;
        const rideShare =  await RideShare.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            }
        })
        .populate('submittedBy');
        console.log(rideShare);
            if(!rideShare) {
                req.flash('error', 'RideShare does not exist!');
                res.redirect("/rideShares")
            }
                 res.render('rideShare/show', {rideShare});
    })
    );
    
// RENDER THE EDIT PAGE ---------------------------------------
    router.get('/:id/edit', isAuthenticated, isCreator,asyncCatcher(async (req, res) => {
        const {id} = req.params
        const rideShare = await RideShare.findById(id);
        if(!rideShare) {
            req.flash('error', 'Rideshare does not exist!');
            res.redirect("/rideShares")
        }
        res.render('rideshare/edit', {rideShare});
    })
    );
 // UPDATE RideShare CARD -----------------------------------------
        router.put("/:id", isAuthenticated, isCreator, asyncCatcher(async (req, res) => {
            const {id} = req.params
            const rideShare = await RideShare.findByIdAndUpdate(id, {
                ...req.body.rideShare,
            });
            req.flash("success", "New Rideshare was sucessfully updated");
            res.redirect(`/rideShares/${rideShare.id}`);
        })
        );
 // DELETING Rideshares CARD ----------------------------------------
        router.delete('/:id/delete', isAuthenticated,isCreator, asyncCatcher(async (req, res) => {
            const { id } = req.params;
            await rideShare.findByIdAndDelete(id);
            req.flash("success", "New Rideshare was sucessfully deleted");
            res.redirect('/rideShares');
        })); 

        module.exports = router;