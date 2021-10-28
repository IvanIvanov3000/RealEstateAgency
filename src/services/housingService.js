const Housing = require('../model/Housing');

exports.create = (housingData) => Housing.create(housingData);

exports.getTopHouses = () => Housing.find().sort({ createdAt: -1 }).limit(3).lean();

exports.getAll = () => Housing.find().lean();

exports.getOne = (id) => Housing.findById(id).populate("tenants");

exports.addTenant = async (housingId, tenantId) => {

    return Housing.findOneAndUpdate(
        { _id: housingId },
        {
            $push: { tenants: tenantId },
            $inc: { availablePieces: -1 }
        },
        { runValidators: true }
    );

}
exports.delete = (housingId) => Housing.findByIdAndDelete(housingId);

exports.updateOne = (housingId, housingData) => Housing.findByIdAndUpdate(housingId, housingData);

exports.search = (text) => Housing.find({ type: { $regex: text, $options: 'i' } }).lean();