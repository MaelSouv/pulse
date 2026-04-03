import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
      @InjectRepository(Event)
      private readonly eventsRepository: Repository<Event>,
  ) {}

  create(dto: CreateEventDto, organizerId: number): Promise<Event> {
    const event = this.eventsRepository.create({
      title: dto.title,
      description: dto.description,
      location: dto.location,
      start_date: new Date(dto.start_date),
      end_date: new Date(dto.end_date),
      organizerId: organizerId,
    });
    return this.eventsRepository.save(event);
  }

  findAll(): Promise<Event[]> {
    return this.eventsRepository.find({ order: { start_date: 'ASC' } });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id_events: id } });
    if (!event) {
      throw new NotFoundException(`Événement #${id} introuvable.`);
    }
    return event;
  }

  async update(id: number, dto: UpdateEventDto, requesterId: number): Promise<Event> {
    const event = await this.findOne(id);
    this.assertOrganizer(event, requesterId);
    const updated = this.eventsRepository.merge(event, {
      ...dto,
      ...(dto.start_date && { start_date: new Date(dto.start_date) }),
      ...(dto.end_date && { end_date: new Date(dto.end_date) }),
    });
    return this.eventsRepository.save(updated);
  }

  async remove(id: number, requesterId: number): Promise<{ message: string }> {
    const event = await this.findOne(id);
    this.assertOrganizer(event, requesterId);
    await this.eventsRepository.remove(event);
    return { message: `Événement #${id} supprimé avec succès.` };
  }

  private assertOrganizer(event: Event, requesterId: number): void {
    if (event.organizerId !== requesterId) {
      throw new ForbiddenException("Seul l'organisateur peut modifier ou supprimer cet événement.");
    }
  }
}