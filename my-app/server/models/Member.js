const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ['coordinator', 'member'], required: true },
    // Wing is required for most members, but coordinators marked as overall or faculty
    // coordinators don't need a specific wing.
    wing: {
      type: String,
      required: function () {
        // "this" is the document
        return !(this.role === 'coordinator' && (this.isOverallCoordinator || this.isFacultyCoordinator))
      },
    },
    bio: { type: String, default: '' },
    image: { type: String },
    isOverallCoordinator: { type: Boolean, default: false },
    isFacultyCoordinator: { type: Boolean, default: false },
    socials: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id?.toString()
        delete ret._id
        delete ret.__v
        if (ret.createdAt instanceof Date) ret.createdAt = ret.createdAt.getTime()
        if (ret.updatedAt instanceof Date) ret.updatedAt = ret.updatedAt.getTime()
        return ret
      },
    },
  }
);

// Virtual id (also covered by transform above)
MemberSchema.virtual('id').get(function () {
  return this._id.toString()
})

module.exports = mongoose.models.Member || mongoose.model('Member', MemberSchema);
