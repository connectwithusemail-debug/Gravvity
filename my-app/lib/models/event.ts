import mongoose, { Schema, models, model } from 'mongoose'

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    wing: { type: String, required: true },
    image: { type: String, default: '/gravity-logo.png' },
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

EventSchema.virtual('id').get(function (this: any) {
  return this._id.toString()
})

export const Event = models.Event || model('Event', EventSchema)
export type EventDoc = mongoose.InferSchemaType<typeof EventSchema> & { id: string }
