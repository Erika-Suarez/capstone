const RideShare = require("../models/rideShare");
const { cloudinary } = require("../cloudinary/index");

module.exports.renderIndex = async (req, res) => {
  const rideShares = await RideShare.find({});
  console.log(rideShares);
  res.render("rideShare/index", { rideShares });
};

module.exports.renderNew = (req, res) => {
  res.render("rideShare/new");
};

module.exports.postNewRideShare = async (req, res) => {
  const rideShare = new RideShare(req.body.rideShare);
  rideShare.image = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  rideShare.submittedBy = req.user._id;
  console.log(rideShare);
  await rideShare.save();
  req.flash("success", "New Rideshare was sucessfully added");
  res.redirect(`/rideShares/${rideShare.id}`);
};

module.exports.renderShow = async (req, res, next) => {
  const { id } = req.params;
  const rideShare = await RideShare.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("submittedBy");
  console.log(rideShare);
  if (!rideShare) {
    req.flash("error", "RideShare does not exist!");
    res.redirect("/rideShares");
  }
  res.render("rideShare/show", { rideShare });
};

module.exports.renderEdit = async (req, res) => {
  const { id } = req.params;
  const rideShare = await RideShare.findById(id);
  if (!rideShare) {
    req.flash("error", "Rideshare does not exist!");
    res.redirect("/rideShares");
  }
  res.render("rideshare/edit", { rideShare });
};

module.exports.updateRideShare = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const rideShare = await RideShare.findByIdAndUpdate(id, {
    ...req.body.rideShare,
  });
  const imgs = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  rideShare.image.push(...imgs);
  await rideShare.save();
  if (req.body.selectedImages) {
    for (let filename of req.body.selectedImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await rideShare.updateOne({
      $pull: { image: { filename: { $in: req.body.selectedImages } } },
    });
  }
  req.flash("success", "New Rideshare was sucessfully updated");
  res.redirect(`/rideShares/${rideShare.id}`);
};

module.exports.deleteRideShare = async (req, res) => {
  const { id } = req.params;
  await RideShare.findByIdAndDelete(id);
  req.flash("success", "New Rideshare was sucessfully deleted");
  res.redirect("/rideShares");
};
