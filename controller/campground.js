const campground = require('../model/campground');
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
    const campgrounds = await campground.find({})
    res.render('campgrounds/index', { campgrounds })
}
module.exports.renderNewForm = (req, res) => {

    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res) => {

    // if (!req.body.campground) throw new ExpressError('Invalid Data', 400);
    const campgrounds = new campground(req.body.campground);
    campgrounds.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campgrounds.author = req.user._id
    await campgrounds.save();
    req.flash('success', 'Added Successfully')
    res.redirect(`/campgrounds/${campgrounds._id}`)
}
module.exports.showCampground = async (req, res) => {
    const campgrounds = await campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campgrounds) {
        req.flash('error', 'I zawn tak hi a awm lo');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campgrounds });
}
module.exports.renderEdit = async (req, res) => {
    const { id } = req.params;
    const campgrounds = await campground.findById(id);
    // console.log(req.user._id);
    if (!campgrounds) {
        req.flash('error', 'I zawn tak hi a awm lo');
        return res.redirect('/campgrounds');
    }

    res.render('campgrounds/edit', { campgrounds });
}
module.exports.postUpdate = async (req, res) => {
    const { id } = req.params;
    const campgrounds = await campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campgrounds.images.push(...imgs);
    await campgrounds.save();
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await campgrounds.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })    
    }
    req.flash('success', 'Updated Successfully')
    res.redirect(`/campgrounds/${campgrounds._id}`);
}
module.exports.deleteCamp = async (req, res) => {
    const { id } = req.params;
    const campgrounds = await campground.findById(id);

    await campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully Deleted');
    res.redirect('/campgrounds');
}