import {
    IsString,
    IsNotEmpty,
    IsDateString,
    IsOptional,
    IsInt,
    Min,
    MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
    @ApiProperty({ example: 'Nuit Électro — Warehouse' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    title: string;

    @ApiPropertyOptional({ example: 'Une nuit électro non-stop.' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: '2025-06-14 22:00' })
    @IsDateString()
    date: string;

    @ApiProperty({ example: 'Rennes' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    location: string;

    @ApiPropertyOptional({ example: 'Concert' })
    @IsString()
    @IsOptional()
    @MaxLength(80)
    category?: string;

    @ApiPropertyOptional({ example: 300 })
    @IsInt()
    @Min(1)
    @IsOptional()
    capacity?: number;
}