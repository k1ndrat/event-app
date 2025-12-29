import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateEventDto } from './dto/create-event.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Types } from 'mongoose';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetEventsDto } from './dto/get-events.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Body() dto: CreateEventDto, @GetUser('_id') id: string) {
    return this.eventService.createEvent(dto, id);
  }

  @Get()
  async findAll(@Query() query: GetEventsDto) {
    return this.eventService.findAll(
      query.page,
      query.limit,
      query.sortBy,
      query.desc,
      {
        status: query.status,
        type: query.type,
        search: query.search,
        organizerId: query.organizerId,
        attendeeId: query.attendeeId,
      },
    );
  }

  @Get(':id')
  async findById(@Param('id', IdValidationPipe) id: Types.ObjectId) {
    return this.eventService.findById(id);
  }

  @Post(':id/attend')
  @HttpCode(HttpStatus.OK)
  async addAttendee(
    @Param('id', IdValidationPipe) eventId: Types.ObjectId,
    @GetUser('_id') userId: Types.ObjectId,
  ) {
    return this.eventService.addAttendee(eventId, userId);
  }

  @Post(':id/unattend')
  @HttpCode(HttpStatus.OK)
  async removeAttendee(
    @Param('id', IdValidationPipe) eventId: Types.ObjectId,
    @GetUser('_id') userId: Types.ObjectId,
  ) {
    return this.eventService.removeAttendee(eventId, userId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateEvent(
    @Param('id', IdValidationPipe) eventId: Types.ObjectId,
    @Body() dto: UpdateEventDto,
  ) {
    return this.eventService.updateEvent(eventId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEvent(@Param('id', IdValidationPipe) eventId: Types.ObjectId) {
    return this.eventService.deleteEvent(eventId);
  }
}
