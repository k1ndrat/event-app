import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './schemas/event.schema';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(dto: CreateEventDto, id: string): Promise<Event> {
    const createdEvent = new this.eventModel({ ...dto, organizerId: id });
    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().lean();
  }

  async findById(id: Types.ObjectId): Promise<Event> {
    const event = await this.eventModel.findById(id).lean();
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async findByOrganizerId(organizerId: Types.ObjectId): Promise<Event[]> {
    return this.eventModel.find({ organizerId }).lean();
  }

  async findByAttendeeId(attendeeId: Types.ObjectId): Promise<Event[]> {
    return this.eventModel.find({ attendeesIDs: attendeeId }).lean();
  }

  async addAttendee(
    eventId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<Event | null> {
    const event = await this.findById(eventId);
    const isAlreadyRegistered = event.attendeesIDs.some((id) =>
      id.equals(userId),
    );

    if (isAlreadyRegistered) {
      throw new ConflictException('User already registered for this event');
    }

    if (event.attendeesIDs.length >= event.maxAttendees) {
      throw new ConflictException(
        'Event has reached maximum number of attendees',
      );
    }

    return this.eventModel
      .findOneAndUpdate(
        {
          _id: eventId,
          attendeesIDs: { $ne: userId },
          $expr: { $lt: [{ $size: '$attendeesIDs' }, '$maxAttendees'] },
        },
        { $push: { attendeesIDs: userId } },
        { new: true },
      )
      .lean();
  }

  async removeAttendee(
    eventId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<Event | null> {
    const event = await this.findById(eventId);
    const isRegistered = event.attendeesIDs.some((id) => id.equals(userId));

    if (!isRegistered) {
      throw new NotFoundException('User is not registered for this event');
    }

    return this.eventModel
      .findOneAndUpdate(
        { _id: eventId },
        { $pull: { attendeesIDs: userId } },
        { new: true },
      )
      .lean();
  }

  async updateEvent(
    eventId: Types.ObjectId,
    dto: UpdateEventDto,
  ): Promise<Event> {
    const updatedEvent = await this.eventModel
      .findByIdAndUpdate(
        eventId,
        { $set: dto },
        { new: true, runValidators: true },
      )
      .lean();

    if (!updatedEvent) {
      throw new NotFoundException('Event not found');
    }

    return updatedEvent;
  }

  async deleteEvent(eventId: Types.ObjectId) {
    await this.findById(eventId);
    await this.eventModel.deleteOne({ _id: eventId });
  }
}
