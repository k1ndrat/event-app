import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { EventType } from 'src/common/enums';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  type: EventType;

  @Prop({})
  location: string;

  @Prop({})
  link: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  organizerId: Types.ObjectId;

  @Prop({ required: true })
  maxAttendees: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  attendeesIDs: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
