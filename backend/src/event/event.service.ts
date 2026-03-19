import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EEventFilterStatus, EEventSortBy, EEventType } from 'src/common/enums';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(dto: CreateEventDto, id: string): Promise<Event> {
    const createdEvent = new this.eventModel({ ...dto, organizerId: id });
    return createdEvent.save();
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    sortBy: EEventSortBy = EEventSortBy.EVENT_DATE,
    desc: boolean = false,
    filter: {
      status?: EEventFilterStatus;
      type?: EEventType;
      search?: string;
      organizerId?: Types.ObjectId;
      attendeeId?: Types.ObjectId;
    } = {},
  ) {
    const skip = (page - 1) * limit;
    const mongoQuery: any = {};
    const now = new Date();

    if (filter.organizerId) {
      mongoQuery.organizerId = filter.organizerId;
    }

    if (filter.attendeeId) {
      mongoQuery.attendeesIDs = filter.attendeeId;
    }

    if (filter.search) {
      mongoQuery.name = { $regex: filter.search.trim(), $options: 'i' };
    }

    if (filter.status === EEventFilterStatus.UPCOMING) {
      mongoQuery.date = { $gte: now };
    } else if (filter.status === EEventFilterStatus.PAST) {
      mongoQuery.date = { $lt: now };
    }

    if (filter.type) {
      mongoQuery.type = filter.type;
    }

    const sortOptions = {
      [sortBy]: desc ? -1 : 1,
      _id: -1,
    };

    const [events, total] = await Promise.all([
      this.eventModel
        .find(mongoQuery)
        .sort(sortOptions as any)
        .skip(skip)
        .limit(limit)
        .lean(),
      this.eventModel.countDocuments(mongoQuery),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: events,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
      },
    };
  }

  async findById(id: Types.ObjectId): Promise<Event> {
    const event = await this.eventModel.findById(id).lean();
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
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
