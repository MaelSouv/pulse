import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@ApiTags('Événements')
@ApiBearerAuth()
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un événement' })
  @ApiResponse({ status: 201, description: 'Événement créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto, 1);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les événements' })
  @ApiResponse({ status: 200, description: 'Liste des événements.' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un événement par son ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: "Détail de l'événement." })
  @ApiResponse({ status: 404, description: 'Événement introuvable.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un événement' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Événement mis à jour.' })
  @ApiResponse({ status: 403, description: 'Accès refusé.' })
  @ApiResponse({ status: 404, description: 'Événement introuvable.' })
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateEventDto,
  ) {
    return this.eventsService.update(id, dto, 1);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Supprimer un événement' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Événement supprimé.' })
  @ApiResponse({ status: 404, description: 'Événement introuvable.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.remove(id, 1);
  }
}