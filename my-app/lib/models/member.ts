import mongoose, { Schema, models, model } from 'mongoose'

const MemberSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ['coordinator', 'member'], required: true },
    wing: {
      type: String,
      required: function (this: any) {
        return !(this.role === 'coordinator' && (this.isOverallCoordinator || this.isFacultyCoordinator))
      },
    },
    bio: { type: String, default: '' },
    image: { type: String, default: '/gravity-logo.png' },
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
      transform: (_doc, ret: any) => {
        ret.id = ret._id?.toString()
        delete ret._id
        delete ret.__v
        if (ret.createdAt instanceof Date) ret.createdAt = ret.createdAt.getTime()
        if (ret.updatedAt instanceof Date) ret.updatedAt = ret.updatedAt.getTime()
        return ret
      },
    },
  }
)

MemberSchema.virtual('id').get(function (this: any) {
  return this._id.toString()
})

export const Member = models.Member || model('Member', MemberSchema)
export type MemberDoc = mongoose.InferSchemaType<typeof MemberSchema> & { id: string }
